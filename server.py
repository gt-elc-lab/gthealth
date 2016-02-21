import flask
from flask.ext.cors import CORS

import model
import pipeline.labeling

app = flask.Flask(__name__)
CORS(app)

app.register_blueprint(pipeline.labeling.app, url_prefix='/label')
app.secret_key = 'super secret'

def make_user_response(model):
    return {
        'id': str(model.id),
        'email': model.email,
    }

@app.route('/register', methods=['POST'])
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


@app.route('/login', methods=['POST'])
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


@app.route('/activate/<string:_id>', methods=['POST'])
def activate(_id):
    return


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

@app.errorhandler(AuthenticationError)
def handle_authentication_error(error):
    response = flask.jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


if __name__ == '__main__':
    app.debug = True
    app.run()