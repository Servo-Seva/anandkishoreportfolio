import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Wrench, Truck, PartyPopper, Sparkles, Construction, Clock, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Sparkles,
    title: 'House Cleaning',
    description: 'Professional deep cleaning, regular maintenance, and specialized cleaning services for your home.',
  },
  {
    icon: Wrench,
    title: 'Plumbing',
    description: 'Expert plumbing solutions from leak repairs to complete installations and maintenance.',
  },
  {
    icon: Construction,
    title: 'Carpentry',
    description: 'Skilled carpentry work including furniture repair, custom installations, and woodwork.',
  },
  {
    icon: Truck,
    title: 'Transportation',
    description: 'Reliable transportation services for moving, delivery, and logistics needs.',
  },
  {
    icon: PartyPopper,
    title: 'Event Organizer',
    description: 'Complete event planning and management for all occasions - from intimate gatherings to grand celebrations.',
  },
  {
    icon: Home,
    title: 'Home Services',
    description: 'Comprehensive home services including electrical work, painting, pest control, and more.',
  },
];

const features = [
  {
    icon: Clock,
    title: 'Quick Booking',
    description: 'Book services in minutes with our streamlined process.',
  },
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'All service providers are thoroughly vetted and trained.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Dedicated support and satisfaction guarantee.',
  },
];

const ServoSeva = () => {
  return (
    <>
      <Helmet>
        <title>ServoSeva - Home Services Platform | Anand Kishore</title>
        <meta name="description" content="ServoSeva is a comprehensive home services platform connecting customers with professional service providers for cleaning, plumbing, carpentry, transportation, and more." />
        <meta property="og:title" content="ServoSeva - Home Services Platform" />
        <meta property="og:description" content="Your one-stop solution for all home service needs." />
        <link rel="canonical" href="https://anandkishore.dev/servoseva" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm text-muted-foreground">In Development • Launching Soon</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
                Servo<span className="text-primary">Seva</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                Your one-stop solution for all home service needs. Connecting you with verified professionals for cleaning, plumbing, carpentry, and more.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" disabled className="gap-2">
                  <Clock className="w-4 h-4" />
                  Coming Soon
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#services">Explore Services</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Services We'll Offer
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From everyday home maintenance to special occasions, ServoSeva covers all your service needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Why Choose ServoSeva?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're building a platform that prioritizes quality, trust, and customer satisfaction.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-8">
                ServoSeva is currently in development. We're working hard to bring you the best home service experience. Stay tuned for our launch!
              </p>
              <Button size="lg" asChild>
                <Link to="/#contact">
                  Get Notified on Launch
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ServoSeva;
