import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
const HowItWorks_Page01 = () => {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* ─────────────────────────────────────
            HERO
        ───────────────────────────────────── */}
        <section
          className="py-6 text-center sm:py-10"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--theme-muted)]">
            Client Satisfaction Feedback
          </p>
          <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-[var(--theme-text)] sm:text-4xl md:text-5xl">
            Getting Started with CSF
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
            After completing a transaction with the Local Government Unit
            (LGU) of Solano, you may be invited to share your experience
            through the CSF platform at{" "}
            <span className="font-medium text-[var(--theme-text)]">
              csf.solano.online
            </span>
            .
          </p>
          <div className="mt-8 flex justify-center">
            <ArrowDown size={18} className="animate-bounce text-[var(--theme-muted)]" />
          </div>
        </section>
        {/* ─────────────────────────────────────
            ZIG-ZAG CONTENT
        ───────────────────────────────────── */}
        <div className="relative mt-12">
          {/* Vertical guide line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[var(--theme-border)] lg:block" />
          {/* WHAT IS CSF — LEFT */}
          <section
            className="scroll-reveal-left relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16"
          >
            <div className="lg:pr-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                01
              </span>
              <h2 className="mb-4 text-2xl font-semibold text-[var(--theme-text)] sm:text-3xl">
                What Is CSF?
              </h2>
              <p className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                CSF is LGU Solano's digital satisfaction survey. It replaces
                paper forms with a quick and private way to share your
                experience and help improve public services.
              </p>
            </div>
            {/* Empty right side */}
            <div />
          </section>
          {/* STARTING SURVEY — RIGHT */}
          <section
            className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16"
          >
            {/* Empty left side */}
            <div />
            <div className="lg:pl-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                02
              </span>
              <h2 className="mb-4 text-2xl font-semibold text-[var(--theme-text)] sm:text-3xl">
                Starting the Survey
              </h2>
              <p className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Open the platform and review the welcome and privacy
                information. When you're ready, tap{" "}
                <span className="text-[var(--theme-text)]">
                  Get Started
                </span>{" "}
                and then{" "}
                <span className="text-[var(--theme-text)]">
                  Got it
                </span>{" "}
                to continue.
              </p>
            </div>
          </section>
          {/* PRIVACY — LEFT */}
          <section
            className="scroll-reveal-left relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16"
          >
            <div className="lg:pr-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                03
              </span>
              <h2 className="mb-4 text-2xl font-semibold text-[var(--theme-text)] sm:text-3xl">
                Your Privacy Matters
              </h2>
              <ul className="space-y-3 text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--theme-muted)]" />
                  <span>Your participation is voluntary.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--theme-muted)]" />
                  <span>Your responses remain confidential.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--theme-muted)]" />
                  <span>
                    Information is protected under the{" "}
                    <span className="text-[var(--theme-text)]">
                      Data Privacy Act of 2012
                    </span>
                    .
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--theme-muted)]" />
                  <span>
                    Answer in{" "}
                    <span className="text-[var(--theme-text)]">
                      English or Tagalog
                    </span>
                    .
                  </span>
                </li>
              </ul>
            </div>
            <div />
          </section>
          {/* FEEDBACK — RIGHT */}
          <section
            className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16"
          >
            <div />
            <div className="lg:pl-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                04
              </span>
              <h2 className="mb-4 text-2xl font-semibold text-[var(--theme-text)] sm:text-3xl">
                Why Your Feedback Matters
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Your feedback helps LGU Solano understand what works and what
                needs improvement.
              </p>
              <ul className="space-y-3 text-sm text-[var(--theme-muted)] sm:text-base">
                <li>Improve services and address concerns.</li>
                <li>Identify delays and areas for improvement.</li>
                <li>Make better decisions based on experiences.</li>
              </ul>
            </div>
          </section>
        </div>
        {/* ─────────────────────────────────────
            NEXT
        ───────────────────────────────────── */}
        <div className="text-center">
          <p className="mb-5 text-sm text-[var(--theme-muted)]">
            Ready for the next step?
          </p>
          <Link
            to="/article/how-it-works/page2"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] px-6 py-2 text-sm text-[var(--theme-muted)] transition-colors hover:text-[var(--theme-text)]"
          >
            Next: How to Give Your Feedback →
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HowItWorks_Page01;