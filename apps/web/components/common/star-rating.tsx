export interface StarRatingProps {
  /** Numeric rating out of maxStars (e.g., 4.5) */
  rating?: number;
  /** Legacy percentage string/number (e.g., "80%" or 80) */
  ratingPercentage?: number | string;
  /** Maximum number of stars (defaults to 5) */
  maxStars?: number;
  /** Tailwind class for sizing each star (defaults to size-3.5) */
  sizeClass?: string;
}

const StarIcon = ({ className }: { className: string }) => (
  <svg
    className={`${className} shrink-0`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5598 21C17.3999 21.0006 17.2421 20.9629 17.0998 20.89L11.9998 18.22L6.89979 20.89C6.56192 21.0676 6.15238 21.0374 5.84422 20.8122C5.53605 20.5869 5.38302 20.2058 5.44979 19.83L6.44979 14.2L2.32979 10.2C2.06784 9.93856 1.97167 9.55387 2.07979 9.19996C2.19803 8.83738 2.51221 8.57363 2.88979 8.51996L8.58979 7.68996L11.0998 2.55996C11.2669 2.21497 11.6165 1.99585 11.9998 1.99585C12.3831 1.99585 12.7327 2.21497 12.8998 2.55996L15.4398 7.67996L21.1398 8.50996C21.5174 8.56363 21.8315 8.82738 21.9498 9.18996C22.0579 9.54387 21.9617 9.92856 21.6998 10.19L17.5798 14.19L18.5798 19.82C18.6527 20.2028 18.4966 20.593 18.1798 20.82C17.9987 20.9469 17.7807 21.0102 17.5598 21Z"
      fill="currentColor"
    />
  </svg>
);

export default function StarRating({
  rating,
  ratingPercentage,
  maxStars = 5,
  sizeClass = "size-4",
}: StarRatingProps) {
  // Compute final width of the filled stars wrapper
  let calculatedWidth = "0%";

  if (rating !== undefined) {
    const clampedRating = Math.max(0, Math.min(rating, maxStars));
    calculatedWidth = `${(clampedRating / maxStars) * 100}%`;
  } else if (ratingPercentage !== undefined) {
    calculatedWidth =
      typeof ratingPercentage === "number"
        ? `${ratingPercentage}%`
        : ratingPercentage;
  }

  return (
    <div className="relative inline-flex items-center">
      {/* Background (Empty) Stars */}
      <div className="flex gap-px">
        {[...Array(maxStars)].map((_, i) => (
          <StarIcon key={i} className={`${sizeClass} text-gray-300`} />
        ))}
      </div>
      {/* Foreground (Filled) Stars */}
      <div
        className="absolute top-0 left-0 flex gap-px overflow-hidden whitespace-nowrap"
        style={{ width: calculatedWidth }}
      >
        {[...Array(maxStars)].map((_, i) => (
          <StarIcon key={i} className={`${sizeClass} text-warning`} />
        ))}
      </div>
    </div>
  );
}
