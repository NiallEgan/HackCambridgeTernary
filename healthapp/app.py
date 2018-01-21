from flask import Flask
from flask import abort
from healthapp.loader import *
from healthapp.bin.explanation_getter import insert_descriptions
import os

import json

app = Flask(__name__)


def add_descriptions(compressed_json):
    if compressed_json == '':
        return ''
    comp = json.loads(compressed_json)
    expl = insert_descriptions(compressed_json)
    return json.dumps({'main_data': comp, 'explanations': expl}) 

@app.route('/')
def index():
    return "Main"

@app.route('/record/<id>')
def display_record(id):
    if not os.path.exists('../data/{}.json'.format(id)):
        abort(404)
    f = open('../data/{}.json'.format(id), 'r')
    red = compressJson(f.read())
    return add_descriptions(red)

