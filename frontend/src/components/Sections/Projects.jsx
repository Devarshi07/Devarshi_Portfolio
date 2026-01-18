import { useState } from 'react';
import { Icons } from '../UI/Icons';
import TiltCard from '../Cards/TiltCard';

export default function Projects({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-4 md:mb-0">
            <Icons.Brain /> Selected Projects
          </h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all border ${
                  activeCategory === cat
                    ? 'bg-cyan-600 border-cyan-600 text-white shadow-[0_0_10px_rgba(0,243,255,0.4)]'
                    : 'bg-transparent border-white/20 text-gray-400 hover:border-white/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="h-96">
              <TiltCard
                title={project.title}
                description={project.desc}
                tags={project.tags}
                github={project.github}
                demo={project.demo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}