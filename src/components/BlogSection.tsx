import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, StaggerContainer, StaggerItem, HoverScale } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles, getFeaturedArticles } from '@/lib/articles';

const categoryColors: Record<string, string> = {
  React: 'bg-primary/20 text-primary',
  TypeScript: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
  'Node.js': 'bg-green-500/20 text-green-600 dark:text-green-400',
  CSS: 'bg-pink-500/20 text-pink-600 dark:text-pink-400',
  API: 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
  'Full Stack': 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
  Backend: 'bg-accent/20 text-accent',
  Frontend: 'bg-primary/20 text-primary',
  DevOps: 'bg-green-500/20 text-green-600 dark:text-green-400',
};

export const BlogSection = () => {
  const featuredArticle = getFeaturedArticles()[0];
  const displayArticles = articles.filter(a => !a.featured).slice(0, 3);

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
              <Link to="/articles">
                View all posts
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </Reveal>

        {/* Articles grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {displayArticles.map((article) => (
            <StaggerItem key={article.id}>
              <HoverScale scale={1.02}>
                <motion.div
                  className="group block h-full cursor-pointer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/article/${article.id}`} className="block h-full">
                    <article className="h-full rounded-3xl bg-secondary/10 dark:bg-secondary/20 border border-border/50 dark:border-border/30 hover:border-primary/40 dark:hover:border-border/60 transition-all duration-500 overflow-hidden">
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
                        <span className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[article.category] || 'bg-secondary text-muted-foreground'}`}>
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
                  </Link>
                </motion.div>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Featured article */}
        {featuredArticle && (
          <Reveal delay={0.3}>
            <Link to={`/article/${featuredArticle.id}`}>
              <div className="mt-12 rounded-3xl bg-gradient-to-br from-primary/5 dark:from-primary/10 to-accent/5 dark:to-accent/10 border border-border/50 dark:border-border/30 p-8 md:p-12 hover:border-primary/30 transition-colors cursor-pointer group">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4">
                      Featured
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <Button variant="default">
                      Read Article
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
};
