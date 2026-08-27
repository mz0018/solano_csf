import { useState } from "react";
import { ArticleUI } from "../../ui/form/ArticleUI";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

import steps from "../../assets/Steps.json"

export const HowItWorks_02 = () => {

    const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  return (
    <ArticleUI
      viewMoreLink="/article/how-it-works/page2"
      onMouseEnter={() => dotLottie?.play()}
      onMouseLeave={() => dotLottie?.pause()}
      decorative={"02"}
      lottie={
        <div className="flex w-full justify-center">
          <DotLottieReact
            data={steps}
            loop
            autoplay={false}
            dotLottieRefCallback={setDotLottie}
            style={{
              width: "100%",
              maxWidth: "420px",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      }
      title={
        <div>
          <h1>How to Give<br />Your Feedback in a Few{" "}</h1>
          <span className="text-[#628dec]">Simple Steps</span>
        </div>
      }
       paragraph={
        <span>
            After you tap Get Started and dismiss the privacy reminder, the survey begins. This article walks you through every screen so you always know what to do next.
        </span>
      }
    />
  );
};
