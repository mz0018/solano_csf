import type { RefObject } from "react";

type AboutUsSectionProps = {
  aboutUsRef: RefObject<HTMLDivElement | null>;
};

const capabilities = [
  "Digital Feedback Collection",
  "Real-time Analytics",
  "Data Privacy Compliance",
  "Multi-office Support",
];

export const AboutUsSection = ({ aboutUsRef }: AboutUsSectionProps) => {
  return (
    <section
      ref={aboutUsRef}
      id="about-us"
      className="rounded-b-2xl border border-[var(--theme-border)] bg-[var(--theme-nav-bg)]/90 px-6 py-16 shadow-md"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* About */}
        <div className="max-w-3xl">
          <p className="text-sm text-[var(--theme-muted)]">About Us</p>

          <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--theme-text)] md:text-5xl">
            Empowering LGU Solano Through
            <br />
            Client Feedback
          </h2>

          <div className="mt-4 h-1 w-20 rounded-full bg-[#628dec]" />

          <p className="mt-5 text-lg leading-relaxed text-[var(--theme-muted)]">
            Our Client Satisfaction Measurement (CSM) system helps LGU Solano
            continuously improve public services by listening to the voices of
            our citizens. Every feedback matters in building a more responsive
            government.
          </p>

          <button className="mt-6 rounded-full bg-[var(--theme-text)] px-6 py-3 text-sm text-[var(--theme-bg)]">
            Contact Us
          </button>
        </div>

        {/* Capabilities */}
        <div className="mt-16 border-t border-[var(--theme-border)] pt-12">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-semibold text-[var(--theme-text)]">
              Our Capabilities
            </h3>

            <p className="mt-3 text-base text-[var(--theme-muted)]">
              Key features that make our CSM system effective for LGU Solano.
            </p>
          </div>

          <div className="mt-8 grid gap-x-12 gap-y-4 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div
                key={capability}
                className="flex items-center gap-3 border-b border-[var(--theme-border)] pb-3"
              >
                <div className="h-2 w-2 shrink-0 rounded-full bg-[#628dec]" />

                <span className="text-base text-[var(--theme-text)]">
                  {capability}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-text)] px-6 py-10 text-center">
          <p className="text-sm text-[var(--theme-bg)]/70">
            Your Voice Shapes Better Services
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-[var(--theme-bg)] md:text-3xl">
            Ready to Share Your Experience?
          </h3>

          <button className="mt-6 rounded-full bg-[var(--theme-bg)] px-6 py-3 text-sm text-[var(--theme-text)]">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};