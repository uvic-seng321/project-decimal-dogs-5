from app import *
import mysql.connector
import json
import sys
import yaml

def getTutorPrice(tutor_id):
    db = mysql.connector.connect(
    host='70.67.13.107', 
    user='remote_user', 
    password='Password1!', 
    database='seng321'
    )

    db.reconnect()
    cur = db.cursor()
    query = f"SELECT * FROM Tutors WHERE tutorId = {tutor_id}"
    cur.execute(query)
    price = list(cur.fetchall())
    return price[0][3]

def setTutorPrice(tutor_id, price):
    db = mysql.connector.connect(
    host='70.67.13.107', 
    user='remote_user', 
    password='Password1!', 
    database='seng321'
    )

    db.reconnect()
    cur = db.cursor()
    query = f"UPDATE Tutors SET price = {price} WHERE tutorId = {tutor_id}"
    cur.execute(query)
    db.commit()
    return {"Status_code": 200}