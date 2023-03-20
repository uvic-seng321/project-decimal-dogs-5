from app import * 
#Tutor's 1 price is 30.0, then 10 is added and is set as Tutor 2's price
#This integration test checks both getTutorPrice and setTutorPrice functionality
def test_integration_tutor_price():
    response = app.test_client().get('/getTutorPrice/1')
    response = eval(response.data.decode()) + 10
    app.test_client().get('/setTutorPrice/2/' + str(response))
    assert str(getTutorPrice(2)) == "40.0"