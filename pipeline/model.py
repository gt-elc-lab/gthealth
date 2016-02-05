from mongoengine import *

import config
connect('gthealth')

class Post(Document):

    r_id = StringField(primary_key=True)
    title = StringField()
    content = StringField()
    resolved = BooleanField(default=False)
    created = DateTimeField()