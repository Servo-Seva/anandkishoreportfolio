import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const tools = [
  { name: 'VS Code', icon: 'vscode', url: 'https://code.visualstudio.com' },
  { name: 'Cursor', icon: 'cursor', url: 'https://cursor.sh', customIcon: 'https://www.cursor.com/favicon.ico' },
  { name: 'IntelliJ IDEA', icon: 'intellij', url: 'https://www.jetbrains.com/idea' },
  { name: 'ChatGPT', icon: 'openai', url: 'https://chat.openai.com', customIcon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
  { name: 'Gemini', icon: 'google', url: 'https://gemini.google.com', customIcon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg' },
  { name: 'Lovable', icon: 'lovable', url: 'https://lovable.dev', customIcon: 'https://lovable.dev/favicon.ico' },
  { name: 'GitHub', icon: 'github', url: 'https://github.com' },
  { name: 'Figma', icon: 'figma', url: 'https://figma.com' },
  { name: 'Notion', icon: 'notion', url: 'https://notion.so' },
  { name: 'Spotify', icon: 'spotify', url: 'https://spotify.com', customIcon: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' },
  { name: 'Slack', icon: 'slack', url: 'https://slack.com' },
  { name: 'Postman', icon: 'postman', url: 'https://postman.com' },
];

export const FavoriteToolsSection = () => {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Check Out My <span className="italic text-primary">Favorite Tools</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The apps and tools I use daily to build, create, and stay productive.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6"
        >
          {tools.map((tool, index) => (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-secondary/20 dark:bg-secondary/30 border border-border/50 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-secondary/50 transition-all duration-300"
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                {tool.customIcon ? (
                  <img
                    src={tool.customIcon}
                    alt={tool.name}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool.icon}/${tool.icon}-original.svg`}
                    alt={tool.name}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes('-original')) {
                        target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool.icon}/${tool.icon}-plain.svg`;
                      }
                    }}
                  />
                )}
                <ExternalLink className="absolute -top-1 -right-1 w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                {tool.name}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
