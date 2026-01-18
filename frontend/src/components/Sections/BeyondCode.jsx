export default function BeyondCode({ activities }) {
  return (
    <section id="beyond-code" className="py-20 relative z-10 bg-gradient-to-b from-black/0 via-pink-900/5 to-black/0">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-pink-900/20 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
              <path d="M8 2v4"/>
              <path d="M16 2v4"/>
              <rect width="18" height="18" x="3" y="4" rx="2"/>
              <path d="M3 10h18"/>
              <path d="m9 16 2 2 4-4"/>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Beyond Code
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            When I'm not building AI systems, you'll find me...
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {activities.map((activity, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative glass-panel p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all h-full flex flex-col">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center border border-pink-500/30 mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{activity.icon}</span>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                  {activity.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                  {activity.description}
                </p>
                
                {/* Tags */}
                {activity.tags && (
                  <div className="flex flex-wrap gap-2">
                    {activity.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-pink-900/20 border border-pink-500/30 rounded-full text-pink-400 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}