from . import bp as social
from flask import render_template, request, flash, redirect, url_for
from flask_login import current_user, login_required
from app.models import User, Post

# Routes
@social.route('/', methods=['GET', 'POST'])
@login_required
def index():
    if request.method == 'POST':
        body = request.form.get('body')
        new_post = Post(body = body, user_id = current_user.id)
        new_post.save()
        flash('Thanks for the piece of your mind!', 'success')
        return redirect(url_for('social.index'))
    posts = current_user.followed_posts()
    return render_template('index.html.j2', posts=posts)

@social.route('/edit_post/<int:id>', methods=['GET','POST'])
@login_required
def edit_post(id):
    post = Post.query.get(id)
    if post and post.author.id != current_user.id:
        flash('GTFO You Silly Wanna B Hakker', 'danger')
        return redirect(url_for('social.index'))
    if request.method=='POST':
        post.edit(request.form.get('body'))
        post.save()
        flash("Your post has been edited", "success")
        return redirect(url_for('social.index'))
    return render_template('edit_post.html.j2', post=post)

@social.route('/delete_post/<int:id>')
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if post and post.author.id != current_user.id:
        flash('GTFO You Silly Wanna B Hakker', 'danger')
        return redirect(url_for('social.index'))
    post.delete()
    flash('You have removed the evidence; you should not be cancelled', 'primary')
    return redirect(request.referrer or url_for('social.index'))


@social.route('/show_users')
def show_users():
    users=User.query.filter(User.id != current_user.id).all()
    return render_template('show_users.html.j2', users=users)

@social.route('/follow/<int:id>')
@login_required
def follow(id):
    u = User.query.get(id)
    current_user.follow(u)
    flash(f"You are now following {u.first_name} {u.last_name}", "success")
    return redirect(url_for("social.show_users"))

@social.route('/unfollow/<int:id>')
@login_required
def unfollow(id):
    u = User.query.get(id)
    current_user.unfollow(u)
    flash(f"You are no longer following {u.first_name} {u.last_name}", "success")
    return redirect(url_for("social.show_users"))

@social.route('/post/my_posts')
@login_required
def my_posts():
    # posts = Post.query.filter_by(id = current_user.id).all()

    return render_template('my_posts.html.j2', posts=current_user.posts.all())

@social.route('/post/<int:id>')
@login_required
def get_a_post(id):
    post = Post.query.get(id)
    return render_template('single_post.html.j2', post=post, view_all=True)