from app import * 
from get_subjects import *

def test_show_subjects(): 
    email = "fred@murphy.ca"
    response = show_subjects(email) 
    print(response)
    assert response == "SENG"

def test_show_subjects2(): 
    email = "jeff@smith.ca"
    response = show_subjects(email) 
    print(response) 
    assert response == "CIVE"