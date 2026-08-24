import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks_Page02 = () => {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* ─────────────────────────────────────
            HERO
        ───────────────────────────────────── */}
        <section className="scroll-reveal-left relative py-14 text-center sm:py-20">
          {/* Small label */}
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[var(--theme-border)]" />

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-muted)]">
              The Feedback Process
            </p>

            <span className="h-px w-10 bg-[var(--theme-border)]" />
          </div>

          {/* Main heading */}
          <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-[var(--theme-text)] sm:text-6xl md:text-7xl">
            Give Your Feedback
            <br />
            <span className="text-[#628dec]">in a Few Simple Steps</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
            After selecting Get Started and confirming the privacy reminder,
            you can begin the survey. The process only takes a few minutes.
          </p>

          {/* Scroll indicator */}
          <div className="mt-12 flex flex-col items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--theme-muted)]">
              6 Steps
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

          {/* STEP 1 — LEFT */}
          <section className="scroll-reveal-left relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="relative lg:pr-8">
              {/* Decorative background number */}
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
                  Queue Verification
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Enter Your
                <br />
                <span className="text-[#628dec]">Queue Number</span>
              </h2>

              {/* Description */}
              <p className="relative mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Enter the Queue Number provided during your transaction
                (example:{" "}
                <span className="font-medium text-[var(--theme-text)]">
                  ABC1-234
                </span>
                ), then tap{" "}
                <span className="font-medium text-[var(--theme-text)]">
                  Verify Queue Number
                </span>
                . The system will check if it is valid before continuing.
              </p>
            </div>

            {/* Empty right side */}
            <div />
          </section>

          {/* STEP 2 — RIGHT */}
          <section className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Empty left side */}
            <div />

            <div className="relative lg:pl-8">
              {/* Decorative background number */}
              <span className="pointer-events-none absolute -left-4 -top-12 select-none text-[8rem] font-bold leading-none tracking-[-0.08em] text-[var(--theme-text)]/[0.035] sm:text-[10rem]">
                02
              </span>

              {/* Section label */}
              <div className="relative mb-8 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-muted)]">
                  02
                </span>

                <span className="h-px w-12 bg-[var(--theme-border)]" />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                  Your Information
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Respondent
                <br />
                <span className="text-[#628dec]">Profile</span>
              </h2>

              {/* Description */}
              <p className="relative mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Provide basic details such as your name and phone number
                (optional). Your information remains confidential.
              </p>
            </div>
          </section>

          {/* STEP 3 — LEFT */}
          <section className="scroll-reveal-left relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="relative lg:pr-8">
              {/* Decorative background number */}
              <span className="pointer-events-none absolute -left-5 -top-14 select-none text-[8rem] font-bold leading-none tracking-[-0.08em] text-[var(--theme-text)]/[0.035] sm:text-[10rem]">
                03
              </span>

              {/* Section label */}
              <div className="relative mb-8 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-muted)]">
                  03
                </span>

                <span className="h-px w-12 bg-[var(--theme-border)]" />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                  Transaction Details
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Select
                <br />
                <span className="text-[#628dec]">Services</span>
              </h2>

              {/* Description */}
              <p className="relative mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Choose the service you used during your visit. If it is not
                listed, select{" "}
                <span className="font-medium text-[var(--theme-text)]">
                  "Other"
                </span>{" "}
                and describe it. You can change your selection if needed.
              </p>
            </div>

            {/* Empty right side */}
            <div />
          </section>

          {/* STEP 4 — RIGHT */}
          <section className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Empty left side */}
            <div />

            <div className="relative lg:pl-8">
              {/* Decorative background number */}
              <span className="pointer-events-none absolute -left-4 -top-12 select-none text-[8rem] font-bold leading-none tracking-[-0.08em] text-[var(--theme-text)]/[0.035] sm:text-[10rem]">
                04
              </span>

              {/* Section label */}
              <div className="relative mb-8 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-muted)]">
                  04
                </span>

                <span className="h-px w-12 bg-[var(--theme-border)]" />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                  About You
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Demographic
                <br />
                <span className="text-[#628dec]">Information</span>
              </h2>

              {/* Description */}
              <p className="relative mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Provide general information to help LGU understand feedback
                trends, such as:
              </p>

              {/* Details */}
              <div className="relative mt-6 max-w-xl">
                {[
                  "Affiliation",
                  "Gender",
                  "Age group",
                  "Employment status",
                  "Address or location details",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border-b border-[var(--theme-border)] py-3 first:border-t"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-[#628dec]" />

                    <span className="text-sm text-[var(--theme-muted)] sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <p className="relative mt-5 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                These details are used only for grouping results and improving
                services.
              </p>
            </div>
          </section>

          {/* STEP 5 — LEFT */}
          <section className="scroll-reveal-left relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="relative lg:pr-8">
              {/* Decorative background number */}
              <span className="pointer-events-none absolute -left-5 -top-14 select-none text-[8rem] font-bold leading-none tracking-[-0.08em] text-[var(--theme-text)]/[0.035] sm:text-[10rem]">
                05
              </span>

              {/* Section label */}
              <div className="relative mb-8 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-muted)]">
                  05
                </span>

                <span className="h-px w-12 bg-[var(--theme-border)]" />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                  Your Experience
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Rate the
                <br />
                <span className="text-[#628dec]">Service</span>
              </h2>

              {/* Description */}
              <p className="relative mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Rate each service you selected. Your honest feedback helps LGU
                identify areas that need improvement.
              </p>
            </div>

            {/* Empty right side */}
            <div />
          </section>

          {/* STEP 6 — RIGHT */}
          <section className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Empty left side */}
            <div />

            <div className="relative lg:pl-8">
              {/* Decorative background number */}
              <span className="pointer-events-none absolute -left-4 -top-12 select-none text-[8rem] font-bold leading-none tracking-[-0.08em] text-[var(--theme-text)]/[0.035] sm:text-[10rem]">
                06
              </span>

              {/* Section label */}
              <div className="relative mb-8 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-muted)]">
                  06
                </span>

                <span className="h-px w-12 bg-[var(--theme-border)]" />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                  Additional Feedback
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Suggestions
                <br />
                <span className="text-[#628dec]">(Optional)</span>
              </h2>

              {/* Description */}
              <p className="relative mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Add comments, suggestions, or concerns if you want to share
                more. Tap{" "}
                <span className="font-medium text-[var(--theme-text)]">
                  Save
                </span>{" "}
                to include your message or{" "}
                <span className="font-medium text-[var(--theme-text)]">
                  Skip
                </span>{" "}
                to continue.
              </p>
            </div>
          </section>
        </div>

        {/* ─────────────────────────────────────
            NEXT
        ───────────────────────────────────── */}
        <div className="border-t border-[var(--theme-border)] pt-10 text-center">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--theme-muted)]">
            Continue
          </p>

          <Link
            to="/article/how-it-works/page3"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] px-6 py-2.5 text-sm font-medium text-[var(--theme-muted)] transition-all duration-300 hover:border-[var(--theme-text)] hover:text-[var(--theme-text)]"
          >
            Next: What Happens After You Submit
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks_Page02;
