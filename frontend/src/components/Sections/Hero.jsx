import { Icons } from '../UI/Icons';
import FloatingArrow from '../UI/FloatingArrow';

export default function Hero({ profile, links }) {
  return (
    <header className="min-h-screen flex flex-col md:flex-row justify-center items-center px-6 relative pt-16 gap-12">
      
      {/* Floating Arrow - Scrolls with Hero */}
      <FloatingArrow />
      
      <div className="text-center md:text-left z-10 max-w-2xl order-2 md:order-1">
        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono tracking-widest animate-pulse">
          NEURAL INTERFACE V2.0
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-tight">
          {profile.headline.split(' ')[0]} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 neon-text-shadow">
            {profile.headline.split(' ')[1]}
          </span>
        </h1>
        <p className="text-xl text-gray-400 font-light mb-8 max-w-lg mx-auto md:mx-0">
          {profile.subHeadline} <br />
          <span className="text-white text-base mt-2 block opacity-80">{profile.role}</span>
        </p>

        <div className="flex gap-6 justify-center md:justify-start mb-10">
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all">
            <Icons.Github />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 hover:scale-110 transition-all">
            <Icons.Linkedin />
          </a>
          <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
            <Icons.Twitter />
          </a>
          <a href={links.email} className="text-gray-400 hover:text-red-400 hover:scale-110 transition-all">
            <Icons.Mail />
          </a>
        </div>

        <div className="flex gap-4 justify-center md:justify-start">
          <a href="#projects" className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all">
            View Projects
          </a>
          <a href="/resume.pdf" download="Devarshi_Mahajan_Resume.pdf" className="px-8 py-3 bg-transparent border border-white/20 hover:border-cyan-500 hover:bg-cyan-500/10 text-white rounded transition-all flex items-center gap-2">
            <Icons.Download />
            Resume
          </a>
        </div>
      </div>

      <div className="relative z-10 order-1 md:order-2 animate-float">
        <div className="relative w-64 h-64 md:w-80 md:h-80 hologram-container">
          <div className="hologram-ring"></div>
          <div className="hologram-glow"></div>
          <div className="scanlines"></div>
          <img src={profile.image} alt={profile.name} className="w-full h-full object-cover rounded-full hologram-image border-2 border-cyan-500/30" />
        </div>
      </div>
    </header>
  );
}