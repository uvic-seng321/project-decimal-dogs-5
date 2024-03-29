[![Python application](https://github.com/uvic-seng321/project-decimal-dogs-5/actions/workflows/python-app.yml/badge.svg)](https://github.com/uvic-seng321/project-decimal-dogs-5/actions/workflows/python-app.yml)

# Assignment 4
All elements of assignment 4 are linked below in the [decimal-dogs-5](https://github.com/uvic-seng321/project-decimal-dogs-5) GitHub repo :)

## Must Have User Stories
Here is a link to our must have user stories: [Must Have's](https://github.com/uvic-seng321/project-decimal-dogs-5/labels/Must%20have)

Here is a list of our must have user stories and a link to the acceptance criteria for each: \
[As a user, I want to be able to book a specific tutor](https://github.com/uvic-seng321/project-decimal-dogs-5/issues/10) \
[As a tutor, I want to be able to advertise my services at a specific price](https://github.com/uvic-seng321/project-decimal-dogs-5/issues/8) \
[As a tutor, I want to be able to show my tutoring availability](https://github.com/uvic-seng321/project-decimal-dogs-5/issues/6) \
[As a tutor, I want to be able to easily show which subjects I can tutor](https://github.com/uvic-seng321/project-decimal-dogs-5/issues/5) \
[As a user, I want to be able to create an account](https://github.com/uvic-seng321/project-decimal-dogs-5/issues/26)

## Data Model Sketch:
![image](https://user-images.githubusercontent.com/91294558/226250438-bd580ca7-6ea1-4c95-bcc9-8a2380c5425e.png)
## Backend Design Sketch:
![image](https://user-images.githubusercontent.com/91294558/226227576-5d8c6639-fe82-41fd-b2af-15b3756e761b.png)

## Individual Acceptance Criteria
### As a user, I want to be able to book a specific tutor.
Tutor availability should be updated when a tutor is booked:
```python
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
```
Users should be able to select a specific tutor: Not tested as this is a frontend feature \
When a tutor has been selected, the user should be able to pick an existing time from the tutor's availability:
```python
from app import *
import json

def test_get_availability():
    response = app.test_client().get('/getAvailability/1')
    keys = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    schedule = json.loads(response.data.decode())['schedule']
    for key in keys:
        assert key in schedule
        
    assert "bookings" in json.loads(response.data.decode())
```
When a tutor is booked, an email should be displayed: Not tested as this is a frontend feature

### As a tutor, I want to be able to advertise my services at a specific price.
Price is in the correct currency (CAD): Not the currency part, but getting the price test is below
```python
from app import *
def test_get_tutor_price():
    response = app.test_client().get('/getTutorPrice/1')
    assert str(response.data.decode()) == "30.0"
```
Tutor must be able to update the price when they please
```python
from app import *
def test_set_tutor_price():
    app.test_client().get('/setTutorPrice/2/35.0')
    assert str(getTutorPrice(2)) == "35.0"
```
If I lower the price it should show what the previous price was to make my ad more enticing: Not tested as this is a frontend feature

### As a tutor, I want to be able to show my tutoring availability.
Must correctly show tutor availability:
```python
from app import *
import json

def test_get_availability():
    response = app.test_client().get('/getAvailability/1')
    keys = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    schedule = json.loads(response.data.decode())['schedule']
    for key in keys:
        assert key in schedule
        
    assert "bookings" in json.loads(response.data.decode())
```
Must be able to update tutor availability: 
```python
from app import *
import json

def test_get_availability():
    response = app.test_client().get('/getAvailability/1')
    keys = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    schedule = json.loads(response.data.decode())['schedule']
    for key in keys:
        assert key in schedule
        
    assert "bookings" in json.loads(response.data.decode())
```
Must display in calendar view: This will be a frontend feature

### As a tutor, I want to be able to easily show which subjects I can tutor.
Must be able to create a list of subjects: Not yet\
Must be able to update the subjects I offer:
```python
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
```

### As a user, I want to be able to create an account.
Created account must show up in database:
```python
import json
from app import *
from new_users import *

def test_student_exists():
    stu_id = get_student_id("roman reigns")
    
    assert stu_id == 1
```

### Integration Tests:
### Integrating getting tutor price and setting tutor price functions.
This functionality should be tested to ensure getting and setting a tutor's price is functional together.
Code: 
```python
from app import * 
#Tutor's 1 price is 30.0, then 10 is added and is set as Tutor 2's price
#This integration test checks both getTutorPrice and setTutorPrice functionality
def test_integration_tutor_price():
    response = app.test_client().get('/getTutorPrice/1')
    response = eval(response.data.decode()) + 10
    app.test_client().get('/setTutorPrice/2/' + str(response))
    assert str(getTutorPrice(2)) == "40.0"
```

### Integrating add_booking functionality with tutor availability.
This functionality should be tested to ensure availabilities and bookings work together, as they are related.
Code:
```python
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
```    

## Tracability Matrix
| User Stories | test_get_tutor_price.py | test_set_tutor_price.py | test_add_booking.py | test_get_availability.py | test_get_subjects.py | test_show_subject.py | test_student_exists.py |
|--------------|-----------------------|------------------------|---------------------|--------------------------|-----------------------|----------------------|-------------------------|
| As a user, I want to be able to create an account. |  |  |  |  |  |  | ✔️ |
| As a student, I want to be sure my tutor is qualified. |  |  |  |  |  |  |  |
| As a student, I want to see what free assistance services are available. |  |  |  |  |  |  |  |
| As a user, I want to be able to book a specific tutor. |  |  | ✔️ | ✔️ |  |  |  |
| As a student, I want to find a tutor who can help me twice a week. |  |  |  |  |  |  |  |
| As a tutor, I want to be able to advertise my services at a specific price. | ✔️ | ✔️ |  |  |  |  |  |
| As a student, I want to find an in-person tutor. |  |  |  |  |  |  |  |
| As a tutor, I want to be able to show my tutoring availability. |  |  |  | ✔️ |  |  |  |
| As a tutor, I want to be able to easily show which subjects I can tutor. |  |  |  |  | ✔️ | ✔️ |  |
| As a student, I want to be able to filter tutors based on the subjects they can tutor. |  |  |  |  |  |  |  |
| As a student, I want to find a tutor for under a specified rate. |  |  |  |  |  |  |  |

## Discussion
Acceptance criteria outlines the expected behavior and functionality of a system being developed. While finding our user stories earlier in the course, we took the must-have user stories and broke them down into multiple smaller requirements that would make test-driven development more feasible. That way we could start by creating test cases for each acceptance criterion.

Test-driven development helped us develop the backend of our program in many ways. Because we used test-driven development, we were never concerned about how closely the program would follow the goals of the project as our test cases came directly from our criteria. We also found that once we had written code that passed the tests, there was not much debugging after, as there were no doubts that the code was following the test criteria. The one downside we found with test-driven development was that we were exploring the structure of the initial tests. Sometimes, when the test was structured incorrectly, we would often look at potential issues in the code before looking at issues with the test.

GitHub actions was used to run our tests with each push and pull from our main branch to ensure no failing code can be pushed to main. This allows us to use some continuous integration principals, while ultimately still requiring a secondary approval before merging any PR, it sped up the process greatly since no one was worried about if the code was actually functional or not. Since we were following TDD practices, we can be sure our code will always have at least unit tests to ensure code is functioning.

As a team we felt it was very important to go over our test criteria at several points to ensure that our best options were still feasible. Overall, our test criteria changed very little throughout the development, with the exception of the added acceptance criteria that we must be able to create a user. All of our previous user stories worked under the assumption that the user already existed, so we had to create a new must-have story that allows user creation.

We added a few other smaller points to our test criteria to make it feasible for this section of the assignment, as well as some obviously essential criteria we forgot before. We found that the criteria we initially created was very front end oriented, and it was difficult for us to create tests for the backend and ensure that the criteria was addressed. After making subtle additions to our preexisting criteria we felt that we were better set up for the next assignment, where we will be implementing the frontend.

Overall, we felt by slightly restructuring our acceptance criteria we were able to better grasp what was needed for the backend portion of the project. With this, we will also have good structure for the frontend portion in the future.
