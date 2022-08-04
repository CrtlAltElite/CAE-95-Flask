from flask import abort, g
from functools import wraps

def require_admin(f):
    @wraps(f)
    def check_admin(*args, **kwargs):
        if not g.current_user.is_admin:
            abort(403)
        else:
            return f(*args, **kwargs)
    return check_admin