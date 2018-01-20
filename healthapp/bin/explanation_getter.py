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
    print(ings)
    return ings
    
def get_summary(medicine):
    print(medicine)
    def first_two_sentences(string):
        sentences = string.split('\n')
        return sentences[0]
    try:
        # TODO: Figure out when simple english fails
        wikipedia.set_lang('en')
        return first_two_sentences(wikipedia.summary(medicine))
    except wikipedia.exceptions.PageError:
        wikipedia.set_lang('en')
        return first_two_sentences(wikipedia.summary(medicine))

def insert_descriptions(intermediate_format):
    intermediate_format = json.loads(intermediate_format)
    medication_list = intermediate_format['medreqs']

    description = {medication['type']: 
            [get_summary(ingredient) for ingredient in get_ingredient(medication['code'])] \
             for medication in medication_list if medication['status'] == 'active'}
    return json.dumps(description)


if __name__ == '__main__':
    print(insert_descriptions("""{"medreqs": 
                                 [{"type": "Penicillin V Potassium 250 MG", "status": "active", "code":834060},
                                   {"type": "24 HR Metformin hydrochloride 500 MG Extended Release Oral Tablet",
                                    "code": "860975", "status": "active"}]}"""))
    #print(get_ingredient('1049221'))
