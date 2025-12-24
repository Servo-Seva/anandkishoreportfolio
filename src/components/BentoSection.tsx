import { ArrowUpRight, Users, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, StaggerContainer, StaggerItem, HoverScale } from '@/components/ui/motion';
import { Globe3D } from './Globe3D';

export const BentoSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-main">
        {/* Section header */}
        <Reveal className="mb-16">
          <p className="text-muted-foreground mb-2">About</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Building websites that{' '}
            <span className="font-serif italic font-normal">Impact.</span>
          </h2>
        </Reveal>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.1}>
          {/* Large card - Collaboration */}
          <StaggerItem className="lg:col-span-2">
            <HoverScale>
              <div className="group relative overflow-hidden rounded-3xl bg-secondary/30 border border-border/30 p-8 hover:border-border/60 transition-all duration-500 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3">Collaboration</h3>
                <p className="text-muted-foreground max-w-md">
                  I prioritize client collaboration, fostering open communication to deliver exceptional results that exceed expectations.
                </p>
                <Button variant="outline" className="mt-6" asChild>
                  <a href="#contact">Book a call</a>
                </Button>
              </div>
            </HoverScale>
          </StaggerItem>

          {/* Experience card */}
          <StaggerItem>
            <HoverScale>
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/30 p-8 hover:border-border/60 transition-all duration-500 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">The Inside Scoop</h3>
                <p className="text-muted-foreground text-sm">
                  Currently building scalable SaaS applications and helping startups bring their vision to life.
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <a href="#work">
                    View Work
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            </HoverScale>
          </StaggerItem>

          {/* Globe card - Full width with timezone info */}
          <StaggerItem className="lg:col-span-3">
            <HoverScale>
              <div className="group relative overflow-hidden rounded-3xl bg-secondary/30 border border-border/30 hover:border-border/60 transition-all duration-500">
                {/* Header content */}
                <div className="text-center pt-8 pb-4 px-8">
                  <h3 className="text-2xl md:text-3xl font-display font-semibold mb-6">
                    I'm very flexible with time{' '}
                    <span className="text-accent">zone communications</span>
                  </h3>
                  
                  {/* Country badges */}
                  <div className="flex justify-center gap-3 flex-wrap">
                    <span className="px-4 py-2 rounded-full bg-card/80 border border-border/30 text-sm flex items-center gap-2">
                      🇬🇧 UK
                    </span>
                    <span className="px-4 py-2 rounded-full bg-card/80 border border-accent/50 text-sm flex items-center gap-2 text-accent">
                      🇮🇳 India
                    </span>
                    <span className="px-4 py-2 rounded-full bg-card/80 border border-border/30 text-sm flex items-center gap-2">
                      🇺🇸 USA
                    </span>
                  </div>
                </div>
                
                {/* Globe */}
                <div className="relative h-[400px] md:h-[450px]">
                  <Globe3D />
                  
                  {/* Location badge overlay */}
                  <div className="absolute bottom-8 left-8">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-secondary/80 border border-border/30 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Remote</p>
                    <p className="text-xl font-display font-bold">India</p>
                  </div>
                </div>
              </div>
            </HoverScale>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};
