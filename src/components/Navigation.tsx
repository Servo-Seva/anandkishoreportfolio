import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navLinks = [
  { href: '/', label: 'Home', isRoute: true },
  { href: '/about', label: 'About', isRoute: true },
  { href: '#work', label: 'Work', isRoute: false },
  { href: '#blog', label: 'Blog', isRoute: false },
  { href: '#contact', label: 'Contact', isRoute: false },
];

const AI_PORTFOLIO_URL = 'https://anandkishoreportfolio.vercel.app/';

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
          
          {/* AI Portfolio Switch */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border border-border/30 ml-1">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">AI</span>
                <Switch
                  onCheckedChange={(checked) => {
                    if (checked) {
                      window.open(AI_PORTFOLIO_URL, '_blank');
                    }
                  }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>View AI Portfolio</p>
            </TooltipContent>
          </Tooltip>
          
          <a href="#contact">
            <Button variant="default" size="sm" className="ml-1">
              Book a Call
            </Button>
          </a>
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
            
            {/* AI Portfolio Switch - Mobile */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-secondary/30 border border-border/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">View AI Portfolio</span>
              </div>
              <Switch
                onCheckedChange={(checked) => {
                  if (checked) {
                    window.open(AI_PORTFOLIO_URL, '_blank');
                    setIsMobileMenuOpen(false);
                  }
                }}
              />
            </div>
            
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="default" className="mt-4 w-full">
                Book a Call
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
