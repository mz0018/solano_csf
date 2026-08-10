import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar/Navbar";

export const RootLayout = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setIsScrolling(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const scrollTo = (key: string) => {
    if (key === "home") {
      if (location.pathname !== "/") navigate("/");
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // section links: scroll if on home, otherwise just go home
    if (location.pathname !== "/") {
      navigate("/");
      return;
    }
    document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="respect-theme">
      {location.pathname !== "/signin" && (
        <Navbar
          isScrolling={isScrolling}
          scrollTo={scrollTo}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      <Outlet />
    </div>
  );
};
