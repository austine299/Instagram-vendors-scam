import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import axios from "axios";
import Userimg from "../images/image.png";
import productImg from "../images/image1.png";

function CompleteKYC() {
  const [userform, setUserForm] = useState({
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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://instagram-vendors-server.onrender.com/myAccount", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserForm(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      Object.entries(userform).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await axios.put("https://instagram-vendors-server.onrender.com/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated!");
    } catch (error) {
      alert("Update failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center sm:p-12 bg-slate-50">
      <div className="w-full">
        <Link to="/">
          <ArrowLeftIcon className="h-8 hover:font-bold" />
        </Link>
      </div>
      <h1 className="font-bold text-4xl">Complete KYC Verification</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-full sm:w-1/2 mt-8 bg-white p-9 rounded-lg"
        encType="multipart/form-data"
      >
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Instagram Handle"
          onChange={(e) =>
            setUserForm({ ...userform, instagramHandle: e.target.value })
          } 
        />
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Instagram Link"
          onChange={(e) =>
            setUserForm({ ...userform, instagramLink: e.target.value })
          }
        />
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Business Name"
          onChange={(e) =>
            setUserForm({ ...userform, businessName: e.target.value })
          }
        />
        <input
          className="h-12 p-3 border-4 rounded-md"
          type="address"
          placeholder="Shop Address"
          onChange={(e) =>
            setUserForm({ ...userform, shopAddress: e.target.value })
          }
        />

        <input
          className="h-12 p-3 border-4 rounded-md"
          type="text"
          placeholder="Phone Number"
          onChange={(e) =>
            setUserForm({ ...userform, phoneNumber: e.target.value })
          }
        />

        <div className="flex  items-center justify-around w-auto h-auto border-2 border-dashed rounded-lg bg-slate-50 p-4">
          <label className=" flex flex-col justify-center items-center cursor-pointer w-1/2 sm:w-52   h-52 bg-white border-4 rounded-lg p-4">
            {userform.profile ? (
              <img
                src={
                  userform.profile instanceof File
                    ? URL.createObjectURL(userform.profile)
                    : userform.profile || Userimg
                }
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
                setUserForm({ ...userform, profile: e.target.files[0] })
              }
            />
          </label>
          <label className="flex flex-col justify-center items-center cursor-pointer w-1/2 sm:w-52   h-52 bg-white border-4 rounded-lg p-4 ">
            {userform.productImage ? (
              <img
                src={
                  userform.productImage instanceof File
                    ? URL.createObjectURL(userform.productImage)
                    : userform.productImage || productImg
                }
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
                setUserForm({ ...userform, productImage: e.target.files[0] })
              }
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 h-12 rounded-md text-3xl text-white"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default CompleteKYC;
