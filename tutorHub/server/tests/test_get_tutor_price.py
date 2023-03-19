from app import *
def test_get_tutor_price():
    response = app.test_client().get('/getTutorPrice/1')
    assert str(response.data.decode()) == "30.0"