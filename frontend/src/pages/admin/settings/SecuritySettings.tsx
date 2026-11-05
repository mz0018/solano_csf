
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
    <div className="@container w-full min-w-0 rounded-xl border border-gray-200 bg-white p-3 shadow-sm @sm:p-4 @lg:p-5">
      {/* Page Header */}
      <div className="mb-4 border-b border-gray-300 py-3 @lg:hidden">
        <h1 className="text-xl font-semibold text-[#628dec]">
          Security Settings
        </h1>

        <p className="mt-1 text-sm leading-relaxed text-gray-900">
          Manage your password and review recent account activity.
        </p>
      </div>

      {/* Change Password */}
      <div className="mb-4 w-full">
        <button
          type="button"
          onClick={() => toggleSection("change-password")}
          className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-3 text-left transition hover:bg-gray-50 sm:px-4"
          aria-expanded={openSection === "change-password"}
        >
          <p className="text-base font-semibold text-slate-500 @sm:text-lg @lg:text-xl">
            Change Password
          </p>

          <ChevronDown
            size={18}
            className={`shrink-0 text-gray-500 transition-transform duration-200 ${
              openSection === "change-password" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "change-password" && (
          <div className="mt-3 w-full min-w-0">
            <ChangePassword />
          </div>
        )}
      </div>

      {/* Login History */}
      <div className="mb-4 w-full">
        <button
          type="button"
          onClick={() => toggleSection("login-history")}
          className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-3 text-left transition hover:bg-gray-50 sm:px-4"
          aria-expanded={openSection === "login-history"}
        >
          <p className="text-base font-semibold text-slate-500 @sm:text-lg @lg:text-xl">
            Login History
          </p>

          <ChevronDown
            size={18}
            className={`shrink-0 text-gray-500 transition-transform duration-200 ${
              openSection === "login-history" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "login-history" && (
          <div className="mt-3 w-full min-w-0">
            <LoginHistory />
          </div>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;
