import type { RefObject } from "react";
import { SwatchBook, Shield, HeartHandshake  } from "lucide-react";

type AboutUsSectionProps = {
  aboutUsRef: RefObject<HTMLDivElement | null>;
};

export const AboutUsSection = ({ aboutUsRef }: AboutUsSectionProps) => {
  return (
    <section
      ref={aboutUsRef}
      id="about-us"
      className="
        bg-[var(--theme-nav-bg)]/90
        border
        border-[var(--theme-border)]
        px-6
        py-16
        rounded-b-2xl
        shadow-md
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-5xl
          p-8
          md:p-12
        "
      >
        {/* Header Content */}
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--theme-text)] md:text-5xl">
              About CSF
            </h2>

            <div className="mt-4 h-1 w-20 rounded-full bg-[#628dec]" />
          </div>

          <p className="text-base leading-relaxed text-[var(--theme-muted)] md:text-lg">
            The{" "}
            <span className="font-semibold text-[var(--theme-text)]">
              Client Satisfactory Feedback (CSF)
            </span>{" "}
            platform is a digital feedback system developed for LGU Solano to
            collect client experiences and improve the quality of government
            services.
          </p>
        </div>

        {/* Features */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-[var(--theme-bg)] p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#628dec]/15">
              <SwatchBook className="h-7 w-7 text-[#628dec]" />
            </div>

            <h3 className="text-lg font-semibold text-[var(--theme-text)]">
              Simple
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-[var(--theme-muted)]">
              A quick and easy way for clients to share feedback.
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--theme-bg)] p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#628dec]/15">
              <Shield className="h-7 w-7 text-[#628dec]" />
            </div>

            <h3 className="text-lg font-semibold text-[var(--theme-text)]">
              Secure
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-[var(--theme-muted)]">
              Responses are handled with privacy and confidentiality.
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--theme-bg)] p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#628dec]/15">
              <HeartHandshake className="h-7 w-7 text-[#628dec]" />
            </div>

            <h3 className="text-lg font-semibold text-[var(--theme-text)]">
              Helpful
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-[var(--theme-muted)]">
              Feedback helps offices improve their services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};