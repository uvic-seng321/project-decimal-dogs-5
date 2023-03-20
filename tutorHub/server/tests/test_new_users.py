from app import *
from new_users import *
from add_users import *

def test_student_exists():
    stu_id = get_student_id("roman reigns")
    
    assert stu_id == 1

def test_tutor_exists():
    tut_id = get_tutor_id("Fred Murphy")
    
    assert tut_id == 1

def test_add_student():
    data_json = {
        "id": 3,
        "email": "test@test.com",
        "name": "johnson smith",
        "password": "password345"
    }

    app.test_client().post('/addStudent', json=data_json)
    # result = app.test_client().get('/getAvailability/1')

    stu_id = get_student_id("johnson smith")
    
    assert stu_id == 3