import { Icons } from './Icons';

export default function GithubHeatmap({ total, weeks, username = '@Devarshi07' }) {
  // If we have real data from API, use it. Otherwise generate random
  const generateHeatmap = () => {
    if (weeks && weeks.length > 0) {
      return weeks;
    }
    
    // Fallback: Generate random data
    return Array.from({ length: 52 }).map(() => ({
      contributionDays: Array.from({ length: 7 }).map(() => ({
        contributionCount: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0
      }))
    }));
  };

  const heatmapData = generateHeatmap();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Icons.Github />
          <span className="text-sm font-mono text-gray-300">{username}</span>
        </div>
        <span className="text-xs text-gray-500">{total} Contributions</span>
      </div>
      <div className="flex gap-1 overflow-x-auto no-scrollbar pb-2">
        {heatmapData.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-1">
            {week.contributionDays.map((day, dIndex) => {
              const intensity = day.contributionCount;
              const levels = [
                'bg-white/5',
                'bg-cyan-900/40',
                'bg-cyan-700/60',
                'bg-cyan-500/80',
                'bg-cyan-400',
              ];
              const levelIndex = intensity === 0 ? 0 : Math.min(Math.floor(intensity / 3) + 1, 4);
              
              return (
                <div
                  key={dIndex}
                  className={`w-2 h-2 rounded-sm ${levels[levelIndex]} hover:scale-125 transition-transform cursor-pointer`}
                  title={`${intensity} contributions`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}