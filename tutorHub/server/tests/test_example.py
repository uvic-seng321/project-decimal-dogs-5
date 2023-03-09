import pytest
from app import *

def test_test_route():
    response = app.test_client().get('/')

    assert response.data.decode() == 'Hello, World!'