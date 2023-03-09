from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Hello, World!"

def create_app():
    app = Flask(__name__)
    return app

if __name__ == '__main__':
    app.run()