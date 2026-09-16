import { useRef, useState } from "react";

import {
  UserRound,
  Bell,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BtnSignout } from "../buttons/BtnSignout";

export const AdminNavbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Timer for delayed dropdown closing
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleProfileToggle = () => {
    // Cancel pending close
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsProfileOpen((prev) => !prev);
  };

  const handleProfileEnter = () => {
    // Cancel pending close when mouse comes back
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleProfileLeave = () => {
    // Only close if dropdown is currently open
    if (!isProfileOpen) return;

    closeTimeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 200);
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-xs">

      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold leading-tight text-gray-800">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Client Satisfactory Feedback System
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Notifications */}
        <button
          type="button"
          onClick={() => navigate("/admin/settings/notifications")}
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
          aria-label="Notifications"
        >
          <Bell size={17} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Profile */}
        <div
          className="relative flex items-center gap-2 rounded-lg px-2 py-1.5"
          onMouseEnter={handleProfileEnter}
          onMouseLeave={handleProfileLeave}
        >

          {/* Avatar */}
          <button
            type="button"
            onClick={() => navigate("/admin/settings/profile")}
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
            aria-label="Profile"
          >
            <UserRound size={17} />
          </button>

          {/* Name + Dropdown Toggle */}
          <button
            type="button"
            onClick={handleProfileToggle}
            className="hidden cursor-pointer items-center gap-1 text-left sm:flex"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
          >
            <span className="text-sm font-medium text-gray-700">
              Welcome back, {user?.userName}
            </span>

            <ChevronDown
              size={15}
              className={`text-gray-400 transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {isProfileOpen && (
            <div
              className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
              onMouseEnter={handleProfileEnter}
              onMouseLeave={handleProfileLeave}
            >
              <BtnSignout />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

