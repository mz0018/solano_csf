import { ArticleUI } from "../../ui/form/ArticleUI";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import steps from "../../assets/Steps.json"

export const HowItWorks_02 = () => {

  const { ref: howItWorks_02, isVisible: howItWorks_02_Visible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <ArticleUI
      viewMoreLink="/article/how-it-works/page2"
      lottie={
        <DotLottieReact
          data={steps}
          loop
          autoplay
          style={{ width: "80%", height: "80%" }}
        />
      }
      title={
        <div ref={howItWorks_02}>
          <h1 className={`${howItWorks_02_Visible ? 'animate-fade-in-up' : 'opacity-0'}`}>How to Give<br />Your Feedback in a Few{" "}</h1>
          <span className="text-[#628dec]">Simple Steps</span>
        </div>
      }
       paragraph={
        <span className={`${howItWorks_02_Visible ? 'delay-animation animate-fade-in-left' : 'opacity-0'}`}>
            After you tap Get Started and dismiss the privacy reminder, the survey begins. This article walks you through every screen so you always know what to do next.
        </span>
      }
    />
  );
};
