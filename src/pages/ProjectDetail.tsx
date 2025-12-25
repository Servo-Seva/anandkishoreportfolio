import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, Github, CheckCircle2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProjectById } from '@/lib/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProjectById(id || '');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [buildProgress, setBuildProgress] = useState(0);
  const buildSectionRef = useRef<HTMLDivElement>(null);
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Build process scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!buildSectionRef.current) return;
      
      const section = buildSectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on section visibility
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Start filling when section enters viewport, complete when it's mostly scrolled through
      const startOffset = windowHeight * 0.7;
      const endOffset = windowHeight * 0.3;
      
      if (sectionTop > startOffset) {
        setBuildProgress(0);
      } else if (sectionTop < endOffset - sectionHeight + 100) {
        setBuildProgress(100);
      } else {
        const scrollableDistance = startOffset - (endOffset - sectionHeight + 100);
        const scrolled = startOffset - sectionTop;
        const progress = Math.min(100, Math.max(0, (scrolled / scrollableDistance) * 100));
        setBuildProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage((prev) => (prev !== null ? (prev + 1) % project.screenshots.length : 0));
  const prevImage = () => setSelectedImage((prev) => (prev !== null ? (prev - 1 + project.screenshots.length) % project.screenshots.length : 0));

  return (
    <>
      <Helmet>
        <title>{project.title} | Anand Kishore</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/30">
          <div className="container-main py-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl font-display font-bold text-primary/20">{project.number}</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {project.type}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {project.fullDescription}
              </p>
            </motion.div>

            {/* Tech Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-secondary/50 text-sm border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Main Image & Features Grid */}
        <section className="container-main pb-16">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Image - 40% on desktop */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-border/30">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Features - 60% on desktop */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-display font-bold mb-6">Features</h2>
              <div className="relative p-6 rounded-xl bg-secondary/20 border border-border/20 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 opacity-50 pointer-events-none">
                  <motion.div
                    className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)' }}
                    animate={{
                      x: [0, 50, 0],
                      y: [0, 30, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)' }}
                    animate={{
                      x: [0, -30, 0],
                      y: [0, -50, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <div className="relative z-10 space-y-3">
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/90">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="container-main pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-display font-bold mb-6">Technologies Used</h2>
            <ul className="space-y-4">
              {project.technologies.map((tech) => (
                <li key={tech.name} className="flex items-center gap-3">
                  <img 
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                    alt={tech.name}
                    className="w-6 h-6 flex-shrink-0"
                    onError={(e) => {
                      // Fallback to plain variant if original doesn't exist
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes('-original')) {
                        target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain.svg`;
                      }
                    }}
                  />
                  <p className="text-foreground/90">
                    <a 
                      href={tech.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold underline underline-offset-4 decoration-foreground/40 hover:decoration-primary hover:text-primary transition-colors"
                    >
                      {tech.name}
                    </a>
                    <span className="text-muted-foreground"> – {tech.description}</span>
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Use Cases */}
        <section className="container-main pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-6">Use Cases</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.useCases.map((useCase, index) => (
                <div
                  key={useCase}
                  className="p-5 rounded-xl bg-secondary/20 border border-border/20"
                >
                  <span className="text-3xl font-display font-bold text-primary/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-foreground/90 mt-2">{useCase}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Gallery */}
        <section className="container-main pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-display font-bold mb-6">Gallery</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {project.screenshots.map((screenshot, index) => (
                <div
                  key={screenshot.url}
                  className="relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-border/20 hover:border-primary/50 transition-colors group"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={screenshot.url}
                    alt={screenshot.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-sm font-medium">{screenshot.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Build Process */}
        <section className="container-main pb-16" ref={buildSectionRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-display font-bold mb-6">Build Process</h2>
            <div className="relative p-6 rounded-xl bg-secondary/20 border border-border/20 overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 opacity-50 pointer-events-none">
                <motion.div
                  className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full blur-3xl"
                  style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 70%)' }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 rounded-full blur-3xl"
                  style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)' }}
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              <div className="relative z-10">
                {/* Progress Track */}
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border/30 rounded-full overflow-hidden">
                  <motion.div 
                    className="w-full bg-gradient-to-b from-primary via-primary to-primary/50 rounded-full"
                    style={{ height: `${buildProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                  {/* Glowing orb at progress point */}
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_4px_hsl(var(--primary)/0.6)]"
                    style={{ top: `${buildProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                <div className="space-y-6 pl-10">
                  {project.buildProcess.map((step, index) => {
                    const stepProgress = (index / (project.buildProcess.length - 1)) * 100;
                    const isActive = buildProgress >= stepProgress;
                    
                    return (
                      <motion.div
                        key={step}
                        className="flex items-start gap-4 group relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                      >
                        <motion.span 
                          className={`absolute -left-10 w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            isActive 
                              ? 'bg-primary text-primary-foreground shadow-[0_0_12px_2px_hsl(var(--primary)/0.4)]' 
                              : 'bg-primary/10 text-primary'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {index + 1}
                        </motion.span>
                        <p className={`text-sm transition-colors duration-300 ${
                          isActive ? 'text-foreground' : 'text-foreground/60'
                        }`}>{step}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container-main pb-20">
          <motion.div
            className="p-8 md:p-12 rounded-2xl bg-secondary/20 border border-border/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Interested in working together?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Let's discuss how I can help bring your ideas to life.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" asChild>
                <Link to="/#contact">
                  Get in Touch
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/#work">View More Projects</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-5 h-5" />
            </button>

            <button
              className="absolute left-6 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              className="absolute right-6 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.div
              className="max-w-4xl max-h-[80vh] mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={project.screenshots[selectedImage].url}
                alt={project.screenshots[selectedImage].caption}
                className="max-w-full max-h-[80vh] rounded-xl object-contain"
              />
              <p className="text-center mt-4 text-sm text-muted-foreground">
                {project.screenshots[selectedImage].caption} • {selectedImage + 1}/{project.screenshots.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
