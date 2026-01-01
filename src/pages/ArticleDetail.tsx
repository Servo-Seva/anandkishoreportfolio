import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/ui/motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag, Share2, ArrowRight } from 'lucide-react';
import { getArticleById, articles } from '@/lib/articles';
import { useEffect } from 'react';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = id ? getArticleById(id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  const renderContent = (content: string) => {
    // Simple markdown-like rendering
    if (content.startsWith('## ')) {
      return (
        <h2 className="text-2xl font-display font-bold mt-10 mb-4 text-foreground">
          {content.replace('## ', '')}
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

        {/* Article Content */}
        <section className="section-padding pt-0">
          <div className="container-main max-w-4xl">
            <Reveal delay={0.2}>
              <article className="prose prose-lg dark:prose-invert max-w-none">
                {article.content.map((paragraph, index) => (
                  <div key={index}>{renderContent(paragraph)}</div>
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
        </section>

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
