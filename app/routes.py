from flask import render_template, request
import requests
from app import app
from .forms import LoginForm, RegisterForm

# Routes
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html.j2')

@app.route('/api_test', methods=['GET'])
def api_test():
    return {"Dylan S":"Smelly", "Dylan K":"Smart", "Sarah":"Worlds Best Mom", "Gio":"handfull"}

@app.route('/students', methods=['GET'])
def students():
    my_students = ['Alex', 'Jody', 'Francisco', 'Jacoby', 'Andre']
    
                                                #var_name in Jinja = var name in python
    return render_template('students.html.j2', students=my_students)

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    return render_template('register.html.j2', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        email = form.email.data.lower()
        password = form.password.data
        if email in app.config.get("REGISTERED_USERS") and \
            password == app.config.get("REGISTERED_USERS").get(email).get('password'):
            #Login Success!!!!!
            return f"Login Success Welcome {app.config.get('REGISTERED_USERS').get(email).get('name')}"
        error_string = "Incorrect Email/password Combo"
        return render_template('login.html.j2', error=error_string, form=form)

    return render_template('login.html.j2', form=form)

@app.route('/ergast', methods=['GET', 'POST'])
def ergast():
    if request.method =='POST':
        year = request.form.get('year')
        round = request.form.get('round')

        url = f'http://ergast.com/api/f1/{year}/{round}/driverStandings.json'
        response = requests.get(url)
        if not response.ok:
            error_string = "We had an Unexpected Error"
            return render_template('ergast.html.j2', error=error_string)
        if not response.json()["MRData"]["StandingsTable"]["StandingsLists"]:
            error_string = "You have a Bad Year / Round Combo. Please Try again"
            return render_template('ergast.html.j2', error=error_string)    
        data = response.json()["MRData"]["StandingsTable"]["StandingsLists"][0]['DriverStandings']
        new_data = []
        for racer in data:
            racer_dict={
                "last_name":racer['Driver']['familyName'],
                "first_name":racer['Driver']['givenName'],
                "position":racer['position'],
                "wins":racer['wins'],
                "DOB":racer['Driver']['dateOfBirth'],
                "nationality":racer['Driver']['nationality'],
                "constructor":racer['Constructors'][0]['name']
            }
            new_data.append(racer_dict)
        return render_template('ergast.html.j2', racers=new_data)

    return render_template('ergast.html.j2')