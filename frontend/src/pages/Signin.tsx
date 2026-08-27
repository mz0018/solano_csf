import { useState } from "react";
import { useSignin } from "../hooks/useSignin";
import { CsfFormUI } from "../ui/form/CsfFormUI";
import { Input } from "../ui/form/Input";
import { Button } from "../ui/form/Buttons";
import { ErrorText } from "../ui/form/ErrorText";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { PasswordAssistanceModal } from "../components/Modals/PasswordAssistanceModal";

const Signin = () => {
  const { handleSubmit, isLoading, setUserName, userName, setPassword, password, hasError, status } = useSignin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordAssistance, setShowPasswordAssistance] = useState<boolean>(false);

 return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center bg-[var(--theme-nav-bg)] p-12">
        <div className="max-w-xl space-y-6">
          <h1 className="text-[var(--theme-text)] text-5xl font-bold leading-tight animate-fade-in-up">
            Empowering better public service through{" "}
            <span className="text-[#628dec]">real-time</span> client feedback and
            satisfaction monitoring.
          </h1>

          <p className="text-[var(--theme-text)]/70">
            Securely manage and monitor client satisfaction with a modern feedback
            management system.
          </p>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-6">
        <CsfFormUI>
          <div className="flex items-center gap-4 mb-6 leading-none">
            <a href="/" className="flex items-center">
              <img
                src="/img/logo.png"
                alt="Logo"
                className="w-12 h-12 flex-shrink-0"
              />
            </a>

            <div>
              <h1 className="text-[var(--theme-text)] text-2xl font-bold leading-tight">
                Sign in
              </h1>

              <p className="text-sm text-[var(--theme-text)]/70">
                Login to your account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="signin-username" className="block text-sm font-medium text-[var(--theme-text)]/70 mb-1">Enter your username</label>
            <Input
              id="signin-username"
              name="username"
              type="text"
              value={userName}
              placeholder="e.g., John Doe"
              onChange={(e) => setUserName(e.target.value)}
              error={hasError.userName || hasError.general}
              className="w-full p-3"
            />

            <div>
              <div className="relative">
                <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative flex items-center">
                  <Input
                    id="signin-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password here"
                    error={hasError.password || hasError.general}
                    className="w-full p-3 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center ${
                      hasError.password || hasError.general
                        ? "text-red-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <ErrorText
              message={
                hasError.userName || hasError.password || hasError.general
              }
            />

            <Button
              type="submit"
              disabled={isLoading || status.rateLimit}
              className="w-full rounded-lg bg-[#628dec] mt-6 px-6 py-3 font-semibold text-gray-200 transition hover:opacity-90"
            >
              {isLoading ? (
                <ClipLoader size={18} color="white" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </Button>
            <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPasswordAssistance(true)}
                  className="text-sm text-[var(--theme-text)]/70 hover:text-[var(--theme-text)] transition"
                >
                  Password Assistance?
                </button>
              </div>
          </form>
        </CsfFormUI>
      </div>
      <PasswordAssistanceModal open={showPasswordAssistance} onClose={() => setShowPasswordAssistance(false)} />
    </section>
  );
};

export default Signin;