import CompactJourney from '../UI/CompactJourney';

export default function AboutMe({ journey }) {
  return (
    <section className="relative z-10">
      <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-900/20 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">
            About Me
          </h2>
        </div>

        <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
          <p>
            I'm a <span className="text-purple-400 font-semibold">Master's student at Northeastern University</span> specializing in Machine Learning and AI Systems, with over 2 years of hands-on ML engineering experience.
          </p>
          <p>
            Currently, I'm transforming AI research into production systems at <span className="text-purple-400 font-semibold">Stanley Black & Decker</span>, where I built a CNN-Autoencoder visual inspection system that achieved 80% F1-score and reduced inspection time by 60%.
          </p>
          <p>
            I'm passionate about <span className="text-purple-400 font-semibold">MLOps, RAG systems, and LangGraph</span>. My recent work includes building HotelIQ, a production-grade AI hotel booking platform with multi-agent orchestration.
          </p>
          <p>
            I also founded and lead the <span className="text-purple-400 font-semibold">Coders Club at Northeastern</span>, mentoring 40+ students in ML, web development, and career preparation.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-3 py-1 bg-purple-900/20 border border-purple-500/30 rounded-full text-purple-400 text-xs">
              💡 Open to ML Engineer Roles
            </span>
            <span className="px-3 py-1 bg-purple-900/20 border border-purple-500/30 rounded-full text-purple-400 text-xs">
              🎓 GPA: 3.9/4.0
            </span>
            <span className="px-3 py-1 bg-purple-900/20 border border-purple-500/30 rounded-full text-purple-400 text-xs">
              📄 Published in Springer
            </span>
            <span className="px-3 py-1 bg-purple-900/20 border border-purple-500/30 rounded-full text-purple-400 text-xs">
              🏆 Microsoft Imagine Cup Semifinalist
            </span>
          </div>
        </div>

        {/* Compact Journey Timeline */}
        <CompactJourney journey={journey} />
      </div>
    </section>
  );
}