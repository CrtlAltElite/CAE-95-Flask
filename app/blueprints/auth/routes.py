from flask import redirect, render_template, request, url_for, flash
import requests
from .forms import LoginForm, RegisterForm, EditProfileForm
from app.models import User
from flask_login import login_user, login_required, logout_user, current_user
from . import bp as auth

@auth.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if request.method == 'POST' and form.validate_on_submit():
        try:
            new_user_data={
                "first_name":form.first_name.data.title(),
                "last_name":form.last_name.data.title(),
                "email":form.email.data.lower(),
                "password":form.password.data,
                "icon":form.icon.data
            }
            # Create an Empty user
            new_user_object = User()

            #build our user from the form data
            new_user_object.from_dict(new_user_data)

            # Save new user to the database
            new_user_object.save()
        except:
            # Flash user Error
            flash("An Unexpected Error occurred", "danger")
            return render_template('register.html.j2', form=form)
        # Flash user here telling you have been register
        flash("Successfully registered", "success")
        return redirect(url_for('auth.login'))
    
    return render_template('register.html.j2', form=form)

@auth.route('/edit_profile', methods=['GET', 'POST'])
def edit_profile():
    form = EditProfileForm()
    if request.method == 'POST' and form.validate_on_submit():
        edited_user_data={
                "first_name":form.first_name.data.title(),
                "last_name":form.last_name.data.title(),
                "email":form.email.data.lower(),
                "password":form.password.data,
                "icon":int(form.icon.data) if int(form.icon.data) != 9000 else current_user.icon
            }
        user = User.query.filter_by(email=edited_user_data['email']).first()
        if user and user.email != current_user.email:
            flash('Email is already in use', 'danger')
            return redirect(url_for('auth.edit_profile'))
        try:
            current_user.from_dict(edited_user_data)
            current_user.save()
            flash("Profile Updated", 'success')
        except:
            flash("Error updating profile", 'danger')
            return redirect(url_for('auth.edit_profile'))
        return redirect(url_for('social.index'))
    return render_template('register.html.j2',form=form)




@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        email = form.email.data.lower()
        password = form.password.data

        u = User.query.filter_by(email=email).first()
        if u and u.check_hashed_password(password):
            #Login Success!!!!!
            flash('Successfully logged in','success')
            login_user(u)
            return redirect(url_for('social.index'))
        flash("Incorrect Email/password Combo", "warning")
        return render_template('login.html.j2', form=form)

    return render_template('login.html.j2', form=form)

@auth.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    flash('Successfully logged out', 'primary')
    return redirect(url_for('social.index'))



