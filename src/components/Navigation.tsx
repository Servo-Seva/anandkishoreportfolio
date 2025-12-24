import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { href: '/', label: 'Home', isRoute: true },
  { href: '/about', label: 'About', isRoute: true },
  { href: '#work', label: 'Work', isRoute: false },
  { href: '#blog', label: 'Blog', isRoute: false },
  { href: '#contact', label: 'Contact', isRoute: false },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <div
        className={`flex items-center gap-2 transition-all duration-500 ${
          isScrolled ? 'glass px-3 py-2 rounded-full' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link 
          to="/" 
          className={`font-display font-bold text-lg px-4 transition-all duration-300 ${
            isScrolled ? '' : 'hidden md:block'
          }`}
        >
          AK
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-secondary/60 rounded-full p-1.5 border border-border/30">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-full hover:bg-secondary/80"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-full hover:bg-secondary/80"
              >
                {link.label}
              </a>
            )
          ))}
          <Button variant="default" size="sm" className="ml-1">
            Book a Call
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-6 right-6 glass rounded-2xl p-6 animate-fade-up">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 py-3 px-4 rounded-xl hover:bg-secondary/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 py-3 px-4 rounded-xl hover:bg-secondary/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
            <Button variant="default" className="mt-4">
              Book a Call
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
