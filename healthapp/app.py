from flask import Flask
from healthapp.loader import *
from healthapp.bin.explanation_getter import insert_descriptions
<<<<<<< HEAD

=======
import json
>>>>>>> 8ab1987aaaa2606927253b334309345894046488

app = Flask(__name__)


def add_descriptions(compressed_json):
    return json.dumps({'main_data': json.loads(compressed_json), 
                       'explanations': json.loads(insert_descriptions(compressed_json))}) 

@app.route('/')
def index():
    return "Main"

@app.route('/record/<id>')
def display_record(id):
    f = open('../data/{}.json'.format(id), 'r')
<<<<<<< HEAD
    return insert_descriptions(compressJson(f.read()))
=======
    return add_descriptions(compressJson(f.read()))
>>>>>>> 8ab1987aaaa2606927253b334309345894046488

