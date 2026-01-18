export default function Navbar({ profile }) {
  return (
    <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold font-mono tracking-tighter text-white">
          DEVARSHI<span className="text-cyan-400">.AI</span>
        </a>
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
          <a href="#skills" className="hover:text-cyan-400 transition-colors">
            Skills
          </a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">
            Projects
          </a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">
            Experience
          </a>
          <a href="#education" className="hover:text-cyan-400 transition-colors">
            Education
          </a>
          <a href="#testimonials" className="hover:text-cyan-400 transition-colors">
            Testimonials
          </a>
          <a href="#connect" className="hover:text-cyan-400 transition-colors">
            Contact
          </a>
        </div>
        <button className="px-4 py-1.5 border border-cyan-500/50 text-cyan-400 text-xs font-mono rounded hover:bg-cyan-500/10 transition-colors">
          {profile?.status || 'AVAILABLE'}
        </button>
      </div>
    </nav>
  );
}