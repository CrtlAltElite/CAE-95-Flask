from email import message
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError
from app import app
from .models import User
# Forms
class LoginForm(FlaskForm):
    email = StringField('Email Address', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

class RegisterForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    email = StringField('Email Address', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', 
        validators=[DataRequired(), EqualTo('password', message='Passwords Must Match')])
    submit = SubmitField('Register')

    def validate_email(form, field):
        same_email_user = User.query.filter_by(email = field.data).first()
        if same_email_user:
            return ValidationError('Email is Already in Use')
