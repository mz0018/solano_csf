import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { ChangePassword } from "./ChangePassword";
import { LoginHistory } from "./LoginHistory";

type SecuritySection = "change-password" | "login-history";

const SecuritySettings = () => {
  const [openSection, setOpenSection] =
    useState<SecuritySection | null>("change-password");

  const toggleSection = (section: SecuritySection) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="w-full max-w-3xl space-y-4">

      {/* Page Header */}
      <div className="mb-4 border-b border-gray-300 py-3">
        <h1 className="text-xl font-semibold text-gray-900">
          Security Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your password and review recent account activity.
        </p>
      </div>

      {/* Change Password */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("change-password")}
          className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition hover:bg-gray-50"
          aria-expanded={openSection === "change-password"}
        >
          <span className="text-sm font-semibold text-gray-800">
            Change Password
          </span>

          <ChevronDown
            size={18}
            className={`text-gray-500 transition-transform duration-200 ${
              openSection === "change-password" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "change-password" && (
          <div className="mt-3">
            <ChangePassword />
          </div>
        )}
      </div>

      {/* Login History */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("login-history")}
          className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition hover:bg-gray-50"
          aria-expanded={openSection === "login-history"}
        >
          <span className="text-sm font-semibold text-gray-800">
            Login History
          </span>

          <ChevronDown
            size={18}
            className={`text-gray-500 transition-transform duration-200 ${
              openSection === "login-history" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "login-history" && (
          <div className="mt-3">
            <LoginHistory />
          </div>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;
