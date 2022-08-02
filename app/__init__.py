from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

# initializing
app = Flask(__name__)
app.config.from_object(Config)

## Registering plugin/exts

# init for database management
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Login
login = LoginManager(app)

# Configure some Settings
login.login_view = 'login'
login.login_message = 'Log yourself in you filthy animal'
login.login_message_category = 'warning'

from app import routes, models
