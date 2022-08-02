from app import db, login
from flask_login import UserMixin # THIS IS ONLY FOR THE USER MODEL!!!!!!!!!!!!
from datetime import datetime as dt
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String, unique=True, index=True)
    password = db.Column(db.String)
    created_on = db.Column(db.DateTime, default=dt.utcnow)    

    # should return a unique identifing string
    def __repr__(self):
        return f'<User: {self.email} | {self.id}>'
    
    # Human readable repr
    def __str__(self):
        return f'<User: {self.email} | {self.first_name} {self.last_name}>'

    # salts and hashes our password to make it hard to steal
    def hash_password(self, original_password):
        return generate_password_hash(original_password)

    # compares the user password to the password provided in the login form
    def check_hashed_password(self, login_password):
        return check_password_hash(self.password, login_password)

    #save user to db
    def save(self):
        db.session.add(self) # add the userr to the session
        db.session.commit() # sace the stuff in the session to the database
    
    def from_dict(self, data):
        self.first_name=data['first_name']
        self.last_name=data['last_name']
        self.email=data['email']
        self.password=self.hash_password(data['password'])

@login.user_loader
def load_user(id):
    return User.query.get(int(id))
    # SELECT * FROM user WHERE id = ???
