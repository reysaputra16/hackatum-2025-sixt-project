"use client";
import Navbar from "../components/Navbar";
import { useSearchParams } from "next/navigation";

const bookingReference = "123ABC";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();

  const vehicle_id = searchParams.get("vehicle_id");
  const date = new Date();
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

            {/* Confirmation Body */}
            <div>
              <div>
                <div className="max-w-3xl min-h-screen w-full flex flex-col p-4 space-y-10 mt-5 bg-transparent">
                  {/* Title */}
                  <h1 className="text-black font-extrabold text-4xl">
                    Confirmation
                  </h1>
                  <p className="text-black">
                    Thanks for upgrading your rental vehicle with Sixt. We will
                    send a confirmation email regarding the changes to your
                    booking. We hope you have a wonderful time using our
                    services at Sixt.
                  </p>
                  <div className="grid grid-cols-2">
                    <div className="p-4 border-t-2 border-l-2 border-b border-r border-gray-400 rounded-tl-2xl">
                      <p className="text-gray-500 text-sm">Booking Number</p>
                      <p className="text-black">{bookingReference}</p>
                    </div>
                    <div className="p-4 border-t-2 border-r-2 border-b border-l border-gray-400 rounded-tr-2xl">
                      <p className="text-gray-500 text-sm">Date</p>
                      <p className="text-black">
                        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                      </p>
                    </div>
                    <div className="p-4 border-b-2 border-l-2 border-t border-r border-gray-400 rounded-bl-2xl">
                      <p className="text-gray-500 text-sm">Driver's License</p>
                      <p className="text-black">Validated</p>
                    </div>
                    <div className="p-4 border-b-2 border-r-2 border-t border-l border-gray-400 rounded-br-2xl">
                      <p className="text-gray-500 text-sm">Vehicle ID</p>
                      <p className="text-black">{vehicle_id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
