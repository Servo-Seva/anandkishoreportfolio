import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, Github, Sparkles, Target, Wrench, Lightbulb, CheckCircle2, Code2, Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, HoverScale } from '@/components/ui/motion';
import { getProjectById } from '@/lib/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Gallery Section Component
const GallerySection = ({ screenshots }: { screenshots: { url: string; caption: string }[] }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage((prev) => (prev !== null ? (prev + 1) % screenshots.length : 0));
  const prevImage = () => setSelectedImage((prev) => (prev !== null ? (prev - 1 + screenshots.length) % screenshots.length : 0));

  return (
    <>
      <section className="section-padding">
        <div className="container-main">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Images className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Project <span className="font-serif italic font-normal">Gallery</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {screenshots.map((screenshot, index) => (
              <Reveal key={screenshot.url} delay={index * 0.1}>
                <motion.div
                  className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-border/30 hover:border-primary/50 transition-colors"
                  whileHover={{ y: -4 }}
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={screenshot.url}
                    alt={screenshot.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium text-foreground">{screenshot.caption}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
                      <Images className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 p-3 rounded-full bg-secondary/50 border border-border/30 hover:bg-secondary hover:border-primary/30 transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-6 p-3 rounded-full bg-secondary/50 border border-border/30 hover:bg-secondary hover:border-primary/30 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-6 p-3 rounded-full bg-secondary/50 border border-border/30 hover:bg-secondary hover:border-primary/30 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              className="relative max-w-5xl max-h-[80vh] mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={screenshots[selectedImage].url}
                alt={screenshots[selectedImage].caption}
                className="max-w-full max-h-[80vh] rounded-2xl border border-border/30 shadow-2xl object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent rounded-b-2xl">
                <p className="text-center font-medium">{screenshots[selectedImage].caption}</p>
                <p className="text-center text-sm text-muted-foreground mt-1">
                  {selectedImage + 1} of {screenshots.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProjectById(id || '');

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

  return (
    <>
      <Helmet>
        <title>{project.title} | Anand Kishore</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
          </div>

          {/* Back Button */}
          <motion.div
            className="absolute top-8 left-8 z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="glass"
              size="sm"
              onClick={() => navigate('/')}
              className="backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </motion.div>

          {/* Hero Content */}
          <div className="relative z-10 container-main pb-16">
            <Reveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl md:text-8xl font-display font-bold text-primary/20">
                  {project.number}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  {project.type}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                {project.fullDescription}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="group">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                    <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    View Code
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Tech Stack Pills */}
        <section className="py-12 border-b border-border/30">
          <div className="container-main">
            <Reveal>
              <div className="flex flex-wrap gap-3 justify-center">
                {project.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-5 py-2.5 rounded-full bg-secondary/50 text-sm font-medium border border-border/30 hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="container-main">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Key <span className="font-serif italic font-normal">Features</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <Reveal key={feature} delay={index * 0.05}>
                  <HoverScale scale={1.02}>
                    <div className="p-5 rounded-2xl bg-secondary/20 border border-border/30 hover:border-primary/30 transition-colors group">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-foreground/90">{feature}</p>
                      </div>
                    </div>
                  </HoverScale>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="section-padding bg-secondary/10">
          <div className="container-main">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Use <span className="font-serif italic font-normal">Cases</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6">
              {project.useCases.map((useCase, index) => (
                <Reveal key={useCase} delay={index * 0.1}>
                  <motion.div
                    className="relative p-6 rounded-3xl bg-card/50 border border-border/30 backdrop-blur-sm overflow-hidden group hover:border-primary/30 transition-colors"
                    whileHover={{ y: -4 }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                    <span className="text-5xl font-display font-bold text-primary/10 absolute top-4 right-6">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="relative text-lg text-foreground/90">{useCase}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <GallerySection screenshots={project.screenshots} />

        {/* Technologies Section */}
        <section className="section-padding">
          <div className="container-main">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Code2 className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Technology <span className="font-serif italic font-normal">Stack</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.technologies.map((tech, index) => (
                <Reveal key={tech.name} delay={index * 0.08}>
                  <HoverScale scale={1.02}>
                    <div className="p-6 rounded-2xl bg-secondary/20 border border-border/30 hover:border-primary/30 transition-all group">
                      <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {tech.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{tech.description}</p>
                    </div>
                  </HoverScale>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Build Process Section */}
        <section className="section-padding bg-secondary/10">
          <div className="container-main">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Wrench className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Build <span className="font-serif italic font-normal">Process</span>
                </h2>
              </div>
            </Reveal>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

              <div className="space-y-6">
                {project.buildProcess.map((step, index) => (
                  <Reveal key={step} delay={index * 0.1}>
                    <motion.div
                      className="flex gap-6 items-start group"
                      whileHover={{ x: 4 }}
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 hidden md:block">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-5 rounded-2xl bg-card/50 border border-border/30 group-hover:border-primary/30 transition-colors">
                        <p className="text-foreground/90">{step}</p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="section-padding">
          <div className="container-main">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Challenges <span className="font-serif italic font-normal">& Solutions</span>
                </h2>
              </div>
            </Reveal>

            <div className="space-y-4">
              {project.challenges.map((challenge, index) => (
                <Reveal key={challenge} delay={index * 0.1}>
                  <HoverScale scale={1.01}>
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent border border-border/30 hover:border-primary/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                          <Lightbulb className="w-4 h-4" />
                        </div>
                        <p className="text-foreground/90">{challenge}</p>
                      </div>
                    </div>
                  </HoverScale>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-main">
            <Reveal>
              <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/20 to-background border border-border/30 text-center overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    Interested in this project?
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                    Let's discuss how I can help bring your ideas to life with similar solutions.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button size="lg" asChild>
                      <Link to="/#contact">
                        Get in Touch
                        <ArrowUpRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/#work">
                        View More Projects
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Footer spacer */}
        <div className="h-16" />
      </div>
    </>
  );
};

export default ProjectDetail;
