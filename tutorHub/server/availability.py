from flask import Flask, Blueprint, request
import mysql.connector
import json
from datetime import datetime
from db import get_db

db = get_db()
def get_schedule(id):
    db.reconnect()
    cur = db.cursor()
    schedule = get_weekly(cur, id)
    bookings = get_bookings(cur, id)
    # filteredBookings = filter_bookings(bookings)
    return {"schedule": schedule, "bookings": bookings}

def add_single_booking(request):
    tutorId = request.json['tutorID']
    studentId = request.json['studentID']
    startTime = request.json['startTime']
    endTime = request.json['endTime']

    db.reconnect()
    cur = db.cursor()
    query = f"INSERT INTO Bookings (tutorid, studentid, starttime, endtime) VALUES ({tutorId}, {studentId}, '{startTime}', '{endTime}');"
    cur.execute(query)
    db.commit()
    return {"status_code": 200}

## utillity functions

def get_bookings(cursor, tutorID):
    query = f"SELECT * FROM Bookings WHERE tutorID = {tutorID};"
    cursor.execute(query)
    result = cursor.fetchall()
    bookings = []
    for booking in result:
        bookings.append({
            "bookingID": booking[0],
            "tutorID": booking[1],
            "studentID": booking[2],
            "startTime": booking[3],
            "endTime": booking[4]
        })
    return bookings

def get_weekly(cursor, tutorID):
    query = f"SELECT * FROM Tutors WHERE tutorID = {tutorID};"
    cursor.execute(query)
    result = cursor.fetchall()[0]
    return {
        "Monday": result[4],
        "Tuesday": result[5],
        "Wednesday": result[6],
        "Thursday": result[7],
        "Friday": result[8],
        "Saturday": result[9],
        "Sunday": result[10]
    }


def filter_bookings(bookings):
    filtered = []
    for booking in bookings:
        if same_week(booking[3]):
            filtered.append(booking)
    return filtered

def same_week(date):
    cur = datetime.datetime.today()
    return date.isocalendar()[1] == cur.isocalendar()[1] and date.year == cur.year    
    
    