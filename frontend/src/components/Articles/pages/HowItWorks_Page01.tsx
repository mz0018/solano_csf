import { Link } from "react-router-dom";
import { ArrowDown, SquareMousePointer } from "lucide-react";

const HowItWorks_Page01 = () => {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* ─────────────────────────────────────
            HERO
        ───────────────────────────────────── */}
        <section className="relative py-14 text-center sm:py-20">
          {/* Small label */}
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[var(--theme-border)]" />

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-muted)]">
              Client Satisfaction Feedback
            </p>

            <span className="h-px w-10 bg-[var(--theme-border)]" />
          </div>

          {/* Main heading */}
          <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-[var(--theme-text)] sm:text-6xl md:text-7xl">
            Getting Started
            <br />
            <span className="text-[#628dec]">with CSF</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
            After completing a transaction with the Local Government Unit (LGU) of
            Solano, you may be invited to share your experience through the CSF
            platform.
          </p>

          {/* URL */}
          <div className="mt-5">
            <span className="inline-flex items-center rounded-full border border-[var(--theme-border)] px-4 py-2 text-xs font-medium text-[var(--theme-text)] sm:text-sm">
              csf.solano.online
            </span>
          </div>

          {/* Scroll indicator */}
          <div className="mt-14 flex flex-col items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--theme-muted)]">
              Explore
            </span>

            <div className="flex size-9 items-center justify-center rounded-full border border-[var(--theme-border)]">
              <ArrowDown
                size={15}
                className="animate-bounce text-[var(--theme-muted)]"
              />
            </div>
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
            <div className="relative lg:pr-8">
              {/* Decorative background text */}
              <span className="pointer-events-none absolute -left-5 -top-14 select-none text-[8rem] font-bold leading-none tracking-[-0.08em] text-[var(--theme-text)]/[0.035] sm:text-[10rem]">
                01
              </span>

              {/* Section label */}
              <div className="relative mb-8 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-muted)]">
                  01
                </span>

                <span className="h-px w-12 bg-[var(--theme-border)]" />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                  About the Survey
                </span>
              </div>

              {/* Main heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                What Is
                <br />
                <span className="text-[#628dec]">CSF?</span>
              </h2>

              {/* Description */}
              <p className="relative mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                CSF is LGU Solano's digital satisfaction survey. It replaces paper
                forms with a quick and private way to share your experience and help
                improve public services.
              </p>

              {/* Highlight */}
              <div className="relative mt-10 flex items-center gap-4 border-t border-[var(--theme-border)] pt-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--theme-text)] text-[var(--theme-surface)]">
                  <SquareMousePointer className="size-4" />
                </div>

                <p className="max-w-sm text-xs leading-relaxed text-[var(--theme-muted)] sm:text-sm">
                  A simpler way for citizens to share their experience with local
                  government services.
                </p>
              </div>
            </div>

            {/* Intentional empty right side */}
            <div />
          </section>

          {/* STARTING SURVEY — RIGHT */}
          <section
            className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16"
          >
            {/* Intentional empty left side */}
            <div />

            <div className="relative lg:pl-8">
              {/* Large decorative number */}
              <span className="pointer-events-none absolute -left-4 -top-12 select-none text-[8rem] font-bold leading-none tracking-[-0.08em] text-[var(--theme-text)]/[0.035] sm:text-[10rem]">
                02
              </span>
              {/* Section label */}
              <div className="mb-8 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-muted)]">
                  02
                </span>

                <span className="h-px w-12 bg-[var(--theme-border)]" />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                  Getting Started
                </span>
              </div>

              {/* Heading */}
              <h2 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Starting the
                <br />
                <span className="text-[#628dec]">Survey</span>
              </h2>

              {/* Description */}
              <p className="mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Open the platform and review the welcome and privacy information.
                When you're ready, follow the prompts below to begin.
              </p>

              {/* Steps */}
              <div className="relative mt-10">
                {/* Connecting line */}
                <div className="absolute bottom-8 left-[1.125rem] top-8 w-px bg-[var(--theme-border)]" />

                <div className="relative flex gap-5 pb-8">
                  <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] text-xs font-semibold text-[var(--theme-text)]">
                    01
                  </div>

                  <div className="pt-1">
                    <p className="text-sm font-medium text-[var(--theme-text)] sm:text-base">
                      Review the information
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--theme-muted)]">
                      Read the welcome message and privacy information before continuing.
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-5">
                  <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--theme-text)] text-xs font-semibold text-[var(--theme-surface)]">
                    02
                  </div>

                  <div className="pt-1">
                    <p className="text-sm font-medium text-[var(--theme-text)] sm:text-base">
                      Get started
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--theme-muted)]">
                      Tap{" "}
                      <span className="font-medium text-[var(--theme-text)]">
                        Get Started
                      </span>{" "}
                      and then{" "}
                      <span className="font-medium text-[var(--theme-text)]">
                        Got it
                      </span>{" "}
                      to continue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PRIVACY — LEFT */}
          <section
            className="scroll-reveal-left relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16"
          >
            {/* Content */}
            <div className="relative lg:pr-8">
              {/* Large decorative number */}
              <span className="pointer-events-none absolute -left-4 -top-12 select-none text-[8rem] font-bold leading-none tracking-[-0.08em] text-[var(--theme-text)]/[0.035] sm:text-[10rem]">
                03
              </span>

              {/* Section label */}
              <div className="relative mb-8 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-muted)]">
                  03
                </span>

                <span className="h-px w-12 bg-[var(--theme-border)]" />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                  Privacy & Protection
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Your Privacy
                <br />
                <span className="text-[#628dec]">Matters</span>
              </h2>

              {/* Intro */}
              <p className="relative mt-7 max-w-lg text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                We value your trust. Your participation and the information you provide
                are handled with care and respect for your privacy.
              </p>

              {/* Privacy points */}
              <div className="relative mt-10">
                {[
                  {
                    title: "Voluntary participation",
                    text: "Your participation is voluntary.",
                  },
                  {
                    title: "Confidential responses",
                    text: "Your responses remain confidential.",
                  },
                  {
                    title: "Protected information",
                    text: (
                      <>
                        Information is protected under the{" "}
                        <span className="font-medium text-[var(--theme-text)]">
                          Data Privacy Act of 2012
                        </span>
                        .
                      </>
                    ),
                  },
                  {
                    title: "Your preferred language",
                    text: (
                      <>
                        Answer in{" "}
                        <span className="font-medium text-[var(--theme-text)]">
                          English or Tagalog
                        </span>
                        .
                      </>
                    ),
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="group flex gap-5 border-t border-[var(--theme-border)] py-5 transition-all duration-300 last:border-b"
                  >
                    <span className="mt-0.5 text-xs font-semibold text-[var(--theme-muted)]">
                      0{index + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-sm font-medium text-[var(--theme-text)] sm:text-base">
                        {item.title}
                      </p>

                      <p className="text-sm leading-relaxed text-[var(--theme-muted)]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intentional empty space */}
            <div />
          </section>

          {/* FEEDBACK — RIGHT */}
          <section
            className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16"
          >
            {/* Intentional empty space — keep this */}
            <div />

            <div className="relative lg:pl-8">
              <span className="pointer-events-none absolute -left-4 -top-12 select-none text-[8rem] font-bold leading-none tracking-[-0.08em] text-[var(--theme-text)]/[0.035] sm:text-[10rem]">
                04
              </span>
              {/* Section label */}
              <div className="mb-8 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-muted)]">
                  04
                </span>

                <span className="h-px w-12 bg-[var(--theme-border)]" />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                  Community Impact
                </span>
              </div>

              {/* Heading */}
              <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Why Your Feedback
                <br />
                <span className="text-[#628dec]">Matters</span>
              </h2>

              {/* Intro */}
              <p className="mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Your feedback helps LGU Solano understand what works and what needs
                improvement. Every response contributes to better public services and
                a more responsive local government.
              </p>

              {/* Divider */}
              <div className="my-10 h-px w-full bg-[var(--theme-border)]" />

              {/* Benefits */}
              <div>
                {[
                  "Improve services and address concerns.",
                  "Identify delays and areas for improvement.",
                  "Make better decisions based on experiences.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="group flex items-center gap-5 border-b border-[var(--theme-border)] py-5 transition-all duration-300 first:border-t"
                  >
                    <span className="w-8 shrink-0 text-xs font-semibold text-[var(--theme-muted)]">
                      0{index + 1}
                    </span>

                    <span className="flex-1 text-sm font-medium text-[var(--theme-text)] sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Small closing detail */}
              <div className="mt-8 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--theme-text)]" />
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--theme-muted)]">
                  Your experience helps shape better services
                </span>
              </div>
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