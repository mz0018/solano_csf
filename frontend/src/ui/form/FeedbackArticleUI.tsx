import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import winkData from "../../assets/wink.json";
import rollingData from "../../assets/Rolling on the floor laughing _ Emoji Animation.json";
import grinningData from "../../assets/Grinning with closed eyes_ Emoji animation.json";
import chosenData from "../../assets/Emotional feedback emoji.json";
import sparkleData from "../../assets/sparkles.json";
import blueBlobData from "../../assets/Blue Blob.json";

type FeedbackArticleUIProps = {
  className?: string;
};

export const FeedbackArticleUI = ({
  className = "",
}: FeedbackArticleUIProps) => {
  return (
    <div
      className={`relative mx-auto flex h-[420px] w-[420px] items-center justify-center ${className}`}
    >
      {/* Confetti Background */}
      <div className="absolute -top-[90px] inset-x-0 bottom-0 opacity-80 pointer-events-none">
        <DotLottieReact
          data={sparkleData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Blue Blob Background */}
      <div className="absolute inset-0 -top-12 pointer-events-none">
        <DotLottieReact
          data={blueBlobData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Main Animation */}
      <div className="relative z-10 h-72 w-72">
        <DotLottieReact
          data={chosenData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Ball - Bottom Left */}
      <div className="absolute bottom-[85px] -left-9 h-28 w-28 z-10 -rotate-24">
        <DotLottieReact
          data={grinningData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Wink - Top Left */}
      <div className="absolute top-[-8px] -left-6 h-22 w-22 z-20">
        <DotLottieReact
          data={winkData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Thumbs Up - Top Right */}
      <div className="absolute top-[-30px] right-[-10px] h-24 w-24 z-20 rotate-[10deg] hover:rotate-[15deg] transition-transform duration-300">
        <DotLottieReact
          data={rollingData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};