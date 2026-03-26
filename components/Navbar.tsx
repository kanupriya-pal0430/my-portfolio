"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-xl tracking-wide text-paper/90 hover:text-accent transition-colors duration-300"
        >
          KP<span className="text-accent">.</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link font-mono text-[13px] text-muted hover:text-paper transition-colors duration-300 tracking-wider uppercase"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="mailto:kanupriyapal031996@gmail.com"
          className="magnetic-btn hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-accent/60 hover:border-accent hover:bg-accent/10 rounded-full font-mono text-[12px] text-accent tracking-wider uppercase transition-all duration-300"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}
