import React, { useState, useRef, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import navLogo from '../assets/navLogo.png';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  async function handleLogOut() {
    localStorage.clear();
    navigate('/');
  }

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative flex justify-between items-center container mx-auto px-4 bg-white shadow-md h-16 py-1">
      {/* Logo */}
      <div>
        <img src={navLogo} height={12} width={220} alt="Logo" />
      </div>

      {/* User Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        {userInitial ? (
          <div>
            {/* Initials Button */}
            <div
              className="w-10 h-10 flex items-center justify-center bg-gray-600 text-white font-bold rounded-full cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {userInitial}
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                <p className="px-4 py-2 font-bold text-gray-800">{user.name}</p>
                <hr />

                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    // navigate('/transactions');
                    setIsOpen(false);
                  }}
                >
                  All Transactions
                </button>

                <hr />

                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    // navigate('/edit-profile');
                    setIsOpen(false);
                  }}
                >
                  Edit Profile
                </button>

                <hr />

                 {/* ✅ Admin Panel Button (Visible only for Admins) */}
                 {user.role === "Admin" && (
                  <>
                    <button
                      className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100 font-semibold"
                      onClick={() => {
                        navigate('/home/admin');  // ✅ Admin panel open yahi se hoga
                        setIsOpen(false);
                      }}
                    >
                      Admin Panel
                    </button>
                    <hr />
                  </>
                )}

                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    handleLogOut();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <IoMenu size={24} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
