import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/ui/motion';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import travelPhoto1 from '@/assets/travel-photo.jpg';
import travelPhoto2 from '@/assets/travel-photo-2.jpg';
import travelPhoto3 from '@/assets/travel-photo-3.jpg';

const travelPhotos = [
  {
    id: 1,
    src: travelPhoto1,
    title: "Mountain Serenity",
    location: "Himalayas, India",
    date: "December 2023",
    description: "Standing at the edge of the world with prayer flags dancing in the wind. The mountains teach you patience and humility."
  },
  {
    id: 2,
    src: travelPhoto2,
    title: "Misty Heights",
    location: "Hill Station, India",
    date: "November 2023",
    description: "Where the clouds meet the earth. Every journey to the hills reminds me why I love exploring new places."
  },
  {
    id: 3,
    src: travelPhoto3,
    title: "Temple of Lights",
    location: "Prem Mandir, Vrindavan",
    date: "October 2023",
    description: "The magnificent Prem Mandir illuminated at night. A spiritual experience that words cannot capture."
  }
];

const Travel = () => {
  return (
    <>
      <Helmet>
        <title>Travel | Anand - Full Stack Developer</title>
        <meta name="description" content="Explore my travel adventures and photography from around the world." />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen pt-24">
        {/* Header */}
        <section className="section-padding pb-8">
          <div className="container-main">
            <Reveal>
              <Link to="/#about">
                <Button variant="ghost" className="gap-2 mb-8">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Adventures</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                My Travel <span className="font-serif italic font-normal text-primary">Journey</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Beyond the code, I love exploring new places and capturing moments. 
                Here are some of my favorite travel memories.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="section-padding pt-0">
          <div className="container-main">
            <div className="grid gap-12">
              {travelPhotos.map((photo, index) => (
                <Reveal key={photo.id} delay={index * 0.1}>
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border/30 bg-gradient-to-br from-primary/10 to-accent/10">
                        <img 
                          src={photo.src} 
                          alt={photo.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className={`space-y-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <h2 className="text-3xl md:text-4xl font-display font-bold">{photo.title}</h2>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {photo.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {photo.date}
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {photo.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Travel;
