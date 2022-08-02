# Flask Project for CAE95
This is the project we built in class together

## Everyday on a different branch:
This reposity will hold all versions of our flask application.<br>
To see the versions at the end of its respective day:
* Look at the top left corner underneather the `<>Code` heading
* You should see a list of branches
* Choose the branch you want to look at.

## To clone this repository:
**From the CLI**
* Navigate into the folder you where you want to place this application
* `git clone https://github.com/CrtlAltElite/CAE-95-Flask.git`
* `cd CAE-95-Flask`
* now you are inside the project
  * ##### To view a specific branches
    * `git checkout BRANCH_NAME` [replace BRANCH_NAME with the name of the branch you want to be on]
    * You can open this branch in VS Code using `code .`
## To update your version with a newer version on github
* `git pull --all`


## Your ENV file should contian the following environment variables:
* FLASK_APP
* FLASK_ENV
* SECRET_KEY
* SQLALCHEMY_DATABASE_URI
* SQLALCHEMY_TRACK_MODIFICATIONS