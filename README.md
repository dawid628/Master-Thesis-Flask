Prepare the Flask application:
a) Delete the venv folder
b) Run the command pip install virtualenv
c) Run the command python -m venv venv
d) Run the command source venv/bin/activate
e) Install the required libraries using the commands:
pip install Flask
pip install flask_sqlalchemy
pip install flask_login
pip install pandas
pip install Werkzeug
pip install requests
pip install configparser
pip install flask_wtf
pip install wtforms

f) Assign the absolute path to the data file in the project for the parameter SQLALCHEMY_DATABASE_URI in the config.cfg file, maintaining the sqlite schema and adding the database file name to be created, for example:
SQLALCHEMY_DATABASE_URI='sqlite:///Users\\dawidmetelski\\Desktop\\medical-data-store-management-flask\\data\\database.db'

Integrate the applications (if fabric run):
a) Navigate to the fabric\fabric-samples\asset-transfer-basic\rest-api-typescript folder and copy the value of the ORG1_APIKEY parameter from the .env file
b) Paste the copied value into the config.cfg file in the Flask application folder for the API_KEY parameter
c) Launch the application using the commands:
source venv/bin/activate
flask run
Initialize the database and the first user (administrator with login credentials admin:admin):
a) Open the browser at the Flask application address and use the /init endpoint
