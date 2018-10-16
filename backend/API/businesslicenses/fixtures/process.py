import json
from datetime import datetime

f = open('unprocessed.json', 'r')
decoded = json.loads(f.read())
new_array = []
pk = 1

for obj in decoded:
    fieldsObj = {}
    date_str = obj['expiration_date'][:10]
    exp_date = datetime.strptime(date_str, '%Y-%m-%d')
    fieldsObj[u'dba_name'] = obj['doing_business_as_name']
    fieldsObj[u'legal_name'] = obj['legal_name']
    fieldsObj[u'license_number'] = obj['license_number']
    fieldsObj[u'expiration_date'] = exp_date.date().isoformat()
    fieldsObj[u'zip_code'] = obj['zip_code']
    itemObj = {'model': 'businesslicenses.businesslicense', 'pk': pk, 'fields': fieldsObj}
    new_array.append(itemObj)
    pk += 1

new_f = open('businesslicenses.json', 'w')
new_f.write(json.dumps(new_array))

f.close()
new_f.close()
