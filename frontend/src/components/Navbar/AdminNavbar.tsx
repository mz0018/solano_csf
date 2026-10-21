import { useRef, useState } from "react";

import {
  UserRound,
  Bell,
  ChevronDown,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { BtnSignout } from "../buttons/BtnSignout";

const adminPageHeaders: Record<string, { title: string; description?: string }> = {
  "/admin/queue/dashboard": {
    title: "Dashboard",
    description: "Get an overview of the current queues, pending requests, and completed services.",
  },
  "/admin/queue/monitor": {
    title: "View Active Queue",
    description: "Get an overview of the current queues, pending requests, and completed services.",
  },
  "/admin/queue/statistics": {
    title: "Report Statistics",
    description: "View queue statistics and feedback reports by office",
  },
  "/admin/queue/offices/feedbacks": {
    title: "Select an office to view specific feedback",
    description: "Filter and review feedback entries by office",
  },
  "/admin/queue/service/rendered": {
    title: "Rendered Services",
    description: "Overview of services currently rendered, including their total counts.",
  },
  "/admin/settings/profile": {
    title: "Profile Information",
    description: "View your account information and administrator details.",
  },
  "/admin/settings/manage-services": {
    title: "Service Management",
    description: "Create new services and manage existing service information and status.",
  },
  "/admin/settings/security": {
    title: "Security Settings",
    description: "Manage your password and review recent account activity.",
  },
  "/admin/settings/notifications": {
    title: "Notification Settings",
    description: "View your recent account notifications and activity updates.",
  },
  "/admin/overview/user-management/manage": {
    title: "Account Management",
    description: "Search for a client to manage their account access and password",
  },
  "/admin/overview/user-management/ticket-tracker": {
    title: "Ticket Tracker",
    description: "Search for a ticket to track its status and updates",
  },
  "/admin/overview/user-management/add-client": {
    title: "Add Client Account",
    description: "Create a new office or admin account.",
  },
  "/admin/overview/report/system": {
    title: "System Report",
  },
};

export const AdminNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pageHeader = adminPageHeaders[pathname.replace(/\/+$/, "")];
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isNotificationsActive = pathname.startsWith("/admin/settings/notifications");
  const isProfileActive = pathname.startsWith("/admin/settings/profile");

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
    <header className="h-24 bg-white flex items-center justify-between border-b border-slate-200 px-4 py-3 text-[#1f2937] sm:px-6">

      {/* Left */}
      <div className="flex min-w-0 flex-1 items-center">
        {pageHeader && (
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-[#628dec]">
              {pageHeader.title}
            </h1>
            {pageHeader.description && (
              <p className="truncate text-sm text-gray-500">
                {pageHeader.description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-2">

        {/* Notifications */}
        <button
          type="button"
          onClick={() => navigate("/admin/settings/notifications")}
          className={`relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition hover:bg-slate-50 hover:text-[#628dec] ${
            isNotificationsActive
              ? "bg-[#628dec] text-white"
              : "bg-white text-gray-500"
          }`}
          aria-label="Notifications"
          aria-current={isNotificationsActive ? "page" : undefined}
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
            className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition hover:bg-slate-50 hover:text-[#628dec] ${
              isProfileActive
                ? "bg-[#628dec] text-white"
                : "bg-white text-gray-500"
            }`}
            aria-label="Profile"
            aria-current={isProfileActive ? "page" : undefined}
            title="Profile"
          >
            <UserRound size={17} strokeWidth={3} />
          </button>

          {/* Profile Menu Toggle */}
          <button
            type="button"
            onClick={handleProfileToggle}
            className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition hover:bg-slate-50 hover:text-[#628dec] ${
              isProfileOpen
                ? "bg-[#628dec] text-white"
                : "bg-white text-gray-500"
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
