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

export default function PrototypeApp() {
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

            {/* Upgrade Car Body */}
            <div>
              <div>
                <div className="max-w-3xl min-h-screen w-full flex flex-col bg-transparent">
                  <UpgradeCarComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
