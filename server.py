import flask

import model

app = flask.Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
    email = flask.request.json.get('email')
    password = flask.request.json.get('password')
    if email is None or password is None:
        flask.abort(400) # missing arguments
    if model.User.objects(email=email).first() is not None:
        flask.abort(400) # existing user
    user = model.User(email=email)
    user.hash_password(password)
    user.save()
    return flask.jsonify({'status': 'OK'})

@app.route('/login', methods=['POST'])
def login():
    email = flask.request.json.get('email')
    password = flask.request.json.get('password')
    if email is None or password is None:
        flask.abort(400) # missing arguments
    user = model.User.objects(email=email).first()
    if not user:
        # Email does not exist
        flask.abort(400)
    if not user.verify_password(password):
        # incorrect password
        return flask.abort(400)
    return flask.jsonify(user.to_json())

@app.route('/activate/<string:_id>', methods=['GET'])
def activate(_id):
    return

if __name__ == '__main__':
    app.debug = True
    app.run()