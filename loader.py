import json
import string

def compressJson(inputFile):
    fhirClass = json.load(inputFile)
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
        outputPerson['prefix'] = dictNames['prefix'][0]
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
    
    # First two fields are always set, so loop the rest
    # (could later add validation for strictness)
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
            else:
                # Single-valued, quantitative observation
                rec3 = {'type':item['code']['coding'][0]['display'],'value':item['valueQuantity']['value'],'units':item['valueQuantity']['unit']}
                values.append(rec3)
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
    
    return json.JSONEncoder().encode(output)
    
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
    
def removeDigits(inString):
    return ''.join(i for i in inString if i.isalpha())

