from . import bp as api
from app.blueprints.auth.auth import basic_auth
from flask import g, make_response

@api.get('/login')
@basic_auth.login_required()
def get_login():
    g.current_user.get_token()
    return make_response(g.current_user.to_dict(), 200)


