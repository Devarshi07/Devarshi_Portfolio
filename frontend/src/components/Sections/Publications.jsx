export default function Publications({ publications }) {
  if (!publications || publications.length === 0) {
    return null;
  }

  return (
    <section id="publications" className="py-20 relative z-10 bg-black/20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Research & Publications
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Peer-reviewed contributions in ML and AI systems
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {publications.map((pub, index) => (
            <div 
              key={index} 
              className="relative group"
              onClick={() => {
                if (pub.link) {
                  window.open(pub.link, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className={`relative glass-panel p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all h-full flex flex-col ${
                pub.link ? 'cursor-pointer' : ''
              }`}>
                
                {/* Header with Icon and Year */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-green-400">{pub.year}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-green-400 transition-colors line-clamp-2">
                  {pub.title}
                </h3>
                
                {/* Venue Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-green-900/20 rounded-full text-xs text-green-400 font-medium border border-green-500/20">
                    {pub.venue}
                  </span>
                </div>
                
                {/* Description */}
                {pub.description && (
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {pub.description}
                  </p>
                )}
                
                {/* Footer with Authors and Link Icon */}
                <div className="pt-4 border-t border-white/5 mt-auto">
                  <div className="flex items-center justify-between gap-2">
                    {pub.authors && pub.authors.length > 0 && (
                      <p className="text-xs text-gray-500 truncate flex-1">
                        {pub.authors[0]}
                        {pub.authors.length > 1 && ` +${pub.authors.length - 1}`}
                      </p>
                    )}
                    {pub.link && (
                      <div className="flex items-center gap-1 text-green-400 group-hover:text-green-300 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}