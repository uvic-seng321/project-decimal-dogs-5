import json
from app import *
from new_users import *

def check_student_exists():
    stu_id = get_student_id("roman reigns")
    assert stu_id == 1