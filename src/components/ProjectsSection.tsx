import { ArrowUpRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, HoverScale } from '@/components/ui/motion';
import { motion } from 'framer-motion';

const projects = [
  {
    number: '01',
    type: 'Web App',
    title: 'E-Commerce Platform',
    period: 'Q4 2024',
    description: 'A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    number: '02',
    type: 'SaaS',
    title: 'AI Chat Application',
    period: 'Q3 2024',
    description: 'Real-time messaging app powered by AI for smart responses, with end-to-end encryption.',
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=600&fit=crop',
    tags: ['Next.js', 'OpenAI', 'WebSocket', 'Redis', 'TypeScript'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    number: '03',
    type: 'Dashboard',
    title: 'Analytics Dashboard',
    period: 'Q2 2024',
    description: 'Comprehensive analytics platform with real-time data visualization and custom reporting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['React', 'D3.js', 'Python', 'AWS', 'GraphQL'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

export const ProjectsSection = () => {
  return (
    <section id="work" className="section-padding relative">
      <div className="container-main">
        {/* Section header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-muted-foreground mb-2 uppercase tracking-wider text-sm">Case Studies</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Curated <span className="font-serif italic font-normal">work</span>
              </h2>
            </div>
            <Button variant="outline" asChild>
              <a href="#contact">
                Start a project
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>
        </Reveal>

        {/* Projects list */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.15}>
              <HoverScale scale={1.01}>
                <motion.div
                  className="group relative overflow-hidden rounded-3xl bg-secondary/20 border border-border/30 hover:border-border/60 transition-all duration-500"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Project info */}
                    <div className="p-8 lg:p-10 lg:w-1/2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-4xl font-display font-bold text-muted-foreground/30">
                            {project.number}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-card text-xs text-muted-foreground border border-border/30">
                            {project.type}
                          </span>
                        </div>
                        
                        <a href={project.liveUrl} className="group/link">
                          <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 group-hover/link:text-primary transition-colors">
                            {project.title}
                          </h3>
                        </a>
                        
                        <p className="text-sm text-muted-foreground mb-4">{project.period}</p>
                        <p className="text-muted-foreground mb-6">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-card/50 text-xs text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="default" size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            View Project
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="rounded-full">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Project image */}
                    <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[400px] overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-transparent to-transparent lg:bg-gradient-to-l" />
                    </div>
                  </div>
                </motion.div>
              </HoverScale>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
