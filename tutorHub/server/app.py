from flask import Flask, request
import mysql.connector
import json
import sys
import yaml
from availability import get_schedule, add_single_booking

#  List of tables: Students, Tutors, Subjects, Bookings, SubjectsRelationship 
accessible_tables = ("Students",
                    "Tutors",
                    "Subjects",
                    "Bookings",
                    "SubjectsRelationship")

app = Flask(__name__)

##Configure db
# Load database credentials from db.yaml
# Connect to the database
db = mysql.connector.connect(
    host='70.67.13.107', 
    user='remote_user', 
    password='Password1!', 
    database='seng321'
    )

def send_query(query):
    """Sends a query to the database and returns the result as a list of tuples"""
    db.reconnect()
    cur = db.cursor()
    try:
        cur.execute(query)
        result = cur.fetchall()
        return list(result)
    except:
        return 0
    
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
    

@app.route('/')
def hello_world():
    return "Hello, World!"

@app.route('/getAvailability/<tutor_id>')
def get_availability(tutor_id):
    return get_schedule(tutor_id)

@app.route('/addBooking', methods = ['POST'])
def add_booking():
    return add_single_booking(request)

def create_app():
    app = Flask(__name__)
    return app

if __name__ == '__main__':
    app.run()