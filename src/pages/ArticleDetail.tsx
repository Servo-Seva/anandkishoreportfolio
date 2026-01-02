import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/ui/motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag, Share2, ArrowRight, List } from 'lucide-react';
import { getArticleById, articles } from '@/lib/articles';
import { useEffect, useState, useRef, useMemo } from 'react';

interface TocItem {
  id: string;
  text: string;
}

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = id ? getArticleById(id) : undefined;
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isTocOpen, setIsTocOpen] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Extract headings from article content for TOC
  const tocItems = useMemo<TocItem[]>(() => {
    if (!article) return [];
    return article.content
      .filter(content => content.startsWith('## '))
      .map((content, index) => {
        const text = content.replace('## ', '');
        const id = `section-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        return { id, text };
      });
  }, [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setReadingProgress(0);
    setActiveSection(tocItems[0]?.id || '');
  }, [id, tocItems]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));

      // Determine active section
      const sections = Array.from(sectionRefs.current.entries());
      for (let i = sections.length - 1; i >= 0; i--) {
        const [sectionId, element] = sections[i];
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/articles')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Find related articles (same category, excluding current)
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 2);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current.get(sectionId);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsTocOpen(false);
  };

  const renderContent = (content: string, index: number) => {
    // Simple markdown-like rendering
    if (content.startsWith('## ')) {
      const text = content.replace('## ', '');
      const tocItem = tocItems.find(item => item.text === text);
      const sectionId = tocItem?.id || `section-${index}`;
      
      return (
        <h2 
          ref={(el) => {
            if (el) sectionRefs.current.set(sectionId, el);
          }}
          id={sectionId}
          className="text-2xl font-display font-bold mt-10 mb-4 text-foreground scroll-mt-28"
        >
          {text}
        </h2>
      );
    }
    if (content.startsWith('**') && content.endsWith('**')) {
      return (
        <p className="font-semibold text-foreground mt-6 mb-2">
          {content.replace(/\*\*/g, '')}
        </p>
      );
    }
    if (content.startsWith('```')) {
      const code = content.replace(/```\w*\n?/g, '').trim();
      return (
        <pre className="bg-secondary/50 border border-border/50 rounded-xl p-4 overflow-x-auto my-6 text-sm">
          <code className="text-muted-foreground">{code}</code>
        </pre>
      );
    }
    if (content.startsWith('- ') || content.startsWith('1. ')) {
      const items = content.split('\n').filter(Boolean);
      return (
        <ul className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
          {items.map((item, i) => (
            <li key={i}>{item.replace(/^[-\d.]\s*/, '')}</li>
          ))}
        </ul>
      );
    }
    if (content.startsWith('|')) {
      return (
        <div className="overflow-x-auto my-6">
          <pre className="text-sm text-muted-foreground bg-secondary/30 p-4 rounded-xl">
            {content}
          </pre>
        </div>
      );
    }
    return (
      <p className="text-muted-foreground leading-relaxed mb-4">
        {content}
      </p>
    );
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Anand</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-secondary/50">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <Navigation />

      <main className="min-h-screen pt-24 pb-16">
        {/* Hero Section */}
        <section className="section-padding pb-8">
          <div className="container-main max-w-4xl">
            <Reveal>
              <Link to="/articles">
                <Button variant="ghost" className="gap-2 mb-8">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Articles
                </Button>
              </Link>

              {/* Category Badge */}
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                {article.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
                <Button variant="ghost" size="sm" onClick={handleShare} className="ml-auto">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Featured Image */}
        <section className="section-padding pt-0 pb-8">
          <div className="container-main max-w-4xl">
            <Reveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-border/30">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Article Content with TOC Sidebar */}
        <section className="section-padding pt-0">
          <div className="container-main">
            <div className="flex gap-8 max-w-6xl mx-auto">
              {/* Table of Contents - Desktop Sidebar */}
              {tocItems.length > 0 && (
                <aside className="hidden lg:block w-64 shrink-0">
                  <div className="sticky top-24">
                    <div className="p-4 rounded-2xl border border-border/30 bg-secondary/20">
                      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <List className="w-4 h-4" />
                        Table of Contents
                      </h3>
                      <nav className="space-y-1">
                        {tocItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                              activeSection === item.id
                                ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                            }`}
                          >
                            {item.text}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </aside>
              )}

              {/* Main Content */}
              <div className="flex-1 max-w-4xl">
                <Reveal delay={0.2}>
                  <article className="prose prose-lg dark:prose-invert max-w-none">
                    {article.content.map((paragraph, index) => (
                      <div key={index}>{renderContent(paragraph, index)}</div>
                    ))}
                  </article>

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-border/30">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      {article.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile TOC Toggle */}
        {tocItems.length > 0 && (
          <>
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="lg:hidden fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
              aria-label="Toggle table of contents"
            >
              <List className="w-5 h-5" />
            </button>

            {/* Mobile TOC Drawer */}
            {isTocOpen && (
              <div className="lg:hidden fixed inset-0 z-50">
                <div 
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                  onClick={() => setIsTocOpen(false)}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border/30 rounded-t-2xl p-6 animate-slide-in-right">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <List className="w-5 h-5" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-1 max-h-[60vh] overflow-y-auto">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                          activeSection === item.id
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                        }`}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="section-padding pt-0">
            <div className="container-main max-w-4xl">
              <Reveal delay={0.3}>
                <h2 className="text-2xl font-display font-bold mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedArticles.map(related => (
                    <Link
                      key={related.id}
                      to={`/article/${related.id}`}
                      className="group rounded-2xl border border-border/30 bg-secondary/20 p-6 hover:border-primary/30 hover:bg-secondary/40 transition-all"
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium mb-3">
                        {related.category}
                      </span>
                      <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {related.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="section-padding pt-0">
          <div className="container-main max-w-4xl">
            <Reveal delay={0.4}>
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/30 p-8 text-center">
                <h2 className="text-2xl font-display font-bold mb-4">Enjoyed this article?</h2>
                <p className="text-muted-foreground mb-6">
                  Check out more articles or get in touch to discuss your next project.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild>
                    <Link to="/articles">More Articles</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/#contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ArticleDetail;
