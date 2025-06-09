import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Verify from "./images/verify.PNG";
import Insta from "./images/instagram.png";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

function AdminDashboard({ handleLogout, fetchUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [account, setAccount] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const isVerified =
    user.fullName &&
    user.instagramHandle &&
    user.instagramLink &&
    user.email &&
    user.businessName &&
    user.shopAddress &&
    user.phoneNumber &&
    user.productImage &&
    user.profile !== null;

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://instagram-vendors-server.onrender.com";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }

      try {
        const res = await axios.get(`${baseURL}/myAccount`, {
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
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="w-full px-6 sm:px-12 pt-8">
        {!user ? (
          <section className="mt-20 text-center space-y-8 bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl sm:text-4xl font-bold leading-snug">
              How <span className="text-instacolor">Instagram Vendors</span> Can
              Make Their Customers{" "}
              <span className="text-instacolor">Happy</span>
            </h1>
            <p className="text-lg sm:w-2/3 mx-auto bg-white bg-opacity-60 p-4 shadow rounded-md">
              Instagram vendors can stand out by building a brand of trust and
              transparency. Here's how to make your customers come back again
              and again.
            </p>
            <span className="text-6xl text-instacolor">&#8595;</span>
          </section>
        ) : (
          <div className="mt-8 flex flex-col sm:flex-row gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full sm:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                {user.profile ? (
                  <img
                    src={`data:image/jpeg;base64,${user.profile}`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full flex items-center justify-center border text-gray-400 text-sm">
                    No Profile Image
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold">{user.fullName}</h2>
                  {isVerified ? (
                    <img src={Verify} className="w-6 mt-1" alt="Verified" />
                  ) : (
                    <Link to="/kyc" className="text-red-600 underline text-sm">
                      Complete Verification ❌
                    </Link>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <a
                    href={user.instagramLink}
                    className="text-blue-500 font-medium flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Insta} alt="Insta" className="w-4 h-4" />@
                    {user.instagramHandle}
                  </a>
                </p>
                <p className="font-medium">✍ {user.businessName}</p>
                <p className="font-medium">🏠 {user.shopAddress}</p>
                <p className="font-medium">📧 {user.email}</p>
                <p className="font-medium">📞 {user.phoneNumber}</p>

                {isVerified ? (
                  <p className="mt-3 text-green-600 font-semibold">
                    ✅ You are verified
                  </p>
                ) : (
                  <Link
                    to="/kyc"
                    className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold"
                  >
                    Complete Verification
                  </Link>
                )}
              </div>
            </div>

            {/* Product Image */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full sm:w-1/2">
              <h3 className="text-lg font-bold mb-2">My Product</h3>
              {user.productImage ? (
                <img
                  src={`data:image/png;base64,${user.productImage}`}
                  alt="Product"
                  className="w-full h-64 object-cover rounded-md border"
                />
              ) : (
                <div className="h-64 flex items-center justify-center border rounded-md text-gray-400">
                  No Product Image
                </div>
              )}
            </div>
          </div>
        )}

        {/* Static Tips Section */}
        {!user && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-2xl transition duration-300"
              >
                <h4 className="font-bold text-md mb-2">{tip.title}</h4>
                <p className="text-sm text-gray-700">{tip.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

const tips = [
  {
    title: "1. Be Responsive and Friendly in DMs",
    description:
      "Quick, respectful replies build trust. Be helpful and show you care.",
  },
  {
    title: "2. Post Clear and Honest Product Info",
    description:
      "Use real photos and detailed descriptions. Avoid over-editing or misleading content.",
  },
  {
    title: "3. Share Real Reviews",
    description: "Showcase customer feedback. Real reviews build confidence.",
  },
  {
    title: "4. Offer Smooth Payment Options",
    description:
      "Provide easy and secure ways to pay. Confirm receipt clearly.",
  },
  {
    title: "5. Deliver On Time",
    description:
      "Stick to promised delivery dates. Communicate clearly if delayed.",
  },
  {
    title: "6. Neat Packaging Matters",
    description: "Professional packaging improves perception and adds delight.",
  },
  {
    title: "7. Handle Complaints Gracefully",
    description:
      "Solve problems quickly and politely. Turn issues into loyalty.",
  },
  {
    title: "8. Reward Loyal Customers",
    description:
      "Give small perks like discounts or shoutouts to keep them coming back.",
  },
  {
    title: "9. Stay Active & Authentic",
    description: "Engage often. Share behind-the-scenes, and be human.",
  },
  {
    title: "10. Keep Improving",
    description:
      "Ask for feedback. Keep adjusting and showing customers you care.",
  },
];

export default AdminDashboard;
