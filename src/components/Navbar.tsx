import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  showSignIn?: boolean;
  showRegister?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showSignIn = true, showRegister = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/register');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-lg border-b border-black/5 shadow-sm">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center gap-8 py-4">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-2xl text-primary transition-opacity hover:opacity-80 shrink-0">
            <img src="/syncED.png" alt="SyncED Logo" className="w-9 h-9 object-contain bg-white p-1 rounded-md" />
            <span>SyncED</span>
          </Link>

      <ul className="hidden md:flex list-none gap-4 ml-auto items-center">
        <li><a href="/#why" className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors">Why SyncED</a></li>
        <li><a href="/#who" className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors">Who uses SyncED</a></li>
        <li><a href="/#services" className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors">Features</a></li>
        <li><a href="/#how" className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors">How it works</a></li>
        <li><a href="/#faq" className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors">FAQ</a></li>
        <li><a href="/#contact" className="text-text font-medium text-[0.95rem] hover:text-primary transition-colors">Contact</a></li>
      </ul>

      <div className="hidden md:flex gap-2 ml-3 pl-3 border-l border-black/10">
        {showSignIn && (
          <button 
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
            <a href="/#why" className="text-text font-medium py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Why SyncED</a>
            <a href="/#who" className="text-text font-medium py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Who uses SyncED</a>
            <a href="/#services" className="text-text font-medium py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="/#how" className="text-text font-medium py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>How it works</a>
            <a href="/#faq" className="text-text font-medium py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="/#contact" className="text-text font-medium py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            {showSignIn && (
              <button 
                onClick={() => { handleSignIn(); setMobileMenuOpen(false); }}
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
