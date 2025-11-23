import React, { useState } from "react";
import {
  Fuel,
  Car,
  Briefcase,
  LifeBuoy,
  Palette,
  Users,
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
} from "lucide-react";
import sixtCar from "../../public/sixt-car.png";
import FunctionCapitalizeFirstLetter from "./FunctionCapitalizeFirstLetter";

const ChosenCarComponent = ({
  availability,
  bagsCount,
  bookDuration,
  brand,
  color,
  fuelType,
  groupType,
  id,
  images,
  model,
  originalPricePerDay,
  passangerCount,
  station,
  transmissionType,
}: CarInformation) => {
  const [showMoreInformation, setShowMoreInformation] = useState(false);

  return (
    <div className="w-full h-fit p-4">
      <div className="w-full h-full flex flex-col bg-gray-100 rounded-2xl shadow-md">
        {/* Chosen Car Body */}
        <div className="flex flex-col space-y-6 justify-center bg-gray-800 rounded-t-2xl p-6">
          <p className="top-0 left-0 text-white font-semibold py-2 px-4 bg-orange-500 w-fit rounded-3xl">
            Chosen Car
          </p>
          <div className="flex justify-center">
            <img src={sixtCar.src} width={400} />
          </div>
        </div>
        {/* Info Body */}
        <div className="flex flex-col space-y-2">
          <div className="p-4">
            {/* Car Name and Type */}
            <div>
              <p className="text-black text-3xl font-light px-4">
                {brand} {model}
              </p>
              <p className="text-gray-500 text-md font-semibold px-4">
                {groupType}
              </p>
            </div>
            {/* Car Main Attributes */}
            <div className="w-[50%] grid grid-cols-2 gap-3 p-4">
              <div className="flex flex-row space-x-2 w-full p-1.5">
                <Fuel className="text-black" size={20} />
                <p className="text-black text-sm">
                  {FunctionCapitalizeFirstLetter.capitalizeFirstLetter(
                    fuelType
                  )}
                </p>
              </div>
              <div className="flex flex-row space-x-2 w-fit p-1.5">
                <Car className="text-black" size={20} />
                <p className="text-black text-sm">
                  {FunctionCapitalizeFirstLetter.capitalizeFirstLetter(
                    transmissionType
                  )}
                </p>
              </div>
              <div className="flex flex-row space-x-2 w-fit p-1.5">
                <Briefcase className="text-black" size={20} />
                <p className="text-black text-sm">{bagsCount}</p>
              </div>
              <div className="flex flex-row space-x-2 w-fit p-1.5">
                <Palette className="text-black" size={20} />
                <p className="text-black text-sm">
                  {FunctionCapitalizeFirstLetter.capitalizeFirstLetter(color)}
                </p>
              </div>
              <div className="flex flex-row space-x-2 w-fit p-1.5">
                <Users className="text-black" size={20} />
                <p className="text-black text-sm">{passangerCount}</p>
              </div>
            </div>
          </div>

          {/* More Information */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-in ${
              showMoreInformation ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="text-black px-8 py-2 mt-2 mb-5 space-y-5">
              <p className="flex flex-row space-x-2">
                {<CircleCheckBig className="text-orange-500" />}
                <span className="font-bold">Easy Getaway</span>: Drive with ease
                roaming through all kinds of roads possible.
              </p>
              <p className="flex flex-row space-x-2">
                {<CircleCheckBig className="text-orange-500" />}
                <span className="font-bold">Practical Size</span>: Fits up to{" "}
                {passangerCount} passengers with cushion-based seats
              </p>
              <p className="flex flex-row space-x-2">
                {<CircleCheckBig className="text-orange-500" />}
                <span className="font-bold">Large Compartment</span>: Space
                enough for multiple bulky baggages for a worry-free trip.
              </p>
            </div>
          </div>
          <button
            className="flex flex-row justify-center items-center space-x-2 hover:cursor-pointer"
            onClick={() => setShowMoreInformation(!showMoreInformation)}
          >
            {showMoreInformation ? (
              <ChevronUp className="text-black" />
            ) : (
              <ChevronDown className="text-black" />
            )}
            <p className="text-black">
              {showMoreInformation ? "Hide Information" : "More Information"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChosenCarComponent;
