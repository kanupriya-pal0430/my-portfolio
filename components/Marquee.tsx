"use client";

const items = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Framer Motion",
  "Tailwind CSS",
  "Redux Toolkit",
  "GraphQL",
  "Microfrontends",
  "Jest",
  "Cypress",
  "AWS",
  "Docker",
  "WCAG 2.1",
  "Core Web Vitals",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-white/5 py-5 overflow-hidden my-4 bg-surface/40">
      <div className="marquee-inner flex gap-12 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[12px] tracking-[0.2em] uppercase text-muted flex items-center gap-12"
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
