"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Phone } from "lucide-react";

const contacts = [
  { icon: Mail, label: "Email", value: "kanupriyapal031996@gmail.com", href: "mailto:kanupriyapal031996@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/kanupriya-pal", href: "https://linkedin.com/in/kanupriya-pal" },
  { icon: Phone, label: "Phone", value: "+91 9770478602", href: "tel:+919770478602" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Big decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[20vw] font-light text-white/[0.015] whitespace-nowrap">
          Let&apos;s Talk
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-4 block">
            05 — Get In Touch
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-light text-paper leading-tight">
            Ready to Build
            <br />
            <span className="text-accent italic">Something?</span>
          </h2>
          <p className="mt-6 max-w-lg font-body text-base text-paper/50 leading-relaxed">
            Available for full-time remote roles with EST timezone overlap. 
            Senior-level frontend positions in product-driven SaaS companies welcome.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.label !== "Phone" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group flex flex-col gap-3 p-6 border border-white/6 rounded-2xl bg-surface/30 hover:bg-surface/60 hover:border-accent/20 transition-all duration-400"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <c.icon size={16} className="text-accent" />
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">{c.label}</p>
                <p className="font-body text-[13px] text-paper/70 group-hover:text-paper transition-colors break-all">{c.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.a
          href="mailto:kanupriyapal031996@gmail.com"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-paper font-mono text-sm tracking-widest uppercase px-10 py-5 rounded-full transition-all duration-300 hover:shadow-[0_0_60px_rgba(232,87,42,0.35)]"
        >
          Send Me a Message
          <Mail size={16} className="group-hover:rotate-12 transition-transform duration-300" />
        </motion.a>
      </div>
    </section>
  );
}
