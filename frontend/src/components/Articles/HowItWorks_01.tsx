import type { RefObject } from "react";
import { ArticleUI } from "../../ui/form/ArticleUI";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import questioning from "../../assets/Questioning.json"

type HowItWorks_01Props = {
  howItWorksRef: RefObject<HTMLDivElement | null>;
};

export const HowItWorks_01 = ({ howItWorksRef }: HowItWorks_01Props) => {

  const { ref: howItWorks_01, isVisible: howItWorks_01_Visible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <ArticleUI
      articleRef={howItWorksRef}
      viewMoreLink="/article/how-it-works/page1"
      lottie={
        <DotLottieReact
          data={questioning}
          loop
          autoplay
          style={{ width: "80%", height: "80%" }}
        />
      }
      title={
        <div ref={howItWorks_01}>
          <h1 className={`${howItWorks_01_Visible ? 'animate-fade-in-up' : 'opacity-0'}`}>What CSF Is<br />and Why Your{" "}Feedback{" "}<span className="text-[#628dec]">Matters</span></h1>
        </div>
      }
      paragraph={
        <span className={`${howItWorks_01_Visible ? 'delay-animation animate-fade-in-left' : 'opacity-0'}`}>
            CSF is LGU Solano's Client Satisfaction Measurement (CSM) tool. It is a short, voluntary survey that tracks the customer experience of people who use government offices.
        </span>
      }
    />
  );
};
