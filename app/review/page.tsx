"use client";
import sixtCar from "../../public/sixt-car.png";
import {
  ArrowBigDown,
  ArrowBigRight,
  Briefcase,
  Car,
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
import { redirect } from "next/navigation";

const bookingReference = "123ABC";

const carList: UpgradeCarProps[] = [
  {
    car: {
      id: 230102390123,
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
      id: 32959245,
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
      id: 30129309213,
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
      id: 203912039,
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
      id: 994938294,
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

export default function ReviewPage() {
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
                <div className="max-w-3xl min-h-screen w-full flex flex-col bg-transparent">
                  <h1>Test</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
