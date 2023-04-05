from app import send_query

# log in student
def log_in_student(email, password):
    query = f"SELECT * FROM Students WHERE email = '{email}' AND password = '{password};" 
    student = send_query(query)
    if student == 0:
        # this is error case
        return "Incorrect email or password", 401
    else:
        return student
        # login stuff here i can't redo this quickly sorry 


def register_student(email, name, password):
    query = f"SELECT * FROM Students WHERE email = '{email}';" 
    student = send_query(query)
    if student != 0:
        query = f"INSERT INTO Students (email, name, password) VALUES ('{email}', '{name}', '{password}');"
        send_query(query)
    else:
        return "Email already in use", 409