import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderConfirmation = () => {
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://instagram-vendors-server.onrender.com";



  useEffect(() => {
    // Fetch vendors on load
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

  useEffect(() => {
    // Fetch orders when vendor is selected
    const fetchOrders = async () => {
      if (!selectedVendor) return;
      try {
        const res = await axios.get(`${baseURL}/api/orders?vendorId=${selectedVendor}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };
    fetchOrders();
  }, [selectedVendor]);

  const handleOrderSelection = (e) => {
    const selectedId = e.target.value;
    setSelectedOrder(selectedId);
    setOrderId(selectedId); // auto-fill
  };

  const handleConfirmDelivery = async () => {
    if (!orderId) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${baseURL}/api/confirm-delivery`, {
        orderId
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error confirming delivery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Confirm You Received Your Order</h2>

      <label className="block mb-2 font-medium">Select Vendor:</label>
      <select
        className="border p-2 w-full mb-4"
        value={selectedVendor}
        onChange={(e) => setSelectedVendor(e.target.value)}
      >
        <option value="">Select a Vendor</option>
        {vendors.map((vendor) => (
          <option key={vendor._id} value={vendor._id}>
            {vendor.fullName} ({vendor.instagramHandle})
          </option>
        ))}
      </select>

      {orders.length > 0 && (
        <>
          <label className="block mb-2 font-medium">Select Your Order:</label>
          <select
            className="border p-2 w-full mb-4"
            value={selectedOrder}
            onChange={handleOrderSelection}
          >
            <option value="">Select an Order</option>
            {orders.map((order) => (
              <option key={order.orderId} value={order.orderId}>
                {order.productDescription} - #{order.orderId}
              </option>
            ))}
          </select>
        </>
      )}

      <label className="block mb-2 font-medium">Order ID (auto-filled):</label>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={handleConfirmDelivery}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading || !orderId}
      >
        {loading ? "Processing..." : "I've Received My Order"}
      </button>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default OrderConfirmation;
