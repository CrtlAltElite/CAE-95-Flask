from collections import Counter
from . import bp as api
from app.blueprints.auth.auth import token_auth
from flask import request, make_response, g, abort, jsonify
from .models import *
from helpers import require_admin
import stripe
import os

############
##
##  Stripe API ROUTES
##
############

stripe.api_key = os.environ.get('STRIPE_SK')
YOUR_DOMAIN = os.environ.get('YOUR_DOMAIN')

@api.route('/create-checkout-session', methods=['POST'])
@token_auth.login_required()
def create_checkout_session():
    data = request.get_json()
    cart = data.get('cart')
    user = data.get('user')
    line_items=[]
    filtered_ids = map(lambda item: item['id'] ,cart)
    item_counts = Counter(filtered_ids)
    for item in cart:
        if item['id'] in item_counts:
            line_items.append({
                "name":item['name'],
                'amount':int(float(item['price'])*100),
                'quantity':item_counts[item['id']],
                'currency':'USD'
            })
            del item_counts[item['id']]

    # try:
    checkout_session = stripe.checkout.Session.create(
        customer_email = user['email'],
        billing_address_collection='auto',
        shipping_address_collection={
            "allowed_countries":['US','CA']
        },
        line_items=line_items,
        mode="payment",
        success_url=YOUR_DOMAIN + 'checkoutsuccess',
        cancel_url=YOUR_DOMAIN + 'cart/true',
    )

    # except Exception as e:
    #     return str(e)
    
    return make_response({"url":checkout_session.url}, 200)


############
##
##  CATEGORY API ROUTES
##
############

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
    print(request.get_json())
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
# 
#     "id": "id of my category to delete"
# 
@api.delete('/category/<int:id>')
@token_auth.login_required()
@require_admin
def delete_category(id):
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    cat.delete()
    return make_response(f"Category {id} deleted", 200)


#############
##
##  ITEM API ROUTES
##
############


# Get All items from the shop

@api.get('/item')
def get_items():
    # Get all the items from the database
    items = Item.query.all()
    # convert the items to dicts
    items_dicts=[item.to_dict() for item in items]
    # return the response
    return make_response({"items":items_dicts},200)

# Get an item by its id
@api.get('/item/<int:id>')
def get_item(id):
    # look it up in the db
    item=Item.query.get(id)
    # Item.query.filter(Item.id==id).first()
    # Item.query.filter_by(id=id).first()
    if not item:
        abort(404)
    item_dict = item.to_dict()
    return make_response(item_dict, 200)

# Get all items in a Category by cat id
@api.get('/item/category/<int:id>')
def get_items_by_cat(id):
    cat = Category.query.get(id)
    if not cat:
        abort(404)
    all_items_in_cat = [item.to_dict() for item in cat.products]
    return make_response({"items":all_items_in_cat}, 200)

# Create a new Item
# {
# 'name' : String,
#  'desc' : string,
#  'price': float,
#  'img': string,
#  'category_id': int
#  }
@api.post("/item")
@token_auth.login_required()
@require_admin
def post_item():
    # Get the payload
    item_dict=request.get_json()
    # Ensure the payload has all the appro. values
    if not all(key in item_dict for key in ('name', 'desc', 'price', 'img', 'category_id')):
        abort(400)
    item = Item()
    item.from_dict(item_dict)
    item.save()
    return make_response(f'{item.name} was created', 200)

#id of the item they changing and the information they want to change
@api.put("/item/<int:id>")
@token_auth.login_required()
@require_admin
def put_item(id):
    # Get the payload
    item_dict=request.get_json()
    item = Item.query.get(id)
    if not item:
        abort(404)
    item.from_dict(item_dict)
    item.save()
    return make_response(f'{item.name} was updated', 200)

# Delete an Item
@api.delete('/item/<int:id>')
@token_auth.login_required()
@require_admin
def delete_item(id):
    item_to_del = Item.query.get(id)
    if not item_to_del:
        abort(404)
    item_to_del.delete()
    return make_response(f'item {id} was deleted', 200)