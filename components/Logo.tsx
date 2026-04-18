type Props = { className?: string };

export default function Logo({ className = "h-8 w-8" }: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="8"
        stroke="url(#lg1)"
        strokeWidth="1.2"
      />
      <path
        d="M10 26 L20 10 L30 26"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 26 H26"
        stroke="#cdd3dd"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="30" r="1.4" fill="#2563eb" />
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#2563eb" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
      </defs>
    </svg>
  );
}
