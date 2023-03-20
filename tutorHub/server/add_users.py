from flask import Flask
import mysql.connector
import json

db = mysql.connector.connect(
host='70.67.13.107', 
user='remote_user', 
password='Password1!', 
database='seng321'
)

def add_new_student(request):
    id = request.json['id']
    email = request.json['email']
    name = request.json['name']
    password = request.json['password']

    db.reconnect()
    cur = db.cursor()
    query = f"INSERT INTO Students (id, email, name, password) VALUES ({id}, '{email}', '{name}', '{password}');"
    cur.execute(query)
    db.commit()
    return {"status_code": 200}

def add_new_tutor(request):
    id = request.json['id']
    name = request.json['email']
    email = request.json['name']
    price = request.json['password']
    monday = request.json['monday']
    tuesday = request.json['tuesday']
    wednesday = request.json['wednesday']
    thursday = request.json['thursday']
    friday = request.json['friday']
    saturday = request.json['saturday']
    sunday = request.json['sunday']

    db.reconnect()
    cur = db.cursor()
    query = f"INSERT INTO Tutors (tutorid, name, email, price, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ({id}, '{name}', '{email}', {price}, '{monday}', '{tuesday}', '{wednesday}', '{thursday}', '{friday}', '{saturday}', '{sunday}');"
    cur.execute(query)
    db.commit()
    return {"status_code": 200}