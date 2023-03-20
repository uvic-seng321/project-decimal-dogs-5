from app import *
from new_users import *

def test_student_exists():
    stu_id = get_student_id("roman reigns")

    assert stu_id == 1

def test_tutor_exists():
    tut_id = get_tutor_id("Fred Murphy")
 
    assert tut_id == 1

def test_add_student():
    data_json = {
        "email": "test@test.com",
        "name": "johnson smith",
        "password": "password345"
    }

    app.test_client().post('/addStudent', json=data_json)

    stu_id = get_student_id("johnson smith")

    assert stu_id

def test_add_tutor():
    data_json = {
        "name": "johnson smith",
        "email": "test@test.com",
        "price": 40.0,
        "Monday": "10:00-14:00",
        "Tuesday": "10:00-14:00",
        "Wednesday": "10:00-14:00",
        "Thursday": "10:00-14:00",
        "Friday": "10:00-14:00",
        "Saturday": "10:00-14:00",
        "Sunday": "10:00-14:00"
    }

    app.test_client().post('/addTutor', json=data_json)

    tut_id = get_tutor_id("johnson smith")

    assert tut_id