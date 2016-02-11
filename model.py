from mongoengine import *
from passlib.apps import custom_app_context as pwd_context

import config
connect('gthealth')

class Post(Document):
    r_id = StringField(primary_key=True)
    title = StringField()
    content = StringField()
    resolved = BooleanField(default=False)
    created = DateTimeField()

class User(Document):
    email = StringField()
    password = StringField()
    activated = BooleanField(default=False)

    def hash_password(self, password):
        self.password = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password)