import type { ReactNode } from "react";

/**
 * Splits text and wraps numbers/metrics in a bright white bold span.
 * Matches: 350M+, 20%, 75%, 4.5x, 100, $2M, 1.5K, etc.
 */
export function highlightNumbers(text: string): ReactNode {
  const parts = text.split(/(\$?£?€?[\d,]+(?:\.\d+)?(?:[KMBkmb]\+?|%|\+|x)?(?!\w))/g);
  return parts.map((part, i) =>
    /^[\d$£€]/.test(part) && /\d/.test(part) ? (
      <span key={i} className="font-semibold text-white">
        {part}
      </span>
    ) : (
      part
    )
  );
}
