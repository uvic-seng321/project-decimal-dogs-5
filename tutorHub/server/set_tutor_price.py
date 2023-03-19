from app import *
import mysql.connector
import json
import sys
import yaml

def setTutorPrice(tutor_id, price):
    db = mysql.connector.connect(
    host='70.67.13.107', 
    user='remote_user', 
    password='Password1!', 
    database='seng321'
    )

    db.reconnect()
    cur = db.cursor()
    query = "UPDATE Tutors SET price = %s WHERE tutorId = %s"
    val = (price, tutor_id)
    cur.execute(query, val)
    db.commit()
    return {"Status_code": 200}