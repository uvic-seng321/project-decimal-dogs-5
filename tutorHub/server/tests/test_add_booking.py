from app import *
from datetime import datetime

def test_add_booking():
    date = datetime.now()

    data_json = {
        "tutorID": 1,
        "studentID": 1,
        "date": date.strftime("%Y-%m-%d %H:%M:%S"),
        "startTime": "10:00",
        "endTime": "11:00"
    }

    app.test_client().post('/addBooking', json=data_json)
    result = app.test_client().get('/getAvailability/1')
    
    assert date.strftime("%d %b %Y") in result.data.decode()
    
