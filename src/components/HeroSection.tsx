import { ArrowRight, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const copyEmail = () => {
    navigator.clipboard.writeText('anandkishore060@gmail.com');
    toast({
      title: "Email copied!",
      description: "Email address copied to clipboard.",
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24">
      {/* Star field effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-foreground/30 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
            }}
          />
        ))}
      </div>

      {/* Horizon glow effect */}
      <div className="horizon-glow" />
      <div className="horizon-line" />

      {/* Announcement Banner */}
      <motion.div 
        className="relative z-10 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <a 
          href="#work"
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm hover:bg-primary/15 transition-colors group"
        >
          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
            New
          </span>
          <span className="text-muted-foreground">Building amazing digital products</span>
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
        </a>
      </motion.div>

      {/* Main headline */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          I help founders turn ideas into{' '}
          <span className="font-serif italic font-normal">seamless</span>
          <br className="hidden md:block" />
          <span className="font-serif italic font-normal">digital experiences</span>
        </motion.h1>

        {/* Profile line */}
        <motion.div 
          className="flex items-center justify-center gap-3 mb-10 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="text-lg md:text-xl text-muted-foreground">Hello, I'm</span>
          <span className="text-lg md:text-xl font-medium">Anand Kishore</span>
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-sm font-bold">
              AK
            </div>
          </motion.div>
          <span className="text-lg md:text-xl text-muted-foreground">a</span>
          <span className="text-lg md:text-xl font-medium">Full Stack Developer</span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button variant="default" size="lg" asChild className="group">
            <a href="#contact">
              Let's Connect
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </Button>
          <Button variant="primary" size="lg" asChild className="gap-2">
            <a href="/resume.pdf" download="Anand_Kishore_Resume.pdf">
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </Button>
          <Button 
            variant="glass" 
            size="lg"
            onClick={copyEmail}
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            anandkishore060@gmail.com
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { delay: 1.2, duration: 0.6 },
          y: { delay: 1.2, duration: 1.5, repeat: Infinity }
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
};
