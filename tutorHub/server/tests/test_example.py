from app import *

def test_test_route():
    response = app.test_client().get('/')

    assert response.data.decode() == 'Hello, World!'

    # user story 8: tutor can advertise a precific price

    #test idea: set a tutors price and the result of get price

    #test idea: get current price, set to a new price, and the new price in the database != the old price