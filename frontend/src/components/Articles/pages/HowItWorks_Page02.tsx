import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ParagraphUI } from "../../../ui/form/ParagraphUI";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

const HowItWorks_Page02 = () => {

  const { ref: gettingStartedRef, isVisible: gettingStartedVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: step1Ref, isVisible: step1Visible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: step2Ref, isVisible: step2Visible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: step3Ref, isVisible: step3Visible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: step4Ref, isVisible: step4Visible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: step5Ref, isVisible: step5Visible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: step6Ref, isVisible: step6Visible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const { ref: tipsRef, isVisible: tipsVisible } =
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
          <div ref={gettingStartedRef}>
            <h1 className={`text-3xl font-bold text-[var(--theme-text)] sm:text-4xl mb-4 ${
              gettingStartedVisible ? "animate-fade-in-up" : "opacity-0"
            }`}>
              How to Give Your Feedback in a Few Simple Steps
            </h1>

            <p className={`text-[var(--theme-muted)] text-sm sm:text-base mb-8 ${
              gettingStartedVisible ? "delay-animation animate-fade-in-left" : "opacity-0"
            }`}>
              After selecting Get Started and confirming the privacy reminder, you can begin the survey.
              The process only takes a few minutes.
            </p>
          </div>
        </ParagraphUI>

        <hr className="border-[var(--theme-border)] mb-8" />

        <ParagraphUI>
          <section className="mb-8">
          <div  ref={step1Ref}>
            <h2 className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${step1Visible ? "animate-fade-in-up" : "opacity-0"}`}>
              Step 1 — Enter Your Queue Number
            </h2>
            <p className={`text-[var(--theme-muted)] text-sm sm:text-base leading-relaxed ${step1Visible ? "delay-animation animate-fade-in-left" : "opacity-0"}`}>
              Enter the Queue Number provided during your transaction (example:{" "}
              <span className="text-[var(--theme-text)]">ABC1-234</span>), then tap{" "}
              <span className="text-[var(--theme-text)]">Verify Queue Number</span>.
              The system will check if it is valid before continuing.
            </p>
          </div>
          </section>

          <section className="mb-8">
            <div ref={step2Ref}>
              <h2 className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${step2Visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Step 2 — Respondent Profile
              </h2>
              <p className={`text-[var(--theme-muted)] text-sm sm:text-base ${step2Visible ? 'delay-animation animate-fade-in-left' : 'opacity-0'}`}>
                Provide basic details such as your name and phone number (optional).
                Your information remains confidential.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div ref={step3Ref}>
              <h2 className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${step3Visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Step 3 — Select Services
              </h2>
              <p className={`text-[var(--theme-muted)] text-sm sm:text-base ${step3Visible ? 'delay-animation animate-fade-in-left' : 'opacity-0'}`}>
                Choose the service you used during your visit. If it is not listed, select{" "}
                <span className="text-[var(--theme-text)]">"Other"</span> and describe it.
                You can change your selection if needed.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div ref={step4Ref}>
              <h2 className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${step4Visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Step 4 — Demographic Information
              </h2>
              
              <div className={`${step4Visible ? 'delay-animation animate-fade-in-up' : 'opacity-0'}`}>
                <p className="text-[var(--theme-muted)] text-sm sm:text-base mb-3">
                  Provide general information to help LGU understand feedback trends, such as:
                </p>
                <ul className="list-disc list-inside text-[var(--theme-muted)] text-sm sm:text-base space-y-2">
                  <li>Affiliation</li>
                  <li>Gender</li>
                  <li>Age group</li>
                  <li>Employment status</li>
                  <li>Address or location details</li>
                </ul>

                <p className="text-[var(--theme-muted)] text-sm sm:text-base mt-3">
                  These details are used only for grouping results and improving services.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div ref={step5Ref}>
              <h2 className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${step5Visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Step 5 — Rate the Service
              </h2>
              <p className={`text-[var(--theme-muted)] text-sm sm:text-base ${step5Visible ? 'delay-animation animate-fade-in-left' : 'opacity-0'}`}>
                Rate each service you selected. Your honest feedback helps LGU identify areas that need improvement.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div ref={step6Ref}>
              <h2 className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${step6Visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Step 6 — Suggestions (Optional)
              </h2>
              <p className={`text-[var(--theme-muted)] text-sm sm:text-base ${step6Visible ? 'delay-animation animate-fade-in-left' : 'opacity-0'}`}>
                Add comments, suggestions, or concerns if you want to share more. Tap{" "}
                <span className="text-[var(--theme-text)]">Save</span> to include your message or{" "}
                <span className="text-[var(--theme-text)]">Skip</span> to continue.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div ref={tipsRef}>
              <h2 className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${tipsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Tips for a Smooth Experience
              </h2>

              <ul className={`list-disc list-inside text-[var(--theme-muted)] text-sm sm:text-base space-y-2 ${tipsVisible ? 'delay-animation animate-fade-in-left' : 'opacity-0'}`}>
                <li>Prepare your queue number before starting.</li>
                <li>Use Back to correct previous answers.</li>
                <li>Answer in your preferred language.</li>
                <li>Give honest feedback based on your experience.</li>
              </ul>
            </div>
          </section>
        </ParagraphUI>

        <hr className="border-[var(--theme-border)] mb-8" />

        <ParagraphUI>
          <section className="mb-8">
            <div ref={recapRef}>
              <h2 className={`text-xl font-semibold text-[var(--theme-text)] sm:text-2xl mb-3 ${recapVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Quick Recap
              </h2>

              <ol className={`list-decimal list-inside text-[var(--theme-muted)] text-sm sm:text-base space-y-2 ${recapVisible ? 'delay-animation animate-fade-in-left' : 'opacity-0'}`}>
                <li>Verify your queue number.</li>
                <li>Complete your profile.</li>
                <li>Select your services.</li>
                <li>Provide demographic details.</li>
                <li>Rate your experience.</li>
                <li>Add suggestions and submit.</li>
              </ol>
            </div>
          </section>

          <Link
            to="/article/how-it-works/page3"
            onClick={() => window.scrollTo(0,0)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] px-6 py-2 text-sm text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors"
          >
            Next: What Happens After You Submit →
          </Link>
        </ParagraphUI>
      </div>
    </div>
  );
};

export default HowItWorks_Page02;