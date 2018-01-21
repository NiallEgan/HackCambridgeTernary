import json
import os
import string

def assembleNames(inputDir):
    names = {}
    if not os.path.isdir(inputDir):
        raise ValueError("Input directory does not exist")
    for x in os.listdir(inputDir):
        xn = x.split('.')[0]
        if os.path.isfile(inputDir + '/' + x) and 'json' in x and is_number(xn):
            name = getName(inputDir + '/' + x)
            print('Name: ' + name)
            if name in names:
                raise IndexError("Name already exists in index. Check for repeated names?")
            if name != "":
                names[name] = str(xn)
    return names
            

def getName(inputFile):
    try:
        obj = json.loads(open(inputFile).read())['entry']
        for entry in obj:
            if entry['resource']['resourceType'] == "Patient":
                for dictNames in entry['resource']['name']:
                    if dictNames['use'] == 'official':
                        return removeDigits(dictNames['given'][0]) + ' ' + removeDigits(dictNames['family'])
    except ValueError:
        return ""
    return ""

def compressJson(inputFile):
    fhirClass = json.loads(inputFile)
    mainObj = fhirClass['entry']
    output = {}
    
    ####################################
    # Other stuff
    
    conds = []
    immuns = []
    medreqs = []
    observs = []
    
    for entry in mainObj:
        item = entry['resource']
        
        # Patient entry
        
        if item['resourceType'] == "Patient":
            if 'person' in output:
                raise ValueError("Two sets of patient details were found in the json file")
            canStore = True # We know it's a file about a person
            patientInfo = mainObj[1]['resource']
            outputPerson = {}
            name = ""
            for dictNames in item['name']:
                if dictNames['use'] == 'official':
                    name = removeDigits(dictNames['given'][0]) + ' ' + removeDigits(dictNames['family'])
                    break
            if 'prefix' in dictNames:
                outputPerson['prefix'] = dictNames['prefix'][0]
            else:
                outputPerson['prefix'] = ""
            outputPerson['name'] = name
            outputPerson['birthday'] = item['birthDate'] #YYYY-MM-DD
            outputPerson['gender'] = item['gender'] #female or male, full string
            line = patientInfo['address'][0]['line']
            line.reverse()
            outputPerson['address'] = ','.join(line) + ',' + item['address'][0]['city'] + ',' + item['address'][0]['country']
            outputPerson['phone'] = item['telecom']
            outputPerson['languages'] = []
            for item2 in item['communication']:
                outputPerson['languages'].append(item2['language']['coding'][0]['code'])
            output['person'] = outputPerson
            
        ##### Only use the first organisation
        if item['resourceType'] == "Organization" and 'provider' not in output:
            output['provider'] = item['name']
            
        ##### Condition (long term)    
        if item['resourceType'] == "Condition":
            condition = {'date':item['assertedDate'],'type':item['code']['text'],'status':item['clinicalStatus']}
            conds.append(condition)
            
        ##### Immunization
        elif item['resourceType'] == "Immunization":
            if item['status'] == "completed":
                immunization = {'date':item['date'],'type':item['vaccineCode']['coding'][0]['display']}
                immuns.append(immunization)
                
        ##### Medication Request
        elif item['resourceType'] == "MedicationRequest":
            dosage = ""
            if 'dosageInstruction' in item:
                dosage = item['dosageInstruction'][0]
            medication = {'type':item['medicationCodeableConcept']['coding'][0]['display'],'code':item['medicationCodeableConcept']['coding'][0]['code'],'date':item['authoredOn'],'status':item['status'],'dosage':dosage}
            medreqs.append(medication)
            
        ##### Observation
        elif item['resourceType'] == "Observation":
            values = []
                # Multi-value observation
            if 'component' in item:
                for val in item['component']:
                    rec = {'type':val['code']['text'],'value':val['valueQuantity']['value'],'units':val['valueQuantity']['unit']}
                    values.append(rec)
                # Qualitative observation
            elif "valueCodeableConcept" in item:
                rec2 = {'type':item['code']['text'],'value':item['valueCodeableConcept']['coding'][0]['display'],'units':'N/A'}
                values.append(rec2)
            elif "valueString" in item:
                rec3 = {'type':item['code']['text'],'value':item['valueString']}
            else:
                # Single-valued, quantitative observation
                rec4 = {'type':item['code']['coding'][0]['display'],'value':item['valueQuantity']['value'],'units':item['valueQuantity']['unit']}
                values.append(rec4)
            observation = {'date': item['issued'][:10],'values':values}
            observs.append(observation)
            
    # Sort and fix output lists      
    conds.sort(key = lambda item: ''.join(i for i in item['date'] if i != '-'))
    output['conds'] = conds
    immuns.sort(key = lambda item: ''.join(i for i in item['date'] if i != '-'))
    output['immuns'] = immuns
    medreqs.sort(key = lambda item: ''.join(i for i in item['date'] if i != '-'))
    output['medreqs'] = medreqs
    # Observations are sorted by the grouping function
    output['observs'] = groupObservs(observs)
    if 'person' in output:
        return json.dumps(output)
    return ''
    
def groupObservs(ungrouped):
    grouped = {}
    for observation in ungrouped:
        for valueToken in observation['values']:
            if valueToken['type'] not in grouped:
                grouped[valueToken['type']] = {'units':valueToken['units'],'values':[]}
            pair = {'date':observation['date'],'value':valueToken['value']}
            grouped[valueToken['type']]['values'].append(pair)
    for obstype in grouped:
        grouped[obstype]['values'].sort(key= lambda item: ''.join(i for i in item['date'] if i != '-'))
    return grouped
    
def is_number(s):
    try:
        int(s)
        return True
    except ValueError:
        return False
    
def removeDigits(inString):
    return ''.join(i for i in inString if i.isalpha())

