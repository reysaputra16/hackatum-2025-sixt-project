# Upsell Logic


## Milestones:
- [x] Define JSON schema that returns all the cars in a pickup station
- [x] Define Upsell mvp logic
- [x] Define JSON schema that returns the vehicle alt
- [ ] Create Mock dataset (20 vehicles across 4 different stations)
- [ ] Create API endpoints for the two items above
- [ ] Create logic to return potential vehicles to be upsold based on location (L2)

## Pricing


## JSON schema that returns all the vehicles in a station

### JSON schema of a vehicle
```yaml
vehicle:
    id: # uuid
    brand: # vw
    model: # golf
    acrisscode: # (skipped)
    images: [] # link.png
    bagsCount: # 1
    passangerCount: # 3
    groupType: # sedan
    tyreType: # winter tyres, all-year tyres (skipped)
    transmissionType: # automatic, manual
    fuelType: # petrol, electric
    isNewCar: # true (skipped)
    isRecommended: # false (can be skipped)
    isMoreLuxury: # false (skipped)
    isExcitingDiscount: # false (needed)
    attributes: [] # list of UI elements that are displayed alongside the car image (skipped)
    vehicleStatus: # Available
    vehicleCost: 
        currency: # EUR
        value: # 36400 <-- purchase cost of the vehicle
    upsellReasons: [] # list of reasons of the upsell (skipped)
    pricing:
        currency: # EUR
        pricePerDay: # 35.99
        originalPricePerDay: # 39.99
        discountPercentage: # 10
        totalPrice: # 143.96 <-- for the dueration of the stay
    location: NEW FIELD
        stationId: # MUC001
        latitude: # 48.3558
        longitude: # 11.7861
    avaialbility:
        isAvailable: # true (skipped)
        availableFrom: # timestamp availabile from
        availableUntil: # timestamp available until 
    flags: # can be skiped 
    tags: # can be skipped
```
filtered fields, other dummmy val:
- ! can be generated using `math.random()`
- / can be generated based on a catalogue
- & must be manually adjusted
```yaml
vehicle:
    id: ! # uuid
    brand: / # vw
    model: / # golf
    images: [] # link.png
    bagsCount: ! # 1,2,3
    passangerCount: ! # 2,4,5
    groupType: / # Sedan, SUV, Convertible, Wagon, Van
    transmissionType: / # automatic, manual
    fuelType: / # petrol, electric 
    vehicleStatus: ! # Available, Booked
    pricing:
        currency: # EUR (hardcoded)
        originalPricePerDay: ! # 39.99
        totalPrice: ! # 143.96 <-- for the duration of the stay
    location: NEW FIELD
        stationId: & # MUC001
        latitude: & # 48.3558
        longitude: & # 11.7861
    bookDuration: # days int
    avaialbility: # true false
```

### JSON schema of a station
```yaml
station:
    stationId: # MUC001
    name: # Munich Airport
    description: # optional description of the location
    address: # freisinger landstrasse x, 80939 Munich
    coordinates: 
        latitude: # 48.3558
        longitude: # 11.7861
    openingHours: # skipped
    timezone: # Europe/Berlin
    contact: # contact info
    availability: 
        vehiclesAvailable: # 42
        categoriesAvailable: [] # Sedan, SUV, ...
    currentVehicles: [] # all ID of vehicles in the station
    currentAvailableVehicles: [] # all ID of vehicles available in the station
```

## MVP Upsell logic flow

1. User selects that they want a better deal
2. Take coordinates of currently assigned booked vehicle
3. Take coordinates of user
4. Calculate Euclidian distance between user (origin) to target station (radius)
5. Search stations within the radius
6. Query all vehicles from the assigned booking time
7. Apply price cut-off for upsell (returning list of vehicles above a certain price range)
8. Search if any of the vehicles are located nearer to the user (if any)
9. Return 2-3 vehicles (higher price range, same category) but nearer (too good to pass out deal) For the UI, you will just get the list of vehicle objects.
10. Notification prompted on user device (or email)
11. user accepts deal
12. booking updated


