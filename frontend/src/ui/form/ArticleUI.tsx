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
  decorative?: string | number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export const ArticleUI = ({
  title,
  paragraph,
  lottie,
  children,
  articleRef,
  viewMoreLink,
  className = "",
  decorative,
  onMouseEnter,
  onMouseLeave,
}: ArticleUIProps) => {
  return (
    <article
      ref={articleRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        relative
        w-full
        max-w-3xl
        shrink-0
        overflow-hidden
        rounded-lg
        px-3 py-5
        sm:px-5 sm:py-7
        md:px-6 md:py-8
        lg:px-8 lg:py-10
        xl:px-10 xl:py-12
        ${className}
      `}
    >
      {/* Decorative background */}
      {decorative !== undefined && (
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -top-4
            left-1
            select-none
            text-[8rem]
            font-bold
            leading-none
            tracking-[-0.08em]
            text-[var(--theme-text)]/[0.035]
            sm:-top-6
            sm:left-1
            sm:text-[10rem]
            md:-top-8
            md:left-0
          "
        >
          {decorative}
        </span>
      )}

      {/* Content */}
      <div className="relative z-10">
        <h1 className="mb-5 text-2xl font-bold tracking-wide text-[var(--theme-text)] sm:text-3xl md:text-4xl lg:text-5xl">
          {title}
        </h1>

        <p className="mb-5 line-clamp-2 text-[var(--theme-text)] sm:text-xs md:text-sm lg:text-base">
          {paragraph}
        </p>

        {/* Lottie */}
        <div className="my-6 flex min-h-12 items-center justify-center">
          {lottie}
        </div>

        {viewMoreLink && (
          <Link
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[var(--theme-border)]
              px-6
              py-1
              text-sm
              text-[var(--theme-muted)]
              hover:text-[var(--theme-text)]
              sm:text-base
            "
            to={viewMoreLink}
            onClick={() => window.scrollTo(0, 0)}
          >
            <CircleSmall className="size-3 fill-green-500 text-green-500" />
            Read more
          </Link>
        )}

        {children}
      </div>
    </article>
  );
};
