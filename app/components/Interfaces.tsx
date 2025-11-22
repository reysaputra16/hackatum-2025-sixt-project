interface CarInformation {
  availability: string;
  bagsCount: number;
  bookDuration: 25;
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

interface UpgradeCarProps {
  car: CarInformation;
  isUserLocation: boolean;
  distance: number; // In km
}
