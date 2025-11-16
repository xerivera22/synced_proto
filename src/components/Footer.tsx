import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#140e2b] text-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 font-bold text-2xl text-white mb-4">
              <img src="/syncED.png" alt="SyncED Logo" className="w-9 h-9" />
              <span>SyncED</span>
            </Link>
            <p className="leading-relaxed mb-6">
              Transforming school management with smart digital solutions. Empowering educators,
              students, and administrators.
            </p>
            {/* Social icons removed per request */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#why" className="text-gray-300 hover:text-white transition-colors">
                  Why SyncED
                </a>
              </li>
              <li>
                <a href="/#who" className="text-gray-300 hover:text-white transition-colors">
                  Who Can Use
                </a>
              </li>
              <li>
                <a href="/#services" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/#how" className="text-gray-300 hover:text-white transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="/#faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a
                  href="mailto:support@synced.com"
                  className="transition-colors text-gray-300 hover:text-white"
                >
                  support@synced.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span className="text-gray-300">+63 912 345 6789</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span className="text-gray-300">Manila, Philippines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-6" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm">© {currentYear} SyncED. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link to="/#privacy" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/#terms" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/#cookies" className="text-gray-300 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
