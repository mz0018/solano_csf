import { ArrowDown } from "lucide-react";

const HowItWorks_Page03 = () => {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ─────────────────────────────────────
            HERO
        ───────────────────────────────────── */}
        <section className="scroll-reveal-left py-6 sm:py-10">
          <h1 className="mb-4 text-3xl font-bold text-[var(--theme-text)] sm:text-4xl">
            What Happens After You Submit
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
            After submitting your feedback, the system verifies your transaction,
            saves your response, and sends the information to LGU Solano for
            service improvement.
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

          {/* STEP 1 — LEFT */}
          <section className="scroll-reveal-left relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="lg:pr-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                01
              </span>

              <h2 className="mb-3 text-xl font-semibold text-[var(--theme-text)] sm:text-2xl">
                Queue Number Verification
              </h2>

              <p className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Your queue number is checked to make sure it matches your
                transaction, is not expired, and has not already been completed.
                This keeps feedback connected to a valid service experience.
              </p>
            </div>

            <div />
          </section>

          {/* STEP 2 — RIGHT */}
          <section className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            <div />

            <div className="lg:pl-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                02
              </span>

              <h2 className="mb-3 text-xl font-semibold text-[var(--theme-text)] sm:text-2xl">
                Queue Number Format
              </h2>

              <div className="mb-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4">
                <code className="font-mono text-sm text-[var(--theme-text)] sm:text-base">
                  {"<OfficeCode><2-digit year>-<sequence number>"}
                </code>
              </div>

              <p className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Example:{" "}
                <span className="text-[var(--theme-text)]">SOL25-001</span>.
                The code identifies the office, the year organizes records, and
                the sequence number identifies the ticket order.
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
                Ticket Expiration and ITRS Codes
              </h2>

              <p className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Queue tickets are active for{" "}
                <span className="text-[var(--theme-text)]">15 minutes</span>{" "}
                after creation. Expired tickets cannot be used for feedback.
                If your transaction uses an ITRS code, it can also be accepted
                as a valid reference.
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
                After Submission
              </h2>

              <ul className="list-inside list-disc space-y-2 text-sm text-[var(--theme-muted)] sm:text-base">
                <li>Your feedback is saved securely.</li>
                <li>Your ticket status changes to completed.</li>
                <li>The office dashboard updates with your response.</li>
              </ul>
            </div>
          </section>

          {/* STEP 5 — LEFT */}
          <section className="scroll-reveal-left relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="lg:pr-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                05
              </span>

              <h2 className="mb-3 text-xl font-semibold text-[var(--theme-text)] sm:text-2xl">
                How LGU Uses Your Feedback
              </h2>

              <p className="mb-3 text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Your responses help LGU Solano monitor services and improve
                client experience through:
              </p>

              <ul className="list-inside list-disc space-y-2 text-sm text-[var(--theme-muted)] sm:text-base">
                <li>Office and service performance tracking.</li>
                <li>Reports and feedback analysis.</li>
                <li>Identifying improvements and service concerns.</li>
              </ul>
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
                Your Privacy
              </h2>

              <p className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                Your information is handled confidentially under the Data
                Privacy Act of 2012 and is used only to improve government
                services.
              </p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

export default HowItWorks_Page03;
