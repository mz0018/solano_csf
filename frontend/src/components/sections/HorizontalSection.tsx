import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";

import type { RefObject } from "react";

import { HowItWorks_01 } from "../Articles/HowItWorks_01";
import { HowItWorks_02 } from "../Articles/HowItWorks_02";
import { HowItWorks_03 } from "../Articles/HowItWorks_03";

type HorizontalSectionProps = {
  howItWorksRef: RefObject<HTMLDivElement | null>;
};

export const HorizontalSection = ({ howItWorksRef }: HorizontalSectionProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [translateX, setTranslateX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getMaxTranslate = useCallback(() => {
    if (!contentRef.current) return 0;
    const content = contentRef.current;
    const rightExtent = content.offsetLeft + content.scrollWidth;
    return Math.max(0, rightExtent - window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    const applyHeight = () => {
      if (!wrapperRef.current) return;
      wrapperRef.current.style.height = `${getMaxTranslate() + window.innerHeight}px`;
    };
    applyHeight();
    window.addEventListener("resize", applyHeight);
    return () => window.removeEventListener("resize", applyHeight);
  }, [getMaxTranslate]);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const progress = Math.max(0, -rect.top);
      const x = Math.min(progress, getMaxTranslate());
      setTranslateX(x);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [getMaxTranslate]);

  if (isMobile) {
    return (
      <section id="how-it-works" className="py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <HowItWorks_01 howItWorksRef={howItWorksRef} />
          <HowItWorks_02 />
          <HowItWorks_03 />
        </div>
      </section>
    );
  }

  return (
    <div ref={wrapperRef}>
      <section id="how-it-works" className="sticky top-0 overflow-hidden">
        <div className="flex h-dvh items-center">
          <div
            ref={contentRef}
            className="mx-auto flex w-full max-w-7xl gap-6 sm:gap-12 lg:gap-24 px-4 sm:px-6 lg:px-8"
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            <HowItWorks_01 howItWorksRef={howItWorksRef} />
            <HowItWorks_02 />
            <HowItWorks_03 />
          </div>
        </div>
      </section>
    </div>
  );
};