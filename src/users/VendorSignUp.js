import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function VendorSignUp() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-slate-50">
      <div className="w-full ">
        <Link to="/" className="">
          <ArrowLeftIcon className="h-8 hover:font-bold" />
        </Link>
      </div>
      <h1 className=" font-bold text-4xl">Sign Up</h1>
      <div className="flex flex-col gap-8 w-full sm:w-1/2 mt-8 bg-white p-9 rounded-lg">
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Full Name"
        />
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Instagram Handle"
        />
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Phone Number"
        />
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Password"
        />
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Confirm Password"
        />
        <button className="bg-blue-600 h-12 rounded-md text-3xl text-white ">
          Sign Up
        </button>
        <button className="text-xl font-bold hover:text-blue-600 hover:underline">
          Alresdy have an account?
        </button>
      </div>
    </div>
  );
}

export default VendorSignUp;
