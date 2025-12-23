import { ArrowRight, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const HeroSection = () => {
  const copyEmail = () => {
    navigator.clipboard.writeText('anandkishore060@gmail.com');
    toast({
      title: "Email copied!",
      description: "Email address copied to clipboard.",
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Star field effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-foreground/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Horizon glow effect */}
      <div className="horizon-glow" />
      <div className="horizon-line" />

      {/* Announcement Banner */}
      <div className="relative z-10 mb-12 animate-fade-up">
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
      </div>

      {/* Main headline */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-up animation-delay-100">
          I help founders turn ideas into{' '}
          <span className="font-serif italic font-normal">seamless</span>
          <br className="hidden md:block" />
          <span className="font-serif italic font-normal">digital experiences</span>
        </h1>

        {/* Profile line */}
        <div className="flex items-center justify-center gap-3 mb-10 animate-fade-up animation-delay-200">
          <span className="text-lg md:text-xl text-muted-foreground">Hello, I'm</span>
          <span className="text-lg md:text-xl font-medium">Anand Kishore</span>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-sm font-bold">
              AK
            </div>
          </div>
          <span className="text-lg md:text-xl text-muted-foreground">a</span>
          <span className="text-lg md:text-xl font-medium">Full Stack Developer</span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
          <Button variant="default" size="lg" asChild className="group">
            <a href="#contact">
              Let's Connect
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
        </div>
      </div>
    </section>
  );
};
