import { Code2, Palette, Rocket, Zap } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and well-documented code is my priority.',
  },
  {
    icon: Palette,
    title: 'UI/UX Focus',
    description: 'Creating intuitive interfaces that users love to interact with.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Building blazing-fast applications optimized for the best user experience.',
  },
  {
    icon: Zap,
    title: 'Modern Stack',
    description: 'Leveraging cutting-edge technologies to deliver innovative solutions.',
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(190_95%_50%/0.05)_0%,transparent_50%)]" />
      
      <div className="container-narrow relative">
        <div className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block animate-fade-up">About Me</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-up animation-delay-100">
            Passionate about building{' '}
            <span className="gradient-text">digital products</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-up animation-delay-200">
            I'm a Full Stack Developer with a passion for creating exceptional web experiences. 
            With expertise in both frontend and backend technologies, I bring ideas to life through 
            clean code and innovative solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className={`glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group animate-fade-up animation-delay-${(index + 2) * 100}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
