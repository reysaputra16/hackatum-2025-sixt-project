"use client";
import sixtCar from "../../public/sixt-car.png";
import {
  Briefcase,
  Car,
  ChevronsDown,
  CreditCard,
  Fuel,
  Palette,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import FunctionCapitalizeFirstLetter from "../components/FunctionCapitalizeFirstLetter";

const bookingReference = "4";

export default function ReviewPage() {
  const searchParams = useSearchParams();

  // Chosen upgrade information
  const vehicle_id = searchParams.get("vehicle_id");
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const groupType = searchParams.get("groupType");
  const fuelType = searchParams.get("fuelType");
  const transmissionType = searchParams.get("transmissionType");
  const bagsCount = searchParams.get("bagsCount");
  const color = searchParams.get("color");
  const passangerCount = searchParams.get("passangerCount");

  const [locationResults, setLocationResults] = useState<LocationInformation>();
  const [bookingCarInformation, setBookingCarInformation] =
    useState<CarInformation>({
      availability: "",
      bagsCount: 0,
      bookDuration: 0,
      brand: "SSS",
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

  useEffect(() => {
    const fetchUpgrades = async () => {
      const response_locations = await fetch(
        "http://localhost:8080/api/locations_distance/48.20086835400505/11.627775696209683",
        { method: "GET" }
      );

      const response_booking = await fetch(
        `http://localhost:8080/api/vehicles/${bookingReference}`,
        { method: "GET" }
      );

      if (response_locations.ok) {
        const data_locations: LocationInformation =
          await response_locations.json();
        // console.log(data_locations);
        setLocationResults(data_locations);
      }

      if (response_booking.ok) {
        const data_booking: CarInformation = await response_booking.json();
        // console.log(data_booking);
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
                                  {bookingCarInformation.brand}{" "}
                                  {bookingCarInformation.model}
                                </h2>
                                <p className="text-gray-500 font-semibold text-sm">
                                  {bookingCarInformation.groupType}
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
                                {bookingCarInformation.fuelType}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Car className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {bookingCarInformation.transmissionType}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Briefcase className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {bookingCarInformation.bagsCount}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Palette className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {bookingCarInformation.color}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Users className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {bookingCarInformation.passangerCount}
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
                                  {brand} {model}
                                </h2>
                                <p className="text-gray-500 font-semibold text-sm">
                                  {groupType}
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
                                {FunctionCapitalizeFirstLetter.capitalizeFirstLetter(
                                  fuelType ?? ""
                                )}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Car className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {FunctionCapitalizeFirstLetter.capitalizeFirstLetter(
                                  transmissionType ?? ""
                                )}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Briefcase className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {bagsCount ?? 0}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Palette className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {FunctionCapitalizeFirstLetter.capitalizeFirstLetter(
                                  color ?? ""
                                )}
                              </p>
                            </div>
                            <div className="flex flex-row space-x-2 w-fit p-1.5">
                              <Users className="text-black" size={20} />
                              <p className="text-black text-sm">
                                {passangerCount}
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
