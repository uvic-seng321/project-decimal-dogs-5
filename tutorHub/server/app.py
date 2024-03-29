from flask import Flask, request

app = Flask(__name__) 
app.config.from_object('config.Config')
with app.app_context():
    import db 
    db.init_app(app) 
    db.get_db() 
app.app_context().push() 

import mysql.connector
import json
import sys
import yaml
from availability import get_schedule, add_single_booking
from add_users import add_new_student, add_new_tutor
from new_users import get_student_id, get_tutor_id
from tutor_price import getTutorPrice, setTutorPrice
from get_tutors import getTutors
from add_users import users_api
from log_in import log_in_api 
from utils import send_query
from db import get_db

#  List of tables: Students, Tutors, Subjects, Bookings, SubjectsRelationship 
accessible_tables = ("Students",
                    "Tutors",
                    "Subjects",
                    "Bookings",
                    "SubjectsRelationship")

app = Flask(__name__)

# Register blueprints so we can add routes in other files
app.register_blueprint(users_api) 
app.register_blueprint(log_in_api)

##Configure db
# Load database credentials from db.yaml
# Connect to the database
db = get_db()


def get_columns(table):
    columns = []
    query = f"SHOW COLUMNS FROM {table};"
    result = send_query(query)
    for column in result:
        columns.append(column[0])
    return columns


def return_table(table):
    """Returns all data from a table as a list of dictionaries which is returned as a JSON object"""

    query = f"SELECT * FROM {table};"
    # Execute the query
    result = send_query(query)
    # Get the column names
    column_names = get_columns(table)
    # Convert the result to a list of dictionaries (JSON object)
    for i,row in enumerate(result):   
        row = dict(zip(column_names, row))
        result[i] = row
    # return result
    return result

@app.route('/getTutorPrice/<int:id>')
def get_tutor_price(id):
    """Returns the tutor price"""
    data = getTutorPrice(id)
    return json.dumps(data)

@app.route('/getTutors')
def get_tutors():
    """Returns all the tutors"""
    return getTutors()

@app.route('/setTutorPrice/<int:id>/<float:price>')
def set_tutor_price(id, price):
    """Sets the tutor price"""
    data = setTutorPrice(id, price)
    return json.dumps(data)

@app.route('/getAvailability/<tutor_id>')
def get_availability(tutor_id):
    print("hello")
    return get_schedule(tutor_id)

@app.route('/getStudentID/<name>')
def get_student_id_by_name(name):
    return get_student_id(name)

@app.route('/getTutorID/<name>')
def get_tutor_id_by_name(name):
    return get_tutor_id(name)

@app.route('/addBooking', methods = ['POST'])
def add_booking():
    return add_single_booking(request)

@app.route('/addStudent', methods = ['POST'])
def add_student():
    return add_new_student(request)

@app.route('/addTutor', methods = ['POST'])
def add_tutor():
    return add_new_tutor(request)

def create_app():
    app = Flask(__name__)
    return app

if __name__ == '__main__':
    app.run()