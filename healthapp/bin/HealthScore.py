import os
import json

def mean(values):
    sum = 0
    i = 0
    for val in values:
    	sum = sum + val
    	i = i + 1
    return sum/i

if __name__ == '__main__':
    features = {}
    health_score = {}
    public_score = {}
    summary = {}

    for filename in os.listdir():
        try:
            if filename == 'mean_and_sd.json':
                data = json.loads(open(filename, 'r').read())
                #print(data)

                for key in data:
                    public_score[key] = [data[key]['mean'],data[key]['sd']]

        except Exception:
            pass

    print(public_score)


def findhealthscore(data1):
    try:
        for observation in data1['observs']:
            records = data1['observs'][observation]['values']
            features[observation] = features.get(observation, []) + [float(record['value']) for record in records]
    except Exception:
        pass

    total = 0.0
    score = 0.0
    counter = 0
    for key in features:
        values = features[key]
        for i in values:
            score = score + i
            counter  = counter + 1

        val = score/counter - public_score[key][0]
        if val < 0:
            val = -val

        total = total + val/public_score[key][1]
    total = total/counter
    return total
