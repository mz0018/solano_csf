import type { RefObject } from "react";

type AboutUsSectionProps = {
  aboutUsRef: RefObject<HTMLDivElement | null>;
};

const skills = [
  { name: "Digital Feedback Collection", percent: 95 },
  { name: "Real-time Analytics", percent: 90 },
  { name: "Data Privacy Compliance", percent: 100 },
  { name: "Multi-office Support", percent: 85 },
];

const stats = [
  { number: "XX+", label: "Lorem Ipsum" },
  { number: "X,XXX+", label: "Lorem Ipsum" },
  { number: "XXX+", label: "Lorem Ipsum" },
  { number: "XX", label: "Lorem Ipsum" },
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
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/images/about-us.jpg"
              alt="About us"
              className="h-full min-h-[280px] w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm text-[var(--theme-muted)]">About Us</p>

            <h2 className="mt-2 text-3xl font-semibold text-[var(--theme-text)] md:text-5xl">
              Empowering LGU Solano Through
              <br />
              Client Feedback
            </h2>

            <div className="mt-4 h-1 w-20 rounded-full bg-[#628dec]" />

            <p className="mt-5 text-lg leading-relaxed text-[var(--theme-muted)]">
              Our Client Satisfaction Measurement (CSM) system helps LGU Solano continuously improve public services by listening to the voices of our citizens. Every feedback matters in building a more responsive government.
            </p>

            <button className="mt-6 rounded-full bg-[var(--theme-text)] px-6 py-3 text-sm text-[var(--theme-bg)]">
              Contact Us
            </button>
          </div>
        </div>

        {/* Capabilities + Stats */}
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {/* Capabilities */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--theme-text)]">
              Our Capabilities
            </h3>

            <p className="mt-3 text-base text-[var(--theme-muted)]">
              Key features that make our CSF system effective for LGU Solano.
            </p>

            <div className="mt-6 space-y-5">
              {skills.map((skill) => (
                <div key={skill.name + skill.percent}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-[var(--theme-text)]">
                      {skill.name}
                    </span>

                    <span className="text-[var(--theme-muted)]">
                      {skill.percent}%
                    </span>
                  </div>

                  <div className="h-[2px] bg-[var(--theme-border)]">
                    <div
                      className="h-full bg-[var(--theme-text)]"
                      style={{ width: `${skill.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat) => (
              <div key={stat.number}>
                <p className="text-3xl font-semibold text-[var(--theme-text)]">
                  {stat.number}
                </p>

                <p className="mt-1 text-xs text-[var(--theme-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative mt-16 min-h-[220px] overflow-hidden rounded-2xl">
          <img
            src="/images/about-us.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative flex min-h-[220px] flex-col items-center justify-center text-center">
            <p className="text-base text-white/80">Your Voice Shapes Better Services</p>

            <h3 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Ready to Share
              <br />
              Your Experience?
            </h3>

            <button className="mt-6 rounded-full bg-white px-6 py-3 text-sm text-black">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};