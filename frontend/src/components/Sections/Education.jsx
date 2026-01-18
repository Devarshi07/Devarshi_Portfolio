import { Icons } from '../UI/Icons';
import EducationCard from '../Cards/EducationCard';

export default function Education({ education }) {
  if (!education || education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <Icons.GradCap /> Education History
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <EducationCard key={index} data={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}