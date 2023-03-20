from flask import Flask, request
import mysql.connector
import json
import sys
import yaml
from availability import get_schedule, add_single_booking
from tutor_price import getTutorPrice, setTutorPrice

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
db = yaml.load(open('db.yaml'), Loader=yaml.FullLoader)
db = mysql.connector.connect(
    host=db['mysql_host'], 
    user=db['mysql_user'], 
    password=db['mysql_password'], 
    database=db['mysql_db']
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
    
@app.route('/getTutorPrice/<int:id>')
def get_tutor_price(id):
    """Returns the tutor price"""
    data = getTutorPrice(id)
    return json.dumps(data)

@app.route('/setTutorPrice/<int:id>/<float:price>')
def set_tutor_price(id, price):
    """Sets the tutor price"""
    data = setTutorPrice(id, price)
    return json.dumps(data)


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
