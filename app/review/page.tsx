"use client";
import sixtCar from "../../public/sixt-car.png";
import {
  ArrowBigDown,
  ArrowBigRight,
  Briefcase,
  Car,
  ChevronsDown,
  CreditCard,
  Dot,
  Fuel,
  LifeBuoy,
  Palette,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";
import ChosenCarComponent from "../components/ChosenCarComponent";
import { useState } from "react";
import UpgradeCarComponent from "../components/UpgradeCarComponent";
import { redirect, useSearchParams } from "next/navigation";

const bookingReference = "123ABC";

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

const oldCar: CarInformation = {
  id: "30205",
  brand: "VW",
  image: sixtCar.src,
  model: "Golf",
  fuelType: "Petrol",
  groupType: "Sedan",
  transmissionType: "Automatic",
  bagsCount: 2,
  tyreType: "All-Year",
  color: "Gray",
  passengerCount: 5,
  originalPricePerDay: 38.55,
};

export default function ReviewPage() {
  const searchParams = useSearchParams();

  const vehicle_id = searchParams.get("vehicle_id");
  const vehicle_info = carList.find((car) => car.car.id == vehicle_id);
  return (
    <div className="">
      {/* Container */}
      <div className={`min-h-screen flex flex-col justify-center`}>
        <div className="bg-gray-300">
          <div className="min-w-screen max-w-3xl flex flex-col justify-center items-center">
            <div className="sticky top-0 bg-gray-300">
              {/* Navbar */}
              <Navbar />
              {/* Booking ID */}
              <div className="w-full max-w-3xl px-6 py-2">
                <h1 className="text-black">Booking ID: {bookingReference}</h1>
              </div>
            </div>

            {/* Review Body */}
            <div>
              <div>
                <div className="min-w-3xl min-h-screen w-full flex flex-col p-4 space-y-10 mt-5 bg-transparent">
                  {/* Title */}
                  <h1 className="text-black font-extrabold text-4xl">Review</h1>
                  {/* Review Container Old and New Car */}
                  <div className="bg-white w-full h-fit rounded-2xl p-6 flex flex-col space-y-10 shadow-lg">
                    {/* Old Car Container */}
                    <div className="w-full h-[50%] bg-gray-200 rounded-2xl shadow-lg">
                      <div className="bg-gray-600 rounded-t-2xl p-4">
                        <h1 className="text-white font-extrabold text-xl">
                          Previous Car
                        </h1>
                      </div>
                      <div className="w-full flex flex-row">
                        <div className="w-[50%]">
                          <div className="flex flex-row p-6">
                            <div className="flex flex-col space-y-5">
                              <div>
                                <h2 className="text-black text-xl font-bold">
                                  {oldCar.brand} {oldCar.model}
                                </h2>
                                <p className="text-gray-500 font-semibold text-sm">
                                  {oldCar.groupType}
                                </p>
                              </div>
                              <img src={sixtCar.src} width={300} />
                            </div>
                          </div>
                        </div>
                        <div className="w-[50%] flex flex-col justify-center">
                          {/* Car Main Attributes */}
                          <div className="w-full grid grid-cols-2 gap-3 p-4">
                            <div className="flex flex-row space-x-2 w-full p-1.5">
                              <Fuel className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {oldCar.fuelType}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Car className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {oldCar.transmissionType}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Briefcase className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {oldCar.bagsCount}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <LifeBuoy className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {oldCar.tyreType}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Palette className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {oldCar.color}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Users className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {oldCar.passengerCount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full justify-center items-center">
                      <ChevronsDown className="text-orange-500" size={50} />
                    </div>
                    {/* New Car Container */}
                    <div className="w-full h-[50%] bg-gray-200 rounded-2xl shadow-lg">
                      <div className="bg-orange-500 rounded-t-2xl p-4">
                        <h1 className="text-white font-extrabold text-xl">
                          New Car
                        </h1>
                      </div>
                      <div className="w-full flex flex-row">
                        <div className="w-[50%]">
                          <div className="flex flex-row p-6">
                            <div className="flex flex-col space-y-5">
                              <div>
                                <h2 className="text-black text-xl font-bold">
                                  {vehicle_info?.car.brand}{" "}
                                  {vehicle_info?.car.model}
                                </h2>
                                <p className="text-gray-500 font-semibold text-sm">
                                  {vehicle_info?.car.groupType}
                                </p>
                              </div>
                              <img src={sixtCar.src} width={300} />
                            </div>
                          </div>
                        </div>
                        <div className="w-[50%] flex flex-col justify-center">
                          {/* Car Main Attributes */}
                          <div className="w-full grid grid-cols-2 gap-3 p-4">
                            <div className="flex flex-row space-x-2 w-full p-1.5">
                              <Fuel className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {vehicle_info?.car.fuelType}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Car className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {vehicle_info?.car.transmissionType}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Briefcase className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {vehicle_info?.car.bagsCount}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <LifeBuoy className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {vehicle_info?.car.tyreType}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Palette className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {vehicle_info?.car.color}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Users className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {vehicle_info?.car.passengerCount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Confirm Button */}
                  <button
                    className="max-w-3xl w-full bg-orange-500 hover:bg-orange-400 cursor-pointer flex flex-row justify-center items-center space-x-2 p-4 rounded-2xl"
                    onClick={() =>
                      redirect(`/confirmation?vehicle_id=${vehicle_id}`)
                    }
                  >
                    <CreditCard size={30} />
                    <p className="text-xl font-bold">Proceed</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
