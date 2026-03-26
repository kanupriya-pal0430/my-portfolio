"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowDownRight, Linkedin, Mail, MapPin } from "lucide-react";

// ── Background Particle Canvas ───────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#E8572A", "#C9A84C", "#ffffff", "#E8572A"];
    const pts = Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 1.2,
      r: Math.random() * 2 + 0.5,
      c: colors[Math.floor(Math.random() * colors.length)],
      op: Math.random() * 0.6 + 0.3,
    }));

    const onMM = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMM);

    const draw = () => {
      const w = canvas.width,
        h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const fov = 400,
        mx = (mouseRef.current.x - w / 2) * 0.0001,
        my = (mouseRef.current.y - h / 2) * 0.0001;
      const proj: { sx: number; sy: number; scale: number }[] = [];
      pts.forEach((p) => {
        p.x += p.vx + mx * p.z * 0.04;
        p.y += p.vy + my * p.z * 0.04;
        p.z += p.vz;
        if (p.z > 600) p.z = 0;
        if (p.z < 0) p.z = 600;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        const s = fov / (fov + p.z);
        const sx = (p.x - w / 2) * s + w / 2,
          sy = (p.y - h / 2) * s + h / 2;
        ctx.beginPath();
        ctx.arc(sx, sy, p.r * s, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.op * s;
        ctx.fill();
        ctx.globalAlpha = 1;
        proj.push({ sx, sy, scale: s });
      });
      for (let i = 0; i < proj.length; i++)
        for (let j = i + 1; j < proj.length; j++) {
          const a = proj[i],
            b = proj[j],
            d = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.strokeStyle = "#E8572A";
            ctx.globalAlpha = (1 - d / 120) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMM);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ── 3D SWE Geometry Canvas ───────────────────────────────────────────
function SWEGeometry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      canvas.width = p.offsetWidth || 500;
      canvas.height = p.offsetHeight || 500;
    };
    setTimeout(resize, 10);
    setTimeout(resize, 200);
    window.addEventListener("resize", resize);

    const onMM = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      };
    };
    window.addEventListener("mousemove", onMM);

    const ry = (v: number[], a: number): number[] => [
      v[0] * Math.cos(a) + v[2] * Math.sin(a),
      v[1],
      -v[0] * Math.sin(a) + v[2] * Math.cos(a),
    ];
    const rx = (v: number[], a: number): number[] => [
      v[0],
      v[1] * Math.cos(a) - v[2] * Math.sin(a),
      v[1] * Math.sin(a) + v[2] * Math.cos(a),
    ];
    const proj = (
      v: number[],
      scale: number,
      fov: number,
      W: number,
      H: number
    ) => {
      const z = v[2] + fov;
      return {
        x: (v[0] / z) * scale + W / 2,
        y: (v[1] / z) * scale + H / 2,
        z: v[2],
      };
    };

    // Icosahedron — larger
    const phi = (1 + Math.sqrt(5)) / 2;
    const icoRaw = [
      [0, 1, phi],
      [0, -1, phi],
      [0, 1, -phi],
      [0, -1, -phi],
      [1, phi, 0],
      [-1, phi, 0],
      [1, -phi, 0],
      [-1, -phi, 0],
      [phi, 0, 1],
      [phi, 0, -1],
      [-phi, 0, 1],
      [-phi, 0, -1],
    ];
    const ico = icoRaw.map((v) => {
      const l = Math.hypot(...(v as [number, number, number]));
      return v.map((x) => (x / l) * 2.0);
    });
    const icoEdges = [
      [0, 1],
      [0, 4],
      [0, 5],
      [0, 8],
      [0, 10],
      [1, 6],
      [1, 7],
      [1, 8],
      [1, 10],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 9],
      [2, 11],
      [3, 6],
      [3, 7],
      [3, 9],
      [3, 11],
      [4, 5],
      [4, 8],
      [4, 9],
      [5, 10],
      [5, 11],
      [6, 7],
      [6, 8],
      [6, 9],
      [7, 10],
      [7, 11],
      [8, 9],
      [10, 11],
    ];

    // Orbit rings — bigger radius, bigger font, more visible
    const rings = [
      {
        tilt: 0.3,
        color: "#E8572A",
        r: 2.6,
        speed: 0.35,
        labels: ["React", "Next.js", "TypeScript", "Redux", "Jest", "Git"],
      },
      {
        tilt: 1.15,
        color: "#C9A84C",
        r: 3.4,
        speed: -0.25,
        labels: ["AWS", "Docker", "CI/CD", "GraphQL", "SSR"],
      },
    ];

    // Floating symbols — outer layer
    const syms = [
      "{ }",
      "< />",
      "=>",
      "[ ]",
      "fn()",
      "&&",
      "::",
      "tsx",
      "npm",
      "git",
    ].map((s, i) => ({
      label: s,
      angle: (i / 10) * Math.PI * 2,
      radius: 1.3 + Math.random() * 0.4,
      yOff: (Math.random() - 0.5) * 0.8,
      speed: 0.004 + Math.random() * 0.003,
      phase: Math.random() * Math.PI * 2,
      op: 0.5 + Math.random() * 0.3,
    }));

    const draw = () => {
      const W = canvas.width,
        H = canvas.height;
      if (W === 0 || H === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, W, H);
      tRef.current += 0.01;
      const t = tRef.current;
      const tX = 0.3 + (mouseRef.current.y - 0.5) * 0.6;
      const tY = 0.5 + (mouseRef.current.x - 0.5) * 0.6 + t;
      const scale = Math.min(W, H) * 0.28;
      const fov = 5;

      // Ambient glow
      const grd = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        scale * 1.5
      );
      grd.addColorStop(0, "rgba(232,87,42,0.1)");
      grd.addColorStop(0.5, "rgba(201,168,76,0.04)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // ── Orbit rings ──
      rings.forEach((ring, ri) => {
        // Draw ellipse ring
        const rpts: { x: number; y: number }[] = [];
        for (let i = 0; i <= 80; i++) {
          const a = (i / 80) * Math.PI * 2;
          let v = [
            ring.r * Math.cos(a),
            ring.r * Math.sin(a) * Math.cos(ring.tilt),
            ring.r * Math.sin(a) * Math.sin(ring.tilt),
          ];
          v = ry(v, tY);
          v = rx(v, tX);
          const p = proj(v, scale, fov, W, H);
          rpts.push(p);
        }
        ctx.beginPath();
        rpts.forEach((p, i) =>
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        );
        ctx.closePath();
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Nodes with labels
        ring.labels.forEach((label, ni) => {
          const a = (ni / ring.labels.length) * Math.PI * 2 + t * ring.speed;
          let v = [
            ring.r * Math.cos(a),
            ring.r * Math.sin(a) * Math.cos(ring.tilt),
            ring.r * Math.sin(a) * Math.sin(ring.tilt),
          ];
          v = ry(v, tY);
          v = rx(v, tX);
          const p = proj(v, scale, fov, W, H);
          const depth = Math.max(0.15, Math.min(1, (p.z + 2.5) / 5));

          // Dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = ring.color;
          ctx.globalAlpha = depth;
          ctx.fill();
          ctx.globalAlpha = 1;

          // Glow ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = ring.color;
          ctx.globalAlpha = depth * 0.15;
          ctx.fill();
          ctx.globalAlpha = 1;

          // Label — bold, readable
          const fontSize = Math.round(11 + depth * 5);
          ctx.font = `600 ${fontSize}px monospace`;
          ctx.textAlign = "center";
          // Shadow/backdrop for readability
          ctx.fillStyle = "#0a0a0f";
          ctx.globalAlpha = depth * 0.7;
          ctx.fillText(label, p.x + 1, p.y - 14 + 1);
          ctx.globalAlpha = 1;
          // Actual text
          ctx.fillStyle = ring.color;
          ctx.globalAlpha = depth;
          ctx.fillText(label, p.x, p.y - 14);
          ctx.globalAlpha = 1;
        });
      });

      // ── Icosahedron ──
      const projIco = ico.map((v) => {
        let p = ry(v, tY);
        p = rx(p, tX);
        return proj(p, scale, fov, W, H);
      });
      icoEdges.forEach(([a, b]) => {
        const pa = projIco[a],
          pb = projIco[b];
        const depth = Math.max(0.04, ((pa.z + pb.z) / 2 + 2) / 4);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = "#F5F0E8";
        ctx.globalAlpha = depth * 0.5;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
      projIco.forEach((p) => {
        const depth = Math.max(0, (p.z + 2) / 4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = depth * 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // ── Core pulse ──
      const pulse = 0.7 + 0.3 * Math.sin(t * 2.5);
      const cg = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        scale * 0.18 * pulse
      );
      cg.addColorStop(0, "rgba(232,87,42,1)");
      cg.addColorStop(0.3, "rgba(232,87,42,0.4)");
      cg.addColorStop(1, "rgba(232,87,42,0)");
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H);
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 6 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = "#E8572A";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.globalAlpha = 1;

      // ── Floating code symbols ──
      syms.forEach((f) => {
        f.angle += f.speed;
        const bob = Math.sin(t * 1.2 + f.phase) * 0.06;
        let v = [
          f.radius * Math.cos(f.angle),
          f.yOff + bob,
          f.radius * Math.sin(f.angle),
        ];
        v = ry(v, tY * 0.2);
        v = rx(v, tX * 0.2);
        const p = proj(v, scale * 1.0, fov, W, H);
        const depth = Math.max(0, (p.z + 2) / 4);
        if (depth < 0.1) return;
        ctx.font = `500 12px monospace`;
        ctx.fillStyle = "#C9A84C";
        ctx.globalAlpha = f.op * depth * 0.6;
        ctx.textAlign = "center";
        ctx.fillText(f.label, p.x, p.y);
        ctx.globalAlpha = 1;
      });

      // ── Scan line ──
      const scanY = ((t * 0.25) % 1) * H;
      const sg = ctx.createLinearGradient(0, scanY - 25, 0, scanY + 25);
      sg.addColorStop(0, "rgba(232,87,42,0)");
      sg.addColorStop(0.5, "rgba(232,87,42,0.05)");
      sg.addColorStop(1, "rgba(232,87,42,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 25, W, 50);

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMM);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ── Framer variants ──────────────────────────────────────────────────
const stagger = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};
const fadeUp = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.23, 1, 0.32, 1] },
  },
};

// ── Hero ─────────────────────────────────────────────────────────────
export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-6 md:px-10">
      <ParticleCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/80 pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 w-[600px] h-[200px] bg-accent/8 rounded-full blur-[150px] pointer-events-none z-[1]" />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">
          {/* LEFT — Text content */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex-shrink-0 w-full max-w-[600px] px-4 sm:px-6 lg:pl-16 lg:pr-0 text-center lg:text-left"
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-2.5 font-mono text-[11px] text-accent tracking-[0.25em] uppercase border border-accent/30 bg-accent/5 backdrop-blur-sm px-5 py-2.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Open to Remote — EST Overlap Available
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-4">
              <h1
                className="font-display font-light leading-[0.85] tracking-tight text-paper whitespace-normal break-words"
                style={{ fontSize: "clamp(2.8rem, 7vw, 7.5rem)" }}
              >
                Kanupriya{" "}
                <span className="text-accent italic relative inline-block">
                  Pal
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[2px] bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      delay: 1.4,
                      duration: 0.8,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="font-mono text-[11px] md:text-[12px] text-muted tracking-[0.3em] uppercase mb-8"
            >
              Senior Software Engineer — React.js · Next.js · TypeScript
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="max-w-lg font-body text-base md:text-lg text-paper/55 leading-relaxed mb-10"
            >
              I architect performant, accessible frontend systems that ship to
              production. 5+ years delivering 35–40% performance gains,
              microfrontend libraries, and design systems for SaaS teams —
              remotely.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-14"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-paper font-mono text-[12px] tracking-[0.15em] uppercase px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(232,87,42,0.45)]"
              >
                View Projects
                <ArrowDownRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/15 backdrop-blur-sm hover:border-white/40 text-paper/70 hover:text-paper font-mono text-[12px] tracking-[0.15em] uppercase px-8 py-4 rounded-full transition-all duration-300"
              >
                Get In Touch
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8"
            >
              <div className="flex items-center gap-1.5 text-muted font-mono text-[12px]">
                <MapPin size={12} className="text-accent" />
                Bengaluru, India
              </div>
              <div className="flex items-center gap-5">
                <a
                  href="https://linkedin.com/in/kanupriya-pal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/50 hover:text-paper transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://github.com/kanupriya-pal0430"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/50 hover:text-paper transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/kanu_3962"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/50 hover:text-[#E1306C] transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/KanupriyaP82678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/50 hover:text-paper transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="mailto:kanupriyapal031996@gmail.com"
                  className="text-paper/50 hover:text-accent transition-colors"
                >
                  <Mail size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — 3D SWE Geometry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="hidden lg:block flex-shrink-0 w-full max-w-[900px] aspect-square"
            style={{ width: "980px", height: "980px" }}
          >
            <div className="relative w-full h-full max-h-[600px] lg:max-h-[900px]">
              <SWEGeometry />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute  sm:bottom-10 left-1/2 -translate-x-1/2"
      >
        <span className="font-mono text-[10px] text-muted tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-accent/70 to-transparent"
        />
      </motion.div>
    </section>
  );
}
