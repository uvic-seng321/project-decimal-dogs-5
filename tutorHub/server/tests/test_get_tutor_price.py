from app import *
def test_get_tutor_price():
    response = app.test_client().get('/getTutorPrice/1')
    price = str(response.data.decode())
    price = price.replace('[','').replace(']','').replace(' ', '').replace('"', '').split(',')
    priceString = price[3]
    print("PRICE: " + priceString)
    assert priceString == "40.0"