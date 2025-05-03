import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

import SearchVendor from "./images/search-vendors.PNG";
import SignUpKyc from "./images/sign-up-KYC.PNG";
import VerifiedVendors from "./images/verified-vendors.PNG";

function Dashboard() {
  return (
    <div className="flex flex-col items-center w-full p-4 gap-8 bg-slate-50">
      <h1 className="text-4xl font-bold">
        Protect Yourself From Scams-Verify Instagram Vendors
      </h1>
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full  sm:w-1/2">
        <button className="border-2 bg-white px-3 py-3 rounded-md w-10/12 hover:bg-gray-700 hover:text-white text-xl font-bold">
          Search Vendors
        </button>
        <button className="border-2 bg-blue-700 px-3 py-3 rounded-md w-10/12 hover:bg-blue-500 text-white text-xl font-bold">
          Verify My Business
        </button>
      </div>
      <div className=" flex flex-col sm:flex-row gap-5 justify-around items-center bg-white w-full  py-6 ">
        <div className="flex flex-col items-center text-center w-2/3  sm:w-1/5">
          <img className="w-full" src={SearchVendor} />
          <p className="text-center text-2xl font-semibold">
            Serch for <br /> Instagram vendors
          </p>
        </div>

        <span className="text-5xl hidden sm:block">&#8594;</span>
        <span className="text-5xl sm:hidden">&#8595;</span>

        <div className="flex flex-col items- text-center w-2/3  sm:w-1/5">
          <img className="w-full" src={SignUpKyc} />
          <Link
            to="/signup"
            className="text-center text-2xl font-semibold cursor-pointer hover:text-blue-700 hover:underline"
          >
            Vendors sign up{" "}
          </Link><span className="text-2xl">and</span>
          <Link
            to="/kyc"
            className="text-center text-2xl font-semibold cursor-pointer hover:text-blue-700 hover:underline"
          >
            complete KYC verification
          </Link>
        </div>

        <span className="text-5xl hidden sm:block">&#8594;</span>
        <span className="text-5xl sm:hidden">&#8595;</span>

        <div className="flex flex-col items- text-center w-2/3  sm:w-1/5">
          <img className="w-full" src={VerifiedVendors} />
          <p className="text-center text-2xl font-semibold">
            View verified vendors and avoid scams
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 border-2 bg-white w-full sm:w-1/2 h-12 rounded-md">
        <MagnifyingGlassIcon className="ml-3 h-8 cursor-pointer" />
        <input
          className="w-full h-full rounded-r-md"
          placeholder="Enter Instagram handle or Business name"
        />
      </div>
    </div>
  );
}

export default Dashboard;
