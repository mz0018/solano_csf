import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ChangePassword } from "./ChangePassword";
import { LoginHistory } from "./LoginHistory";
const SecuritySettings = () => {
  const [openSection, setOpenSection] = useState<string | null>("change-password");
  const toggleSection = (section: string) => {
    setOpenSection(prev => prev === section ? null : section);
  };
  return (
    <div className="w-full max-w-none space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Security Settings</h1>
      {/* Change Password Accordion */}
      <div>
        <button
          onClick={() => toggleSection("change-password")}
          className="w-full flex items-center justify-between text-left"
        >
          <p className="text-lg font-medium">Change Password</p>
          <ChevronDown
            size={18}
            className={`transition-transform ${openSection === "change-password" ? "rotate-180" : ""}`}
          />
        </button>
        {openSection === "change-password" && (
          <div className="mt-4">
            <ChangePassword />
          </div>
        )}
      </div>
      {/* Login History Accordion */}
      <div>
        <button
          onClick={() => toggleSection("login-history")}
          className="w-full flex items-center justify-between text-left"
        >
          <p className="text-lg font-medium">Login History (Last 30 Days)</p>
          <ChevronDown
            size={18}
            className={`transition-transform ${openSection === "login-history" ? "rotate-180" : ""}`}
          />
        </button>
        {openSection === "login-history" && (
          <div className="mt-4">
            <LoginHistory />
          </div>
        )}
      </div>
    </div>
  );
};
export default SecuritySettings;