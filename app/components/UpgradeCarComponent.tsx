import React from "react";
import sixtCar from "../../public/sixt-car.png";
import {
  Fuel,
  Car,
  Briefcase,
  LifeBuoy,
  Palette,
  Users,
  MapPin,
} from "lucide-react";
import { redirect } from "next/navigation";

const carList: UpgradeCarProps[] = [
  {
    car: {
      id: "230102390123",
      brand: "BMW",
      image: sixtCar.src,
      model: "X5",
      fuelType: "Electric",
      groupType: "Sedan",
      transmissionType: "Automatic",
      bagsCount: 3,
      tyreType: "Winter",
      color: "Blue",
      passengerCount: 5,
      originalPricePerDay: 25.22,
    },
    isUserLocation: true,
    distance: 0.7,
  },
  {
    car: {
      id: "32959245",
      brand: "BMW",
      image: sixtCar.src,
      model: "X5",
      fuelType: "Electric",
      groupType: "Sedan",
      transmissionType: "Automatic",
      bagsCount: 3,
      tyreType: "Winter",
      color: "Blue",
      passengerCount: 5,
      originalPricePerDay: 25.22,
    },
    isUserLocation: true,
    distance: 1.2,
  },
  {
    car: {
      id: "30129309213",
      brand: "BMW",
      image: sixtCar.src,
      model: "X5",
      fuelType: "Electric",
      groupType: "Sedan",
      transmissionType: "Automatic",
      bagsCount: 3,
      tyreType: "Winter",
      color: "Blue",
      passengerCount: 5,
      originalPricePerDay: 25.22,
    },
    isUserLocation: true,
    distance: 1.2,
  },
  {
    car: {
      id: "203912039",
      brand: "BMW",
      image: sixtCar.src,
      model: "X5",
      fuelType: "Electric",
      groupType: "Sedan",
      transmissionType: "Automatic",
      bagsCount: 3,
      tyreType: "Winter",
      color: "Blue",
      passengerCount: 5,
      originalPricePerDay: 25.22,
    },
    isUserLocation: true,
    distance: 2.8,
  },
  {
    car: {
      id: "994938294",
      brand: "BMW",
      image: sixtCar.src,
      model: "X5",
      fuelType: "Electric",
      groupType: "Sedan",
      transmissionType: "Automatic",
      bagsCount: 3,
      tyreType: "Winter",
      color: "Blue",
      passengerCount: 5,
      originalPricePerDay: 25.22,
    },
    isUserLocation: true,
    distance: 6.5,
  },
];

const UpgradeCarComponent = () => {
  return (
    <div className="w-full min-w-3xl p-4 flex flex-col space-y-10 mt-5">
      <h1 className="text-black font-extrabold text-4xl">
        Choose Your Upgrade
      </h1>
      {/* Cars */}
      {carList.map((car, index) => (
        <div
          key={index}
          className="bg-white w-full h-[400px] rounded-2xl p-6 flex flex-col space-y-10 shadow-lg justify-center"
        >
          <div className="flex flex-row space-x-5">
            {index === 0 ? (
              <p className="text-white bg-yellow-500 shadow-md w-fit px-4 py-2 rounded-2xl">
                Recommended
              </p>
            ) : (
              ""
            )}

            <div className="flex flex-row gap-2 items-center px-4 py-2 bg-blue-400 rounded-2xl">
              <MapPin />
              <p className="text-white">
                {car.distance} KM From {car.isUserLocation ? "You" : "Station"}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-row">
            <div className="w-[50%] flex flex-col space-y-10">
              <div>
                <h2 className="text-black text-xl font-bold">
                  {car.car.brand} {car.car.model}
                </h2>
                <p className="text-gray-500 font-semibold text-sm">
                  {car.car.groupType}
                </p>
              </div>
              <img src={sixtCar.src} width={300} />
            </div>
            <div className="w-[50%] flex flex-col">
              {/* Car Main Attributes */}
              <div className="w-full grid grid-cols-2 gap-3 p-4">
                <div className="flex flex-row space-x-2 w-full p-1.5">
                  <Fuel className="text-black" size={20} />
                  <p className="text-black text-sm">{car.car.fuelType}</p>
                </div>
                <div className="flex flex-row space-x-2 w-fit p-1.5">
                  <Car className="text-black" size={20} />
                  <p className="text-black text-sm">
                    {car.car.transmissionType}
                  </p>
                </div>
                <div className="flex flex-row space-x-2 w-fit p-1.5">
                  <Briefcase className="text-black" size={20} />
                  <p className="text-black text-sm">{car.car.bagsCount}</p>
                </div>
                <div className="flex flex-row space-x-2 w-fit p-1.5">
                  <LifeBuoy className="text-black" size={20} />
                  <p className="text-black text-sm">{car.car.tyreType}</p>
                </div>
                <div className="flex flex-row space-x-2 w-fit p-1.5">
                  <Palette className="text-black" size={20} />
                  <p className="text-black text-sm">{car.car.color}</p>
                </div>
                <div className="flex flex-row space-x-2 w-fit p-1.5">
                  <Users className="text-black" size={20} />
                  <p className="text-black text-sm">{car.car.passengerCount}</p>
                </div>
              </div>
              {/* Additional Price */}
              <div className="px-8 mt-3">
                <p className="text-black text-2xl font-bold">
                  + {car.car.originalPricePerDay} € / Day
                </p>
              </div>
              {/* Get Upgrade Button */}
              <button
                className="w-full border-2 mt-3 p-4 rounded-2xl bg-orange-500 text-lg font-bold cursor-pointer hover:bg-orange-400"
                onClick={() => redirect(`/review?vehicle_id=${car.car.id}`)}
              >
                <p>Get Upgrade</p>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpgradeCarComponent;
