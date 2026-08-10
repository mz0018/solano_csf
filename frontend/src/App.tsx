import { useRef } from "react";

import { HeroSection } from "./components/sections/HeroSection";
import { HorizontalSection } from "./components/sections/HorizontalSection";
import { AboutUsSection } from "./components/sections/AboutUsSection";
import { Footer } from "./components/Footer/Footer";
import "./App.css";

function App() {
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="relative z-10 mb-[500px]">
        <main>
          <HeroSection />
          <HorizontalSection howItWorksRef={howItWorksRef} />
          <AboutUsSection aboutUsRef={aboutUsRef} />
        </main>
      </div>

      <Footer />
    </>
  );
}

export default App;
