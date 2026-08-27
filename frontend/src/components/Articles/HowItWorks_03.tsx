import { useState } from "react";
import { ArticleUI } from "../../ui/form/ArticleUI";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

import sending from "../../assets/Sending.json"

export const HowItWorks_03 = () => {

    const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  return (
    <ArticleUI
      viewMoreLink="/article/how-it-works/page3"
      onMouseEnter={() => dotLottie?.play()}
      onMouseLeave={() => dotLottie?.pause()}
      decorative={"03"}
      lottie={
        <div className="flex w-full justify-center">
          <DotLottieReact
            data={sending}
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
          <h1>What Happens<br />After You{" "}<br /></h1>
          <span className="text-[#628dec]">Submit</span>
        </div>
      }
      paragraph={
        <span>
            You've entered your queue number, rated your experience, and tapped submit. So what actually happens next? This article explains how the system handles your input.
        </span>
      }
    />
  );
};
