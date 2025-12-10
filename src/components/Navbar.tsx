import syncEDLogo from "@/assets/syncED.png";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  showSignIn?: boolean;
  showRegister?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showSignIn = true, showRegister = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/75 backdrop-blur-lg shadow-sm border-b border-black/5"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center gap-8 py-4">
          <Link
            to="/"
            className={`flex items-center gap-2.5 font-bold text-2xl transition-opacity hover:opacity-80 shrink-0 ${
              isScrolled ? "text-primary" : "text-white"
            }`}
          >
            <img
              src={syncEDLogo}
              alt="SyncED Logo"
              className="w-9 h-9 object-contain bg-white p-1 rounded-md"
            />
            <span>SyncED</span>
          </Link>

          <ul className="hidden md:flex list-none gap-4 ml-auto items-center">
            {[
              { id: "why", label: "Why SyncED" },
              { id: "who", label: "Who uses SyncED" },
              { id: "services", label: "Features" },
              { id: "how", label: "How it works" },
              { id: "faq", label: "FAQ" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <li key={item.id}>
                <Link
                  to={`/#${item.id}`}
                  className={`font-medium text-[0.95rem] transition-colors ${
                    isScrolled
                      ? "text-text hover:text-primary"
                      : "text-white hover:text-white/80"
                  }`}
                  onClick={(e) => handleSectionClick(e, item.id)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`hidden md:flex gap-2 ml-3 pl-3 border-l ${
              isScrolled ? "border-black/10" : "border-white/20"
            }`}
          >
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
            className={`md:hidden bg-transparent border-0 text-2xl cursor-pointer ml-auto ${
              isScrolled ? "text-text" : "text-white"
            }`}
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
