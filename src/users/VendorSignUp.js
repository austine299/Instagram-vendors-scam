import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import axios from "axios";
import Userimg from "../images/image.png";
import productImg from "../images/image1.png";

function VendorSignUp() {
  const [form, setForm] = useState({
    fullName: "",
    instagramHandle: "",
    phoneNumber: "",
    instagramLink: "",
    businessName: "",
    shopAddress: "",
    email: "",
    password: "",
    confirmPassword: "",
    productImage: null,
    profile: null,
  });

  // const [productImage, setProductImage] = useState(null);
  // const [profile, setProfile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("instagramHandle", form.instagramHandle);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("instagramLink", form.instagramLink);
    formData.append("businessName", form.businessName);
    formData.append("shopAddress", form.shopAddress);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("profile", form.profile); // input[type="file"]
    formData.append("productImage", form.productImage);

    try {
      await axios.post("http://localhost:5000/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Sign Up successful!");
    } catch (error) {
      alert(error.response?.data?.msg || "Signup failed");
    }

    setForm({
      fullName: "",
      instagramHandle: "",
      phoneNumber: "",
      instagramLink: "",
      businessName: "",
      shopAddress: "",
      email: "",
      password: "",
      confirmPassword: "",
      productImage: null,
      profile: null,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center sm:p-12 bg-slate-50">
      <div className="w-full">
        <Link to="/">
          <ArrowLeftIcon className="h-8 hover:font-bold" />
        </Link>
      </div>
      <h1 className="font-bold text-4xl">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-full sm:w-1/2 mt-8 p-9 rounded-lg"
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-center justify-center gap-4 sm:p-12 bg-white">
          <input
            className="w-full h-12 p-3 border-4 rounded-md"
            type="text"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            className="w-full h-12 p-3 border-4 rounded-md"
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="w-full h-12 p-3 border-4 rounded-md"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            className="w-full h-12 p-3 border-4 rounded-md"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value }) 
            }
          />
        </div>
        <h2 className="w-full text-center font-bold text-4xl">KYC Verification</h2>
        <div className="flex flex-col w-full items-center gap-4 justify-center sm:p-12 bg-white">
          <input
            className="w-full h-12 p-3 border-4 rounded-md"
            type="text"
            placeholder="Instagram Handle"
            onChange={(e) =>
              setForm({ ...form, instagramHandle: e.target.value })
            }
          />
          <input
            className="w-full h-12 p-3 border-4 rounded-md"
            type="text"
            placeholder="Instagram Link"
            onChange={(e) =>
              setForm({ ...form, instagramLink: e.target.value })
            }
          />
          <input
            className="w-full h-12 p-3 border-4 rounded-md"
            type="text"
            placeholder="Business Name"
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          />
          <input
            className="w-full h-12 p-3 border-4 rounded-md"
            type="address"
            placeholder="Shop Address"
            onChange={(e) => setForm({ ...form, shopAddress: e.target.value })}
          />

          <input
            className="w-full h-12 p-3 border-4 rounded-md"
            type="text"
            placeholder="Phone Number"
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />

          <div className="flex  items-center justify-around w-auto h-auto border-2 border-dashed rounded-lg bg-slate-50 p-4">
            <label className=" flex flex-col justify-center items-center cursor-pointer w-1/2 sm:w-52   h-52 bg-white border-4 rounded-lg p-4">
              {form.profile ? (
                <img
                  src={URL.createObjectURL(form.profile)}
                  alt="Profile preview"
                />
              ) : (
                <img className="" src={Userimg} alt="your face" />
              )}
              <p className="text-center font-bold">
                Upload user's photo at his or her shop{" "}
              </p>
              <input
                className="hidden h-12 p-3 border-4 rounded-md"
                type="file"
                name="profile"
                onChange={(e) =>
                  setForm({ ...form, profile: e.target.files[0] })
                }
              />
            </label>
            <label className="flex flex-col justify-center items-center cursor-pointer w-1/2 sm:w-52   h-52 bg-white border-4 rounded-lg p-4 ">
              {form.productImage ? (
                <img
                  src={URL.createObjectURL(form.productImage)}
                  alt="Profile preview"
                />
              ) : (
                <img className="" src={productImg} alt="your product" />
              )}
              <p className=" text-center font-bold">Upload product</p>
              <input
                className="hidden h-12 p-3 border-4 rounded-md"
                type="file"
                name="productImage"
                onChange={(e) =>
                  setForm({ ...form, productImage: e.target.files[0] })
                }
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 h-12 rounded-md text-3xl text-white"
        >
          Sign Up
        </button>
        <div className="text-center">
          <span className="mr-2">Already have an account?</span>
          <Link
            to="/login"
            className="text-xl font-bold hover:text-blue-600 hover:underline"
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default VendorSignUp;
