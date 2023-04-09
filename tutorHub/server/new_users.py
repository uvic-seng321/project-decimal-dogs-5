from flask import Flask, Blueprint, request
import mysql.connector
from db import get_db
from utils import send_query
db = get_db()

def get_student_id(name):
    query = f"SELECT id FROM Students WHERE name = '{name}';"
    cur = send_query(query)
    return cur[0][0]

def get_tutor_id(name):
    query = f"SELECT tutorid FROM Tutors WHERE name = '{name}';"
    cur = send_query(query)
    return cur[0][0]
