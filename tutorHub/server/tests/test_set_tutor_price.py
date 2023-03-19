from app import *
def test_set_tutor_price():
    response = app.test_client().get('/setTutorPrice/2/35.0')
    assert str(getTutorPrice(2)) == "35.0"