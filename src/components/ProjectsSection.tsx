import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Reveal, HoverScale } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { projects } from '@/lib/projects';

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
                <Link to={`/project/${project.id}`}>
                  <motion.div
                    className="group relative overflow-hidden rounded-3xl bg-secondary/10 dark:bg-secondary/20 border border-border/50 dark:border-border/30 hover:border-primary/50 transition-all duration-500 cursor-pointer"
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
                            <span className="px-3 py-1 rounded-full bg-card text-xs text-muted-foreground border border-border/50 dark:border-border/30">
                              {project.type}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          
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
                          <Button variant="default" size="sm" className="pointer-events-none">
                            View Details
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(project.githubUrl, '_blank');
                            }}
                          >
                            <Github className="w-4 h-4" />
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
                </Link>
              </HoverScale>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
