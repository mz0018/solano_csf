import type { ReactNode, RefObject } from "react";
import { Link } from "react-router-dom";
import { CircleSmall } from "lucide-react";

type ArticleUIProps = {
  title?: ReactNode;
  paragraph?: ReactNode;
  lottie?: ReactNode;
  children?: ReactNode;
  articleRef?: RefObject<HTMLElement | null>;
  viewMoreLink?: string;
  className?: string;
};

export const ArticleUI = ({
  title,
  paragraph,
  lottie,
  children,
  articleRef,
  viewMoreLink,
  className = "",
}: ArticleUIProps) => {
  return (
    <article
      ref={articleRef}
      className={`w-full max-w-3xl shrink-0 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-nav-bg)]/90 shadow-xl
        px-4 py-8
        sm:px-6 sm:py-10
        md:px-8 md:py-12
        lg:px-12 lg:py-16
        xl:px-16 xl:py-20
        ${className}`}
    >
      <h1 className="mb-5 text-2xl font-bold tracking-wide text-[var(--theme-text)] sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h1>

      <p className="mb-5 line-clamp-2 text-[var(--theme-text)] sm:text-xs md:text-sm lg:text-base">
        {paragraph}
      </p>

      {/* Lottie placeholder */}
      <div className="my-6 flex min-h-12 items-center justify-center">
        {lottie}
      </div>

      {viewMoreLink && (
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] px-6 py-1 text-sm text-[var(--theme-muted)] hover:text-[var(--theme-text)] sm:text-base"
          to={viewMoreLink}
          onClick={() => window.scrollTo(0, 0)}
        >
          <CircleSmall className="size-3 fill-green-500 text-green-500" />
          Read more
        </Link>
      )}

      {children}
    </article>
  );
};
