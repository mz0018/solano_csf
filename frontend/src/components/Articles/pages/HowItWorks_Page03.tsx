import { ArrowDown } from "lucide-react";

const HowItWorks_Page03 = () => {
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
              After Your Feedback
            </p>

            <span className="h-px w-10 bg-[var(--theme-border)]" />
          </div>

          {/* Main heading */}
          <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-[var(--theme-text)] sm:text-6xl md:text-7xl">
            What Happens
            <br />
            <span className="text-[#628dec]">After You Submit</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
            After submitting your feedback, the system verifies your
            transaction, saves your response, and sends the information to LGU
            Solano for service improvement.
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

          {/* ─────────────────────────────────
              STEP 01 — LEFT
          ───────────────────────────────── */}
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
                  Transaction Check
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Queue Number
                <br />
                <span className="text-[#628dec]">Verification</span>
              </h2>

              {/* Description */}
              <p className="relative mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Your queue number is checked to make sure it matches your
                transaction, is not expired, and has not already been completed.
                This keeps feedback connected to a valid service experience.
              </p>
            </div>

            {/* Intentional empty right side */}
            <div />
          </section>

          {/* ─────────────────────────────────
              STEP 02 — RIGHT
          ───────────────────────────────── */}
          <section className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Intentional empty left side */}
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
                  Ticket Format
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Queue Number
                <br />
                <span className="text-[#628dec]">Format</span>
              </h2>

              {/* Code format */}
              <div className="relative mt-7 max-w-xl border-y border-[var(--theme-border)] py-5">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--theme-muted)]">
                  Standard Format
                </p>

                <code className="font-mono text-sm text-[var(--theme-text)] sm:text-base">
                  {"<OfficeCode><2-digit year>-<sequence number>"}
                </code>
              </div>

              {/* Description */}
              <p className="relative mt-6 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Example:{" "}
                <span className="font-medium text-[var(--theme-text)]">
                  SOL25-001
                </span>
                . The code identifies the office, the year organizes records,
                and the sequence number identifies the ticket order.
              </p>
            </div>
          </section>

          {/* ─────────────────────────────────
              STEP 03 — LEFT
          ───────────────────────────────── */}
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
                  Ticket Validity
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Ticket Expiration
                <br />
                <span className="text-[#628dec]">& ITRS Codes</span>
              </h2>

              {/* Description */}
              <p className="relative mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Queue tickets are active for{" "}
                <span className="font-medium text-[var(--theme-text)]">
                  15 minutes
                </span>{" "}
                after creation. Expired tickets cannot be used for feedback. If
                your transaction uses an ITRS code, it can also be accepted as a
                valid reference.
              </p>
            </div>

            {/* Intentional empty right side */}
            <div />
          </section>

          {/* ─────────────────────────────────
              STEP 04 — RIGHT
          ───────────────────────────────── */}
          <section className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Intentional empty left side */}
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
                  Submission Complete
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                After
                <br />
                <span className="text-[#628dec]">Submission</span>
              </h2>

              {/* Benefits */}
              <div className="relative mt-8 max-w-xl">
                {[
                  "Your feedback is saved securely.",
                  "Your ticket status changes to completed.",
                  "The office dashboard updates with your response.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 border-t border-[var(--theme-border)] py-4 last:border-b"
                  >
                    <span className="text-xs font-semibold text-[var(--theme-muted)]">
                      0{index + 1}
                    </span>

                    <span className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────
              STEP 05 — LEFT
          ───────────────────────────────── */}
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
                  Community Impact
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                How LGU Uses
                <br />
                <span className="text-[#628dec]">Your Feedback</span>
              </h2>

              {/* Description */}
              <p className="relative mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Your responses help LGU Solano monitor services and improve
                client experience through:
              </p>

              {/* Benefits */}
              <div className="relative mt-7 max-w-xl">
                {[
                  "Office and service performance tracking.",
                  "Reports and feedback analysis.",
                  "Identifying improvements and service concerns.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 border-t border-[var(--theme-border)] py-4 last:border-b"
                  >
                    <span className="text-xs font-semibold text-[var(--theme-muted)]">
                      0{index + 1}
                    </span>

                    <span className="text-sm leading-relaxed text-[var(--theme-muted)] sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Intentional empty right side */}
            <div />
          </section>

          {/* ─────────────────────────────────
              STEP 06 — RIGHT
          ───────────────────────────────── */}
          <section className="scroll-reveal-right relative mb-24 lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Intentional empty left side */}
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
                  Privacy & Protection
                </span>
              </div>

              {/* Heading */}
              <h2 className="relative max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--theme-text)] sm:text-5xl lg:text-[3.5rem]">
                Your
                <br />
                <span className="text-[#628dec]">Privacy</span>
              </h2>

              {/* Description */}
              <p className="relative mt-7 max-w-xl text-sm leading-7 text-[var(--theme-muted)] sm:text-base">
                Your information is handled confidentially under the{" "}
                <span className="font-medium text-[var(--theme-text)]">
                  Data Privacy Act of 2012
                </span>{" "}
                and is used only to improve government services.
              </p>

              {/* Closing detail */}
              <div className="relative mt-10 flex items-center gap-3 border-t border-[var(--theme-border)] pt-6">
                <span className="size-2 shrink-0 rounded-full bg-[#628dec]" />

                <span className="text-xs uppercase tracking-[0.18em] text-[var(--theme-muted)]">
                  Your feedback helps shape better public services
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks_Page03;
