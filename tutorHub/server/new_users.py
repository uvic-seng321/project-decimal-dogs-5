import mysql.connector


db = mysql.connector.connect(
host='70.67.13.107', 
user='remote_user', 
password='Password1!', 
database='seng321'
)

def send_query(query):
    """Sends a query to the database and returns the result as a list of tuples"""
    db.reconnect()
    cur = db.cursor()
    try:
        cur.execute(query)
        result = cur.fetchall()
        return list(result)
    except:
        return 0

def get_student_id(name):
    query = f"SELECT id FROM Students WHERE name = '{name}';"
    cur = send_query(query)
    return cur[0][0]

def get_tutor_id(name):
    query = f"SELECT tutorid FROM Tutors WHERE name = '{name}';"
    cur = send_query(query)
    return cur[0][0]
