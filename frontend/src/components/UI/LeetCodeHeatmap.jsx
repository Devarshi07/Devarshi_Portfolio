export default function LeetCodeHeatmap({ submissions, username = '@Devarshi2002' }) {
  // Generate or use real submission data
  const generateHeatmap = () => {
    if (submissions && submissions.length > 0) {
      return submissions;
    }
    
    // Fallback: Generate random data for last 52 weeks
    return Array.from({ length: 52 }).map(() => ({
      submissionDays: Array.from({ length: 7 }).map(() => ({
        count: Math.random() > 0.6 ? Math.floor(Math.random() * 10) : 0
      }))
    }));
  };

  const heatmapData = generateHeatmap();
  const totalSubmissions = heatmapData.reduce((total, week) => 
    total + week.submissionDays.reduce((sum, day) => sum + day.count, 0), 0
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <line x1="10" y1="9" x2="8" y2="9"/>
          </svg>
          <span className="text-sm font-mono text-gray-300">{username}</span>
        </div>
        <span className="text-xs text-gray-500">{totalSubmissions} Submissions</span>
      </div>
      <div className="flex gap-1 overflow-x-auto no-scrollbar pb-2">
        {heatmapData.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-1">
            {week.submissionDays.map((day, dIndex) => {
              const intensity = day.count;
              const levels = [
                'bg-white/5',
                'bg-orange-900/40',
                'bg-orange-700/60',
                'bg-orange-500/80',
                'bg-orange-400',
              ];
              const levelIndex = intensity === 0 ? 0 : Math.min(Math.floor(intensity / 3) + 1, 4);
              
              return (
                <div
                  key={dIndex}
                  className={`w-2 h-2 rounded-sm ${levels[levelIndex]} hover:scale-125 transition-transform cursor-pointer`}
                  title={`${intensity} submissions`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 justify-end">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-white/5 rounded-sm"></div>
          <div className="w-2 h-2 bg-orange-900/40 rounded-sm"></div>
          <div className="w-2 h-2 bg-orange-700/60 rounded-sm"></div>
          <div className="w-2 h-2 bg-orange-500/80 rounded-sm"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-sm"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
}