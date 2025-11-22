interface CarInformation {
  id: string;
  brand: string;
  image: string;
  model: string;
  fuelType: string;
  groupType: string;
  transmissionType: string;
  bagsCount: number;
  tyreType: string;
  color: string;
  passengerCount: number;
  originalPricePerDay: number;
}

interface UpgradeCarProps {
  car: CarInformation;
  isUserLocation: boolean;
  distance: number; // In km
}
