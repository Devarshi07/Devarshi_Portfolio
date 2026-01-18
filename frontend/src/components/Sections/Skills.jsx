import { Icons } from '../UI/Icons';

export default function Skills({ skills }) {
  return (
    <section id="skills" className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <Icons.Code /> Technical Arsenal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category) => (
            <div key={category.name} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative glass-panel p-6 rounded-xl border border-white/5 hover:border-cyan-500/20 transition-all">
                <h3 className="text-lg font-bold text-cyan-400 mb-4 border-b border-white/10 pb-2">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 text-gray-300 text-sm rounded-full transition-colors border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}