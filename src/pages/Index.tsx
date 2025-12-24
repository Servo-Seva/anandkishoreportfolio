import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { TechStackSection } from '@/components/TechStackSection';
import { SkillsSection } from '@/components/SkillsSection';
import { BentoSection } from '@/components/BentoSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Anand Kishore | Full Stack Developer</title>
        <meta name="description" content="Full Stack Developer helping founders turn ideas into seamless digital experiences. Specializing in React, Node.js, and modern web technologies." />
        <meta property="og:title" content="Anand Kishore | Full Stack Developer" />
        <meta property="og:description" content="Full Stack Developer helping founders turn ideas into seamless digital experiences." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://anandkishore.dev" />
      </Helmet>
      
      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navigation />
        <HeroSection />
        <TechStackSection />
        <BentoSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
