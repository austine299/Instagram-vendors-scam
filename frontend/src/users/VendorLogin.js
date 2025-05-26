import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VendorLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post("https://instagram-vendors-server.onrender.com/login", form);
      const token = res.data.token;

      localStorage.setItem("token", token);
      navigate("/");
      // onLogin();
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-slate-50">
      <div className="w-full">
        <Link to="/">
          <ArrowLeftIcon className="h-8 hover:font-bold" />
        </Link>
      </div>
      <h1 className="font-bold text-4xl">Log In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-full sm:w-1/2 mt-8 bg-white p-9 rounded-lg"
      >
        <input
          type="text"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        <span className="flex justify-end hover:text-blue-600 underline">
          <Link to="/signup">create an account</Link>
        </span>
      </form>
    </div>
  );
}
