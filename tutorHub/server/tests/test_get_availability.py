from app import *
import json

def test_get_availability():
    response = app.test_client().get('/getAvailability/1')
    keys = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    schedule = json.loads(response.data.decode())['schedule']
    for key in keys:
        assert key in schedule
        
    assert "bookings" in json.loads(response.data.decode())

    