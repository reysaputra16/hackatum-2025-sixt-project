"use client";
import Navbar from "../components/Navbar";
import UpgradeCarComponent from "../components/UpgradeCarComponent";
import { bookingReference } from "../components/ConstantsBookingInformation";

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
