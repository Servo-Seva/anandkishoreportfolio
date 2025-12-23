import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Anand Kishore | Full Stack Developer</title>
        <meta name="description" content="Full Stack Developer crafting exceptional digital experiences with modern technologies. Specializing in React, Node.js, and cloud solutions." />
        <meta property="og:title" content="Anand Kishore | Full Stack Developer" />
        <meta property="og:description" content="Full Stack Developer crafting exceptional digital experiences with modern technologies." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://anandkishore.dev" />
      </Helmet>
      
      <main className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
