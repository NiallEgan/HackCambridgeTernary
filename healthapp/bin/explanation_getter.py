import wikipedia
import json
import requests
import xml.etree.ElementTree

def get_ingredient(rxcui):
    base_uri = 'http://rxnav.nlm.nih.gov/REST'
    url = '{}/rxcui/{}/allrelated'.format(base_uri, rxcui)
    response = requests.get(url).text
    tree = xml.etree.ElementTree.fromstring(response)
    ings = [ing.text for ing in tree.findall("./allRelatedGroup/conceptGroup[tty='IN']/conceptProperties/name")]
    return ings
  
def get_summary(medicine):
    def first_two_sentences(string):
        sentences = string.split('\n')
        return sentences[0]
    try:
        wikipedia.set_lang(language)
        return first_two_sentences(wikipedia.summary(medicine))
    except wikipedia.exceptions.PageError:
        wikipedia.set_lang('en')
        return first_two_sentences(wikipedia.summary(medicine))

def insert_descriptions(intermediate_format):
    intermediate_format2 = json.loads(intermediate_format)
    medication_requests = intermediate_format2['medreqs']
    medication_types = {}
    for item in medication_requests:
        if item['type'] not in medication_types and item['status'] == 'active':
            medication_types[item['type']] = [get_summary(ingredient) for ingredient in get_ingredient(item['code'])]
    return json.dumps(medication_types)


if __name__ == '__main__':
    print(insert_descriptions("""{"medreqs":
                                 [{"type": "Penicillin V Potassium 250 MG", "status": "active", "code":834060},
                                   {"type": "24 HR Metformin hydrochloride 500 MG Extended Release Oral Tablet",
                                    "code": "860975", "status": "active"}]}"""))
    #print(get_ingredient('1049221'))
