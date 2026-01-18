export default function Hobbies({ hobbies }) {
  return (
    <section id="hobbies" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Life Outside the Terminal
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Hobbies, passions, and what makes me... me!
        </p>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {hobbies.map((hobby, index) => {
            const sizes = ['md:col-span-2 md:row-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2 md:row-span-2', 'md:col-span-2'];
            const colors = ['from-pink-500/10', 'from-blue-500/10', 'from-green-500/10', 'from-yellow-500/10', 'from-purple-500/10'];
            
            return (
              <div key={index} className={`relative group ${sizes[index % sizes.length]}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                
                <div className="relative glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="text-5xl mb-4">{hobby.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{hobby.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{hobby.description}</p>
                  </div>
                  {hobby.highlight && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-xs text-cyan-400 font-semibold">{hobby.highlight}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}