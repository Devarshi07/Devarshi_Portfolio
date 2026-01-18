import AboutMe from './AboutMe';
import CommandCenter from './CommandCenter';

export default function StatsSection({ stats }) {
  return (
    <div className="container mx-auto px-6 py-12 relative z-10 -mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - About Me */}
        <AboutMe />
        
        {/* Right Side - Command Center */}
        <CommandCenter stats={stats} />
      </div>
    </div>
  );
}