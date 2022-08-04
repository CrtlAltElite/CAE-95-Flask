from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_moment import Moment

## Registering plugin/exts

# init for database management
db = SQLAlchemy()
migrate = Migrate()

# Login
login = LoginManager()

moment= Moment()


def create_app(config_class=Config):
    # initializing
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    moment.init_app(app)

    # Configure some Settings
    login.login_view = 'auth.login'
    login.login_message = 'Log yourself in you filthy animal'
    login.login_message_category = 'warning'

    from .blueprints.auth import bp as auth_bp
    app.register_blueprint(auth_bp)

    from .blueprints.main import bp as main_bp
    app.register_blueprint(main_bp)
    
    from .blueprints.social import bp as social_bp
    app.register_blueprint(social_bp)
    
    from .blueprints.api import bp as api_bp
    app.register_blueprint(api_bp)

    return app



from app import models
