from . import bp as social
from flask import render_template

# Routes
@social.route('/', methods=['GET'])
def index():
    return render_template('index.html.j2')

# @social.route('', methods=[])
