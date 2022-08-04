from . import bp as api
from app.models import Post
from flask import make_response, request, jsonify


# Return all the posts in the database
@api.get('/post')
def get_posts():
    posts = Post.query.all()
    posts = [post.to_dict() for post in posts]
    return make_response({"posts":posts},200)

# get a single post by id
@api.get('/post/<int:id>')
def get_post(id):
    post = Post.query.get(id)
    return make_response(post.to_dict(),200)


# {
#     "user_id": INTEGER,
#     "body": STRING
# }
@api.post('/post')
def post_post():
    posted_data=request.get_json()
    post = Post(user_id=posted_data['user_id'], body=posted_data['body'])
    # post = Post(**posted_data)
    post.save()
    return make_response('success',200)

#{
# "body": STRING
#}

# Edit a post
@api.put('/post/<int:id>')
def put_post(id):
    put_data = request.get_json()
    post = Post.query.get(id)
    post.edit(put_data['body'])
    post.save()
    return make_response('success',200)


# Delete a post
@api.delete('/post/<int:id>')
def delete_post(id):
    post = Post.query.get(id)
    post.delete()
    return make_response('success',200)