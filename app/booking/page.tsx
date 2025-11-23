"use client";
import { ArrowBigRight } from "lucide-react";
import Navbar from "../components/Navbar";
import ChosenCarComponent from "../components/ChosenCarComponent";
import { useState, useEffect } from "react";
import UpgradeCarComponent from "../components/UpgradeCarComponent";
import { redirect } from "next/navigation";

export default function PrototypeApp() {
  const [hideChosenCar, setHideChosenCar] = useState(false);
  const [hideUpgradeOption, setHideUpgradeOption] = useState(true);
  const [bookingCarInformation, setBookingCarInformation] =
    useState<CarInformation>({
      availability: "",
      bagsCount: 0,
      bookDuration: 0,
      brand: "",
      color: "",
      fuelType: "",
      groupType: "",
      id: "",
      images: "",
      model: "",
      originalPricePerDay: 0,
      passangerCount: 0,
      station: "",
      transmissionType: "",
    });

  const bookingReference = "4";

  useEffect(() => {
    const fetchUpgrades = async () => {
      const response = await fetch(
        `http://localhost:8080/api/vehicles/${bookingReference}`,
        { method: "GET" }
      );

      if (response.ok) {
        const data_booking: CarInformation = await response.json();
        console.log(data_booking);
        setBookingCarInformation(data_booking);
      } else {
        console.log("Response did not work!");
      }
    };

    fetchUpgrades();
  }, []); // run once
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

            {/* Chosen Car Body */}
            <div
              className={`transition-all duration-500 ${
                !hideChosenCar ? "opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="max-w-3xl min-h-screen w-full flex flex-col bg-transparent">
                <ChosenCarComponent {...bookingCarInformation} />
              </div>
              {/* Upgrade Button */}
              <div className="fixed bottom-8 max-w-3xl w-full flex justify-center px-4">
                <div className="p-0.5 hover:border border-gray-700 rounded-2xl">
                  <button
                    className="text-white bg-orange-500 w-fit rounded-xl py-4 px-8 flex flex-row space-x-2 hover:cursor-pointer shadow-lg"
                    onClick={() => {
                      setHideChosenCar(true);
                      redirect("upgrade");
                    }}
                  >
                    <ArrowBigRight />
                    <p className="font-semibold">Let's Get You An Upgrade</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Upgrade Selection Body */}
            {!hideUpgradeOption ? (
              <>
                <div
                  className={`transition-all duration-1000 ${
                    !hideUpgradeOption ? "opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="max-w-3xl min-h-screen w-full flex flex-col bg-transparent">
                    <UpgradeCarComponent />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
