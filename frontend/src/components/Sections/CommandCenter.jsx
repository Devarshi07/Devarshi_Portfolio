import { useState, useEffect } from 'react';
import { Icons } from '../UI/Icons';
import GithubHeatmap from '../UI/GithubHeatmap';

export default function CommandCenter({ stats }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const leetcodeUsername = stats.leetcodeUsername || 'devarshim2002';

  return (
    <section className="relative z-10">
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-900/20 h-full">
        
        {/* Header with Live Clock */}
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <Icons.Terminal />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              Command Center
            </h2>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-400 font-mono text-xs">ONLINE</span>
            </div>
            <div className="text-cyan-400 font-mono text-sm">
              {time.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </div>
        </div>

        {/* GitHub Heatmap */}
        <div className="mb-8">
          <h3 className="text-sm text-gray-400 mb-3 font-mono flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
            GITHUB ACTIVITY STREAM
          </h3>
          <GithubHeatmap 
            total={stats.githubContributions} 
            weeks={stats.githubWeeks}
          />
        </div>

        {/* LeetCode Stats Card */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm text-gray-400 font-mono flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></div>
              LEETCODE STATS
            </h3>
            <a 
              href={`https://leetcode.com/u/${leetcodeUsername}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
            >
              <span>View Profile</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
          
          <div className="glass-panel p-3 rounded-lg border border-orange-500/20 bg-black/40">
            <img 
              src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=Ubuntu&ext=heatmap`}
              alt="LeetCode Stats"
              className="w-full rounded-lg"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <div style={{ display: 'none' }} className="text-center py-6">
              <p className="text-gray-400 text-sm mb-4">
                LeetCode stats loading...
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-lg font-bold text-green-400">{stats.leetcode?.easy || 0}</div>
                  <p className="text-gray-500">Easy</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-400">{stats.leetcode?.medium || 0}</div>
                  <p className="text-gray-500">Medium</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-400">{stats.leetcode?.hard || 0}</div>
                  <p className="text-gray-500">Hard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}