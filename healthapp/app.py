from flask import Flask
from healthapp.loader import *
from healthapp.bin.explanation_getter import insert_descriptions


app = Flask(__name__)

@app.route('/')
def index():
    return "Main"

@app.route('/record/<id>')
def display_record(id):
    f = open('../data/{}.json'.format(id), 'r')
    return insert_descriptions(compressJson(f.read()))

