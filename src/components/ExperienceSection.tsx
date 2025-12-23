const experiences = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    period: '2022 - Present',
    description: 'Leading development of enterprise-scale applications, mentoring junior developers, and architecting scalable solutions.',
    achievements: [
      'Reduced page load time by 60% through optimization',
      'Led a team of 5 developers on mission-critical projects',
      'Implemented CI/CD pipelines reducing deployment time by 80%',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple client projects using modern JavaScript frameworks and cloud services.',
    achievements: [
      'Built 15+ production applications for diverse clients',
      'Introduced automated testing, achieving 90% code coverage',
      'Migrated legacy systems to modern cloud architecture',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'StartUp Hub',
    period: '2018 - 2020',
    description: 'Created responsive web applications and contributed to UI/UX design decisions.',
    achievements: [
      'Developed mobile-first responsive designs',
      'Improved user engagement by 40% through UX improvements',
      'Collaborated with design team on product iterations',
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(280_80%_60%/0.03)_0%,transparent_50%)]" />
      
      <div className="container-narrow relative">
        <div className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block animate-fade-up">Experience</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-up animation-delay-100">
            My{' '}
            <span className="gradient-text">journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-up animation-delay-200">
            A timeline of my professional growth and key achievements in the tech industry.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.role}
                className={`relative flex flex-col md:flex-row gap-8 animate-fade-up animation-delay-${(index + 2) * 100}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)] hidden md:block" />
                
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}`}>
                  <div className="glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                    <span className="text-primary font-medium text-sm">{exp.period}</span>
                    <h3 className="font-display text-xl font-semibold mt-2">{exp.role}</h3>
                    <p className="text-muted-foreground mt-1">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-4">{exp.description}</p>
                    
                    <ul className={`mt-4 space-y-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1.5">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
