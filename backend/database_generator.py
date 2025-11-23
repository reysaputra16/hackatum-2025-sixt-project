import sqlite3
from itertools import product
import random
import json

connection = sqlite3.connect("backend/sixt.db", check_same_thread=False)

automatic_multiplier = 1.09

group_type = {
    2: 'Coupe',
    5: 'Sedan',
    8: 'SUV'
}

bags_count = [1,2,3,4]
passanger_count = [2,5,8]
transmission_type = ['manual', 'automatic']
fuel_type = ['gas', 'electric', 'hybrid']
availability = [True, False]
colors = ['red', 'blue', 'black', 'gray']

passanger_multiplier = 7
baggage_multiplier = 1.5

locations = {
    'Haidhausen': (48.136096, 11.608942),
    'Ostbahnhof': (48.127208, 11.607957),
    'Schwabing': (48.177723, 11.591010),
    'Laim': (48.146124, 11.502870),
    'Flughafen': (48.3538857382193, 11.788059296296359),
    'Haupbahnhof': (48.14203459014511, 11.558140657633798),
    'Stachus': (48.14011918838394, 11.566868086469782),
    'Dachau': (48.26061816855299, 11.469966571125877),
    'Lehel': (48.141499264319066, 11.584606215191291),
    'Trudering': (48.12245453794639, 11.662685591910769),
    'Freising': (48.38157801033135, 11.755000315191301)
}

combinations = list(product(bags_count, 
                            passanger_count, 
                            transmission_type, 
                            fuel_type,
                            availability,
                            colors))

vehicles = []


brands_count = 5
brand_type = {
    1: 'Handa',
    2: 'Totoya',
    3: 'Edison',
    4: 'Dorf',
    5: 'HMW'
}
for i, combination in enumerate(combinations):
    vehicles.append({
        'id': i,
        'brand': f'{brand_type[int(random.randint(1,brands_count))]}',
        'model': str(random.randint(1,30)) + str(random.randint(1,30)),
        'images': [],
        'bagsCount': combination[0],
        'passangerCount': combination[1],
        'groupType': group_type[combination[1]],
        'transmissionType': combination[2],
        'fuelType': combination[3],
        'availability': combination[4],
        'originalPricePerDay': (combination[0] * baggage_multiplier + combination[1] * passanger_multiplier) * (automatic_multiplier if combination[2] == 'automatic' else 1),
        'bookDuration': int(random.randint(1,30)),
        'station': list(locations.keys())[random.randint(0,10)],
        'color': combination[5]
    })
    
print(json.dumps(vehicles, indent=4))

queries = []

queries.append(
    'CREATE TABLE vehicles ('
    'id INTEGER PRIMARY KEY,'
    'brand TEXT NOT NULL,'
    'model TEXT NOT NULL,'
    'images TEXT,'
    'bagsCount INTEGER,'
    'passangerCount INTEGER,'
    'groupType TEXT,'
    'transmissionType TEXT,'
    'fuelType TEXT,'
    'availability TEXT,'
    'originalPricePerDay REAL,'
    'bookDuration INTEGER,'
    'station TEXT,'
    'color TEXT'
    ');'
)


str_format = (
    'INSERT INTO vehicles VALUES ('
    '{id}, '
    '"{brand}", '
    '"{model}", '
    '"{images}", '
    '{bagsCount}, '
    '{passangerCount}, '
    '"{groupType}", '
    '"{transmissionType}", '
    '"{fuelType}", '
    '"{availability}", '
    '{originalPricePerDay}, '
    '{bookDuration}, '
    '"{station}", '
    '"{color}"'
    ');'
)


for vehicle in vehicles:
    # Make sure the images list is stored as JSON text
    vehicle['images'] = json.dumps(vehicle['images'])
    queries.append(str_format.format(**vehicle))
    


queries.append(
    'CREATE TABLE locations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, longitude FLOAT NOT NULL, latitude FLOAT NOT NULL);'
)

for name, (lat, lon) in locations.items():
    queries.append(
        f'INSERT INTO locations (name, longitude, latitude) VALUES ("{name}", {lon}, {lat});'
    )

for query in queries:
    connection.execute(query)

connection.commit()
connection.close()