import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ParagraphUI } from "../../../ui/form/ParagraphUI";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

const HowItWorks_Page03 = () => {

  const { ref: introRef, isVisible: introVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: verificationRef, isVisible: verificationVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: formatRef, isVisible: formatVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: expirationRef, isVisible: expirationVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: submissionRef, isVisible: submissionVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: usageRef, isVisible: usageVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: privacyRef, isVisible: privacyVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: recapRef, isVisible: recapVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });


  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>


        <ParagraphUI>
          <div ref={introRef}>
            <h1
              className={`text-3xl font-bold text-[var(--theme-text)] sm:text-4xl mb-4 ${
                introVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              What Happens After You Submit
            </h1>

            <p
              className={`text-[var(--theme-muted)] text-sm sm:text-base mb-8 ${
                introVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
              }`}
            >
              After submitting your feedback, the system verifies your transaction,
              saves your response, and sends the information to LGU Solano for service improvement.
            </p>
          </div>
        </ParagraphUI>


        <hr className="border-[var(--theme-border)] mb-8" />


        <ParagraphUI>

          <section className="mb-8">
            <div ref={verificationRef}>
              <h2
                className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${
                  verificationVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                Queue Number Verification
              </h2>

              <p
                className={`text-[var(--theme-muted)] text-sm sm:text-base leading-relaxed ${
                  verificationVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                Your queue number is checked to make sure it matches your transaction,
                is not expired, and has not already been completed. This keeps feedback
                connected to a valid service experience.
              </p>
            </div>
          </section>


          <section className="mb-8">
            <div ref={formatRef}>
              <h2
                className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${
                  formatVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                Queue Number Format
              </h2>

              <div
                className={`${
                  formatVisible
                    ? "delay-animation animate-fade-in-up"
                    : "opacity-0"
                }`}
              >
                <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-4 mb-3">
                  <code className="text-[var(--theme-text)] text-sm sm:text-base font-mono">
                    {"<OfficeCode><2-digit year>-<sequence number>"}
                  </code>
                </div>

                <p className="text-[var(--theme-muted)] text-sm sm:text-base">
                  Example: <span className="text-[var(--theme-text)]">SOL25-001</span>.
                  The code identifies the office, the year organizes records, and the
                  sequence number identifies the ticket order.
                </p>
              </div>
            </div>
          </section>


          <section className="mb-8">
            <div ref={expirationRef}>
              <h2
                className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${
                  expirationVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                Ticket Expiration and ITRS Codes
              </h2>

              <p
                className={`text-[var(--theme-muted)] text-sm sm:text-base leading-relaxed ${
                  expirationVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                Queue tickets are active for{" "}
                <span className="text-[var(--theme-text)]">15 minutes</span> after creation.
                Expired tickets cannot be used for feedback. If your transaction uses an
                ITRS code, it can also be accepted as a valid reference.
              </p>
            </div>
          </section>


          <section className="mb-8">
            <div ref={submissionRef}>
              <h2
                className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${
                  submissionVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                After Submission
              </h2>

              <ul
                className={`list-disc list-inside text-[var(--theme-muted)] text-sm sm:text-base space-y-2 ${
                  submissionVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                <li>Your feedback is saved securely.</li>
                <li>Your ticket status changes to completed.</li>
                <li>The office dashboard updates with your response.</li>
              </ul>
            </div>
          </section>


          <section className="mb-8">
            <div ref={usageRef}>
              <h2
                className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${
                  usageVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                How LGU Uses Your Feedback
              </h2>

              <p
                className={`text-[var(--theme-muted)] text-sm sm:text-base mb-3 ${
                  usageVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                Your responses help LGU Solano monitor services and improve client
                experience through:
              </p>

              <ul
                className={`list-disc list-inside text-[var(--theme-muted)] text-sm sm:text-base space-y-2 ${
                  usageVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                <li>Office and service performance tracking.</li>
                <li>Reports and feedback analysis.</li>
                <li>Identifying improvements and service concerns.</li>
              </ul>
            </div>
          </section>


          <section className="mb-8">
            <div ref={privacyRef}>
              <h2
                className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${
                  privacyVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                Your Privacy
              </h2>

              <p
                className={`text-[var(--theme-muted)] text-sm sm:text-base ${
                  privacyVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                Your information is handled confidentially under the Data Privacy Act
                of 2012 and is used only to improve government services.
              </p>
            </div>
          </section>

        </ParagraphUI>


        <hr className="border-[var(--theme-border)] mb-8" />


        <ParagraphUI>

          <section className="mb-8">
            <div ref={recapRef}>
              <h2
                className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${
                  recapVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                Quick Recap
              </h2>

              <ul
                className={`list-disc list-inside text-[var(--theme-muted)] text-sm sm:text-base space-y-2 ${
                  recapVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                <li>Queue numbers are verified before feedback is accepted.</li>
                <li>Tickets expire after 15 minutes and follow a standard format.</li>
                <li>ITRS codes may be used as transaction references.</li>
                <li>Submitted feedback updates the system and office dashboard.</li>
                <li>LGU uses feedback to improve services.</li>
              </ul>

              <p
                className={`text-[var(--theme-muted)] text-sm sm:text-base mt-4 ${
                  recapVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                Thank you for sharing your experience and helping LGU Solano improve.
              </p>
            </div>
          </section>


          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] px-6 py-2 text-sm text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors"
          >
            ← Back to Home
          </Link>

        </ParagraphUI>

      </div>
    </div>
  );
};

export default HowItWorks_Page03;
