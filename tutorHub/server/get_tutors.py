from flask import Flask, Blueprint, request
import mysql.connector
from db import get_db
from utils import send_query
from get_subjects import show_subjects
db = get_db()


def getTutors():
    rows = []
    query = f"SELECT * FROM Tutors"
    cursor = db.cursor()
    cursor.execute(query)
    res = cursor.fetchall()
    for tutor in res:
        subjects = show_subjects(tutor[2])
        tutor = {
            "tutorID": tutor[0],
            "name": tutor[1],
            "email": tutor[2],
            "price": tutor[3],
            "subjects": subjects
        }
        rows.append(tutor)
    return rows