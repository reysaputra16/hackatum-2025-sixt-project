import React from "react";
import sixtLogo from "../../../public/sixt-logo.png";
import { redirect } from "next/navigation";

const Navbar = () => {
  return (
    <div>
      <nav className="min-w-3xl h-fit flex flex-row justify-between items-center p-5 rounded-b-2xl">
        {/* Logo */}
        <img
          src={sixtLogo.src}
          alt="sixt-logo"
          onClick={() => redirect("https://www.sixt.com")}
          className="hover:cursor-pointer"
          width={80}
        />
        {/* Options */}
        <div className="flex flex-row space-x-10">
          <button className="text-gray-700 font-medium">Help</button>
          <button className="text-gray-700 font-medium">Contact</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
