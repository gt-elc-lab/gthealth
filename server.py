import flask
from flask.ext.cors import CORS
import json

import model
import pipeline.labeling

application = flask.Flask(__name__)
CORS(application)
application.secret_key = 'super secret'

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
    user.save()
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
    if not user.verify_password(password):
        raise AuthenticationError('Incorrect username or password.')
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

@api.route('/activate/<string:_id>', methods=['POST'])
def activate(_id):
    return

""" Post routes """

@api.route('/post', methods=['GET'])
def get_posts():
    posts = model.Post.objects(resolved=False).to_json()
    print posts
    return flask.Response(posts,  mimetype='application/json')

@api.route('/post/<string:r_id>', methods=['GET'])
def get_post(r_id):
    return model.Post.objects.get(r_id=r_id).to_json()


application.register_blueprint(pipeline.labeling.app,
    url_prefix='/label')
application.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    application.debug = True
    application.run()