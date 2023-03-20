import json
from app import *
from new_users import *

def test_student_exists():
    stu_id = get_student_id("roman reigns")
    
    assert stu_id == 1

def test_tutor_exists():
    stu_id = get_tutor_id("Fred Murphy")
    
    assert stu_id == 1