import { Link } from "react-router-dom";

const HowItWorks_Page02 = () => {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ─────────────────────────────────────
            HERO
        ───────────────────────────────────── */}
        <section className="scroll-reveal-left py-6 sm:py-10">
          <h1 className="mb-4 text-3xl font-bold text-[var(--theme-text)] sm:text-4xl">
            How to Give Your Feedback in a Few Simple Steps
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
            After selecting Get Started and confirming the privacy reminder,
            you can begin the survey. The process only takes a few minutes.
          </p>
        </section>

        {/* ─────────────────────────────────────
            ZIG-ZAG CONTENT
        ───────────────────────────────────── */}
        <div className="relative mt-12">

          {/* Vertical guide line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[var(--theme-border)] lg:block" />

          {/* STEP 1 — LEFT */}
          <section className="scroll-reveal-left relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="lg:pr-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                01
              </span>

              <h2 className="mb-3 text-xl font-semibold text-[var(--theme-text)] sm:text-2xl">
                Step 1 — Enter Your Queue Number
              </h2>

              <p className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Enter the Queue Number provided during your transaction
                (example:{" "}
                <span className="text-[var(--theme-text)]">ABC1-234</span>
                ), then tap{" "}
                <span className="text-[var(--theme-text)]">
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

            <div className="lg:pl-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                02
              </span>

              <h2 className="mb-3 text-xl font-semibold text-[var(--theme-text)] sm:text-2xl">
                Step 2 — Respondent Profile
              </h2>

              <p className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Provide basic details such as your name and phone number
                (optional). Your information remains confidential.
              </p>
            </div>
          </section>

          {/* STEP 3 — LEFT */}
          <section className="scroll-reveal-left relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="lg:pr-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                03
              </span>

              <h2 className="mb-3 text-xl font-semibold text-[var(--theme-text)] sm:text-2xl">
                Step 3 — Select Services
              </h2>

              <p className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Choose the service you used during your visit. If it is not
                listed, select{" "}
                <span className="text-[var(--theme-text)]">"Other"</span>{" "}
                and describe it. You can change your selection if needed.
              </p>
            </div>

            <div />
          </section>

          {/* STEP 4 — RIGHT */}
          <section className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            <div />

            <div className="lg:pl-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                04
              </span>

              <h2 className="mb-3 text-xl font-semibold text-[var(--theme-text)] sm:text-2xl">
                Step 4 — Demographic Information
              </h2>

              <p className="mb-3 text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Provide general information to help LGU understand feedback
                trends, such as:
              </p>

              <ul className="list-inside list-disc space-y-2 text-sm text-[var(--theme-muted)] sm:text-base">
                <li>Affiliation</li>
                <li>Gender</li>
                <li>Age group</li>
                <li>Employment status</li>
                <li>Address or location details</li>
              </ul>

              <p className="mt-3 text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                These details are used only for grouping results and improving
                services.
              </p>
            </div>
          </section>

          {/* STEP 5 — LEFT */}
          <section className="scroll-reveal-left relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="lg:pr-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                05
              </span>

              <h2 className="mb-3 text-xl font-semibold text-[var(--theme-text)] sm:text-2xl">
                Step 5 — Rate the Service
              </h2>

              <p className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Rate each service you selected. Your honest feedback helps LGU
                identify areas that need improvement.
              </p>
            </div>

            <div />
          </section>

          {/* STEP 6 — RIGHT */}
          <section className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            <div />

            <div className="lg:pl-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                06
              </span>

              <h2 className="mb-3 text-xl font-semibold text-[var(--theme-text)] sm:text-2xl">
                Step 6 — Suggestions (Optional)
              </h2>

              <p className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Add comments, suggestions, or concerns if you want to share
                more. Tap{" "}
                <span className="text-[var(--theme-text)]">Save</span> to
                include your message or{" "}
                <span className="text-[var(--theme-text)]">Skip</span> to
                continue.
              </p>
            </div>
          </section>

        </div>

        {/* ─────────────────────────────────────
            NEXT
        ───────────────────────────────────── */}
        <div className="text-center">
          <Link
            to="/article/how-it-works/page3"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] px-6 py-2 text-sm text-[var(--theme-muted)] transition-colors hover:text-[var(--theme-text)]"
          >
            Next: What Happens After You Submit →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks_Page02;
