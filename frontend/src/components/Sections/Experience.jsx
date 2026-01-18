import { Icons } from '../UI/Icons';

function TimelineItem({ data, index }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`mb-12 flex justify-between items-center w-full ${isEven ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
      <div className="order-1 w-5/12 hidden md:block"></div>
      <div className="z-20 flex items-center order-1 bg-cyan-900 shadow-xl w-8 h-8 rounded-full border-4 border-black ring-2 ring-cyan-500 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <Icons.Book />
        </div>
      </div>
      <div className="order-1 w-full md:w-5/12 pl-10 md:pl-0">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className={`relative glass-panel p-6 rounded-xl hover:scale-[1.02] transition-transform border border-white/5 hover:border-cyan-500/20 ${isEven ? 'text-left' : 'text-left md:text-right'}`}>
            <span className="inline-block px-2 py-1 mb-2 text-xs font-mono rounded border border-cyan-500 text-cyan-400 bg-cyan-500/10">
              {data.year}
            </span>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{data.title}</h3>
            <h4 className="text-sm font-semibold mb-2 text-cyan-300">{data.org}</h4>
            {data.location && (
              <p className="text-xs text-gray-500 mb-2">{data.location}</p>
            )}
            <p className="text-gray-400 text-sm leading-relaxed">{data.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience({ experience }) {
  if (!experience || experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-20 bg-black/40 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-16 text-center">
          Professional Experience
        </h2>
        <div className="relative wrap overflow-hidden p-4 h-full">
          <div
            className="border-2-2 absolute border-opacity-20 border-cyan-400 h-full border hidden md:block"
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          ></div>
          {experience.map((item, index) => (
            <TimelineItem key={index} data={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}