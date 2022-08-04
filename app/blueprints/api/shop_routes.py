from . import bp as api
from app.blueprints.auth.auth import token_auth
from flask import request, make_response, g, abort
from .models import *
from helpers import require_admin


# Get all cats
@api.get('/category')
def get_category():
    cats=Category.query.all()
    cats_dicts=[cat.to_dict() for cat in cats]
    return make_response({"categories":cats_dicts},200)

# Create a Cat
# {
#     "name": "my cat name"
# }
@api.post('/category')
@token_auth.login_required()
@require_admin
def post_category():
    cat_name = request.get_json().get("name")
    if not cat_name:
        abort(406)
    cat = Category(name = cat_name)
    cat.save()
    return make_response(f"success {cat.id} created", 200)

# id of the category, name of category
# {
#     "name": "my cat name"
# }
@api.put('/category/<int:id>')
@token_auth.login_required()
@require_admin
def put_category(id):
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    cat_name = request.get_json().get("name")
    cat.name=cat_name
    cat.save()
    return make_response(f"success {cat.id} updated", 200)

# Delete a category
# {
#     "id": "id of my category to delete"
# }
@api.delete('/category/<int:id>')
@token_auth.login_required()
@require_admin
def delete_category(id):
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    cat.delete()
    return make_response(f"Category {id} deleted", 200)