import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/ui/motion';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const articles = [
  {
    id: 1,
    title: "Building Scalable React Applications with Clean Architecture",
    excerpt: "Learn how to structure your React projects for maintainability and scalability using clean architecture principles.",
    date: "December 2023",
    readTime: "8 min read",
    category: "React",
    featured: true
  },
  {
    id: 2,
    title: "The Power of TypeScript in Modern Web Development",
    excerpt: "Discover how TypeScript can improve your development workflow and help catch bugs before they reach production.",
    date: "November 2023",
    readTime: "6 min read",
    category: "TypeScript",
    featured: false
  },
  {
    id: 3,
    title: "Mastering Node.js: Best Practices for Backend Development",
    excerpt: "A comprehensive guide to writing efficient, secure, and maintainable Node.js applications.",
    date: "October 2023",
    readTime: "10 min read",
    category: "Node.js",
    featured: false
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "Understanding the differences between CSS Grid and Flexbox and choosing the right layout tool for your needs.",
    date: "September 2023",
    readTime: "5 min read",
    category: "CSS",
    featured: false
  },
  {
    id: 5,
    title: "API Design Patterns Every Developer Should Know",
    excerpt: "Explore essential API design patterns that will help you build robust and developer-friendly APIs.",
    date: "August 2023",
    readTime: "7 min read",
    category: "API",
    featured: false
  }
];

const Articles = () => {
  const featuredArticle = articles.find(a => a.featured);
  const otherArticles = articles.filter(a => !a.featured);

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
                <div className="relative rounded-2xl border border-border/30 bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-12 overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                    Featured
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium mb-4 ml-2">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6 max-w-3xl">
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
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="section-padding pt-0">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-6">
              {otherArticles.map((article, index) => (
                <Reveal key={article.id} delay={index * 0.1}>
                  <article className="group rounded-2xl border border-border/30 bg-secondary/20 p-6 hover:border-primary/30 hover:bg-secondary/40 transition-all cursor-pointer h-full">
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium mb-4">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
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
                  </article>
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
