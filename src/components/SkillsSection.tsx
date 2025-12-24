import { Reveal } from '@/components/ui/motion';
import { Star } from 'lucide-react';

const skillCategories = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'CSS', 'Motion.dev', 'Figma', 'Framer'],
  backend: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Prisma', 'Redis', 'GraphQL', 'REST APIs'],
  tools: ['Git', 'GitHub', 'Docker', 'AWS', 'Vercel', 'CI/CD', 'Linux', 'VS Code'],
};

const SkillPill = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/40 border border-border/40 text-sm font-medium text-muted-foreground whitespace-nowrap hover:text-foreground hover:border-primary/50 hover:bg-secondary/60 transition-all duration-300">
    <Star className="w-3 h-3 text-primary" />
    {name}
  </div>
);

const MarqueeRow = ({ items, reverse = false, speed = 25 }: { items: string[]; reverse?: boolean; speed?: number }) => (
  <div className="flex overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
    <div 
      className={`flex gap-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {[...items, ...items, ...items].map((item, i) => (
        <SkillPill key={`${item}-${i}`} name={item} />
      ))}
    </div>
  </div>
);

export const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30" />
      
      <div className="relative container-main">
        {/* Section header */}
        <Reveal className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-primary mb-3">The Secret Sauce</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            My <span className="font-serif italic font-normal">Skills</span>
          </h2>
        </Reveal>

        {/* Skill marquees */}
        <div className="space-y-4">
          <MarqueeRow items={skillCategories.frontend} speed={30} />
          <MarqueeRow items={skillCategories.backend} reverse speed={35} />
          <MarqueeRow items={skillCategories.tools} speed={28} />
        </div>
      </div>
    </section>
  );
};
