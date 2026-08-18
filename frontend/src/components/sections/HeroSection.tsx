import { PenLine } from "lucide-react";
import { FeedbackArticleUI } from "../../ui/form/FeedbackArticleUI";

export const HeroSection = () => {
  return (
    <section>
      <div className="bg-[var(--theme-nav-bg)] md:bg-transparent border-b border-[var(--theme-border)] md:border-b-0 mt-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-9 px-4 py-28 sm:px-6 md:py-32 lg:flex-row lg:px-8 lg:py-40">
          {/* Left Content */}
          <article className="max-w-8xl text-[var(--theme-text)]">
            <p className="mb-2 text-[#628dec] font-semibold uppercase tracking-widest">
              Welcome
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-[0.90] sm:text-5xl md:text-6xl lg:text-7xl">
              Client Satisfaction{" "}
              <span className="text-[#628dec]">Feedback System</span>
            </h1>

            <p className="mb-8 text-lg text-[var(--theme-muted)]">
              Share your experience with our services. Your feedback helps us
              improve service quality and better serve our community.
            </p>

            <a
              href="/create-feedback"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-[#628dec]
                px-6
                py-3
                font-semibold
                text-gray-200
                transition
                hover:opacity-90
                animate-fade-in-up
              "
            >
              <PenLine className="size-5" />
              Create Feedback
            </a>
          </article>

          {/* Right Card */}
          <FeedbackArticleUI className="hidden lg:block animate-fade-in-up relative top-12" />
        </div>
      </div>
    </section>
  );
};