# Assignment 4
All elements of assignment 4 are linked below in the [decimal-dogs-5](https://github.com/uvic-seng321/project-decimal-dogs-5) GitHub repo :)

## Must Have User Stories
Here is a link to our must have user stories: [Must Have's](https://github.com/uvic-seng321/project-decimal-dogs-5/labels/Must%20have)

Here is a list of our must have user stories and a link to the acceptance criteria for each: \
[As a user, I want to be able to book a specific tutor](https://github.com/uvic-seng321/project-decimal-dogs-5/issues/10) \
[As a tutor, I want to be able to advertise my services at a specific price](https://github.com/uvic-seng321/project-decimal-dogs-5/issues/8) \
[As a tutor, I want to be able to show my tutoring availability](https://github.com/uvic-seng321/project-decimal-dogs-5/issues/6) \
[As a tutor, I want to be able to easily show which subjects I can tutor](https://github.com/uvic-seng321/project-decimal-dogs-5/issues/5)

## Individual Acceptance Criteria
### As a user, I want to be able to book a specific tutor
Tutor availability should be updated when a tutor is booked: \
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
Users should be able to select a specific tutor: \
When a tutor has been selected, the user should be able to pick an existing time from the tutor's availability: \
When a tutor is booked, an email should be displayed: \

### As a tutor, I want to be able to advertise my services at a specific price
Price is in the correct currency (CAD): Not tested as this is a frontend feature \
Tutor must be able to update the price when they please \
![image](https://user-images.githubusercontent.com/91294558/226222922-f4ca6e0a-e960-4493-8854-f2305acb6103.png) \
If I lower the price it should show what the previous price was to make my ad more enticing: Not tested as this is a frontend feature \

### As a tutor, I want to be able to show my tutoring availability


### As a tutor, I want to be able to easily show which subjects I can tutor
## Tracability Matrix
