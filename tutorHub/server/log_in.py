from app import send_query
import json

# log in student
def log_in_student(email, password):
    query = f"SELECT * FROM Students WHERE email = '{email}' AND password = '{password};" 
    student = send_query(query)
    if student == 0:
        # this is error case
        raise ValueError("Email or password are incorrect, please try again")
    else:
        # login stuff here i can't redo this quickly sorry 