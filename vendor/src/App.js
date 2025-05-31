import { HashRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import AdminDashboard from "./AdminDashboard.js";
import VendorSignUp from "./users/VendorSignUp.js";
import VendorLogin from "./users/VendorLogin.js";
import CompleteKYC from "./users/CompleteKYC.js";
import Privacy from "./users/privacy.js";
import Navbar from "./Navbar.js";

function App() {
  const [user, setUser] = useState(null);
  const [activeSignUp, setActiveSignUp] = useState(false);
  const [activeSignIn, setActiveSignIn] = useState(false);
  const [activeBusi, setActiveBusi] = useState(false);

  const handleActivebusiness = () => {
    setActiveBusi(true);
    setActiveSignUp(false);
    setActiveSignIn(false);
  };

  const handleActiveSignUP = () => {
    setActiveSignUp(true);
    setActiveSignIn(false);
    setActiveBusi(false);
  };

  const handleActiveSignIn = () => {
    setActiveSignIn(true);
    setActiveSignUp(false);
    setActiveBusi(false);
  };

  
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


  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/"; // You can also use navigate if needed
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          user={user}
          handleLogout={handleLogout}
          handleActiveSignIn={handleActiveSignIn}
          handleActiveSignUP={handleActiveSignUP}
          handleActivebusiness={handleActivebusiness}
          activeBusi={activeBusi}
          activeSignIn={activeSignIn}
          activeSignUp={activeSignUp}
        />
        <Routes>
          <Route
            path="/"
            element={<AdminDashboard user={user} handleLogout={handleLogout} fetchUser={fetchUser}/>}
          />
          <Route path="/signup" element={<VendorSignUp />} />
          <Route
            path="/kyc"
            element={
              <Privacy>
                <CompleteKYC />
              </Privacy>
            }
          />
          <Route path="/login" element={<VendorLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
