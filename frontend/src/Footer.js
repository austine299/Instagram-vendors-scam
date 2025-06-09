import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-700 via-indigo-500 to-pink-500 text-white py-8 px-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        
        {/* Left Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">InstaVendorCheck</h2>
          <p className="text-sm text-white/80">
            Helping you verify Instagram vendors and stay safe from scams.
          </p>
        </div>

        {/* Center Section */}
        <div className="flex gap-6 text-lg">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaTwitter />
          </a>
          <a href="mailto:support@instavendorcheck.com" className="hover:text-gray-300">
            <FaEnvelope />
          </a>
        </div>

        {/* Right Section */}
        <div className="text-sm text-white/70 text-right">
          <p>© {new Date().getFullYear()} InstaVendorCheck</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
