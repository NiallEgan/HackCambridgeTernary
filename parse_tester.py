from healthapp.loader import *
import os

def parseAll():
    for x in os.listdir('data'):
        if os.path.isfile('data/' + x) and 'json' in x and x.split('.')[0].isnumeric():
            print('===== Parsing file ' + x + ' =====')
            f = open('data/' + x)
            compressJson(f.read())
            
