import os
import json
import numpy as np

if __name__ == '__main__':
    features = {}
    for filename in os.listdir():
        try:
            print(filename)
            data = json.loads(open(filename, 'r').read())
            for observation in data['observs']:
                records = data['observs'][observation]['values']
                features[observation] = features.get(observation, []) + [float(record['value']) for record in records] 
                
        except Exception:
            pass

    print(features)

    mean_sd = {}
    for ob, values in features.items():
        mean_sd[ob] = {'mean': np.mean(values), 'sd': np.std(values)}

    output = open('mean_and_sd.json', 'w')
    output.write(json.dumps(mean_sd))
