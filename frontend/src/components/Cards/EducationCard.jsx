import { Icons } from '../UI/Icons';

export default function EducationCard({ data }) {
  if (!data) return null;

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative glass-panel p-8 rounded-xl hover:bg-white/5 transition-all border border-purple-500/20 hover:border-purple-500/40 overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className="text-purple-500 transform scale-150">
            <Icons.GradCap />
          </div>
        </div>
        <span className="inline-block px-2 py-1 mb-3 text-xs font-mono rounded border border-purple-500 text-purple-400 bg-purple-500/10">
          {data.year || 'N/A'}
        </span>
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{data.title || 'Untitled'}</h3>
        <h4 className="text-lg font-medium text-purple-300 mb-2">{data.org || 'Organization'}</h4>
        {data.location && (
          <p className="text-sm text-gray-500 mb-4">{data.location}</p>
        )}
        <p className="text-gray-400 text-sm leading-relaxed">{data.desc || ''}</p>
      </div>
    </div>
  );
}