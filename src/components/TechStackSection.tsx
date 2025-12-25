import { Reveal } from '@/components/ui/motion';

const techStack = {
  row1: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'GraphQL', 'MongoDB', 'OpenAI', 'LangChain'],
  row2: ['PostgreSQL', 'Prisma', 'Redis', 'Docker', 'AWS', 'Git', 'GitHub Actions', 'Vercel', 'Hugging Face', 'TensorFlow'],
  row3: ['Python', 'Linux', 'CI/CD', 'Jest', 'Figma', 'REST APIs', 'WebSockets', 'Microservices', 'PyTorch', 'RAG', 'Vector DBs', 'LLMs'],
};

const TechPill = ({ name }: { name: string }) => (
  <div className="flex items-center px-2.5 py-1 rounded-full bg-secondary/50 border border-border/30 text-[11px] md:text-xs text-muted-foreground whitespace-nowrap hover:text-foreground hover:border-border transition-colors">
    {name}
  </div>
);

const MarqueeRow = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => (
  <div className="flex overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
    <div className={`flex gap-1.5 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
      {[...items, ...items].map((item, i) => (
        <TechPill key={`${item}-${i}`} name={item} />
      ))}
    </div>
  </div>
);

export const TechStackSection = () => {
  return (
    <section className="relative py-16 border-y border-border/30 w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <Reveal className="relative container-main mb-8">
        <p className="text-center text-sm text-muted-foreground">
          Passionate about cutting-edge technologies
        </p>
      </Reveal>

      <div className="relative space-y-3">
        <MarqueeRow items={techStack.row1} />
        <MarqueeRow items={techStack.row2} reverse />
        <MarqueeRow items={techStack.row3} />
      </div>
    </section>
  );
};
