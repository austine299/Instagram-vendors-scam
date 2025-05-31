import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Verify from "./images/verify.PNG";
import Insta from "./images/instagram.png";
import Navbar from "./Navbar.js";

function AdminDashboard({ handleLogout, fetchUser}) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [account, setAccount] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // const handleLogout = () => {
  //   localStorage.removeItem("token"); // Remove the JWT
  //   navigate("/login");
  // };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/myAccount", {
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

  useEffect(() => {
    fetchUser();
  }, []);

  const filteredAccounts = account.filter((user) =>
    (user.instagramHandle + user.fullName)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="w-full p-4 justify-between bg-cover bg-slate-400 bg-center h-auto">
        {user ? (
          <></>
        ) : (
          <div className="mt-20 flex flex-col items-center bg-opacity-50 bg-slate-400 gap-8 p-4">
            <h1 className="font-bold text-2xl sm:text-3xl">
              How{" "}
              <span className="text-instacolor font-extrabold text-3xl sm:text-4xl">
                Instagram Vendors
              </span>{" "}
              Can Make Their Customers{" "}
              <span className="text-instacolor font-extrabold text-3xl sm:text-4xl">
                Happy
              </span>
            </h1>
            <p className="mt-3 sm:w-1/2 font-semibold text-xl font-sans bg-white bg-opacity-30 p-3 shadow-md">
              In today’s fast-paced digital marketplace, Instagram vendors have
              a unique opportunity to build strong, loyal customer bases by
              going beyond just selling products — it’s about creating a
              trustworthy, personalized experience. Here are key ways Instagram
              vendors can keep their customers happy and coming back:
            </p>
            <span className="text-8xl text-center text-instacolor">
              &#8595;
            </span>
          </div>
        )}

        {/* <span className="text-5xl hidden sm:block">&#8594;</span> */}
      </div>

      {/* Vendor Cards */}
      <div className="w-full">
        {loading && (
          <div>
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
                    <div className="w-24 h-24 mt-4 flex items-center justify-center text-center border rounded-full text-sm text-gray-400">
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
              <div className="p-4 flex flex-wrap w-full gap-2 text-gray-700 leading-relaxed space-y-3">
                <div>
                  <p className="w-full sm:w-72 bg-slate-400 bg-opacity-20 p-3 shadow-md">
                    <strong>1. Be Responsive and Friendly in DMs</strong>
                    <br />
                    Timely and polite communication is crucial. Respond to
                    inquiries within a reasonable time frame and use a friendly,
                    respectful tone. Quick, helpful responses build trust and
                    show that you value your customers.
                  </p>
                </div>

                <div>
                  <p className="w-full sm:w-72 bg-slate-400 bg-opacity-20 p-3 shadow-md">
                    <strong>
                      2. Post Clear and Honest Product Information
                    </strong>
                    <br />
                    Use high-quality images and videos, and provide detailed
                    descriptions including price, size, color options, delivery
                    time, and terms. Avoid misleading edits or filters —
                    transparency builds confidence and reduces returns or
                    complaints.
                  </p>
                </div>

                <div>
                  <p className="w-full sm:w-72 bg-slate-400 bg-opacity-20 p-3 shadow-md">
                    <strong>3. Share Real Reviews and Customer Feedback</strong>
                    <br />
                    Nothing builds credibility like social proof. Share
                    screenshots or repost stories from satisfied customers. This
                    shows potential buyers that others trust your products and
                    services.
                  </p>
                </div>

                <div>
                  <p className="w-full sm:w-72 bg-slate-400 bg-opacity-20 p-3 shadow-md">
                    <strong>4. Offer Smooth and Secure Payment Options</strong>
                    <br />
                    Make it easy for customers to pay by offering multiple
                    secure options — such as mobile transfers, bank deposits, or
                    third-party apps. Include payment instructions clearly and
                    confirm once payment is received.
                  </p>
                </div>

                <div>
                  <p className="w-full sm:w-72 bg-slate-400 bg-opacity-20 p-3 shadow-md">
                    <strong>5. Stick to Promised Delivery Timeframes</strong>
                    <br />
                    Always communicate expected delivery times honestly, and
                    update customers if there are delays. Timely delivery is one
                    of the biggest factors in a customer's experience.
                  </p>
                </div>

                <div>
                  <p className="w-full sm:w-72 bg-slate-400 bg-opacity-20 p-3 shadow-md">
                    <strong>
                      6. Package Products Neatly and Professionally
                    </strong>
                    <br />
                    Your product’s packaging is the first physical interaction
                    customers have with your brand. Neat, clean, and branded
                    packaging shows professionalism and makes customers feel
                    valued.
                  </p>
                </div>

                <div>
                  <p className="w-full sm:w-72 bg-slate-400 bg-opacity-20 p-3 shadow-md">
                    <strong>7. Be Ready to Handle Complaints Gracefully</strong>
                    <br />
                    Mistakes happen — but how you handle them matters. Apologize
                    sincerely, resolve the issue quickly, and offer fair
                    solutions. Turning a bad situation into a positive one
                    leaves a lasting impression.
                  </p>
                </div>

                <div>
                  <p className="w-full sm:w-72 bg-slate-400 bg-opacity-20 p-3 shadow-md">
                    <strong>8. Reward Loyal Customers</strong>
                    <br />
                    Offer small perks like discounts, early access to products,
                    or handwritten thank-you notes. These gestures foster
                    loyalty and show appreciation.
                  </p>
                </div>

                <div>
                  <p className="w-full sm:w-72 bg-slate-400 bg-opacity-20 p-3 shadow-md">
                    <strong>9. Stay Active and Authentic</strong>
                    <br />
                    Post consistently, share behind-the-scenes content,
                    introduce yourself and your team, and engage with your
                    community. The more real and relatable you are, the more
                    connected your customers will feel.
                  </p>
                </div>

                <div>
                  <p className="w-full sm:w-72 bg-slate-400 bg-opacity-20 p-3 shadow-md">
                    <strong>10. Collect Feedback and Keep Improving</strong>
                    <br />
                    Ask your customers for their opinions and take their
                    suggestions seriously. Constant improvement shows customers
                    that you care about their experience.
                  </p>
                </div>

                <div>
                  <p className="w-full sm:w-72 bg-slate-400 bg-opacity-20 p-3 shadow-md">
                    <strong>Final Thoughts</strong>
                    <br />
                    Happy customers = repeat business + free marketing. When
                    Instagram vendors focus on building relationships, not just
                    making sales, they create a community that supports their
                    growth long-term. 🌱
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
