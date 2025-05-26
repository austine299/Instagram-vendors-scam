import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Userimg from "../images/image.png";
import Image1 from "../images/image1.png";

function VendorKYC() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-slate-50">
      <div className="w-full ">
        <Link to="/" className="">
          <ArrowLeftIcon className="h-8 hover:font-bold" />
        </Link>
      </div>
      <h1 className=" font-bold text-4xl">KYC Verification</h1>
      <div className="flex flex-col gap-8 w-full sm:w-1/2 mt-8 bg-white p-9 rounded-lg">
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Instagram Handle"
        />
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Instagram Page Link"
        />
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Business Name"
        />
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Email"
        />
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Phone Number"
        />
        <label className="flex  items-center justify-around w-auto h-auto border-2 border-dashed rounded-lg bg-slate-50 p-4">
          <div className=" flex flex-col justify-center items-center cursor-pointer w-1/2 sm:w-52   h-52 bg-white border-4 rounded-lg p-4">
            <img className="" src={Userimg} alt="your face" />
            <p className="text-center font-bold">Upload photo</p>
            <input className="hidden" type="file" placeholder="" />
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer w-1/2 sm:w-52   h-52 bg-white border-4 rounded-lg p-4 ">
            <img className="" src={Image1}  alt="your product"/>
            <p className="text-center font-bold">Upload product</p>
            <input className="hidden" type="file" placeholder=""/>
          </div>
        </label>
        <button className="bg-blue-600 h-12 rounded-md text-3xl text-white ">
          Submit
        </button>
      </div>
    </div>
  );
}

export default VendorKYC;
