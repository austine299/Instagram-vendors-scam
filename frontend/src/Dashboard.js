import { useEffect, useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer.js";

import SearchVendor from "./images/search2.jpg";
import VerifiedVendors from "./images/thumps-up.jpg";
import Verify from "./images/verify.PNG";
import Insta from "./images/instagram.png";
import InstagramBg from "./images/instagram-bg2.jpg";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [account, setAccount] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [displayProductId, setDisplayProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  const handleClick = () => inputRef.current?.focus();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    axios.get("http://localhost:5000/vendors")
      .then((res) => setAccount(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/myAccount", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("User fetch failed:", error);
        if (error.response?.status === 403) handleLogout();
      }
    };
    fetchUser();
  }, []);

  const filteredAccounts = account.filter((u) =>
    (u.instagramHandle + u.fullName).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full bg-slate-50">
      <div className="flex flex-col items-center gap-6 w-full p-6 text-white bg-cover bg-center" style={{ backgroundImage: `url(${InstagramBg})` }}>
        <h1 className="text-3xl sm:text-5xl font-bold text-center bg-gradient-to-l from-indigo-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
          Protect Yourself From Scams — Verify Instagram Vendors
        </h1>

        <button
          onClick={() => {
            handleClick();
            setActiveSearch(true);
          }}
          className={`px-6 py-3 rounded-md text-xl font-bold transition-all duration-200 ${activeSearch ? "bg-blue-700 text-white" : "bg-white text-black hover:bg-blue-600 hover:text-white"}`}
        >
          Search Vendors
        </button>

        <div className="w-full sm:w-2/3 flex items-center gap-3 mt-4 bg-white rounded-md px-4 py-2">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter Instagram handle or business name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-black"
          />
        </div>
      </div>

      <div className="w-full px-4 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          <div className="text-center col-span-full text-xl">Loading vendors...</div>
        ) : (
          filteredAccounts.map((vendor) => {
            const isVerified = [
              vendor.fullName,
              vendor.instagramHandle,
              vendor.phoneNumber,
              vendor.instagramLink,
              vendor.email,
              vendor.businessName,
              vendor.shopAddress,
              vendor.productImage,
              vendor.profile
            ].every(Boolean);

            return (
              <div key={vendor._id} className="relative bg-white rounded-lg shadow-md p-5 space-y-4">
                <div className="flex flex-col items-center">
                  {vendor.profile ? (
                    <img src={`data:image/jpeg;base64,${vendor.profile}`} alt="Profile" className="w-24 h-24 rounded-full border object-cover" />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center border rounded-full text-sm text-gray-400">
                      No Image
                    </div>
                  )}
                  <h2 className="mt-3 text-lg font-bold">{vendor.fullName}</h2>
                  <a href={vendor.instagramLink} className="text-blue-500">@{vendor.instagramHandle}</a>
                  <div className="text-sm">{isVerified ? <img src={Verify} className="w-5 inline ml-2" /> : <span className="text-red-500">❌ Not Verified</span>}</div>

                  <div className="mt-4 text-sm text-gray-700 space-y-1">
                    <a href={vendor.instagramLink} className="flex items-center gap-2 text-blue-600 underline">
                      <img src={Insta} alt="Instagram" className="w-4 h-4" />
                      Visit Instagram
                    </a>
                    <p><strong>✍</strong> {vendor.businessName}</p>
                    <p><strong>🏠</strong> {vendor.shopAddress}</p>
                    <p><strong>📧</strong> {vendor.email}</p>
                    <p><strong>📞</strong> {vendor.phoneNumber}</p>
                  </div>

                  <button
                    onClick={() => setDisplayProductId(displayProductId === vendor._id ? null : vendor._id)}
                    className="mt-3 text-blue-500 hover:underline"
                  >
                    {displayProductId === vendor._id ? "Hide Product" : "Click to See Product"}
                  </button>

                  {displayProductId === vendor._id && (
                    <div className="absolute inset-0 bg-white/95 p-4 rounded-lg shadow-lg z-50 flex flex-col items-end">
                      <span onClick={() => setDisplayProductId(null)} className="cursor-pointer text-red-500 text-xl">✖</span>
                      {vendor.productImage ? (
                        <img src={`data:image/png;base64,${vendor.productImage}`} alt="Product" className="w-full h-40 object-cover rounded-md mt-4" />
                      ) : (
                        <div className="w-full h-40 flex items-center justify-center border rounded-md text-sm text-gray-400 mt-4">
                          No Product Image
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;
