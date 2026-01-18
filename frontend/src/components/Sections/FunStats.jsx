export default function FunStats({ funFacts }) {
  return (
    <section className="py-16 relative z-10 bg-black/20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Fun Facts & Side Quests
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {funFacts.stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative glass-panel p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-pink-400 mb-1">{stat.value}</div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {funFacts.activities.map((activity, index) => (
            <div key={index} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-pink-500/20 transition-all">
              <div className="text-4xl mb-3">{activity.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{activity.title}</h3>
              <p className="text-sm text-gray-400">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}