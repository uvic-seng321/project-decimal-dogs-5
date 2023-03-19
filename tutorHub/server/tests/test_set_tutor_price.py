from app import *
def test_get_tutor_price():
    response = app.test_client().get('/setTutorPrice/30.0')
    assert str(response.data.decode()) == "40.0"