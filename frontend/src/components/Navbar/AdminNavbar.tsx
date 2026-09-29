import { useRef, useState } from "react";

import {
  UserRound,
  Bell,
  ChevronDown,
  Minus,
  UserCheck
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BtnSignout } from "../buttons/BtnSignout";

export const AdminNavbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleProfileToggle = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsProfileOpen((prev) => !prev);
  };

  const handleProfileEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleProfileLeave = () => {
    if (!isProfileOpen) return;

    closeTimeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 200);
  };

  return (
    <header className="sidebar-surface flex items-center justify-between border-b border-[#cbd5e1] px-4 py-3 text-[#1f2937] shadow-xs sm:px-6">

      {/* Left */}
      <div className="flex min-w-0 flex-1 items-center">
        <div className="hidden min-w-0 items-center gap-2 lg:flex">
          <UserCheck
            size={16}
            strokeWidth={2}
            className="shrink-0 text-gray-400"
          />

          <span className="truncate text-sm font-medium uppercase tracking-wide text-gray-700">
            {user?.role?.replaceAll("_", " ")}:
          </span>

          <span className="truncate text-sm capitalize text-gray-500">
            {user?.userName}
          </span>

          <span
            className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 ring-2 ring-emerald-100"
            title="Active"
            aria-label="Active"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-2">

        {/* Notifications */}
        <button
          type="button"
          onClick={() => navigate("/admin/settings/notifications")}
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={17} strokeWidth={2} />

          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"
            aria-hidden="true"
          />
        </button>

        {/* Profile */}
        <div
          className="relative flex items-center gap-2"
          onMouseEnter={handleProfileEnter}
          onMouseLeave={handleProfileLeave}
        >
          {/* Profile */}
          <button
            type="button"
            onClick={() => navigate("/admin/settings/profile")}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
            aria-label="Profile"
            title="Profile"
          >
            <UserRound size={17} strokeWidth={2} />
          </button>

          {/* Profile Menu Toggle */}
          <button
            type="button"
            onClick={handleProfileToggle}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
            aria-label="Open profile menu"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            title="Profile menu"
          >
            <ChevronDown
              size={17}
              strokeWidth={2}
              className={`transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Menu */}
          {isProfileOpen && (
            <div
              className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
              onMouseEnter={handleProfileEnter}
              onMouseLeave={handleProfileLeave}
              role="menu"
            >
              <BtnSignout />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
