import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/motion';

const skills = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg', invert: true },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg', invert: true },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', invert: true },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
];

const SkillCard = ({ name, icon, invert }: { name: string; icon: string; invert?: boolean }) => (
  <div className="group relative flex items-center justify-center aspect-square rounded-xl bg-secondary/60 border border-border/30 hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300 cursor-pointer">
    <img 
      src={icon} 
      alt={name} 
      className={`w-7 h-7 md:w-10 md:h-10 object-contain transition-transform duration-300 group-hover:scale-110 ${invert ? 'invert' : ''}`}
    />
    {/* Tooltip */}
    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-card border border-border rounded text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
      {name}
    </div>
  </div>
);

export const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="relative container-main">
        {/* Section header */}
        <Reveal className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">My Skills</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            The Secret <span className="font-serif italic font-normal text-primary">Sauce</span>
          </h2>
        </Reveal>

        {/* Skills grid */}
        <StaggerContainer className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-3 w-[90%] max-w-6xl mx-auto" staggerDelay={0.03}>
          {skills.map((skill) => (
            <StaggerItem key={skill.name}>
              <SkillCard {...skill} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
