"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  { category: "Core Frontend", icon: "⬡", skills: ["React.js", "Next.js", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3"] },
  { category: "State & Data",  icon: "◈", skills: ["Redux Toolkit", "Redux Saga", "Context API", "Zustand", "GraphQL", "REST APIs", "WebSockets"] },
  { category: "Styling & UI",  icon: "◎", skills: ["Tailwind CSS", "Material UI", "Framer Motion", "Figma", "Responsive Design", "Atomic Design"] },
  { category: "Performance",   icon: "⚡", skills: ["Code Splitting", "Lazy Loading", "SSR / ISR", "Core Web Vitals", "Lighthouse", "Memoization"] },
  { category: "Testing & QA",  icon: "◻", skills: ["Jest", "React Testing Library", "Cypress E2E", "XSS Prevention", "JWT / OAuth 2.0", "MFA"] },
  { category: "DevOps & Tools",icon: "⊞", skills: ["AWS", "Docker", "CI/CD", "GitHub Actions", "Git", "GitHub Copilot", "Agile / Scrum"] },
];

const floatingSymbols = [
  { text: "const",  x: "6%",  y: "10%", dur: 18, delay: 0,   size: "13px" },
  { text: "=>",     x: "88%", y: "8%",  dur: 14, delay: 1,   size: "15px" },
  { text: "{ }",    x: "75%", y: "22%", dur: 20, delay: 2,   size: "14px" },
  { text: "[ ]",    x: "4%",  y: "42%", dur: 16, delay: 0.5, size: "13px" },
  { text: "&&",     x: "92%", y: "52%", dur: 22, delay: 3,   size: "16px" },
  { text: "< />",   x: "18%", y: "78%", dur: 17, delay: 1.5, size: "13px" },
  { text: "===",    x: "60%", y: "86%", dur: 19, delay: 2.5, size: "14px" },
  { text: "async",  x: "43%", y: "4%",  dur: 15, delay: 0.8, size: "12px" },
  { text: "??",     x: "82%", y: "70%", dur: 21, delay: 1.2, size: "16px" },
  { text: "||",     x: "33%", y: "91%", dur: 13, delay: 3.5, size: "15px" },
  { text: "++",     x: "14%", y: "62%", dur: 24, delay: 0.3, size: "14px" },
  { text: "fn()",   x: "54%", y: "16%", dur: 16, delay: 2.8, size: "13px" },
  { text: "npm",    x: "70%", y: "44%", dur: 20, delay: 1.8, size: "12px" },
  { text: "git",    x: "27%", y: "33%", dur: 18, delay: 0.6, size: "13px" },
  { text: "tsx",    x: "90%", y: "35%", dur: 15, delay: 4,   size: "12px" },
  { text: ".map()", x: "47%", y: "58%", dur: 17, delay: 2.2, size: "13px" },
  { text: "0x1F",   x: "10%", y: "25%", dur: 23, delay: 1.1, size: "12px" },
  { text: "null",   x: "65%", y: "75%", dur: 19, delay: 3.2, size: "12px" },
];

const bigSymbols = [
  { text: "{ }",  left: "12%", top: "28%", rot: 15  },
  { text: "< />", left: "63%", top: "12%", rot: -12 },
  { text: "=>",   left: "38%", top: "62%", rot: 8   },
  { text: "[ ]",  left: "80%", top: "48%", rot: -18 },
];

function SkillCard({ group, index }: { group: (typeof skillGroups)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      className="group relative p-8 border border-white/6 rounded-2xl bg-surface/30 hover:bg-surface/60 hover:border-accent/20 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-gold/0 group-hover:from-accent/5 group-hover:to-gold/5 transition-all duration-700" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-accent text-xl">{group.icon}</span>
          <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted">{group.category}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {group.skills.map((s) => (
            <span key={s} className="font-mono text-[11px] text-paper/70 bg-white/5 hover:bg-accent/10 hover:text-accent px-2.5 py-1 rounded-md transition-all duration-200">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden">

      {/* ── Big faded background symbols ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {bigSymbols.map((s, i) => (
          <motion.span
            key={`big-${i}`}
            className="absolute font-mono font-light"
            style={{ left: s.left, top: s.top, fontSize: "7rem", color: "rgba(232,87,42,0.04)", lineHeight: 1 }}
            animate={{ rotate: [0, s.rot, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 18 + i * 5, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          >
            {s.text}
          </motion.span>
        ))}
      </div>

      {/* ── Small floating operators ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {floatingSymbols.map((sym, i) => (
          <motion.span
            key={i}
            className="absolute font-mono font-medium"
            style={{ left: sym.x, top: sym.y, fontSize: sym.size, color: i % 3 === 0 ? "rgba(232,87,42,0.2)" : i % 3 === 1 ? "rgba(201,168,76,0.18)" : "rgba(245,240,232,0.1)" }}
            animate={{
              y: ["0px", `${-20 - (i % 3) * 8}px`, "0px"],
              x: ["0px", `${(i % 2 === 0 ? 1 : -1) * 8}px`, "0px"],
              opacity: [0.5, 1, 0.5],
              rotate: [0, (i % 2 === 0 ? 6 : -6), 0],
            }}
            transition={{ duration: sym.dur, delay: sym.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {sym.text}
          </motion.span>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-4 block">
            02 — Technical Arsenal
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-light text-paper leading-tight">
            What I Build
            <br />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((g, i) => (
            <SkillCard key={g.category} group={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
