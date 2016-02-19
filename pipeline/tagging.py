import flask

import model

app = flask.Blueprint('tagging', __name__, template_folder='templates')

tagging_index = 0
currentPost = model.Sample.objects[tagging_index]

@app.route('/')
def index():
    global tagging_index
    global currentPost
    if len(model.Sample.objects) <= tagging_index:
        tagging_index = 0
    currentPost = model.Sample.objects[tagging_index]
    tagging_index += 1
    return currentPost.to_json()
    

@app.route('/tag', methods=['POST'])
def tag():
    global currentPost
    agree = flask.request.json.get('agree')
    currentPost.tag = agree and currentPost.tag or not agree and not currentPost.tag
    currentPost.save()
    return 'test'