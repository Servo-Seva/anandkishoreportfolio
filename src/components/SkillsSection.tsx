const skills = {
  frontend: [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Next.js', level: 88 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'Vue.js', level: 75 },
  ],
  backend: [
    { name: 'Node.js', level: 90 },
    { name: 'Python', level: 85 },
    { name: 'PostgreSQL', level: 88 },
    { name: 'MongoDB', level: 82 },
    { name: 'GraphQL', level: 80 },
  ],
  tools: [
    { name: 'Git', level: 95 },
    { name: 'Docker', level: 85 },
    { name: 'AWS', level: 80 },
    { name: 'CI/CD', level: 85 },
    { name: 'Linux', level: 88 },
  ],
};

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => (
  <div className={`animate-fade-up animation-delay-${delay}`}>
    <div className="flex justify-between mb-2">
      <span className="font-medium">{name}</span>
      <span className="text-muted-foreground text-sm">{level}%</span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

export const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(280_80%_60%/0.05)_0%,transparent_50%)]" />
      
      <div className="container-narrow relative">
        <div className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block animate-fade-up">Skills</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-up animation-delay-100">
            Technologies I{' '}
            <span className="gradient-text">work with</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-up animation-delay-200">
            A comprehensive toolkit for building modern web applications from concept to deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass rounded-2xl p-8 animate-fade-up animation-delay-200">
            <h3 className="font-display text-2xl font-semibold mb-6 text-primary">Frontend</h3>
            <div className="space-y-6">
              {skills.frontend.map((skill, index) => (
                <SkillBar key={skill.name} {...skill} delay={(index + 3) * 100} />
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-8 animate-fade-up animation-delay-300">
            <h3 className="font-display text-2xl font-semibold mb-6 text-primary">Backend</h3>
            <div className="space-y-6">
              {skills.backend.map((skill, index) => (
                <SkillBar key={skill.name} {...skill} delay={(index + 3) * 100} />
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-8 animate-fade-up animation-delay-400">
            <h3 className="font-display text-2xl font-semibold mb-6 text-primary">Tools & DevOps</h3>
            <div className="space-y-6">
              {skills.tools.map((skill, index) => (
                <SkillBar key={skill.name} {...skill} delay={(index + 3) * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
