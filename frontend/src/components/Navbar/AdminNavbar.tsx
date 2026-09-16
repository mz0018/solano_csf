import { useRef, useState } from "react";

import {
  UserRound,
  Bell,
  ChevronDown,
  // Search
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
    <header className="flex items-center justify-between sidebar-surface text-[#1f2937] border-b border-[#cbd5e1] px-6 py-3 shadow-xs">

      {/* Left */}
      <div className="flex w-full items-center gap-3">
        {/* <div className="relative w-full max-w-md">
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div> */}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Notifications */}
        <button
          type="button"
          onClick={() => navigate("/admin/settings/notifications")}
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
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
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
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
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
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

