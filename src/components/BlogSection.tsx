import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, StaggerContainer, StaggerItem, HoverScale } from '@/components/ui/motion';
import { motion } from 'framer-motion';

const articles = [
  {
    title: 'Building Scalable APIs with Node.js and GraphQL',
    excerpt: 'Learn how to design and implement highly scalable GraphQL APIs using Node.js, with best practices for performance and security.',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
    category: 'Backend',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop',
    slug: '#',
  },
  {
    title: 'Modern State Management in React Applications',
    excerpt: 'A deep dive into state management patterns using Zustand, Jotai, and React Query for optimal performance.',
    date: 'Dec 8, 2024',
    readTime: '6 min read',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    slug: '#',
  },
  {
    title: 'Deploying Full-Stack Apps with Docker and AWS',
    excerpt: 'Step-by-step guide to containerizing your applications and deploying them to AWS using modern DevOps practices.',
    date: 'Nov 28, 2024',
    readTime: '10 min read',
    category: 'DevOps',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
    slug: '#',
  },
];

const categoryColors: Record<string, string> = {
  Backend: 'bg-primary/20 text-primary',
  Frontend: 'bg-accent/20 text-accent',
  DevOps: 'bg-green-500/20 text-green-400',
};

export const BlogSection = () => {
  return (
    <section id="blog" className="section-padding relative">
      <div className="container-main">
        {/* Section header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-muted-foreground mb-2 uppercase tracking-wider text-sm">Blog</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Latest <span className="font-serif italic font-normal">articles</span>
              </h2>
            </div>
            <Button variant="outline" asChild>
              <a href="#blog">
                View all posts
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>
        </Reveal>

        {/* Articles grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {articles.map((article) => (
            <StaggerItem key={article.title}>
              <HoverScale scale={1.02}>
                <motion.a
                  href={article.slug}
                  className="group block h-full"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <article className="h-full rounded-3xl bg-secondary/20 border border-border/30 hover:border-border/60 transition-all duration-500 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <span className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[article.category]}`}>
                        {article.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                </motion.a>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Featured article */}
        <Reveal delay={0.3}>
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/30 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4">
                  Featured
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  The Complete Guide to Full-Stack Development in 2024
                </h3>
                <p className="text-muted-foreground mb-6">
                  Everything you need to know about modern full-stack development, from choosing the right tech stack to deployment strategies and best practices.
                </p>
                <Button variant="default" asChild>
                  <a href="#">
                    Read Article
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
              <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=400&fit=crop"
                  alt="Featured article"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
