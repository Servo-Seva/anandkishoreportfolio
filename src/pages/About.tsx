import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/motion';

const experiences = [
  {
    period: 'JAN 2024 - Present',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    type: 'Full-time',
    description: [
      'Architected enterprise-scale web applications using React, Next.js, and TypeScript, resulting in 40% faster page loads.',
      'Led frontend development for 5+ production websites with a focus on performance and accessibility.',
      'Implemented CI/CD pipelines and automated testing, reducing deployment time by 60%.',
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
  },
  {
    period: 'JUN 2022 - DEC 2023',
    company: 'Digital Agency',
    location: 'India',
    type: 'Full-time',
    description: [
      'Developed responsive web applications for clients across various industries including e-commerce and SaaS.',
      'Collaborated with design teams to implement pixel-perfect UI components and animations.',
      'Optimized application performance achieving 90+ Lighthouse scores.',
    ],
    skills: ['React', 'JavaScript', 'CSS', 'Figma', 'REST APIs', 'Git'],
  },
  {
    period: 'JAN 2021 - MAY 2022',
    company: 'Freelance',
    location: 'Remote',
    type: 'Contract',
    description: [
      'Built custom websites and web applications for startups and small businesses.',
      'Managed end-to-end project delivery from requirements gathering to deployment.',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'React'],
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>Work Experience | Anand Kishore - Full Stack Developer</title>
        <meta name="description" content="Explore the professional journey and work experience of Anand Kishore, a Full Stack Developer." />
      </Helmet>

      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navigation />

        {/* Experience Section */}
        <section id="experience" className="pt-32 pb-20 section-padding bg-secondary/20">
          <div className="container-main">
            {/* Section Header */}
            <Reveal className="text-center mb-16">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">The Experience</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Experience That Brings<br />
                <span className="font-serif italic font-normal text-primary">Ideas to Life</span>
              </h2>
            </Reveal>

            {/* Experience Timeline */}
            <StaggerContainer className="space-y-8 max-w-4xl mx-auto" staggerDelay={0.15}>
              {experiences.map((exp, index) => (
                <StaggerItem key={index}>
                  <div className="group relative p-6 md:p-8 rounded-3xl bg-card border border-border/30 hover:border-border/60 transition-all duration-300">
                    {/* Period Badge */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-sm text-primary font-medium">{exp.period}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary/60 text-muted-foreground">{exp.type}</span>
                    </div>

                    {/* Company */}
                    <h3 className="text-2xl font-display font-bold mb-1">{exp.company}</h3>
                    <p className="text-muted-foreground mb-4">{exp.location}</p>

                    {/* Description */}
                    <ul className="space-y-2 mb-6">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 text-xs rounded-full bg-secondary/60 border border-border/30 text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default About;
