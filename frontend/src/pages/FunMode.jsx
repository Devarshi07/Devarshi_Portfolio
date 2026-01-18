import { useState, useEffect } from 'react';
import NeuralBackground from '../components/Background/NeuralBackground';
import { fetchPortfolioData } from '../services/api';

export default function FunMode() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const portfolioData = await fetchPortfolioData();
      setData(portfolioData.funMode);
    };
    loadData();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-pink-400 font-mono animate-pulse text-xl">
          LOADING FUN MODE...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void relative">
      <NeuralBackground />
      
      {/* Fun Mode Header with Image */}
      <header className="relative z-10 pt-20 pb-12">
        <div className="container mx-auto px-6">
          <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back to Professional Mode
          </a>
          
          {/* Header with Image */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-8">
            {/* Fun Image */}
            <div className="relative group animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-pink-500/30 group-hover:border-pink-500/50 transition-all">
                <img 
                  src={data.funImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=400&h=400"} 
                  alt="Fun Mode" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* Emoji overlay */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-3xl border-4 border-black shadow-xl animate-bounce">
                🎉
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center md:text-left max-w-xl">
              <div className="inline-block px-4 py-2 mb-6 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm font-mono tracking-widest animate-pulse">
                🎉 FUN MODE ACTIVATED
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                The Other Me
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Life's more than just code. Here's what keeps me inspired, creative, and energized!
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Fun Stats */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {data.stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative glass-panel p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all text-center">
                  <div className="text-5xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-pink-400 mb-2">{stat.value}</div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies & Interests */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Hobbies & Passions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {data.hobbies.map((hobby, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative glass-panel p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all h-full">
                  <div className="text-5xl mb-4">{hobby.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {hobby.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {hobby.description}
                  </p>
                  {hobby.achievements && (
                    <div className="space-y-1">
                      {hobby.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="text-purple-400">✓</span>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Activities */}
      <section className="py-12 relative z-10 bg-black/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Community & Leadership
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {data.clubs.map((club, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative glass-panel p-8 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30 text-3xl">
                      {club.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {club.name}
                      </h3>
                      <p className="text-sm text-cyan-400">{club.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {club.description}
                  </p>
                  
                  {club.impact && (
                    <div className="space-y-2">
                      {club.impact.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="text-cyan-400 mt-0.5">▸</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <div className="py-12 text-center relative z-10">
        <a href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Back to Professional Portfolio
        </a>
      </div>
    </div>
  );
}