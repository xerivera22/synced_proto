import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  showSignIn?: boolean;
  showRegister?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showSignIn = true, showRegister = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSectionClick = (e: React.MouseEvent, id: string) => {
    // If we are already on the landing page, do a smooth in-page scroll
    if (location.pathname === "/") {
      e.preventDefault();
      setMobileMenuOpen(false);
      // Defer to ensure mobile menu unmount doesn't affect scroll
      requestAnimationFrame(() => scrollToId(id));
      return;
    }
    // Otherwise navigate to the home route with hash; LandingPage effect will scroll
    navigate(`/#${id}`);
    setMobileMenuOpen(false);
  };

  const handleSignIn = () => {
    navigate("/register");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-lg border-b border-black/5 shadow-sm">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center gap-8 py-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold text-2xl text-primary transition-opacity hover:opacity-80 shrink-0"
          >
            <img
              src="/syncED.png"
              alt="SyncED Logo"
              className="w-9 h-9 object-contain bg-white p-1 rounded-md"
            />
            <span>SyncED</span>
          </Link>

          <ul className="hidden md:flex list-none gap-4 ml-auto items-center">
            <li>
              <Link
                to="/#why"
                className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors"
                onClick={(e) => handleSectionClick(e, "why")}
              >
                Why SyncED
              </Link>
            </li>
            <li>
              <Link
                to="/#who"
                className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors"
                onClick={(e) => handleSectionClick(e, "who")}
              >
                Who uses SyncED
              </Link>
            </li>
            <li>
              <Link
                to="/#services"
                className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors"
                onClick={(e) => handleSectionClick(e, "services")}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/#how"
                className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors"
                onClick={(e) => handleSectionClick(e, "how")}
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                to="/#faq"
                className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors"
                onClick={(e) => handleSectionClick(e, "faq")}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/#contact"
                className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors"
                onClick={(e) => handleSectionClick(e, "contact")}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="hidden md:flex gap-2 ml-3 pl-3 border-l border-black/10">
            {showSignIn && (
              <button
                type="button"
                onClick={handleSignIn}
                className="bg-secondary text-white border-0 rounded-xl px-6 py-3 font-semibold text-[0.95rem] cursor-pointer transition-all hover:bg-primary-dark hover:-translate-y-0.5 shadow-md"
              >
                Sign In
              </button>
            )}
            {showRegister && (
              <Link
                to="/register-form"
                className="bg-secondary text-white border-0 rounded-xl px-6 py-3 font-semibold text-[0.95rem] cursor-pointer transition-all hover:bg-primary-dark hover:-translate-y-0.5 shadow-md"
              >
                Register
              </Link>
            )}
          </div>

          <button
            type="button"
            className="md:hidden bg-transparent border-0 text-2xl cursor-pointer text-text ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-white z-40 md:hidden">
          <div className="flex flex-col gap-3 p-6">
            <Link
              to="/#why"
              className="text-text font-medium py-2 hover:text-primary"
              onClick={(e) => handleSectionClick(e, "why")}
            >
              Why SyncED
            </Link>
            <Link
              to="/#who"
              className="text-text font-medium py-2 hover:text-primary"
              onClick={(e) => handleSectionClick(e, "who")}
            >
              Who uses SyncED
            </Link>
            <Link
              to="/#services"
              className="text-text font-medium py-2 hover:text-primary"
              onClick={(e) => handleSectionClick(e, "services")}
            >
              Features
            </Link>
            <Link
              to="/#how"
              className="text-text font-medium py-2 hover:text-primary"
              onClick={(e) => handleSectionClick(e, "how")}
            >
              How it works
            </Link>
            <Link
              to="/#faq"
              className="text-text font-medium py-2 hover:text-primary"
              onClick={(e) => handleSectionClick(e, "faq")}
            >
              FAQ
            </Link>
            <Link
              to="/#contact"
              className="text-text font-medium py-2 hover:text-primary"
              onClick={(e) => handleSectionClick(e, "contact")}
            >
              Contact
            </Link>
            {showSignIn && (
              <button
                type="button"
                onClick={() => {
                  handleSignIn();
                  setMobileMenuOpen(false);
                }}
                className="bg-secondary text-white border-0 rounded-xl px-6 py-3 font-semibold mt-4"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
