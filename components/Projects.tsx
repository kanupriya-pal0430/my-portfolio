"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = 
  [
    {
      number: "01",
      title: "Quick-Sale",
      subtitle: "E-Commerce Platform",
      description:
        "Scalable modular e-commerce frontend with 30+ reusable components translated from Figma. Multilingual i18n support, WCAG 2.1 accessibility, and advanced search/filtering for improved conversion flow.",
      tech: ["React.js", "TypeScript", "i18n", "WCAG 2.1", "REST API"],
      accent: "#E8572A",
      stat: "30+ components",
    },
    {
      number: "02",
      title: "Only-Jewels",
      subtitle: "MERN Stack E-Commerce",
      description:
        "Full-stack MERN e-commerce app with SSR, Webpack bundle optimization via code splitting & lazy loading. SEO-optimised, fully responsive cross-device experience with modular UI architecture.",
      tech: ["React.js", "Node.js", "MongoDB", "Webpack", "SSR"],
      accent: "#C9A84C",
      stat: "40% faster load",
    },
    {
      number: "03",
      title: "Teachmint",
      subtitle: "EdTech Dashboard & LMS",
      description:
        "Built scalable teacher dashboard and LMS modules with role-based access, real-time class management, and performance tracking. Optimised rendering and state management improved app responsiveness for high concurrent users.",
      tech: ["React.js", "Redux Toolkit", "WebSockets", "REST API"],
      accent: "#4CAF50",
      stat: "High concurrency",
    },
    {
      number: "04",
      title: "Healthcare Admin Panel",
      subtitle: "Patient & Workflow Management",
      description:
        "Developed enterprise healthcare dashboard for patient records, appointment scheduling, and workflow tracking. Implemented secure APIs, role-based permissions, and optimized data tables for large datasets.",
      tech: ["React.js", "TypeScript", "GraphQL", "Material UI"],
      accent: "#FF6B6B",
      stat: "Secure & scalable",
    },
    {
      number: "05",
      title: "Microfrontend Dashboard",
      subtitle: "Modular Enterprise UI",
      description:
        "Designed microfrontend architecture using module federation enabling independent deployments across teams. Improved scalability and reduced release cycle dependencies in large-scale application.",
      tech: ["React.js", "Microfrontends", "Webpack Module Federation"],
      accent: "#6C5CE7",
      stat: "Independent deploys",
    },
    {
      number: "06",
      title: "Performance Optimisation Suite",
      subtitle: "Core Web Vitals Improvement",
      description:
        "Optimised large-scale React applications using code splitting, lazy loading, memoization, and bundle analysis. Improved Core Web Vitals (LCP, CLS, FID) leading to better SEO and user experience.",
      tech: ["React.js", "Web Vitals", "Webpack", "Lighthouse"],
      accent: "#00B894",
      stat: "50% faster load",
    }
  ]


function ProjectCard({ proj, index }: { proj: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="group relative border border-white/6 rounded-2xl p-8 bg-surface/20 hover:bg-surface/50 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-pointer"
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at top left, ${proj.accent}08, transparent 60%)`,
        }}
      />

      <div className="relative">
        {/* Number */}
        <div className="flex items-start justify-between mb-6">
          <span
            className="font-display text-7xl font-light leading-none"
            style={{ color: proj.accent + "20" }}
          >
            {proj.number}
          </span>
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[11px] px-3 py-1 rounded-full border"
              style={{ color: proj.accent, borderColor: proj.accent + "40", background: proj.accent + "10" }}
            >
              {proj.stat}
            </span>
            <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
              <ArrowUpRight size={14} className="text-muted group-hover:text-paper transition-colors" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-3xl font-light text-paper mb-1">{proj.title}</h3>
        <p className="font-mono text-[11px] text-muted tracking-widest uppercase mb-4">{proj.subtitle}</p>

        {/* Divider */}
        <div className="w-12 h-px mb-5" style={{ background: proj.accent + "60" }} />

        {/* Description */}
        <p className="font-body text-[14px] text-paper/55 leading-relaxed mb-6">{proj.description}</p>

        {/* Tech */}
        <div className="flex flex-wrap gap-2">
          {proj.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] text-paper/50 bg-white/5 px-2.5 py-1 rounded-md hover:text-paper/80 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="projects" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-4 block -mt-34">
            04 — Selected Work
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-light text-paper leading-tight">
            Things I&apos;ve
            <br />
            <span className="text-muted italic">Built</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} proj={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
