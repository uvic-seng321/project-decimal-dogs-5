from flask import Flask, Blueprint, request
import mysql.connector
from db import get_db
from get_subjects import show_subjects
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
            "price": tutor[3],
            "subjects": show_subjects(tutor[2])
        }
        rows.append(tutor)
    return rows