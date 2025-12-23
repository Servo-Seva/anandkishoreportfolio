import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/motion';

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/anandkishore060', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:anandkishore060@gmail.com', label: 'Email' },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-border/30">
      <div className="container-main">
        <Reveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo & tagline */}
            <div className="text-center md:text-left">
              <a href="#" className="font-display text-2xl font-bold">
                AK<span className="text-primary">.</span>
              </a>
              <p className="text-muted-foreground text-sm mt-2">
                Building digital experiences that matter.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary/50 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-secondary/50 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300"
              aria-label="Back to top"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </Reveal>

        <div className="mt-10 pt-8 border-t border-border/20 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Anand Kishore. Crafted with passion.
          </p>
        </div>
      </div>
    </footer>
  );
};
