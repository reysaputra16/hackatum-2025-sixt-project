import sqlite3
from datetime import datetime
from flask import Flask, jsonify, request 
import requests
import os
import numpy as np
import json
import math

app = Flask(__name__)
root = '/api'

# conncet to database
conn = sqlite3.connect("backend/sixt.db", check_same_thread=False)
cursor = conn.cursor()

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

def _vehicle_dict_maker(vehicle):
    return {
            'id': vehicle[0],
            'brand': vehicle[1],
            'model': vehicle[2],
            'images': vehicle[3],
            'bagsCount': vehicle[4],
            'passangerCount': vehicle[5],
            'groupType': vehicle[6],
            'transmissionType': vehicle[7],
            'fuelType': vehicle[8],
            'availability': vehicle[9],
            'originalPricePerDay': vehicle[10],
            'bookDuration': vehicle[11],
            'station': vehicle[12],
            'color': vehicle[13]
        }


def calculate_euclidian(input, locations):
    input_coords = np.array(input)
    
    loc_dist = {}
    for k, v in locations.items():
        loc_dist[k] = np.linalg.norm(input_coords - np.array(locations[k]))
    return loc_dist

def calculate_haversine(input, locations):
    R = 6371000  # Earth's radius in meters
    lat1, lon1 = input
    
    loc_dist =  {}
    for k, v in locations.items():
        lat2,lon2 = locations[k]
        
        phi1 = math.radians(lat1)
        phi2 = math.radians(lat2)
        dphi = math.radians(lat2 - lat1)
        dlambda = math.radians(lon2 - lon1)
        
        a = math.sin(dphi / 2)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        
        loc_dist[k] = R * c
        
    return loc_dist

    

# get all vehicles
@app.route(root + '/vehicles', methods=['GET'])
def get_all_vehicles():
    cursor.execute('SELECT * FROM vehicles')
    vehicles = cursor.fetchall()
    output = []
    for vehicle in vehicles:
        output.append(_vehicle_dict_maker(vehicle))
    return(output)

@app.route(root + '/vehicles/locations/<location>', methods=['GET'])
def get_all_vehicles_by_location(location):
    cursor.execute('SELECT * FROM vehicles WHERE station = ?', (location, ))
    vehicles = cursor.fetchall()
    output = []
    for vehicle in vehicles:
        output.append(_vehicle_dict_maker(vehicle))
    return(output)


# get all vehicles
@app.route(root + '/vehicles/<id>', methods=['GET'])
def get_vehicles(id):
    cursor.execute('SELECT * FROM vehicles WHERE id = ?', (id,))
    vehicle = cursor.fetchone()
    return(_vehicle_dict_maker(vehicle))

@app.route(root + '/availableVehicles', methods=['GET'])
def get_all_available():
    cursor.execute('SELECT * FROM vehicles WHERE availability = "True"')
    vehicles = cursor.fetchall()
    output = []
    for vehicle in vehicles:
        output.append(_vehicle_dict_maker(vehicle))
    return(output)

@app.route(root + '/locations_distance/<lat>/<long>', methods=['GET'])
def get_distance_to_locations(lat, long):
    return calculate_haversine((float(lat), float(long)), locations)


@app.route(root + '/availableVehicles/locations/<location_name>', methods=['GET'])
def get_all_available_by_location(location_name):
    cursor.execute('SELECT * FROM vehicles WHERE station = ? and availability = "True"', (location_name, ))
    vehicles = cursor.fetchall()
    output = []
    for vehicle in vehicles:
        output.append(_vehicle_dict_maker(vehicle))
    return(output)

@app.route(root + '/upsell/<booked_id>/<lat>/<long>', methods=['GET'])
def get_upsell(booked_id, lat, long):
    
    current_coords = (float(lat), float(long))
    distance_to_stations = calculate_haversine(current_coords, locations)
    booked_vehicle = get_vehicles(booked_id)
    
    
    # get vehicle id above the current price bracket
    cursor.execute('SELECT * FROM vehicles WHERE originalPricePerDay > ? and availability = "True" and transmissionType = ?', (booked_vehicle['originalPricePerDay'], booked_vehicle['transmissionType'] ))
    vehicles = cursor.fetchall()
    available_vehicles_upsell = []
    for vehicle in vehicles:
        available_vehicles_upsell.append(_vehicle_dict_maker(vehicle))
        
    # comopute similiarity scoring
    id_similarity = {}
    for vehicle in available_vehicles_upsell:
        id_similarity[vehicle['id']] = _similarity_scoring(booked_vehicle, vehicle)
        
    max_similarity = max(id_similarity.values())
        
    sorted_station = sorted(distance_to_stations.items(), key=lambda x: x[1])
    
    station_cluster = {}
    station_id_score = {}
    
    for station in sorted_station:
        station_cluster[station[0]] = []
        cursor.execute('SELECT * FROM vehicles WHERE originalPricePerDay > ? and availability = "True" and transmissionType = ? and station = ?', (booked_vehicle['originalPricePerDay'], booked_vehicle['transmissionType'], station[0]))
        vehicles_in_station = cursor.fetchall()
        for vehicle in vehicles_in_station:
            station_cluster[station[0]].append(_vehicle_dict_maker(vehicle))
        
        station_cluster[station[0]] = sorted(station_cluster[station[0]], key=lambda x: id_similarity[x['id']], reverse=True)
    
    station_id_score = {}
    final_ids = []
    loc_counter = 0
    for k, v in station_cluster.items():
        station_id_score[k] = []
        for vehicle in v:
            similarity_normalized = id_similarity[vehicle['id']]/max_similarity
            if similarity_normalized >= 0.75:
                station_id_score[k].append((vehicle['id'], similarity_normalized))
                final_ids.append(vehicle['id'])
        loc_counter += 1
        if loc_counter == 4:
            break
    
    
    final_vehicles = []
    for id in final_ids:
        final_vehicles.append(get_vehicles(id))
    return(final_vehicles)
    
    
def _similarity_scoring(vehicle_1, vehicle_2):
    # bagsCount
    # bookDuration
    # fuelType
    # groupType
    # passengerCount
    vec1 = np.array((vehicle_1['bagsCount'],
                     vehicle_1['bookDuration'],
                     0 if vehicle_1['fuelType'] == 'electric' else (1 if vehicle_1['fuelType'] == 'hybrid' else 2),
                     2 if vehicle_1['groupType'] == 'Coupe' else (5 if vehicle_1['groupType'] == 'Sedan' else 8),
                    #  vehicle_1['originalPricePerDay'],
                     vehicle_1['passangerCount']))
    vec2 = np.array((vehicle_2['bagsCount'],
                     vehicle_2['bookDuration'],
                     0 if vehicle_1['fuelType'] == 'electric' else (1 if vehicle_2['fuelType'] == 'hybrid' else 2),
                     2 if vehicle_2['groupType'] == 'Coupe' else (5 if vehicle_2['groupType'] == 'Sedan' else 8),
                    #  vehicle_2['originalPricePerDay'],
                     vehicle_2['passangerCount']))
    
    dprice = vehicle_2['originalPricePerDay'] - vehicle_1['originalPricePerDay'] 
    score_weighting = np.exp(-0.0195 * (dprice - 10)**2)
    return score_weighting * (np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2)))
    

if __name__ == '__main__':
    coords = (48.20086835400505,11.627775696209682)
    print(calculate_haversine(coords, locations))
    print(get_upsell(19 ,coords[0], coords[1]))
    app.run(port=8080)