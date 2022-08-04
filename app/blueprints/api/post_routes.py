from . import bp as api
from app.models import Post
from flask import make_response, request, jsonify, g, abort
from app.blueprints.auth.auth import token_auth

# Return all the posts  the user follows and his own posts
@api.get('/post')
@token_auth.login_required()
def get_posts():
    posts = g.current_user.followed_posts()
    posts = [post.to_dict() for post in posts]
    return make_response({"posts":posts},200)

# get a single post by id
@api.get('/post/<int:id>')
@token_auth.login_required()
def get_post(id):
    post = Post.query.get(id)
    if not post:
        abort(404)
    # Check to see if the user has access to the post
    if not g.current_user.is_following(post.author) \
        and not post.author.id == g.current_user.id:
        abort(403)
    return make_response(post.to_dict(),200)


# {
#     "body": STRING
# }
@api.post('/post')
@token_auth.login_required()

def post_post():
    posted_data=request.get_json()
    post = Post(user_id=g.current_user.id, body=posted_data['body'])
    # post = Post(**posted_data)
    post.save()
    return make_response('success',200)

#{
# "body": STRING
#}

# Edit a post
@api.put('/post/<int:id>')
@token_auth.login_required()
def put_post(id):
    put_data = request.get_json()
    post = Post.query.get(id)
    if not post:
        abort(404)
    if post.author.id != g.current_user.id:
        abort(403)
    post.edit(put_data['body'])
    post.save()
    return make_response('success',200)


# Delete a post
@api.delete('/post/<int:id>')
@token_auth.login_required()
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        abort(404)
    if post.author.id != g.current_user.id:
        abort(403)
    post.delete()
    return make_response('success',200)