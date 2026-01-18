import TestimonialCard from '../Cards/TestimonialCard';

export default function Testimonials({ testimonials }) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-16 relative z-10 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold text-white text-center">
          What People Say
        </h2>
        <p className="text-gray-400 text-center mt-2">
          Testimonials from colleagues and collaborators
        </p>
      </div>
      <div className="marquee-container flex w-full overflow-hidden relative">
        <div className="flex animate-scroll whitespace-nowrap gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={i}
              name={t.name}
              role={t.role}
              text={t.text}
              avatar={t.avatar}
            />
          ))}
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={`dup-${i}`}
              name={t.name}
              role={t.role}
              text={t.text}
              avatar={t.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}