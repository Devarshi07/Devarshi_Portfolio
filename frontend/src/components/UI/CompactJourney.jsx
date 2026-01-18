export default function CompactJourney({ journey }) {
  if (!journey || journey.length === 0) return null;

  const colorMap = {
    blue: 'text-blue-400 border-blue-500/30',
    purple: 'text-purple-400 border-purple-500/30',
    cyan: 'text-cyan-400 border-cyan-500/30',
    green: 'text-green-400 border-green-500/30',
    pink: 'text-pink-400 border-pink-500/30'
  };

  return (
    <div className="mt-6 pt-6 border-t border-white/5">
      <h3 className="text-sm text-purple-400 mb-4 font-mono uppercase tracking-wider flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        My Journey
      </h3>
      
      <div className="space-y-3">
        {journey.map((milestone, index) => {
          const colors = colorMap[milestone.color] || colorMap.cyan;
          
          return (
            <div key={index} className="flex items-start gap-3 group">
              {/* Icon + Year */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-lg bg-white/5 border ${colors} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                  {milestone.icon}
                </div>
                <span className={`text-xs font-mono mt-1 ${colors.split(' ')[0]}`}>
                  {milestone.year}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-3">
                <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                  {milestone.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  {milestone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}