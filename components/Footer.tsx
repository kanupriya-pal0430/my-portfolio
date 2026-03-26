"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <span className="font-display text-xl text-paper/40">
          Kanupriya Pal<span className="text-accent">.</span>
        </span>
        <p className="font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} — Kanupriya Pal | All Right Reserved
        </p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-[11px] text-muted">Open to Remote Opportunities</span>
        </div>
      </div>
    </footer>
  );
}
