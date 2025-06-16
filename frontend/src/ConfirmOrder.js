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

  // Fetch vendors
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

  // Fetch orders when vendor is selected
  useEffect(() => {
    const fetchOrders = async () => {
      if (!selectedVendor) return;
      try {
        const res = await axios.get(
          `${baseURL}/api/orders?vendorId=${selectedVendor}`
        );
        console.log("Fetched orders:", res.data);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };
    fetchOrders();
  }, [selectedVendor]);

  // Auto-clear messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleOrderSelection = (e) => {
    const selectedId = e.target.value;
    setSelectedOrder(selectedId);
    setOrderId(selectedId);
  };

  const handleConfirmDelivery = async () => {
    if (!orderId) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${baseURL}/api/confirm-delivery`, {
        orderId,
      });
      setMessage(res.data.message);

      // Refresh orders
      const updated = await axios.get(
        `${baseURL}/api/orders?vendorId=${selectedVendor}`
      );
      setOrders(updated.data);

      // Clear selection
      setSelectedOrder("");
      setOrderId("");
    } catch (err) {
      console.error("❌ Delivery confirmation error:", err);
      setMessage(err.response?.data?.error || "Error confirming delivery");
    } finally {
      setLoading(false);
    }
  };

  const currentOrder = orders.find((o) => o.orderId === selectedOrder);
  const alreadyConfirmed = currentOrder?.deliveryConfirmedByCustomer;

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">
        Confirm You Received Your Order
      </h2>

      <label className="block mb-2 font-medium">Select Vendor:</label>
      <select
        className="border p-2 w-full mb-4"
        value={selectedVendor}
        onChange={(e) => setSelectedVendor(e.target.value)}
      >
        <option value="">Select a Vendor</option>
        {vendors.map((vendor) => (
          <option key={vendor._id} value={vendor._id}>
            {vendor.fullName} (@{vendor.instagramHandle})
          </option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Select Your Order:</label>
      <select
        className="border p-2 w-full mb-4"
        value={selectedOrder}
        onChange={handleOrderSelection}
      >
        <option value="">Select an Order</option>
        {orders.map((order) => (
          <option
            key={order.orderId}
            value={order.orderId}
            disabled={order.deliveryConfirmedByCustomer}
          >
            {order.productDescription} - #{order.orderId}
            {order.deliveryConfirmedByCustomer ? " ✅ Confirmed" : ""}
          </option>
        ))}
      </select>

      {selectedOrder && currentOrder && (
        <div className="mb-4 text-sm text-gray-700">
          <p>
            <strong>Product:</strong> {currentOrder.productDescription}
          </p>
          <p>
            <strong>Amount:</strong> ₦{currentOrder.amount.toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {currentOrder.status}
          </p>
          <p>
            <strong>Confirmed:</strong>{" "}
            {currentOrder.deliveryConfirmedByCustomer ? "Yes ✅" : "No"}
          </p>
        </div>
      )}

      {alreadyConfirmed && (
        <div className="text-yellow-600 text-sm mb-2">
          ⚠️ This order has already been confirmed.
        </div>
      )}

      <button
        onClick={handleConfirmDelivery}
        className={`px-4 py-2 rounded text-white w-full ${
          alreadyConfirmed || !orderId
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
        disabled={loading || !orderId || alreadyConfirmed}
      >
        {loading ? "Processing..." : "I've Received My Order"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-green-600 flex items-center gap-2">
          ✅ {message}
        </p>
      )}
    </div>
  );
};

export default OrderConfirmation;
