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
  Search,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

const UpgradeCarComponent = () => {
  const [upgradeResults, setUpgradeResults] = useState<CarInformation[]>([]);

  useEffect(() => {
    const fetchUpgrades = async () => {
      const response = await fetch(
        "http://localhost:8080/api/upsell/4/48.20086835400505/11.627775696209683",
        { method: "GET" }
      );

      if (response.ok) {
        const data: CarInformation[] = await response.json();
        console.log(data);
        setUpgradeResults(data);
      } else {
        console.log("Response did not work!");
      }
    };

    fetchUpgrades();
  }, []); // run once

  return (
    <div className="w-full min-w-3xl p-4 flex flex-col space-y-10 mt-5">
      <h1 className="text-black font-extrabold text-4xl">
        Choose Your Upgrade
      </h1>

      {/* Cars */}
      {upgradeResults.map((car, index) => (
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
              <p className="text-white">? KM From You</p>
            </div>
          </div>

          <div className="w-full flex flex-row">
            <div className="w-[50%] flex flex-col space-y-10">
              <div>
                <h2 className="text-black text-xl font-bold">
                  {car.brand} {car.model}
                </h2>
                <p className="text-gray-500 font-semibold text-sm">
                  {car.groupType}
                </p>
              </div>
              <img src={sixtCar.src} width={300} />
            </div>
            <div className="w-[50%] flex flex-col">
              {/* Car Main Attributes */}
              <div className="w-full grid grid-cols-2 gap-3 p-4">
                <div className="flex flex-row space-x-2 w-full p-1.5">
                  <Fuel className="text-black" size={20} />
                  <p className="text-black text-sm">{car.fuelType}</p>
                </div>
                <div className="flex flex-row space-x-2 w-fit p-1.5">
                  <Car className="text-black" size={20} />
                  <p className="text-black text-sm">{car.transmissionType}</p>
                </div>
                <div className="flex flex-row space-x-2 w-fit p-1.5">
                  <Briefcase className="text-black" size={20} />
                  <p className="text-black text-sm">{car.bagsCount}</p>
                </div>
                <div className="flex flex-row space-x-2 w-fit p-1.5">
                  <Palette className="text-black" size={20} />
                  <p className="text-black text-sm">{car.color}</p>
                </div>
                <div className="flex flex-row space-x-2 w-fit p-1.5">
                  <Users className="text-black" size={20} />
                  <p className="text-black text-sm">{car.passangerCount}</p>
                </div>
              </div>
              {/* Additional Price */}
              <div className="px-8 mt-3">
                <p className="text-black text-2xl font-bold">
                  + {car.originalPricePerDay} € / Day
                </p>
              </div>
              {/* Get Upgrade Button */}
              <button
                className="w-full border-2 mt-3 p-4 rounded-2xl bg-orange-500 text-lg font-bold cursor-pointer hover:bg-orange-400"
                onClick={() => redirect(`/review?vehicle_id=${car.id}`)}
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
