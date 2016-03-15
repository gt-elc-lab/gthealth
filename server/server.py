import flask
from flask.ext.cors import CORS
import json

import model
import emailer
from pipeline.labeling import label_server
import pipeline.bot

application = flask.Flask(__name__)
CORS(application)

api = flask.Blueprint('api', __name__, template_folder='templates')

""" User routes """

def make_user_response(model):
    return {
        'id': str(model.id),
        'email': model.email,
    }

@api.route('/register', methods=['POST'])
def register():
    email = flask.request.json.get('email')
    password = flask.request.json.get('password')
    if email is None or password is None:
        raise AuthenticationError('Missing credentials.')
    if model.User.objects(email=email).first():
        raise AuthenticationError('User already exists.')
    user = model.User(email=email)
    user.hash_password(password)
    user.create_activation_token()
    user.save()
    # mail = emailer.Emailer()
    # message = 'localhost:5000/api/activate/{token}'.format(
    #     token=user.activation_token)
    # mail.send_text(user.email, [user.email], message)
    return flask.jsonify(make_user_response(user))


@api.route('/login', methods=['POST'])
def login():
    email = flask.request.json.get('email')
    password = flask.request.json.get('password')
    if email is None or password is None:
        raise AuthenticationError('Missing credentials.')
    user = model.User.objects(email=email).first()
    if not user:
        raise AuthenticationError('User does not exist.')
    if not user.activated:
        raise AuthenticationError('Please activate your account.')
    if not user.verify_password(password):
        raise AuthenticationError('Incorrect password.')
    return flask.jsonify(make_user_response(user))


@api.route('/activate/<string:email>', methods=['POST'])
def activate(email):
    token = flask.request.json.get('token')
    user = model.User.objects(email=email, activation_token=token).first()
    if not user:
        flask.abort(400)
    user.activated = True
    user.save()
    return flask.jsonify(make_user_response(user))


class AuthenticationError(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

@api.errorhandler(AuthenticationError)
def handle_authentication_error(error):
    response = flask.jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


""" Post routes """

@api.route('/post', methods=['GET'])
def get_posts():
    posts = model.Post.objects(resolved=False).to_json()
    return flask.Response(posts,  mimetype='apilication/json')


@api.route('/post/<string:r_id>', methods=['GET'])
def get_post(r_id):
    return model.Post.objects.get(r_id=r_id).to_json()


@api.route('/respond/<string:r_id>/<string:user_id>')
def respond(r_id, user_id):
    post = model.Post.objects.get(r_id=r_id)
    message = flask.request.args.get('message')
    reddit_bot = pipeline.bot.RedditBot()
    reddit_bot.comment(r_id, message)
    post.resolved = True
    post.save()
    return  flask.jsonify({'status': 'success'})


@api.route('/post/<string:r_id>', methods=['DELETE'])
def discard(r_id):
    post = model.Post.objects.get(r_id=r_id)
    post.discard = True
    post.resolved = True
    post.save()
    return flask.jsonify({'status': 'success'})

application.register_blueprint(api, url_prefix='/api')
application.register_blueprint(label_server, url_prefix='/label')

if __name__ == '__main__':
    application.debug = True
    application.run()
