export default function FloatingArrow() {
  return (
    <a 
      href="/fun"
      className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 group"
      title="Explore the other me"
    >
      <div className="relative">
        {/* Always-on pulsing glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 animate-pulse transition-opacity"></div>
        
        {/* Button */}
        <div className="relative w-14 h-14 rounded-full border-2 border-pink-400/40 group-hover:border-pink-400/70 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all group-hover:scale-110 shadow-[0_0_20px_rgba(236,72,153,0.4)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400 group-hover:text-pink-300 transition-colors group-hover:translate-x-1">
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="glass-panel px-4 py-2 rounded-lg border border-pink-500/40 whitespace-nowrap shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            <span className="text-sm text-pink-400 font-mono">Explore the other me</span>
          </div>
        </div>
      </div>
    </a>
  );
}