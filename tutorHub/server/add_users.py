'''add students and tutors, can be used for register'''
import mysql.connector

db = mysql.connector.connect(
host='70.67.13.107',
user='remote_user',
password='Password1!',
database='seng321'
)

def add_new_student(request):
    '''add student user type into db'''
    email = request.json['email']
    name = request.json['name']
    password = request.json['password']

    db.reconnect()
    cur = db.cursor()
    query = f"INSERT INTO Students (email, name, password) VALUES ('{email}', '{name}', '{password}');"
    cur.execute(query)
    db.commit()
    return {"status_code": 200}

def add_new_tutor(request):
    '''add new tutor'''
    name = request.json['name']
    email = request.json['email']
    price = request.json['price']
    monday = request.json['Monday']
    tuesday = request.json['Tuesday']
    wednesday = request.json['Wednesday']
    thursday = request.json['Thursday']
    friday = request.json['Friday']
    saturday = request.json['Saturday']
    sunday = request.json['Sunday']

    db.reconnect()
    cur = db.cursor()
    query = f"INSERT INTO Tutors (name, email, price, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('{name}', '{email}', {price}, '{monday}', '{tuesday}', '{wednesday}', '{thursday}', '{friday}', '{saturday}', '{sunday}');"
    cur.execute(query)
    db.commit()
    return {"status_code": 200}
