export default function TestimonialCard({ name, role, text, avatar }) {
  if (!name || !text) return null;

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative glass-panel p-6 rounded-xl min-w-[300px] md:min-w-[400px] mx-4 border border-white/5 hover:border-cyan-500/20 transition-all">
        <div className="absolute -top-3 -left-2 text-6xl text-cyan-500/20 font-serif leading-none">
          "
        </div>
        <p className="text-gray-300 text-sm italic mb-4 relative z-10">{text}</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold text-sm overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              name.charAt(0)
            )}
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">{name}</h4>
            <p className="text-cyan-400/80 text-xs">{role || 'Collaborator'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}