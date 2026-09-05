"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Reach plc Storefront",
    subtitle: "🇬🇧 UK · Multi-Brand News & Subscription Platform",
    description:
      "Built scalable subscription storefronts across 12+ UK news brands using reusable global templates, responsive UI patterns and publication-specific configurations.",
    tech: [
      "React.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Micro Frontends",
      "Responsive Design",
    ],
    accent: "#E8572A",
    stat: "12+ publications",
  },

  {
    number: "02",
    title: "Quick-Sale",
    subtitle: "🇬🇧 UK · E-Commerce Platform",
    description:
      "Built a modular e-commerce frontend with 30+ reusable components, multilingual i18n support, WCAG accessibility and advanced product filtering.",
    tech: ["React.js", "TypeScript", "i18n", "WCAG 2.1", "REST API"],
    accent: "#C9A84C",
    stat: "30+ components",
  },

  {
    number: "03",
    title: "Only-Jewels",
    subtitle: "🌍 Global · Luxury Jewellery E-Commerce",
    description:
      "Developed a full-stack MERN commerce platform with SSR, code splitting, lazy loading and responsive UI architecture for faster cross-device performance.",
    tech: ["React.js", "Node.js", "MongoDB", "Webpack", "SSR"],
    accent: "#6C5CE7",
    stat: "40% faster load",
  },

  {
    number: "04",
    title: "Teachmint",
    subtitle: "🇮🇳 India · EdTech & Learning Platform",
    description:
      "Built scalable teacher dashboard and LMS modules with role-based access, real-time class management and optimized application state.",
    tech: ["React.js", "Redux Toolkit", "WebSockets", "REST API"],
    accent: "#4CAF50",
    stat: "High concurrency",
  },

  {
    number: "05",
    title: "Healthcare Admin Panel",
    subtitle: "🇺🇸 USA · Healthcare Management Platform",
    description:
      "Developed an enterprise healthcare dashboard with secure APIs, role-based permissions and optimized data tables for large operational datasets.",
    tech: ["React.js", "TypeScript", "GraphQL", "Material UI"],
    accent: "#FF6B6B",
    stat: "Enterprise scale",
  },

  {
    number: "06",
    title: "Microfrontend Platform",
    subtitle: "🌐 Enterprise · Modular Frontend Architecture",
    description:
      "Designed a modular microfrontend architecture enabling independent deployments, shared UI foundations and reduced cross-team release dependencies.",
    tech: [
      "React.js",
      "Microfrontends",
      "Webpack Module Federation",
      "Shared State",
    ],
    accent: "#0984E3",
    stat: "Independent deploys",
  },

  {
    number: "07",
    title: "Frontend Performance Suite",
    subtitle: "⚡ Frontend · Core Web Vitals Optimisation",
    description:
      "Improved React performance using code splitting, lazy loading, memoization and bundle analysis to reduce load times and improve Core Web Vitals.",
    tech: ["React.js", "Web Vitals", "Webpack", "Lighthouse"],
    accent: "#00B894",
    stat: "50% faster load",
  },
];

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
