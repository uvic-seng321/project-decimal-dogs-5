'''log in and sign up students'''
from flask import Flask, Blueprint, request
from utils import send_query

log_in_api = Blueprint('log_in_api', __name__)

@log_in_api.route('/login', methods=['POST'])
def log_in_student():
    '''log in students'''

    email = request.json['email']
    password = request.json['password']

    query = f"SELECT * FROM Students WHERE email='{email}' AND password='{password}';"
    student = send_query(query)

    if student == []:
        return "Incorrect email or password", 401
    else:
        return {"id": student[0][0], "email": student[0][1], "name": student[0][2]}, 200

@log_in_api.route('/register', methods=['POST'])
def register_student():
    '''resister students'''

    email = request.json['email']
    name = request.json['name']
    password = request.json['password']

    query = f"SELECT * FROM Students WHERE email = '{email}';"
    student = send_query(query)

    if student == []:
        query = f"INSERT INTO Students (email, name, password) VALUES ('{email}', '{name}', '{password}');"
        send_query(query)
        id = send_query(f"SELECT id FROM Students WHERE email = '{email}' AND password = '{password}' AND name = '{name}';")
        return {"email": email, "username": name, "id": id}, 200
    else:
        return "Email already in use", 409
