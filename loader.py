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
    line = patientInfo['address'][0]['line'].reverse()
    outputPerson['address'] = ','.join(line) + ',' + patientInfo['address'][0]['city'] + ',' + patientInfo['address'][0]['country']
    outputPerson['phone'] = patientInfo['telecom']
    outputPerson['languages'] = []
    for item in patientInfo['communication']:
        outputPerson['languages'].append(item['language']['coding']['code']
    
    output['person'] = outputPerson
    
    ####################################
    # Other stuff
    
    conds = []
    immuns = []
    medreqs = []
    
    for i in range(2,len(mainInfo)):
        item = mainInfo[i]['resource']
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
            medication = {'type':item['medicationCodeableConcept']['coding'][0]['display'],'date':item['authoredOn'],status:item['status']}
            medreqs.append(medication)
        
                
    
    
    
def removeDigits(inString):
    return inString.translate(None,'0123456789')

