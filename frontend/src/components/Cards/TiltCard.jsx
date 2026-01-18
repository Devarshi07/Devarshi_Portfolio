import { useRef, useState } from 'react';
import { Icons } from '../UI/Icons';

export default function TiltCard({ title, description, tags, github, demo }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleCardClick = () => {
    // Priority: demo > github > nothing
    const link = demo || github;
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div style={{ perspective: '1000px' }} className="w-full h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setRotation({ x: 0, y: 0 });
        }}
        onClick={handleCardClick}
        className={`glass-panel p-6 rounded-xl h-full flex flex-col justify-between transition-all duration-100 ease-out group relative overflow-hidden ${
          (github || demo) ? 'cursor-pointer' : ''
        }`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{ transform: 'translateZ(20px)' }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {title}
            </h3>
            <div className="flex gap-2 text-gray-400">
              {github && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(github, '_blank', 'noopener,noreferrer');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                  title="View on GitHub"
                >
                  <Icons.Github />
                </button>
              )}
              {demo && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(demo, '_blank', 'noopener,noreferrer');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                  title="View Demo"
                >
                  <Icons.ExternalLink />
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
        </div>
        <div style={{ transform: 'translateZ(30px)' }}>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono rounded border border-cyan-500/30 text-cyan-400 bg-cyan-900/20"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Click hint */}
          {(github || demo) && (
            <div className="mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-cyan-400 font-mono flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6"/>
                  <path d="M10 14 21 3"/>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                </svg>
                Click to view {demo ? 'demo' : 'on GitHub'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}