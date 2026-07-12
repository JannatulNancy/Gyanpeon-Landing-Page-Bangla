export default function ButterflyLogoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Wing - Stacked Book Pages */}
      <path 
        d="M5 12L15 4L17 6L7 14L5 12Z" 
        fill="currentColor" 
        fillOpacity="0.5" 
      />
      <path 
        d="M3 16L15 6L17 8L5 18L3 16Z" 
        fill="currentColor" 
        fillOpacity="0.75" 
      />
      <path 
        d="M2 21L15 9L18 11.5L4 24L2 21Z" 
        fill="currentColor" 
      />

      {/* Right Wing - Stacked Book Pages */}
      <path 
        d="M27 12L17 4L15 6L25 14L27 12Z" 
        fill="currentColor" 
        fillOpacity="0.5" 
      />
      <path 
        d="M29 16L17 6L15 8L27 18L29 16Z" 
        fill="currentColor" 
        fillOpacity="0.75" 
      />
      <path 
        d="M30 21L17 9L14 11.5L28 24L30 21Z" 
        fill="currentColor" 
      />

      {/* Butterfly Central Body & Antenna */}
      <path 
        d="M16 8C16 8 14.5 14 14.5 19C14.5 22 16 25 16 25C16 25 17.5 22 17.5 19C17.5 14 16 8 16 8Z" 
        fill="currentColor" 
      />
      <path 
        d="M15.5 8C15 6 13.5 3.5 11 3.5M16.5 8C17 6 18.5 3.5 21 3.5" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
    </svg>
  );
}
