import json
from app import send_query

def get_student_id(name):
    query = f"SELECT id FROM Students WHERE name = '{name}';"
    cur = send_query(query)
    return cur[0][0]



    