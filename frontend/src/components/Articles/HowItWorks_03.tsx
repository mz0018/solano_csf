import { ArticleUI } from "../../ui/form/ArticleUI";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import sending from "../../assets/Sending.json"

export const HowItWorks_03 = () => {

    const { ref: howItWorks_03, isVisible: howItWorks_03_Visible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <ArticleUI
      viewMoreLink="/article/how-it-works/page3"
      lottie={
        <DotLottieReact
          data={sending}
          loop
          autoplay
          style={{ width: "80%", height: "80%" }}
        />
      }
      title={
        <div ref={howItWorks_03}>
          <h1 className={`${howItWorks_03_Visible ? 'animate-fade-in-up' : 'opacity-0'}`}>What Happens<br />After You{" "}<br /></h1>
          <span className="text-[#628dec]">Submit</span>
        </div>
      }
      paragraph={
        <span className={`${howItWorks_03_Visible ? 'delay-animation animate-fade-in-left' : 'opacity-0'}`}>
            You've entered your queue number, rated your experience, and tapped submit. So what actually happens next? This article explains how the system handles your input.
        </span>
      }
    />
  );
};
