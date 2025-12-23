import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/anandkishore060', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:anand@example.com', label: 'Email' },
];

export const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border">
      <div className="container-narrow px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#" className="font-display text-2xl font-bold gradient-text">
              AK
            </a>
            <p className="text-muted-foreground text-sm mt-2">
              Building digital experiences that matter.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Anand Kishore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
