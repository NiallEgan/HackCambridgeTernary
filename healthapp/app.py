from flask import Flask, redirect, url_for
from flask import abort
from healthapp.loader import *
from healthapp.bin.explanation_getter import insert_descriptions
import os

import json

app = Flask(__name__)

# Indexes names (given and family) against their file numbers.
@app.before_first_request
def buildFileIndex():
    if not os.path.exists('../data/index.json'):
        names = assembleNames('../data')
        print(names)
        json.dump(names,open('../data/index.json','w'))

# Simple search
def findFileNumber(person_name):
    obj = json.loads(open('../data/index.json').read())
    for name1 in obj.keys():
        name = name1.lower()
        found = True
        for nom in person_name.split(' '):
            if nom.lower() not in name:
                found = False
                break
        if found:
            return obj[name1]
    return -1

def add_descriptions(compressed_json):
    if compressed_json == '':
        return ''
    comp = json.loads(compressed_json)
    expl = insert_descriptions(compressed_json)
    return json.dumps({'main_data': comp, 'explanations': expl}) 

@app.route('/ayylmao')
def ayylmao():
    return "<img src=http://cdn.cnn.com/cnnnext/dam/assets/180109130845-01-donald-trump-immigration-policy-0109-exlarge-169.jpg />"

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
    
    
    
@app.route('/search/<name>')
def search(name):
    name2 = name.replace('_',' ')
    x = findFileNumber(name2)
    if x != -1:
        return redirect(url_for('display_record',id = x))
    else:
        return "<h1>Error: person not found</h1>"
    
    
    
