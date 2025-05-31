import { useEffect, useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [activeBusi, setActiveBusi] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [displayProductId, setDisplayProductId] = useState(false);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const vendors = useRef();

  const handleActiveSearch = () => {
    setActiveSearch(true);
    setActiveBusi(false);
  };

  const handleActivebusiness = () => {
    setActiveBusi(true);
    setActiveSearch(false);
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const gotoVendors = () => {
    vendors.current?.focus();
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the JWT
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("https://instagram-vendors-vendor.onrender.com/vendors")

      .then((res) => {
        console.log(res.data);
        setAccount(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(true));
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }

      try {
        const res = await axios.get("https://instagram-vendors-vendor.onrender.com/myAccount", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        if (error.response?.status === 403) {
          // Token invalid or user not authorized
          handleLogout();
        }
      }
    };

    fetchUser();
  }, []);

  const filteredAccounts = account.filter((user) =>
    (user.instagramHandle + user.fullName)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full gap-8 bg-slate-50">
      <div
        className="flex flex-col items-center gap-6 w-full p-5"
        style={{ backgroundImage: `url(${InstagramBg})` }}
      >
        <h1 className="sm:text-4xl font-bold text-center bg-gradient-to-l from-indigo-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
          Protect Yourself From Scams — Verify Instagram Vendors
        </h1>
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full sm:w-1/2">
          <button
            onClick={() => {
              handleClick();
              handleActiveSearch();
            }}
            className={
              activeSearch
                ? "border-2 bg-blue-700 px-3 py-3 rounded-md w-fit hover:bg-blue-500 hover:text-white text-white text-xl font-bold"
                : "border-2 bg-white px-3 py-3 text-center rounded-md w-fit hover:bg-blue-500 hover:text-white text-black text-xl font-bold"
            }
          >
            Search Vendors
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 sm:gap-14 justify-center items-center bg-white bg-opacity-30 w-full p-10">
          {/* Search Bar */}
          <div className="flex items-center gap-3 border-2 bg-white w-full sm:w-1/2 h-12 rounded-md px-2">
            <MagnifyingGlassIcon className="h-6 text-gray-500" />
            <input
              ref={inputRef}
              className="w-full h-full outline-none"
              placeholder="Enter Instagram handle or Business name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="w-full" ref={vendors}>
        {loading ? (
          <div className="flex sm:flex-row md:flex-row justify-center flex-col w-full gap-4 flex-wrap">
            {filteredAccounts.map((users) => (
              <div className="w-full sm:w-full md:w-[30.5%]">
                <div
                  key={users._id}
                  className="bg-white p-4 rounded shadow w-full sm:w-full"
                >
                  <div className="flex flex-col justify-between gap-4 w-full">
                    {/* Profile Image */}
                    {users.profile ? (
                      <img
                        src={`data:image/jpeg;base64,${users.profile}`}
                        alt="Profile"
                        className="w-24 h-24 object-cover rounded-full mt-4 border"
                      />
                    ) : (
                      <div className="w-24 h-24 mt-4 flex items-center justify-center text-center border rounded-full text-sm text-gray-400">
                        No Profile Image
                      </div>
                    )}
                    <div className="flex gap-3 items-center">
                      <h2 className="sm:text-xl font-bold">{users.fullName}</h2>
                    </div>{" "}
                    <div className="flex gap-3 items-center">
                      <a
                        href={users.instagramLink}
                        className="sm:text-xl text-blue-500"
                      >
                        @{users.instagramHandle}
                      </a>
                      {users.fullName &&
                      users.instagramHandle &&
                      users.phoneNumber &&
                      users.instagramLink &&
                      users.email &&
                      users.businessName &&
                      users.shopAddress &&
                      users.productImage &&
                      users.profile !== null ? (
                        <div className="w-6">
                          <img className="" src={Verify} />
                        </div>
                      ) : (
                        <div className="">not verified ❌</div>
                      )}
                    </div>
                    <div className="w-2/3 flex flex-col gap-4">
                      {users.instagramLink ? (
                        <a
                          href={users.instagramLink}
                          className="sm:text-xl underline text-blue-500 flex gap-2 items-center"
                        >
                          <img
                            className="w-4 h4"
                            src={Insta}
                            alt="insta icon"
                          />{" "}
                          <span className="">go to my instagram page</span>
                        </a>
                      ) : (
                        <span className="flex gap-2 items-center">
                          <img
                            className="w-4 h4"
                            src={Insta}
                            alt="insta icon"
                          />
                          <span className="">No Link Provided</span>
                        </span>
                      )}
                      <strong className="sm:font-semibold flex items-center gap-3">
                        <span className="">✍</span> {users.businessName}
                      </strong>
                      <strong className="sm:font-semibold flex items-center gap-3">
                        <span className="">🏠</span> {users.shopAddress}
                      </strong>
                      <strong className="sm:font-semibold flex items-center gap-3">
                        <span className="">📧</span> {users.email}
                      </strong>
                      <strong className="sm:font-semibold flex items-center gap-3">
                        <span className="">📞</span> {users.phoneNumber}
                      </strong>
                      {/* Product Image */}
                    </div>
                  </div>
                  <button
                    className="mt-3"
                    onClick={() =>
                      setDisplayProductId(
                        displayProductId === users._id ? null : users._id
                      )
                    }
                  >
                    Click to see my product.....
                  </button>
                </div>
                {displayProductId === users._id && (
                  <div className="flex justify-center sm:z-1 absolute sm:w-[29.8%] w-11/12 bg-white">
                    <span
                      onClick={() =>
                        setDisplayProductId(
                          displayProductId === users._id ? null : users._id
                        )
                      }
                      className="font-bold text-2xl absolute right-2 text-red-300 hover:text-red-500 cursor-pointer "
                    >
                      ❌
                    </span>
                    {users.productImage ? (
                      <div className="flex flex-col w-2/3 mb-5">
                        <p className="sm:text-xl font-semibold">
                          <strong>My product image</strong>
                        </p>
                        <img
                          src={`data:image/png;base64,${users.productImage}`}
                          alt="Product"
                          className="w-full h-40 object-cover mt-4 border rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 mt-4 flex items-center justify-center border text-sm text-gray-400">
                        No Product Image
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex sm:flex-row flex-col w-full gap-4">
            {results.map((users) => (
              <div
                key={users._id}
                className="bg-white p-4 rounded shadow w-fit"
              >
                {/* Profile Image */}
                {users.profile ? (
                  <img
                    src={`data:image/jpeg;base64,${users.profile}`}
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full mt-4 border"
                  />
                ) : (
                  <div className="w-24 h-24 mt-4 flex items-center justify-center text-center border rounded-full text-sm text-gray-400">
                    No Profile Image
                  </div>
                )}
                <div className="flex gap-3 items-center">
                  <h2 className="text-xl font-bold">{users.fullName}</h2>
                </div>{" "}
                <div className="flex gap-3 items-center">
                  <a
                    href={users.instagramLink}
                    className="text-xl text-blue-500"
                  >
                    @{users.instagramHandle}
                  </a>
                  {users.fullName &&
                  users.instagramHandle &&
                  users.phoneNumber &&
                  users.instagramLink &&
                  users.email &&
                  users.businessName &&
                  users.shopAddress &&
                  users.productImage &&
                  users.profile !== null ? (
                    <div className="w-6">
                      <img className="" src={Verify} />
                    </div>
                  ) : (
                    <div className="">not verified ❌</div>
                  )}
                </div>
                {users.instagramLink ? (
                  <a
                    href={users.instagramLink}
                    className="text-xl underline text-blue-500 flex gap-2 items-center"
                  >
                    <img className="w-4 h4" src={Insta} alt="insta icon" />{" "}
                    <span className="">go to my instagram page</span>
                  </a>
                ) : (
                  <span className="flex gap-2 items-center">
                    <img className="w-4 h4" src={Insta} alt="insta icon" />
                    <span className="">No Link Provided</span>
                  </span>
                )}
                <p className="font-semibold">✍ {users.businessName}</p>
                <p className="font-semibold">🏠 {users.shopAddress}</p>
                <p className="font-semibold">📧 {users.email}</p>
                <p className="font-semibold">📞 {users.phoneNumber}</p>
                {/* Product Image */}
                {users.productImage ? (
                  <>
                    <p className="font-semibold">My product image</p>
                    <img
                      src={`data:image/png;base64,${users.productImage}`}
                      alt="Product"
                      className="w-24 h-24 object-cover mt-4 border"
                    />
                  </>
                ) : (
                  <div className="w-24 h-24 mt-4 flex items-center justify-center border text-sm text-gray-400">
                    No Product Image
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
