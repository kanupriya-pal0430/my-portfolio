
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const experiences = [
  {
    role: "Frontend Engineer",
    company: "Millipixel Interactive LLP",
    client: "Reach plc — UK News & Media",
    period: "Apr 2026 — Sep 2026",
    type: "Remote",

    highlights: [
      "Delivered scalable frontend experiences for Reach plc, one of the UK's largest commercial news publishers, supporting 12+ high-traffic regional and national publication brands",
      "Built and enhanced reusable React.js, JavaScript, HTML & CSS components and global storefront templates, enabling consistent experiences across multiple publication websites",
      "Worked across major UK news brands including Manchester Evening News, Daily Star, Daily Record, Glasgow Live, Edinburgh Live, North Wales Live, Hull Live, Coventry Live, Nottinghamshire Live, Chronicle Live, BirminghamLive and Stoke-on-Trent Live",
      "Developed responsive, cross-device subscription and storefront experiences across mobile, tablet and desktop while maintaining publication-specific branding and business requirements",
      "Designed reusable global-template solutions that allowed shared frontend enhancements to scale across multiple publications while safely supporting brand-specific customisations",
      "Implemented subscription journeys, CTA experiences, app-download sections, modal interactions and dynamic UI behaviour for customer-facing production platforms",
      "Collaborated closely with product, design, QA and engineering teams throughout development, pre-production validation and production releases",
      "Improved maintainability and delivery efficiency by consolidating repeated publication-specific UI patterns into reusable components and shared frontend logic",
      "Delivered production-ready frontend changes with strong focus on responsive design, accessibility, cross-browser compatibility and pixel-accurate implementation",
    ],

    tech: [
      "React.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Responsive Design",
      "REST APIs",
      "Git",
      "Micro Frontends",
    ],
  },

  {
    role: "Senior Frontend Engineer",
    level: "SDE III",
    company: "Infosol Technosol",
    period: "Apr 2025 — Present",
    type: "USA Remote",

    highlights: [
      "Led end-to-end frontend delivery across 3+ production releases — 25% faster turnaround",
      "Architected 25+ reusable React.js + TypeScript UI components, cutting dev effort by 20%",
      "Integrated React frontends with Node.js REST APIs with resilient error boundaries",
      "Daily async collaboration with US-based PMs via Slack, Notion & Loom (EST overlap)",
      "Mentored 5 engineers, elevated PR quality & reduced production bug rate",
    ],

    tech: ["React.js", "TypeScript", "Node.js", "GitHub Copilot"],
  },

  {
    role: "Frontend Engineer",
    level: "SDE II",
    company: "Teachmint Technologies",
    period: "Feb 2024 — Mar 2025",
    type: "Bengaluru / Remote",

    highlights: [
      "Built microfrontend component library used across 4+ product teams — 30% less duplicate work",
      "Boosted app performance by 35% via code splitting, lazy loading & strategic caching",
      "Implemented SSR & ISR with Next.js, improving SEO rankings for key product pages",
      "Wrote Jest + React Testing Library tests, significantly raising coverage",
      "Deployed secure auth flows: JWT, OAuth 2.0, MFA — zero UX regression",
    ],

    tech: ["Next.js", "Microfrontend", "Jest", "OAuth 2.0", "SSR"],
  },

  {
    role: "Frontend Engineer",
    level: "SDE I",
    company: "Cyber Impulse Software",
    period: "Aug 2020 — Jan 2024",
    type: "Bengaluru, India",

    highlights: [
      "Reduced page load time by 40% through frontend performance optimization",
      "Built React.js / Next.js responsive, accessible UIs from Figma designs",
      "Implemented Redux Toolkit & Context API for complex multi-page state",
      "Developed Atomic Design component libraries — consistent across product lines",
      "REST API integration with JWT auth, loading skeletons & retry logic",
    ],

    tech: ["React.js", "Redux Toolkit", "Atomic Design", "REST API"],
  },
];

type ExperienceItem = (typeof experiences)[number];

const boldKeywords = [
  // Millipixel
  "Reach plc",
  "12+ high-traffic regional and national publication brands",
  "React.js, JavaScript, HTML & CSS",
  "global storefront templates",
  "Manchester Evening News",
  "Daily Star",
  "Daily Record",
  "Edinburgh Live", 
  "North Wales Live",
  " Hull Live", 
  "Coventry Live", 
  "Nottinghamshire Live", 
  "Chronicle Live", 
  "BirminghamLive" , 
  "Stoke-on-Trent Live",
  "Glasgow Live",
  "responsive, cross-device subscription and storefront experiences",
  "reusable global-template solutions",
  "subscription journeys",
  "CTA experiences",
  "app-download sections",
  "reusable components and shared frontend logic",
  "responsive design",
  "accessibility",
  "cross-browser compatibility",

  // Infosol
  "3+ production releases",
  "25% faster turnaround",
  "25+ reusable React.js + TypeScript UI components",
  "20%",
  "Node.js REST APIs",
  "US-based PMs",
  "5 engineers",

  // Teachmint
  "microfrontend component library",
  "4+ product teams",
  "30%",
  "35%",
  "code splitting",
  "lazy loading",
  "SSR & ISR",
  "Next.js",
  "Jest + React Testing Library",
  "JWT",
  "OAuth 2.0",
  "MFA",

  // Cyber Impulse
  "40%",
  "React.js / Next.js",
  "Redux Toolkit & Context API",
  "Atomic Design component libraries",
  "REST API",
  "JWT auth",
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlight(text: string): ReactNode {
  const sortedKeywords = [...boldKeywords].sort(
    (a, b) => b.length - a.length
  );

  const pattern = new RegExp(
    `(${sortedKeywords.map(escapeRegExp).join("|")})`,
    "gi"
  );

  return text.split(pattern).map((part, index) => {
    const shouldBold = sortedKeywords.some(
      (keyword) => keyword.toLowerCase() === part.toLowerCase()
    );

    if (shouldBold) {
      return (
        <strong
          key={`${part}-${index}`}
          className="font-semibold text-paper/90"
        >
          {part}
        </strong>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function ExpCard({
  exp,
  index,
}: {
  exp: ExperienceItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="relative pl-8 pb-16 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-accent/40 via-white/10 to-transparent" />

      {/* Timeline dot */}
      <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full border-2 border-accent bg-ink" />

      <div className="group p-7 border border-white/6 rounded-2xl bg-surface/20 hover:bg-surface/50 hover:border-white/10 transition-all duration-500">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h3 className="font-display text-2xl text-paper font-light">
                {exp.role}
              </h3>

              {"level" in exp && exp.level && (
                <span className="font-mono text-[10px] text-accent border border-accent/30 px-2 py-0.5 rounded-full">
                  {exp.level}
                </span>
              )}
            </div>

            <p className="font-mono text-[13px] text-muted">
              {exp.company} · {exp.type}
            </p>

            {"client" in exp && exp.client && (
              <p className="font-mono text-[12px] text-gold/70 mt-1">
                Client: {exp.client}
              </p>
            )}
          </div>

          <span className="font-mono text-[11px] text-muted tracking-wider">
            {exp.period}
          </span>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-5">
          {exp.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-accent mt-1.5 flex-shrink-0 text-[8px]">
                ◆
              </span>

              <span className="font-body text-[14px] text-paper/60 leading-relaxed">
                {renderHighlight(highlight)}
              </span>
            </li>
          ))}
        </ul>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] text-gold/70 bg-gold/5 border border-gold/15 px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-4 block -mt-16">
            03 — Career Timeline
          </span>

          <h2 className="font-display text-5xl md:text-7xl font-light text-paper leading-tight">
            Where I&apos;ve
            <br />
            <span className="text-muted italic">Shipped</span>
          </h2>
        </motion.div>

        <div className="ml-4">
          {experiences.map((exp, i) => (
            <ExpCard
              key={`${exp.company}-${exp.period}`}
              exp={exp}
              index={i}
            />
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 p-6 border border-white/6 rounded-2xl bg-surface/20 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <span className="font-mono text-[11px] text-accent tracking-widest uppercase mb-1 block">
              Education
            </span>

            <p className="font-display text-2xl text-paper font-light">
              Master of Computer Applications (MCA)
            </p>
          </div>

          <span className="font-mono text-[13px] text-gold/70 bg-gold/5 border border-gold/15 px-4 py-2 rounded-full">
            CGPA: 8.6 / 10
          </span>
        </motion.div>
      </div>
    </section>
  );
}

