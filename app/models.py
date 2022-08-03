from app import db, login
from flask_login import UserMixin # THIS IS ONLY FOR THE USER MODEL!!!!!!!!!!!!
from datetime import datetime as dt
from werkzeug.security import generate_password_hash, check_password_hash


followers = db.Table(
    'followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id')),
)

class User(UserMixin, db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String, unique=True, index=True)
    password = db.Column(db.String)
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    icon = db.Column(db.Integer)
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    followed = db.relationship('User',
        secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'),
        lazy='dynamic'
        )   
    
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
        db.session.commit() # save the stuff in the session to the database

    def delete(self):
        db.session.delete(self) # remove the user from the session
        db.session.commit() # save the stuff in the session to the database
    
    def from_dict(self, data):
        self.first_name=data['first_name']
        self.last_name=data['last_name']
        self.email=data['email']
        self.password=self.hash_password(data['password'])
        self.icon=data['icon']

    def get_icon_url(self):
        return f"http://avatars.dicebear.com/api/croodles/{self.icon}.svg"

    # Check to see if the user is following another user
    def is_following(self, user_to_check):
        # return user_to_check in self.followed
        return self.followed.filter(followers.c.followed_id == user_to_check.id).count()>0

    # Follow a user
    def follow(self, user_to_follow):
        if not self.is_following(user_to_follow):
            self.followed.append(user_to_follow)
            db.session.commit()

    def unfollow(self, user_to_unfollow):
        if self.is_following(user_to_unfollow):
            self.followed.remove(user_to_unfollow)
            db.session.commit()

    # Get all the posts for user I am following and my own posts
    def followed_posts(self):
        # get all the posts for the users I am following
        followed = Post.query.join(followers, (Post.user_id == followers.c.followed_id)).filter(followers.c.follower_id == self.id)
        # Get all my own posts
        self_posts = Post.query.filter_by(user_id = self.id)
        # Smooosh together and sort them by date
        all_posts = followed.union(self_posts).order_by(Post.date_created.desc())
        return all_posts
    

@login.user_loader
def load_user(id):
    return User.query.get(int(id))
    # SELECT * FROM user WHERE id = ???

class Post(db.Model):
    __tablename__ = 'post'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text)
    date_created = db.Column(db.DateTime, default=dt.utcnow)
    date_updated = db.Column(db.DateTime, onupdate=dt.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<Post: {self.id} | {self.body[:15]}>'

    def edit(self, new_body):
        self.body=new_body

        #save post to db
    def save(self):
        db.session.add(self) # add the userr to the session
        db.session.commit() # save the stuff in the session to the database

    def delete(self):
        db.session.delete(self) # remove the user from the session
        db.session.commit() # save the stuff in the session to the database
    