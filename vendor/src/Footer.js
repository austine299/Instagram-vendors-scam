import { FaInstagram, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row sm:justify-between items-center sm:items-center gap-6 text-sm text-gray-600">
        
        {/* Branding */}
        <div className="flex flex-col sm:items-start items-center justify-center">
          <h2 className="text-xl font-bold text-instacolor">InstaVendorCheck</h2>
          <p className="max-w-xs mt-2 text-center sm:text-left">
            Helping you build trust and protect buyers—one verified vendor at a time.
          </p>
        </div>

        {/* Contact / Links */}
        <div className="space-y-2">
          <div className="flex sm:justify-start justify-center items-center gap-2">
            <FaInstagram className="text-pink-500" />
            <a
              href="https://instagram.com/instavendorcheck"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-instacolor transition"
            >
              @instavendorcheck
            </a>
          </div>
          <div className="flex sm:justify-start justify-center items-center gap-2">
            <FaEnvelope className="text-indigo-500" />
            <a
              href="mailto:support@instavendorcheck.com"
              className="hover:text-instacolor transition"
            >
              support@instavendorcheck.com
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="sm:text-right text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} InstaVendorCheck</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
