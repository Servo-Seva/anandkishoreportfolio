import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/ui/motion';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { articles, getFeaturedArticles } from '@/lib/articles';

const Articles = () => {
  const featuredArticles = getFeaturedArticles();
  const featuredArticle = featuredArticles[0];
  const otherArticles = articles.filter(a => a.id !== featuredArticle?.id);

  return (
    <>
      <Helmet>
        <title>Articles | Anand - Full Stack Developer</title>
        <meta name="description" content="Read my articles on web development, React, TypeScript, Node.js and more." />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen pt-24">
        {/* Header */}
        <section className="section-padding pb-8">
          <div className="container-main">
            <Reveal>
              <Link to="/">
                <Button variant="ghost" className="gap-2 mb-8">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Blog</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                My <span className="font-serif italic font-normal text-primary">Articles</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Thoughts, tutorials, and insights on web development, software engineering, and technology.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="section-padding pt-0 pb-8">
            <div className="container-main">
              <Reveal>
                <Link to={`/article/${featuredArticle.id}`}>
                  <div className="relative rounded-2xl border border-border/30 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors">
                    <div className="md:flex">
                      <div className="md:w-1/2 h-64 md:h-auto">
                        <img 
                          src={featuredArticle.image} 
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                        <div className="flex gap-2 mb-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            Featured
                          </span>
                          <span className="inline-block px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium">
                            {featuredArticle.category}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-muted-foreground mb-6">
                          {featuredArticle.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {featuredArticle.date}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {featuredArticle.readTime}
                          </span>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="section-padding pt-0">
          <div className="container-main">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map((article, index) => (
                <Reveal key={article.id} delay={index * 0.1}>
                  <Link to={`/article/${article.id}`}>
                    <article className="group rounded-2xl border border-border/30 bg-secondary/20 overflow-hidden hover:border-primary/30 hover:bg-secondary/40 transition-all cursor-pointer h-full flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium mb-4 w-fit">
                          {article.category}
                        </span>
                        <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Articles;
