import os, json
# Config
class Config():
    SECRET_KEY=os.environ.get('SECRET_KEY')
    REGISTERED_USERS=json.loads(os.environ.get('REGISTERED_USERS'))
