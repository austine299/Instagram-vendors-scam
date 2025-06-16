// CustomerOrderPage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CustomerOrderPage() {
  const [vendorId, setVendorId] = useState("");
  const [amount, setAmount] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [vendors, setVendors] = useState([]);

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://instagram-vendors-server.onrender.com";

  // Fetch vendor list on load
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get(`${baseURL}/vendors`);
        setVendors(res.data);
      } catch (err) {
        console.error("Failed to load vendors", err);
      }
    };
    fetchVendors();
  }, []);

  const handleCheckout = async () => {
    if (!vendorId || !amount || !productDescription || !customerName || !customerEmail) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/initiate-checkout`, {
        vendorId,
        amount: parseFloat(amount),
        productDescription,
        customer: {
          name: customerName,
          email: customerEmail
        }
      });
      setCheckoutUrl(response.data.checkoutUrl);
    } catch (err) {
      alert("Failed to initiate checkout");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-xl mx-auto p-4 h-screen">
      <h2 className="text-xl font-bold mb-4 mx-auto">Pay Vendor</h2>

      <label className="block mb-1 font-medium">Select Vendor:</label>
      <select
        value={vendorId}
        onChange={(e) => setVendorId(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="">Select a Vendor</option>
        {vendors.map((vendor) => (
          <option key={vendor._id} value={vendor._id}>
            {vendor.fullName} ({vendor.instagramHandle})
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount (₦)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="text"
        placeholder="Product Description"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="text"
        placeholder="Your Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="email"
        placeholder="Your Email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">
        Pay Now
      </button>

      {checkoutUrl && (
        <div className="mt-4">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Complete Payment
          </a>
        </div>
      )}
    </div>
  );
}
