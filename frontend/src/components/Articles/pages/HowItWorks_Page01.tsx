import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ParagraphUI } from "../../../ui/form/ParagraphUI";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

const HowItWorks_Page01 = () => {

  const { ref: gettingStartedRef, isVisible: gettingStartedVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: whatCSFRef, isVisible: whatCSFVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: surveyFRef, isVisible: surveyVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: privacyRef, isVisible: privacyVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: feedbackRef, isVisible: feedbackVisible } =
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

        {/**Getting Started */}
        <ParagraphUI>
          <div ref={gettingStartedRef}>
            <h1 className={`text-3xl font-bold text-[var(--theme-text)] sm:text-4xl mb-4 ${gettingStartedVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Getting Started: What CSF Is and Why Your Feedback Matters
            </h1>

            <p className={`text-[var(--theme-muted)] text-sm sm:text-base mb-8 ${gettingStartedVisible ? 'delay-animation animate-fade-in-left' : 'opacity-0'}`}>
              After completing a transaction at the Local Government Unit (LGU) of Solano, you may be
              invited to share your experience through the Client Satisfaction Feedback (CSF) platform.
              It is a simple digital survey available at{" "}
              <span className="text-[var(--theme-text)] font-medium">
                csf.solano.online
              </span>.
            </p>
          </div>
        </ParagraphUI>

        <hr className="border-[var(--theme-border)] m-8" />

        {/**What is CSF */}
        <ParagraphUI>
          <section className="mb-8">
          <div ref={whatCSFRef}>
            <h2 className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${whatCSFVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              What is CSF?
            </h2>
            <p className={`text-[var(--theme-muted)] text-sm sm:text-base leading-relaxed ${whatCSFVisible ? 'delay-animation animate-fade-in-left' : 'opacity-0'}`}>
              CSF is LGU Solano's Client Satisfaction Measurement (CSM) tool. It replaces paper forms
              with a quick and private digital survey that helps offices understand client experiences
              and improve public services.
            </p>
          </div>
          </section>

          <section className="mb-8">
            <div ref={surveyFRef}>
              <h2
                className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${
                  surveyVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                Starting the Survey
              </h2>

              <p
                className={`text-[var(--theme-muted)] text-sm sm:text-base leading-relaxed ${
                  surveyVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                When you open the platform, you will see a welcome message explaining that
                CSF collects feedback to improve government services. Tap{" "}
                <span className="text-[var(--theme-text)]">Get Started</span> to continue.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div ref={privacyRef}>
              <h2
                className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${
                  privacyVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                Your Privacy Matters
              </h2>

              <ul
                className={`list-disc list-inside text-[var(--theme-muted)] text-sm sm:text-base space-y-2 ${
                  privacyVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                <li>CSF measures client satisfaction with government services.</li>
                <li>Your feedback helps improve your recently completed transaction experience.</li>
                <li>
                  Your information remains confidential under the{" "}
                  <span className="text-[var(--theme-text)]">
                    Data Privacy Act of 2012
                  </span>.
                </li>
                <li>Participation is voluntary and your responses are used only for improvement.</li>
                <li>
                  You may switch between{" "}
                  <span className="text-[var(--theme-text)]">English and Tagalog</span>.
                </li>
              </ul>

              <p
                className={`text-[var(--theme-muted)] text-sm sm:text-base mt-3 ${
                  privacyVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                Tap <span className="text-[var(--theme-text)]">"Got it"</span> when you
                are ready to continue.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div ref={feedbackRef}>
              <h2
                className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${
                  feedbackVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                Why Your Feedback Matters
              </h2>

              <p
                className={`text-[var(--theme-muted)] text-sm sm:text-base leading-relaxed mb-3 ${
                  feedbackVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                Your feedback helps LGU Solano identify what works well and what needs
                improvement. It helps the office:
              </p>

              <ul
                className={`list-disc list-inside text-[var(--theme-muted)] text-sm sm:text-base space-y-2 ${
                  feedbackVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                <li>Improve services and identify areas for change.</li>
                <li>Address delays and client concerns.</li>
                <li>Make better decisions based on client experiences.</li>
                <li>Create a more responsive LGU Solano.</li>
              </ul>
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

              <ol
                className={`list-decimal list-inside text-[var(--theme-muted)] text-sm sm:text-base space-y-2 ${
                  recapVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
                }`}
              >
                <li>CSF is LGU Solano's digital satisfaction survey.</li>
                <li>The survey starts with a welcome page and privacy reminder.</li>
                <li>You can answer in English or Tagalog.</li>
                <li>Your responses are confidential and voluntary.</li>
                <li>Your feedback helps improve government services.</li>
              </ol>
            </div>
          </section>

          <Link
            to="/article/how-it-works/page2"
            onClick={() => window.scrollTo(0,0)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] px-6 py-2 text-sm text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors"
          >
            Next: How to Give Your Feedback →
          </Link>
        </ParagraphUI>
      </div>
    </div>
  );
};

export default HowItWorks_Page01;