export default function ButterflyLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Butterfly antennae */}
      <path 
        d="M16 14C17.5 10 20 8 22.5 7.5M16 14C15 11 13 9 11 8.5" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      {/* Butterfly antennae tips */}
      <circle cx="22.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="11" cy="8.5" r="1" fill="currentColor" />

      {/* Center body / book spine */}
      <path 
        d="M16 13.5V26.5C16 27.5 15.5 28.5 16 28.5C16.5 28.5 16 27.5 16 26.5" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <ellipse cx="16" cy="15" rx="1.5" ry="3" fill="currentColor" />

      {/* Left wing - stacked book pages */}
      <path 
        d="M14.5 15C10 11 4.5 11 3 15C2 18 5 23 14.5 25" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinejoin="round" 
      />
      <path 
        d="M13.5 17C10 14 6 14 4.5 17C3.5 19.5 6 22.5 13.5 24" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
        opacity="0.75" 
      />
      <path 
        d="M12.5 19C10 16.5 7.5 16.5 6.5 18.5C5.5 20.5 7.5 22 12.5 23" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
        opacity="0.5" 
      />

      {/* Right wing - stacked book pages */}
      <path 
        d="M17.5 15C22 11 27.5 11 29 15C30 18 27 23 17.5 25" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinejoin="round" 
      />
      <path 
        d="M18.5 17C22 14 26 14 27.5 17C28.5 19.5 26 22.5 18.5 24" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
        opacity="0.75" 
      />
      <path 
        d="M19.5 19C22 16.5 24.5 16.5 25.5 18.5C26.5 20.5 24.5 22 19.5 23" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
        opacity="0.5" 
      />
    </svg>
  );
}
