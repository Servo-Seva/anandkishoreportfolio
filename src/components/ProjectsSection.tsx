import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'AI Chat Application',
    description: 'Real-time messaging app powered by AI for smart responses, with end-to-end encryption.',
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=600&fit=crop',
    tags: ['Next.js', 'OpenAI', 'WebSocket', 'Redis'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics platform with real-time data visualization and custom reporting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['React', 'D3.js', 'Python', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Task Management System',
    description: 'Collaborative project management tool with Kanban boards, time tracking, and team features.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    tags: ['Vue.js', 'GraphQL', 'MongoDB', 'Docker'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(190_95%_50%/0.05)_0%,transparent_50%)]" />
      
      <div className="container-narrow relative">
        <div className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block animate-fade-up">Projects</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-up animation-delay-100">
            Featured{' '}
            <span className="gradient-text">work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-up animation-delay-200">
            A selection of projects that showcase my skills and passion for building impactful solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 animate-fade-up animation-delay-${(index + 2) * 100}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-secondary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="glow" size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
