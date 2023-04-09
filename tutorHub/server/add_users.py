'''add students and tutors, can be used for register'''
from flask import Flask, Blueprint, request
import mysql.connector
from db import get_db

db = get_db()

users_api = Blueprint('users_api', __name__)

@users_api.route('/add_student', methods=['POST'])
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

@users_api.route('/add_tutor', methods=['POST'])
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
