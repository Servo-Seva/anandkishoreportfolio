import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  HoverScale,
} from "@/components/ui/motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Code, Palette, Rocket, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useEffect, useRef, useState } from "react";
import aboutPhoto from "@/assets/about-photo.png";
import anandPhoto from "@/assets/anand-photo.png";

const experiences = [
  {
    period: "Sep 2023 – Present",
    company: "LabVantage Solutions, Inc",
    role: "Associate Software Engineer",
    location: "Kolkata, India",
    type: "Full-time",
    description: [
      "Designed and implemented responsive UI components using ReactJS, Redux, and JavaScript for laboratory information management system modules, increasing user satisfaction by 30%.",
      "Collaborated cross-functionally with the DevOps team to build 3 scalable internal platforms with React, Python, and RESTful APIs, improving workflows for 20+ users and cutting operational costs by 40%.",
      "Integrated real-time notification services including email, push alerts, and in-app messages, boosting communication efficiency and engagement.",
      "Automated the installation process, reducing setup time from 10 to 12 hours to under 10 minutes, improving client onboarding.",
      "Resolved 35+ production issues and delivered 10+ feature enhancements using Java, JSP, and JavaScript, improving system functionality and stability across key product modules by 20%.",
    ],
    skills: ["React", "Redux", "JavaScript", "Java", "Python", "RESTful APIs"],
  },
  {
    period: "Jan 2023 – Jul 2023",
    company: "LabVantage Solutions, Inc",
    role: "Associate Solution Engineer Intern",
    location: "Kolkata, India",
    type: "Internship",
    description: [
      "Acquired proficiency in Java, SQL, and JavaScript via intensive backend training; contributed over 500+ lines of production-level code in enterprise LIMS modules.",
      "Integrated 10+ RESTful APIs with front-end views, enhancing application responsiveness and interactivity.",
      "Customized HTML reports and product labels to deliver data insights and meet client-specific requirements.",
      "Diagnosed and resolved 30+ configuration and functional issues, optimizing system usability and reducing support escalations by 35%.",
    ],
    skills: ["Java", "SQL", "JavaScript", "REST APIs", "HTML", "CSS"],
  },
];

const About = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      const timelineTop = rect.top;
      const timelineHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the timeline is visible/scrolled past
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight * 0.4 - timelineTop) / timelineHeight)
      );

      setLineHeight(scrollProgress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Work Experience | Anand Kishore - Full Stack Developer</title>
        <meta
          name="description"
          content="Explore the professional journey and work experience of Anand Kishore, a Full Stack Developer."
        />
      </Helmet>

      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navigation />

        {/* Back Button */}
        <div className="pt-24 pb-4 section-padding">
          <div className="container-main">
            <Button variant="ghost" asChild className="group">
              <Link
                to="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        {/* About Me Section */}
        <section className="relative pt-8 pb-20 section-padding overflow-hidden">
          <ParticleBackground />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background" />

          <div className="container-main relative z-10">
            {/* Section Header */}
            <Reveal className="text-center mb-16">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
                About Me
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Passionate Developer,
                <br />
                <span className="font-serif italic font-normal text-primary">
                  Creative Problem Solver
                </span>
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              {/* Photo */}
              <Reveal>
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-3xl overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.2)]">
                    <img
                      src={anandPhoto}
                      alt="Anand Kishore"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/20 rounded-3xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-accent/20 rounded-3xl" />
                </div>
              </Reveal>

              {/* Bio */}
              <Reveal>
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Hi, I'm{" "}
                    <span className="text-foreground font-semibold">
                      Anand Kishore
                    </span>
                    , a Full Stack Developer with a passion for creating
                    beautiful, functional, and user-friendly web applications.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    With expertise in modern technologies such as React,
                    Next.js, TypeScript, Node.js, and Java full-stack
                    development, I help startups and businesses turn ideas into
                    scalable, reliable digital products. I focus on clean code,
                    thoughtful system design, and delivering high-quality user
                    experiences.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    When I'm not coding, you'll find me exploring new
                    technologies, contributing to open-source projects, or
                    enjoying a good cup of coffee while brainstorming the next
                    big idea.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* What I Do Cards */}
            <StaggerContainer
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
              staggerDelay={0.1}
            >
              <StaggerItem>
                <HoverScale>
                  <div className="p-6 rounded-2xl bg-card border border-border/30 text-center hover:border-primary/40 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-display font-semibold mb-1">
                      Development
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Clean & scalable code
                    </p>
                  </div>
                </HoverScale>
              </StaggerItem>
              <StaggerItem>
                <HoverScale>
                  <div className="p-6 rounded-2xl bg-card border border-border/30 text-center hover:border-primary/40 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Palette className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="font-display font-semibold mb-1">Design</h4>
                    <p className="text-xs text-muted-foreground">
                      Beautiful interfaces
                    </p>
                  </div>
                </HoverScale>
              </StaggerItem>
              <StaggerItem>
                <HoverScale>
                  <div className="p-6 rounded-2xl bg-card border border-border/30 text-center hover:border-primary/40 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-display font-semibold mb-1">
                      Performance
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Fast & optimized
                    </p>
                  </div>
                </HoverScale>
              </StaggerItem>
              <StaggerItem>
                <HoverScale>
                  <div className="p-6 rounded-2xl bg-card border border-border/30 text-center hover:border-primary/40 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Coffee className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="font-display font-semibold mb-1">
                      Dedication
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Committed to quality
                    </p>
                  </div>
                </HoverScale>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="relative pt-8 pb-20 section-padding bg-secondary/20 overflow-hidden"
        >
          {/* Particle Background */}
          <ParticleBackground />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background/60 via-transparent to-background/60" />

          <div className="container-main relative z-10">
            {/* Section Header */}
            <Reveal className="text-center mb-16">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
                The Experience
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Experience That Brings
                <br />
                <span className="font-serif italic font-normal text-primary">
                  Ideas to Life
                </span>
              </h2>
            </Reveal>

            {/* Experience Timeline */}
            <StaggerContainer
              ref={timelineRef}
              className="relative max-w-4xl mx-auto"
              staggerDelay={0.15}
            >
              {/* Scroll-based Animated Vertical Line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[2px]">
                {/* Base line (faded) */}
                <div className="h-full w-full bg-border/20" />

                {/* Scroll-progress line */}
                <div
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary to-primary/50 transition-all duration-150 ease-out shadow-[0_0_15px_hsl(var(--primary)),0_0_30px_hsl(var(--primary)/0.4)]"
                  style={{ height: `${lineHeight}%` }}
                />

                {/* Glowing tip at the end of progress */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-primary via-primary to-transparent blur-sm transition-all duration-150 ease-out"
                  style={{
                    top: `${lineHeight}%`,
                    transform: "translateX(-50%) translateY(-50%)",
                  }}
                />
              </div>

              <div className="space-y-8 pl-6 md:pl-20">
                {experiences.map((exp, index) => (
                  <StaggerItem key={index}>
                    <div className="group relative p-6 md:p-8 rounded-3xl bg-card border border-border/30 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] transition-all duration-500">
                      {/* Timeline Dot with pulse */}
                      <div className="absolute -left-[29px] md:-left-[51px] top-8">
                        <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_15px_hsl(var(--primary)/0.6)]" />
                        <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/40 animate-ping" />
                      </div>

                      {/* Period Badge */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-sm text-primary font-medium">
                          {exp.period}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary/60 text-muted-foreground">
                          {exp.type}
                        </span>
                      </div>

                      {/* Company & Role */}
                      <h3 className="text-2xl font-display font-bold mb-1">
                        {exp.role || exp.company}
                      </h3>
                      <p className="text-foreground/80 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-muted-foreground mb-4">
                        {exp.location}
                      </p>

                      {/* Description */}
                      <ul className="space-y-2 mb-6">
                        {exp.description.map((item, i) => (
                          <li
                            key={i}
                            className="text-muted-foreground flex gap-2"
                          >
                            <span className="text-primary mt-1.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills with Golden Border */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-xs rounded-full bg-secondary/40 border-2 border-yellow-500 text-muted-foreground hover:border-yellow-400 transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default About;
