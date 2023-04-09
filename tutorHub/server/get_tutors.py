from flask import Flask, Blueprint, request
import mysql.connector
from db import get_db
from utils import send_query
db = get_db()


def getTutors():
    rows = []
    query = f"SELECT * FROM Tutors"
    cursor = db.cursor()
    cursor.execute(query)
    res = cursor.fetchall()
    for tutor in res:
        tutor = {
            "tutorID": tutor[0],
            "name": tutor[1],
            "email": tutor[2],
            "price": tutor[3]
        }
        rows.append(tutor)
    return rows