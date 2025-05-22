import { useEffect, useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import SearchVendor from "./images/search-vendors.PNG";
import SignUpKyc from "./images/sign-up-KYC.PNG";
import VerifiedVendors from "./images/verified-vendors.PNG";
import Verify from "./images/verify.PNG";
import Insta from "./images/instagram.png";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [account, setAccount] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeBusi, setActiveBusi] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

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
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the JWT
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/vendors")
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
      const res = await axios.get("http://localhost:5000/myAccount", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    };

    fetchUser();
  }, []);

  const filteredAccounts = account.filter((user) =>
    (user.instagramHandle + user.fullName)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full p-4 gap-8 bg-slate-50">
      {user ? (
        <div className="flex justify-end w-full px-4 hover:text-blue-600 hover:underline font-semibold">
          <button className="" onClick={handleLogout}>
            Log out
          </button>
        </div>
      ) : (
        <div className="flex justify-end w-full px-4font-semibold">
          <Link
            to="/login"
            className="bg-blue-600 px-4 text-white font-bold hover:bg-blue-400 rounded-md"
          >
            Log in
          </Link>
        </div>
      )}
      <h1 className="text-4xl font-bold text-center">
        Protect Yourself From Scams — Verify Instagram Vendors
      </h1>
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full sm:w-1/2">
        <button
          onClick={() =>{ handleClick();  handleActiveSearch() }}
          className={
            activeSearch
              ? "border-2 bg-blue-700 px-3 py-3 rounded-md w-10/12 hover:bg-blue-500 hover:text-white text-white text-xl font-bold"
              : "border-2 bg-white px-3 py-3 text-center rounded-md w-10/12 hover:bg-blue-500 hover:text-white text-black text-xl font-bold"
          }
        >
          Search Vendors
        </button>
        <Link
          to="/kyc"
          onClick={handleActivebusiness}
          className={
            activeBusi
              ? "border-2 bg-blue-700 px-3 py-3 rounded-md w-10/12 hover:bg-blue-500 hover:text-white text-white text-xl font-bold"
              : "border-2 bg-white px-3 py-3 text-center rounded-md w-10/12 hover:bg-blue-500 hover:text-white text-black text-xl font-bold"
          }
        >
          Verify My Business
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 justify-around items-center bg-white w-full py-6">
        <div
          className="flex flex-col items-center text-center w-2/3 sm:w-1/5 cursor-pointer"
          onClick={handleClick}
        >
          <img className="w-full" src={SearchVendor} alt="Search" />
          <p className="text-center text-2xl font-semibold">
            Search for <br /> Instagram vendors
          </p>
        </div>

        <span className="text-5xl hidden sm:block">&#8594;</span>
        <span className="text-5xl sm:hidden">&#8595;</span>

        <div className="flex flex-col text-center w-2/3 sm:w-1/5">
          <img className="w-full" src={SignUpKyc} alt="KYC" />
          {user ? (
            <></>
          ) : (
            <>
              {" "}
              <Link
                to="/signup"
                className="text-center text-2xl font-semibold cursor-pointer hover:text-blue-700 hover:underline"
              >
                Vendors sign up
              </Link>
              <span className="text-2xl">and</span>
            </>
          )}
          <Link
            to="/kyc"
            className="text-center text-2xl font-semibold cursor-pointer hover:text-blue-700 hover:underline"
          >
            complete KYC verification
          </Link>
        </div>

        <span className="text-5xl hidden sm:block">&#8594;</span>
        <span className="text-5xl sm:hidden">&#8595;</span>

        <div className="flex flex-col text-center w-2/3 sm:w-1/5">
          <img
            className="w-full"
            src={VerifiedVendors}
            alt="Verified Vendors"
          />
          <p className="text-center text-2xl font-semibold">
            View verified vendors and avoid scams
          </p>
        </div>
      </div>

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

      {/* Vendor Cards */}
      <div className="w-full">
        {loading ? (
          <>
            {user ? (
              <div className="flex sm:flex-row flex-col w-full gap-4">
                <div className="bg-white p-5 sm:w-1/2">
                  {user.profile ? (
                    <img
                      src={`data:image/jpeg;base64,${user.profile}`}
                      alt="Profile"
                      className="w-24 h-24 object-cover rounded-full mt-4 border"
                    />
                  ) : (
                    <div className="w-24 h-24 mt-4 flex items-center justify-center border rounded-full text-sm text-gray-400">
                      No Profile Image
                    </div>
                  )}
                  <div>
                    <div className="flex gap-3 items-center">
                      <h2 className="text-xl font-bold">{user.fullName}</h2>
                      {user.fullName &&
                      user.instagramHandle &&
                      user.instagramLink &&
                      user.email &&
                      user.businessName &&
                      user.shopAddress &&
                      user.phoneNumber &&
                      user.productImage &&
                      user.profile !== null ? (
                        <div className="w-6">
                          <img className="" src={Verify} />
                        </div>
                      ) : (
                        <a href="#" className="text-red-500 underline">
                          complete verification ❌{" "}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-18 p-4 w-full">
                    <div className="w-2/3">
                      <p>
                        {" "}
                        <a
                          href={user.instagramLink}
                          className="text-xl text-blue-500"
                        >
                          @{user.instagramHandle}
                        </a>
                      </p>
                      {user.instagramLink ? (
                        <a
                          href={user.instagramLink}
                          className="text-xl underline text-blue-500 flex gap-2 items-center"
                        >
                          <img
                            className="w-4 h4"
                            src={Insta}
                            alt="insta icon"
                          />{" "}
                          <span className="">go to my instagram page</span>
                        </a>
                      ) : (
                        <span className="">
                          <img
                            className="w-4 h4"
                            src={Insta}
                            alt="insta icon"
                          />
                          No Link Provided
                        </span>
                      )}
                      <p className="font-semibold">✍ {user.businessName}</p>
                      <p className="font-semibold">🏠 {user.shopAddress}</p>
                      <p className="font-semibold">📧 {user.email}</p>
                      <p className="font-semibold">📞 {user.phoneNumber}</p>
                      {/* Product Image */}

                      <div className="">
                        {user.fullName &&
                        user.instagramHandle &&
                        user.phoneNumber &&
                        user.instagramLink &&
                        user.email &&
                        user.businessName &&
                        user.shopAddress &&
                        user.productImage &&
                        user.profile !== null ? (
                          <div className="w-full">
                            <button className="">You are verified ✔️</button>
                          </div>
                        ) : (
                          <div className="w-1/2 bg-blue-600 text-white mt-4 rounded-md text-center font-bold p-2">
                            <Link to="/kyc" className="">
                              complete verification
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className=" w-1/4">
                      {user.productImage ? (
                        <>
                          <p className="font-semibold">My product image</p>
                          <img
                            src={`data:image/png;base64,${user.productImage}`}
                            alt="Product"
                            className="w-full h-40 object-cover mt-4 border"
                          />
                        </>
                      ) : (
                        <div className="w-24 h-24 mt-4 flex items-center justify-center border text-sm text-gray-400">
                          No Product Image
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex sm:flex-row md:flex-row flex-col w-full gap-4 flex-wrap">
                {filteredAccounts.map((users) => (
                  <div
                    key={users._id}
                    className="bg-white p-4 rounded shadow w-full sm:w-full md:w-[32.5%]"
                  >
                    {/* Profile Image */}
                    {users.profile ? (
                      <img
                        src={`data:image/jpeg;base64,${users.profile}`}
                        alt="Profile"
                        className="w-24 h-24 object-cover rounded-full mt-4 border"
                      />
                    ) : (
                      <div className="w-24 h-24 mt-4 flex items-center justify-center border rounded-full text-sm text-gray-400">
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
                    <div className="flex justify-between gap-2 w-full">
                      <div className="w-2/3 flex flex-col gap-4">
                        {users.instagramLink ? (
                          <a
                            href={users.instagramLink}
                            className="text-xl underline text-blue-500 flex gap-2 items-center"
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
                        <p className="font-semibold flex items-center gap-3"><span className="">✍</span> {users.businessName}</p>
                        <p className="font-semibold flex items-center gap-3"><span className="">🏠</span> {users.shopAddress}</p>
                        <p className="font-semibold flex items-center gap-3"><span className="">📧</span> {users.email}</p>
                        <p className="font-semibold flex items-center gap-3"><span className="">📞</span> {users.phoneNumber}</p>
                        {/* Product Image */}
                      </div>
                      {users.productImage ? (
                        <div className=" flex flex-col">
                          <p className="font-semibold"><strong>My product image</strong></p>
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
                  </div>
                ))}
              </div>
            )}
          </>
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
                  <div className="w-24 h-24 mt-4 flex items-center justify-center border rounded-full text-sm text-gray-400">
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
