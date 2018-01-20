from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return "Main"

@app.route('/record/<id>')
def display_record(id):
    f = open('../data/{}.json'.format(id), 'r')
    return f.read()
