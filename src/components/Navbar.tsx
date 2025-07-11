
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, PenTool, Home, User, Menu, X } from 'lucide-react';
import { isAuthenticated, removeToken } from '../utils/auth';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    console.log("Logging out...");
    removeToken();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to={authenticated ? "/dashboard" : "/"} 
            className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            onClick={handleNavClick}
          >
            <PenTool className="h-8 w-8" />
            <span>BlogCompass</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {authenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/create-post" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/create-post') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <PenTool className="h-4 w-4" />
                  <span>Create Post</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/login') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                    isActive('/register') ? 'bg-blue-700' : ''
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {authenticated ? (
                <>
                  <Link
                    to="/dashboard" 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/dashboard') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={handleNavClick}
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    to="/create-post" 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/create-post') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={handleNavClick}
                  >
                    <PenTool className="h-5 w-5" />
                    <span>Create Post</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/login') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={handleNavClick}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                      isActive('/register') ? 'bg-blue-700' : ''
                    }`}
                    onClick={handleNavClick}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
