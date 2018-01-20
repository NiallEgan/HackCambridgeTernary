import json
import string

def compressJson(inputFile):
    f = open(inputFile)
    fhirClass = json.load(f)
    mainObj = fhirClass['entry']
    output = {}
    
    ####################################
    # Medical care provider
    
    providerInfo = mainObj[0]['resource']
    output['provider'] = providerInfo['name']
    
    ####################################
    # Personal info
    
    patientInfo = mainObj[1]['resource']
    outputPerson = {}
    name = ""
    for dictNames in patientInfo['name']:
        if dictNames['use'] == 'official':
            name = name + removeDigits(dictNames['given'][0]) + ' ' + removeDigits(dictNames['family'])
            break
    if 'prefix' in dictNames:
        outputPerson['prefix'] = dictNames['prefix']
    else:
        outputPerson['prefix'] = ""
    outputPerson['name'] = name
    outputPerson['birthday'] = patientInfo['birthDate'] #YYYY-MM-DD
    outputPerson['gender'] = patientInfo['gender'] #female or male, full string
    line = patientInfo['address'][0]['line']
    line.reverse()
    outputPerson['address'] = ','.join(line) + ',' + patientInfo['address'][0]['city'] + ',' + patientInfo['address'][0]['country']
    outputPerson['phone'] = patientInfo['telecom']
    outputPerson['languages'] = []
    for item in patientInfo['communication']:
        outputPerson['languages'].append(item['language']['coding'][0]['code'])

    output['person'] = outputPerson
    
    ####################################
    # Other stuff
    
    conds = []
    immuns = []
    medreqs = []
    observs = []
    
    for i in range(2,len(mainObj)):
        item = mainObj[i]['resource']
        ##### Condition
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
            medication = {'type':item['medicationCodeableConcept']['coding'][0]['display'],'code':item['medicationCodeableConcept']['coding'][0]['code'],'date':item['authoredOn'],'status':item['status'],'dosage':item['dosageInstruction'][0]}
            medreqs.append(medication)
        ##### Observation
        elif item['resourceType'] == "Observation":
            values = []
            if 'component' in item:
                # Multi-value observation
                for val in item['component']:
                    rec = {'type':val['code']['text'],'value':val['valueQuantity']['value'],'units':val['valueQuantity']['unit']}
                    values.append(rec)
            else:
                rec2 = {'type':item['code']['coding'][0]['display'],'value':item['valueQuantity']['value'],'units':item['valueQuantity']['unit']}
                values.append(rec2)
            observation = {'date': item['issued'],'values':values}
            observs.append(observation)
    # Assemble output lists        
    output['conds'] = conds
    output['immuns'] = immuns
    output['medreqs'] = medreqs
    output['observs'] = observs
    return json.JSONEncoder().encode(output)
    
    
    
def removeDigits(inString):
    return ''.join(i for i in inString if i.isalpha())

