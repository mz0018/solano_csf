
import { useRef, useState } from "react";

import {
  UserRound,
  Bell,
  ChevronDown,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { BtnSignout } from "../buttons/BtnSignout";

type AdminNavbarProps = {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

export const AdminNavbar = ({
  sidebarCollapsed,
  onToggleSidebar,
}: AdminNavbarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isNotificationsActive = pathname.startsWith(
    "/admin/settings/notifications"
  );

  const isProfileActive = pathname.startsWith(
    "/admin/settings/profile"
  );

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

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
    <header className="backdrop-blur-sm flex h-24 w-full items-center justify-between border-b-5 border-[#FFC300] bg-[#001D3D] p-2 py-3 text-white shadow-[0_2px_12px_rgba(47,86,165,0.18)]">

      {/* Left */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="inline-flex h-14 shrink-0 items-center justify-center px-2 cursor-pointer"
        >
          <img
            src="/img/logo.png"
            alt="Toggle admin sidebar"
            className="h-14 w-14 object-contain"
          />
        </button>

        <div className="hidden sm:flex min-w-0 flex-col justify-center">
          <p className="text-2xl font-semibold tracking-wide font-mono leading-tight">
            Solano CSF
          </p>
          <p className="text-xs text-white tracking-wide">
            Client Satisfaction Feedback
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="ml-auto flex shrink-0 items-center gap-2">

        {/* Notifications */}
        <button
          type="button"
          onClick={() =>
            navigate("/admin/settings/notifications")
          }
          className={`relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 transition hover:bg-white/15 ${
            isNotificationsActive
              ? "bg-white text-[#4f79d2] shadow-sm"
              : "bg-white/10 text-white"
          }`}
          aria-label="Notifications"
          aria-current={
            isNotificationsActive ? "page" : undefined
          }
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
          <button
            type="button"
            onClick={() => navigate("/admin/settings/profile")}
            className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 transition hover:bg-white/15 ${
              isProfileActive
                ? "bg-white text-[#4f79d2] shadow-sm"
                : "bg-white/10 text-white"
            }`}
            aria-label="Profile"
            aria-current={
              isProfileActive ? "page" : undefined
            }
            title="Profile"
          >
            <UserRound size={17} strokeWidth={3} />
          </button>

          {/* Profile Menu Toggle */}
          <button
            type="button"
            onClick={handleProfileToggle}
            className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 transition hover:bg-white/15 ${
              isProfileOpen
                ? "bg-white text-[#4f79d2] shadow-sm"
                : "bg-white/10 text-white"
            }`}
            aria-label="Open profile menu"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            title="Profile menu"
          >
            <ChevronDown
              size={17}
              strokeWidth={3}
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
