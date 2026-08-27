import { useState } from "react";
import type { RefObject } from "react";
import { ArticleUI } from "../../ui/form/ArticleUI";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

import questioning from "../../assets/Questioning.json"

type HowItWorks_01Props = {
  howItWorksRef: RefObject<HTMLDivElement | null>;
};

export const HowItWorks_01 = ({ howItWorksRef }: HowItWorks_01Props) => {

    const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  return (
    <ArticleUI
      articleRef={howItWorksRef}
      viewMoreLink="/article/how-it-works/page1"
      onMouseEnter={() => dotLottie?.play()}
      onMouseLeave={() => dotLottie?.pause()}
      decorative={"01"}
      lottie={
        <div className="flex w-full justify-center">
          <DotLottieReact
            data={questioning}
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
          <h1>What CSF Is<br />and Why Your{" "}Feedback{" "}<span className="text-[#628dec]">Matters</span></h1>
        </div>
      }
      paragraph={
        <span>
            CSF is LGU Solano's Client Satisfaction Measurement (CSM) tool. It is a short, voluntary survey that tracks the customer experience of people who use government offices.
        </span>
      }
    />
  );
};
