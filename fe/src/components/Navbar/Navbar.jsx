import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  User,
  Shield,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import AuthService from "../../services/authService";

const Navbar = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "bg-blue-700" : "";
  };

  return (
    <>
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center text-xl font-bold hover:text-blue-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                BIMCDE
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link
                  to="/home"
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 ${isActive(
                    "/home"
                  )}`}
                >
                  <div className="flex items-center">
                    <HomeIcon className="h-4 w-4 mr-1" />
                    Home
                  </div>
                </Link>

                {showModeratorBoard && (
                  <Link
                    to="/mod"
                    className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 ${isActive(
                      "/mod"
                    )}`}
                  >
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      Moderator Board
                    </div>
                  </Link>
                )}

                {showAdminBoard && (
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 ${isActive(
                      "/admin"
                    )}`}
                  >
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 mr-1" />
                      Admin Board
                    </div>
                  </Link>
                )}

                {currentUser && (
                  <Link
                    to="/user"
                    className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 ${isActive(
                      "/user"
                    )}`}
                  >
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      User Dashboard
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* User Menu (Desktop) */}
            <div className="hidden md:block">
              <div className="flex items-center">
                {currentUser ? (
                  <div className="relative ml-3">
                    <div>
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <div className="bg-red-400 rounded-full h-8 w-8 flex items-center justify-center text-white font-medium">
                          {currentUser.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="ml-2">{currentUser.username}</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                    {userMenuOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Your Profile
                        </Link>
                        <button
                          onClick={logOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Link
                      to="/login"
                      className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-3 py-2 rounded-md text-sm font-medium border border-blue-400 hover:bg-gray-700"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {currentUser && (
                <div className="bg-red-400 rounded-full h-8 w-8 flex items-center justify-center text-white font-medium mr-2">
                  {currentUser.username.charAt(0).toUpperCase()}
                </div>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 pb-3 pt-2">
            <div className="px-2 space-y-1">
              <Link
                to="/home"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <HomeIcon className="h-5 w-5 mr-2" />
                  Home
                </div>
              </Link>

              {showModeratorBoard && (
                <Link
                  to="/mod"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Moderator Board
                  </div>
                </Link>
              )}

              {showAdminBoard && (
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Admin Board
                  </div>
                </Link>
              )}

              {currentUser && (
                <Link
                  to="/user"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    User Dashboard
                  </div>
                </Link>
              )}

              {currentUser ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logOut}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign out
                    </div>
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium border border-blue-400 text-white hover:bg-gray-700 text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
