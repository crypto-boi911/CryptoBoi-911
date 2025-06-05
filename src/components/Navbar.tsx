
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  const navItems: { name: string; path: string }[] = [];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cyber-dark/95 backdrop-blur-lg border-b border-cyber-blue/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyber-blue" />
            <span className="font-cyber text-xl font-bold text-cyber-blue">
              CRYPTOBOI-911
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-tech font-medium transition-colors duration-300 hover:text-cyber-blue ${
                  location.pathname === item.path ? 'text-cyber-blue' : 'text-cyber-light'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="cyber-button flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/get-started" className="cyber-button">
                <span>Get Started</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cyber-light hover:text-cyber-blue transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cyber-darker/95 backdrop-blur-lg border-t border-cyber-blue/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 font-tech font-medium transition-colors duration-300 hover:text-cyber-blue ${
                    location.pathname === item.path ? 'text-cyber-blue' : 'text-cyber-light'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                {isAuthenticated ? (
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="cyber-button w-full flex items-center gap-2 justify-center"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link 
                    to="/get-started" 
                    onClick={() => setIsOpen(false)}
                    className="cyber-button w-full block text-center"
                  >
                    <span>Get Started</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
