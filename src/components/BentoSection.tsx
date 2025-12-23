import { ArrowUpRight, Users, Globe, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, StaggerContainer, StaggerItem, HoverScale } from '@/components/ui/motion';

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

          {/* Timezone card */}
          <StaggerItem>
            <HoverScale>
              <div className="group relative overflow-hidden rounded-3xl bg-secondary/30 border border-border/30 p-8 hover:border-border/60 transition-all duration-500 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">Flexible with timezones</h3>
                <div className="flex gap-2 mt-4 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-card text-xs">🇮🇳 India</span>
                  <span className="px-3 py-1 rounded-full bg-card text-xs">🇬🇧 UK</span>
                  <span className="px-3 py-1 rounded-full bg-card text-xs">🇺🇸 USA</span>
                </div>
              </div>
            </HoverScale>
          </StaggerItem>

          {/* Remote card */}
          <StaggerItem>
            <HoverScale>
              <div className="group relative overflow-hidden rounded-3xl bg-secondary/30 border border-border/30 p-8 hover:border-border/60 transition-all duration-500 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">Remote</h3>
                <p className="text-3xl font-display font-bold gradient-text">India</p>
                <Button variant="glass" size="sm" className="mt-4" asChild>
                  <a href="#contact">Connect now</a>
                </Button>
              </div>
            </HoverScale>
          </StaggerItem>

          {/* Experience card */}
          <StaggerItem className="lg:col-span-2">
            <HoverScale>
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/30 p-8 hover:border-border/60 transition-all duration-500 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3">The Inside Scoop</h3>
                <p className="text-muted-foreground max-w-lg">
                  Currently building scalable SaaS applications and helping startups bring their vision to life. 
                  Passionate about clean architecture and delivering exceptional user experiences.
                </p>
                <Button variant="primary" className="mt-6" asChild>
                  <a href="#work">
                    View Recent Work
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            </HoverScale>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};
