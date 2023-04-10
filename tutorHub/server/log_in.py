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
    
@log_in_api.route('/getUser/<id>')
def get_user(id):
    '''log in students'''

    query = f"SELECT * FROM Students WHERE id='{id}';"
    student = send_query(query)

    tutorInfo = get_tutor_info(student[0][1])

    if student == []:
        return "User not found", 401
    elif tutorInfo != None:
        return {"id": student[0][0], "email": student[0][1], "username": student[0][2], "tutorInfo": tutorInfo}, 200
    else:
        return {"id": student[0][0], "email": student[0][1], "username": student[0][2]}, 200
    
@log_in_api.route('/getTutor/<id>')
def get_tutor(id):
    '''return tutor info'''
    query = f"SELECT * FROM Tutors WHERE tutorId='{id}';"
    tutor = send_query(query)

    if tutor == 0:
        return "Tutor not found", 401
    
    user_query = f'SELECT id FROM Students WHERE email={tutor[0][2]}'
    user_id = send_query(user_query)

    if user_id == []:
        return "User not found", 401
    else:
        
        return {"name": tutor[0][1], "email": tutor[0][2], "price": tutor[0][3], "userId": user_id[0], "tutorId": tutor[0][0]}, 200

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
    
def get_tutor_info(email):
    '''get tutor info associated with email'''

    query = f"SELECT * FROM Tutors WHERE email='{email}';"
    tutor = send_query(query)
    if tutor == []:
        return None
    return tutor