import flask

import model

app = flask.Blueprint('tagging', __name__, template_folder='templates')

@app.route('/')
def index():
    pass