import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const tools = [
  { name: 'VS Code', icon: 'vscode', url: 'https://code.visualstudio.com', description: 'My go-to code editor for web development' },
  { name: 'Cursor', icon: 'cursor', url: 'https://cursor.sh', customIcon: 'https://www.cursor.com/favicon.ico', description: 'AI-powered code editor for faster coding' },
  { name: 'IntelliJ IDEA', icon: 'intellij', url: 'https://www.jetbrains.com/idea', description: 'Powerful IDE for Java and backend development' },
  { name: 'ChatGPT', icon: 'openai', url: 'https://chat.openai.com', customIcon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', description: 'AI assistant for brainstorming and problem-solving' },
  { name: 'Gemini', icon: 'google', url: 'https://gemini.google.com', customIcon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg', description: 'Google\'s AI for research and creative tasks' },
  { name: 'Lovable', icon: 'lovable', url: 'https://lovable.dev', customIcon: 'https://lovable.dev/favicon.ico', description: 'AI-powered app builder for rapid prototyping' },
  { name: 'GitHub', icon: 'github', url: 'https://github.com', description: 'Version control and collaboration platform' },
  { name: 'Figma', icon: 'figma', url: 'https://figma.com', description: 'Design tool for UI/UX and prototyping' },
  { name: 'Notion', icon: 'notion', url: 'https://notion.so', description: 'All-in-one workspace for notes and docs' },
  { name: 'Spotify', icon: 'spotify', url: 'https://spotify.com', customIcon: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png', description: 'Music streaming for focus and creativity' },
  { name: 'Slack', icon: 'slack', url: 'https://slack.com', description: 'Team communication and collaboration' },
  { name: 'Postman', icon: 'postman', url: 'https://postman.com', description: 'API testing and development tool' },
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

        <TooltipProvider delayDuration={200}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6"
          >
            {tools.map((tool, index) => (
              <Tooltip key={tool.name}>
                <TooltipTrigger asChild>
                  <motion.a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary/20 dark:bg-secondary/30 border border-border/50 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-secondary/50 transition-all duration-300"
                  >
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      {tool.customIcon ? (
                        <img
                          src={tool.customIcon}
                          alt={tool.name}
                          className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool.icon}/${tool.icon}-original.svg`}
                          alt={tool.name}
                          className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src.includes('-original')) {
                              target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool.icon}/${tool.icon}-plain.svg`;
                            }
                          }}
                        />
                      )}
                      <ExternalLink className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      {tool.name}
                    </span>
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px] text-center">
                  <p>{tool.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </motion.div>
        </TooltipProvider>
      </div>
    </section>
  );
};
