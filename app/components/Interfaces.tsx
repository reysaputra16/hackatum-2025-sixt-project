interface CarInformation {
  availability: string;
  bagsCount: number;
  bookDuration: number;
  brand: string;
  color: string;
  fuelType: string;
  groupType: string;
  id: string;
  images: string;
  model: string;
  originalPricePerDay: number;
  passangerCount: number;
  station: string;
  transmissionType: string;
}

interface LocationInformation {
  [location: string]: number;
}

interface UpgradeCarProps {
  car: CarInformation;
  isUserLocation: boolean;
  distance: number; // In km
}

interface ChosenCarProps {
  chosenCar: CarInformation;
}
