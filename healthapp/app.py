from flask import Flask
from healthapp.loader import *
from healthapp.bin.explanation_getter import insert_descriptions
import json

app = Flask(__name__)


def add_descriptions(compressed_json):
    return json.dumps({'data': json.loads(compressed_json),
                       'explanations': json.loads(insert_descriptions(compressed_json))})

@app.route('/')
def index():
    return "Main"

@app.route('/record/<id>')
def display_record(id):
    f = open('../data/{}.json'.format(id), 'r')
    return insert_descriptions(compressJson(f.read()))
    return add_descriptions(compressJson(f.read()))
