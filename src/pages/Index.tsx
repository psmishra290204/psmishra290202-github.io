import { CustomCursor } from "@/components/CustomCursor";
import { ProjectAnimation } from "@/components/ProjectAnimation";
import { CodeRainBg } from "@/components/CodeRainBg";
import { SectionMascot } from "@/components/SectionMascot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Brain,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const strengths = ["Python", "Java", "Full-Stack Development", "DSA", "React.js", "MongoDB"];

const techStack = [
  "VS Code",
  "React",
  "Docker",
  "AWS",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "TensorFlow",
  "PyTorch",
  "Git",
  "Linux",
];

// Map a tech name -> simpleicons.org slug
const techIcon: Record<string, string> = {
  React: "react",
  TypeScript: "typescript",
  Docker: "docker",
  AWS: "amazonwebservices",
  "Node.js": "nodedotjs",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  TensorFlow: "tensorflow",
  PyTorch: "pytorch",
  Git: "git",
  Linux: "linux",
  Python: "python",
  "React.js": "react",
  "TensorFlow.js": "tensorflow",
  MediaPipe: "google",
  Keras: "keras",
  OpenCV: "opencv",
  CSS: "css3",
  "Webcam API": "webrtc",
};

const experience = [
  {
    role: "Penetration Tester Intern",
    company: "Ceeras IT Services",
    period: "Jan 2025 – Apr 2025",
    points: [
      "Performed VAPT on web applications and internal network assets.",
      "Developed robust APIs and interactive UI with security checks.",
      "Built and secured dynamic web apps using MERN stack",
    ],
  },

  {
    role: "Business Analyst Intern",
    company: "Coreline Solutions Pvt Ltd.",
    period: "Jun 2025 – Aug 2025",
    points: [
      "Coordinated with teams to track requirements and project progress.",
      "Analyzed data to support business decisions and process improvements.",
      "Gathered and documented business requirements from stakeholders",
    ],
  },
];

// Edit this watermark text to anything you like
const WATERMARK_TEXT = "PARTHASARATHI";

const projects = [
  {
    name: "PoseVision",
    tag: "Real-time Pose Estimation",
    desc: "Browser-based pose estimator running fully client-side with live webcam input and skeletal overlay rendering.",
    stack: ["React.js", "TensorFlow.js", "MediaPipe", "Webcam API", "CSS"],
    anim: "pose" as const,
    results: [
      "Runs 100% in-browser, zero backend cost",
      "Real-time 30+ FPS skeletal overlay",
      "Responsive UI with webcam permissions handled gracefully",
    ],
  },
  {
    name: "EEG Emotion Recognition",
    tag: "Signal Processing + Deep Learning",
    desc: "End-to-end pipeline using PLV & Coherence connectivity features with a hybrid CNN + SVM classifier.",
    stack: ["Python", "CNN", "SVM", "PLV", "Coherence", "86% accuracy"],
    anim: "eeg" as const,
    results: [
      "86% classification accuracy on benchmark dataset",
      "Hybrid CNN + SVM outperformed baselines",
      "Reproducible preprocessing pipeline (PLV + Coherence)",
    ],
  },
  {
    name: "Eye Disease Detection",
    tag: "Medical Imaging",
    desc: "CNN-based classifier for retinal images detecting common eye diseases from fundus photography.",
    stack: ["Python", "CNN", "Keras", "OpenCV"],
    anim: "eye" as const,
    results: [
      "Multi-class CNN over fundus image dataset",
      "Image augmentation + transfer learning",
      "Modular Keras pipeline for retraining",
    ],
  },
];

const certifications = [
  // Replace href "#" with the actual certificate / PDF URL for each item.
  {
    name: "Financial Accounting – Advanced Topics",
    issuer: "ILLIONIS",
    href: "https://drive.google.com/file/d/1CLhd8_35h5MlqiAADqh6td5fGHsbU_DV/view?usp=sharing",
  },
  {
    name: "Data Science with Python",
    issuer: "Coincent.ai",
    href: "https://drive.google.com/file/d/1IP6uPJQoXM95m-2aJi57DyyjSO3WM6Og/view?usp=drive_link",
  },
  {
    name: "Introduction in Applied Business Analytics",
    issuer: "ILLIONIS",
    href: "https://drive.google.com/file/d/1WMQpWo_9xwWtoEGTRZDgKmgmzVcWzl_Y/view?usp=drive_link",
  },
  {
    name: "Intro to Business Analytics: Communicating with Data",
    issuer: "ILLIONIS",
    href: "https://drive.google.com/file/d/1rff7Lmda49fngD8B2w0cxl7tiYjOddzl/view?usp=drive_link",
  },
  {
    name: "Generative AI: Introduction and Applications",
    issuer: "IBM",
    href: "https://drive.google.com/file/d/1Bb9qBYhg-B2F-lnLC3dnWQbx5HvE7fnN/view?usp=drive_link",
  },
  {
    name: "Generative AI: Prompt Engineering Basics",
    issuer: "IBM",
    href: "https://drive.google.com/file/d/17hLP7JQnMk4vyMGfI1mgjPntXOiLYjpA/view?usp=drive_link",
  },
  {
    name: "Prompt Engineering for ChatGPT",
    issuer: "Vanderbilt University",
    href: "https://drive.google.com/file/d/1-fGqSYmwpK15ZsdzkJnR5j5TyWEf7cKR/view?usp=drive_link",
  },
  {
    name: "Cybersecurity Intern Certificate",
    issuer: "Ceeras IT Services",
    href: "https://drive.google.com/file/d/11wngNCSHupn2v37PI55Y0s0LcYxbhBN3/view?usp=drive_link",
  },
  {
    name: "Android Developer Virtual Internship",
    issuer: "Google for Developers",
    href: "https://drive.google.com/file/d/1gJD03X93UAUMB6TLpiYRpSSdI9KvbKNl/view?usp=drive_link",
  },
  {
    name: "Python Full Stack Developer Virtual Internship",
    issuer: "EduSkills Foundation",
    href: "https://drive.google.com/file/d/1QsV7_ajnYFfatAHL16H18OFFAbPgJzNC/view?usp=drive_link",
  },
  {
    name: "Fundamentals of Cybersecurity (EDU-102)",
    issuer: "Zscaler",
    href: "https://drive.google.com/file/d/1xFG2aYPLNIaqb5tOHJfu8vkLLbq8MCcU/view?usp=drive_link",
  },
];

const Section = ({
  id,
  icon: Icon,
  label,
  title,
  mascotMessage,
  children,
}: {
  id: string;
  icon: any;
  label: string;
  title: string;
  mascotMessage?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="container mx-auto max-w-6xl px-6 py-24">
    <div className="mb-12 flex items-end gap-4">
      <SectionMascot message={mascotMessage} />
      <div className="flex items-center gap-3 pb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
          <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
        </div>
      </div>
    </div>
    {children}
  </section>
);

type Project = (typeof projects)[number];

const ProjectCard = ({ p }: { p: Project }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="group flex flex-col border-border/60 bg-card/50 p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow sm:p-6">
      <div className="mb-4 aspect-[5/3] w-full overflow-hidden rounded-lg border border-border/60 bg-gradient-to-br from-secondary/60 to-secondary/20">
        <ProjectAnimation kind={p.anim} />
      </div>
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold">{p.name}</h3>
        <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      <p className="font-mono text-[11px] uppercase tracking-widest text-primary">{p.tag}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-4 inline-flex items-center justify-between gap-2 rounded-md border border-border/60 bg-secondary/40 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        data-cursor-hover
      >
        <span>{open ? "Hide details" : "View details"}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => {
              const slug = techIcon[s];
              return (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/40 px-2 py-0.5 font-mono text-[10px]"
                >
                  {slug && (
                    <img src={`https://cdn.simpleicons.org/${slug}`} alt="" className="h-3 w-3" loading="lazy" />
                  )}
                  {s}
                </span>
              );
            })}
          </div>
          <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Key results</p>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {p.results?.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <CodeRainBg />

      {/* Editable background watermark */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center overflow-hidden select-none"
      >
        <span
          className="font-bold tracking-tighter text-foreground/[0.04] -rotate-12 whitespace-nowrap"
          style={{ fontSize: "clamp(6rem, 22vw, 22rem)", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {WATERMARK_TEXT}
        </span>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-mono text-sm font-semibold">
            <span className="text-gradient">parthasarathi</span>
            <span className="text-muted-foreground">.dev</span>
          </a>
          <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="#experience" className="hover:text-foreground transition-colors">
              Experience
            </a>
            <a href="#projects" className="hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#certifications" className="hover:text-foreground transition-colors">
              Certs
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <Button asChild size="sm" variant="outline">
            <a href="mailto:psmishra648@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Hire me
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <header id="top" className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 30% 20%, hsl(var(--primary)/0.25), transparent), radial-gradient(50% 50% at 80% 60%, hsl(var(--accent)/0.2), transparent)",
          }}
        />
        <div className="container mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-[1fr_auto] md:py-32">
          <div className="space-y-6">
            <Badge variant="outline" className="font-mono text-xs">
              <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
              Open to SDE roles · 2026
            </Badge>
            <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">
              PARTHASARATHI <span className="text-gradient">MISHRA</span>
            </h1>
            <p className="text-xl font-medium text-muted-foreground md:text-2xl">
              Software Engineer <span className="text-primary">|</span> Full-Stack Developer{" "}
              <span className="text-primary">|</span> AI/ML
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              B.Tech (IT) student at <span className="text-foreground">KIIT (2022–2026)</span> building scalable
              full-stack applications using <span className="text-foreground">FastAPI, React, Docker, and AWS</span>,
              with hands-on experience in{" "}
              <span className="text-foreground">backend systems, REST APIs, and applied machine learning</span>
              across computer vision and healthcare-based projects.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
              >
                <a href="#projects">
                  View Projects <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://github.com/psmishra290204" target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="www.linkedin.com/in/parthasarathi-mishra-969b5126a" target="_blank" rel="noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
              {strengths.map((s) => (
                <Badge key={s} variant="secondary" className="rounded-full px-3 py-1 font-mono text-xs">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {/* Animated profile photo placeholder */}
          <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80" data-cursor-hover>
            <div className="absolute inset-0 rounded-full ring-gradient blur-md opacity-70" />
            <div className="absolute inset-0 rounded-full ring-gradient" />
            <div className="absolute inset-[6px] rounded-full bg-background" />
            <div className="absolute inset-[10px] flex items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <div className="text-center">
                <Sparkles className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="font-mono text-xs uppercase tracking-widest">Photo</p>
                <p className="font-mono text-[10px] text-muted-foreground/60">add /public/profile.jpg</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About / Stack */}
      <Section
        id="about"
        icon={Code2}
        label="01 — About"
        title="Engineer-first mindset"
        mascotMessage="Hey, let me introduce myself!"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 border-border/60 bg-card/50 p-8 shadow-card">
            <p className="text-base leading-relaxed text-muted-foreground">
              B.Tech (IT) student at KIIT’26 with skills in Full-Stack Development (FastAPI, React, Docker, AWS), UI/UX
              design, and AI/ML projects in healthcare & computer vision. Experienced in market research, client
              engagement, and data-driven strategy, with a strong interest in consulting and business innovation. An
              aspiring entrepreneur, I strive to combine technology, design, and strategic problem-solving to create
              impactful solutions. Also a National Badminton Athlete, bringing discipline, resilience, and teamwork into
              every pursuit.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div>
                <p className="text-3xl font-bold text-gradient">3+</p>
                <p className="text-xs text-muted-foreground">Internships</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gradient">11</p>
                <p className="text-xs text-muted-foreground">Certifications</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gradient">86%</p>
                <p className="text-xs text-muted-foreground">EEG Model Acc.</p>
              </div>
            </div>
          </Card>
          <Card className="border-border/60 bg-card/50 p-8 shadow-card">
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4" /> Education
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "B.Tech, Information Technology",
                  sub: "KIIT University · 2022–2026",
                  score: "CGPA 6.98 / 10",
                  // Replace # with the link to your certificate / marksheet
                  link: "https://drive.google.com/file/d/1fU59t0nluMLuflOTE5DJ-tsfcMyixnuA/view?usp=drive_link",
                },
                {
                  title: "HSC (Class XII, CBSE)",
                  sub: "Oneness International School · 2022",
                  score: "82%",
                  link: "https://drive.google.com/file/d/1-XqD_gHcjOzsODRmiUYFP_ISLCR1hixq/view?usp=drive_link",
                },
                {
                  title: "SSC (Class X, CBSE)",
                  sub: "Oneness International School · 2020",
                  score: "89.6%",
                  link: "https://drive.google.com/file/d/1-yEfXWxTYV7hlJ7SJ3oxax5cuk0tay9a/view?usp=drive_link",
                },
              ].map((e) => (
                <div key={e.title}>
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-sm text-muted-foreground">{e.sub}</p>
                  <div className="mt-1 flex items-center gap-3">
                    <p className="font-mono text-xs text-primary">{e.score}</p>
                    <a
                      href={e.link}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" /> Certificate
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="mt-6 border-border/60 bg-card/50 p-8 shadow-card">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="h-4 w-4" /> Tech Stack
          </div>
          <div className="flex flex-wrap gap-3">
            {techStack.map((t) => {
              const slug = techIcon[t];
              return (
                <div
                  key={t}
                  className="group flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow"
                  data-cursor-hover
                >
                  {slug && (
                    <img
                      src={`https://cdn.simpleicons.org/${slug}`}
                      alt={`${t} logo`}
                      className="h-5 w-5"
                      loading="lazy"
                    />
                  )}
                  <span className="font-mono text-xs">{t}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </Section>

      {/* Experience */}
      <Section
        id="experience"
        icon={Briefcase}
        label="02 — Experience"
        title="Internships"
        mascotMessage="Here's where I've worked!"
      >
        <div className="space-y-4">
          {experience.map((e) => (
            <Card
              key={e.company}
              className="group border-border/60 bg-card/50 p-6 shadow-card transition-all hover:border-primary/40 hover:shadow-glow md:p-8"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{e.role}</h3>
                  <p className="text-primary">{e.company}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section
        id="projects"
        icon={Brain}
        label="03 — Projects"
        title="Selected work"
        mascotMessage="Check out my builds!"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section
        id="certifications"
        icon={Award}
        label="04 — Certifications"
        title="Continuous learning"
        mascotMessage="Always learning new things!"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group relative flex items-start gap-3 overflow-hidden rounded-lg border border-border/60 bg-card/60 p-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-glow"
            >
              <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-snug">{c.name}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{c.issuer}</p>
              </div>
              <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-70" />
              <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-primary/0 transition-all group-hover:ring-2 group-hover:ring-primary/30" />
            </a>
          ))}
        </div>
      </Section>

      {/* Extracurricular placeholder */}
      <Section
        id="extracurricular"
        icon={Sparkles}
        label="05 — Extracurricular"
        title="Beyond the keyboard"
        mascotMessage="Life outside code!"
      >
        <Card className="border-dashed border-border/60 bg-card/30 p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Activities, clubs, hackathons & leadership roles will be added here soon.
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60">
            editable section
          </p>
        </Card>
      </Section>

      {/* Contact */}
      <section id="contact" className="container mx-auto max-w-6xl px-6 py-24">
        <div className="mb-6 flex justify-center">
          <SectionMascot message="Let's connect!" />
        </div>
        <div className="rounded-2xl border-2 border-border bg-card p-10 text-center shadow-card md:p-16">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">06 — Contact</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            Let's <span className="text-gradient">build</span> something.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Open to SDE, Analyst roles. Reach out anytime.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
            >
              <a href="mailto:psmishra648@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                psmishra648@gmail.com
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://www.linkedin.com/in/parthasarathi-mishra-969b5126a/" target="_blank" rel="noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://github.com/psmishra290204" target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {[
              { name: "Facebook", slug: "facebook", url: "https://facebook.com/61551571820413" },
              {
                name: "Instagram",
                slug: "instagram",
                url: "https://www.instagram.com/deja_vu_2902/",
              },
              {
                name: "Quora",
                slug: "quora",
                url: "https://www.quora.com/profile/Parthasarathi-Mishra-23",
              },
              {
                name: "Reddit",
                slug: "reddit",
                url: "https://www.reddit.com/user/Upbeat_Ad_1082/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
              },
            ].map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                data-cursor-hover
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow"
              >
                <img src={`https://cdn.simpleicons.org/${s.slug}`} alt={s.name} className="h-4 w-4" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-10 text-center font-mono text-xs text-muted-foreground">
          © 2026 Parthasarathi Mishra · Built with React + Tailwind and Love💖
        </p>
      </section>
    </div>
  );
};

export default Index;
