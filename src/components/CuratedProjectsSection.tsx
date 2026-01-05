import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";

const curatedProjects = projects.slice(0, 4).map((project) => ({
  ...project,
  highlights: project.features?.slice(0, 5) || [],
  techStack: project.technologies?.slice(0, 6).map((t) => t.name) || [],
}));

export const CuratedProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const observerOptions = useMemo<IntersectionObserverInit>(
    () => ({
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    }),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) {
            setActiveIndex(index);
          }
        }
      });
    }, observerOptions);

    itemRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [observerOptions]);

  const activeProject = curatedProjects[activeIndex] || curatedProjects[0];

  const themes = [
    {
      gradient: "from-zinc-900 via-zinc-800 to-zinc-700",
      text: "text-white",
    },
    {
      gradient: "from-orange-800 via-orange-500 to-orange-400",
      text: "text-white",
    },
    {
      gradient: "from-purple-900 via-purple-500 to-purple-400",
      text: "text-white",
    },
    {
      gradient: "from-blue-900 via-blue-600 to-blue-400",
      text: "text-white",
    },
  ];

  if (!activeProject) return null;

  return (
    <section id="work" className="relative section-padding">
      <div className="container-main md:w-[90%] lg:ml-0">
        {/* Header (Mobile) */}
        <div className="lg:hidden text-center mb-10">
          <p className="text-muted-foreground mb-2 uppercase tracking-[0.2em] text-[10px]">
            Case Studies
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Curated{" "}
            <span className="font-serif italic font-normal text-primary">
              work
            </span>
          </h2>
        </div>

        {/* Header (Desktop) */}
        <div className="hidden lg:flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="lg:-ml-8">
            <p className="text-muted-foreground mb-2 uppercase tracking-wider text-sm">
              Case Studies
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Curated{" "}
              <span className="font-serif italic font-normal text-primary">
                work
              </span>
            </h2>
          </div>
          <Button variant="outline" asChild>
            <a href="#contact">
              Start a project
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden space-y-10">
          {curatedProjects.map((project, idx) => {
            const theme = themes[idx % themes.length];
            const projectTitle = project.title.replace("–", "|");
            return (
              <div key={project.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {project.number}
                    </span>
                    <span className="h-px w-6 bg-border" />
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {project.type}
                    </span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border text-[10px]">
                    {project.period}
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold leading-tight text-foreground">
                  {projectTitle}
                </h3>

                <Link to={`/project/${project.id}`} className="block">
                  <div
                    className={`rounded-2xl p-3 bg-gradient-to-br ${theme.gradient}`}
                  >
                    <p className="text-sm text-white/90 mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="relative rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-video object-cover object-top"
                      />
                    </div>
                  </div>
                </Link>

                <div className="grid grid-cols-3 gap-1.5">
                  {project.techStack.slice(0, 6).map((tech, tIdx) => (
                    <div
                      key={`${project.id}-${tech}-${tIdx}`}
                      className="px-2 py-1.5 rounded-md border border-border bg-secondary text-[10px] font-medium text-secondary-foreground flex items-center justify-center gap-1 truncate"
                    >
                      <TechIcon name={tech} />
                      <span className="truncate">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-24 items-start">
          {/* Left Column: Scrollable Banners */}
          <div className="order-2 lg:order-1 flex flex-col gap-16 lg:gap-24 pb-24 lg:-ml-8">
            {curatedProjects.map((project, idx) => {
              const theme = themes[idx % themes.length];
              return (
                <div
                  key={project.id}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  data-index={idx}
                  className="group min-h-[22vh] flex items-center"
                >
                  <Link
                    to={`/project/${project.id}`}
                    className={`w-full rounded-3xl p-4 md:p-5 bg-gradient-to-br ${theme.gradient} transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 cursor-pointer block`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl md:text-2xl font-medium leading-tight max-w-[80%] text-white group-hover:translate-x-1 transition-transform duration-300">
                          {project.description}
                        </h3>
                        <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
                        </div>
                      </div>

                      <div className="relative rounded-xl overflow-hidden shadow-2xl mt-auto group-hover:shadow-3xl transition-shadow duration-500">
                        <div className="bg-gray-900/90 backdrop-blur px-4 py-2.5 flex items-center gap-2 border-b border-white/10">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                          </div>
                          <div className="ml-3 bg-white/10 px-2 py-0.5 rounded text-[10px] text-white/50 font-mono">
                            {project.title}
                          </div>
                        </div>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full aspect-[16/6] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Details */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-32 h-fit min-h-[40vh] self-start transition-all duration-500 lg:-ml-4">
            <div
              key={activeProject.id}
              className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {activeProject.title.replace("–", "|")}
                </h3>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                {activeProject.fullDescription}
              </p>

              <div className="space-y-2">
                {activeProject.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 animate-in fade-in slide-in-from-left-2 duration-500"
                    style={{
                      animationDelay: `${idx * 100}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    <span className="text-primary mt-0.5 text-lg">✦</span>
                    <span className="text-foreground/80 text-base">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {activeProject.techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-full border border-border bg-secondary text-sm font-medium text-secondary-foreground flex items-center gap-2"
                  >
                    <TechIcon name={tech} />
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechIcon = ({ name }: { name: string }) => {
  const iconMap: Record<string, string> = {
    ReactJS: "⚛️",
    React: "⚛️",
    "Node.js": "🟢",
    "Express.js": "⚡",
    MongoDB: "🍃",
    "Socket.IO": "🔌",
    WebRTC: "📹",
    TypeScript: "💎",
    TailwindCSS: "🎨",
    Redux: "🔄",
    "Next.js": "▲",
    PostgreSQL: "🐘",
    GraphQL: "◈",
    Docker: "🐳",
    AWS: "☁️",
    Firebase: "🔥",
    Zustand: "🐻",
    Zod: "✓",
  };

  return <span className="text-sm">{iconMap[name] || "📦"}</span>;
};

export default CuratedProjectsSection;
