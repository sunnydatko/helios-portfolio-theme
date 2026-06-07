"use client";

import { useRef, useEffect } from "react";
import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ResponsiveMenu from "./components/ResponsiveMenu";
import Footer from "./components/Footer";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); filter: blur(3px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
`;

const anim = (delay: string) => ({
  animation: `${fadeUp} 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay} forwards`,
  opacity: 0,
  "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 1 },
});

// Static star field (SSR-safe, no Math.random)
const STARS: Array<{ x: number; y: number; r: number; bright: boolean }> = [
  { x: 7,  y: 11, r: 1,   bright: true  },
  { x: 14, y: 74, r: 0.8, bright: false },
  { x: 22, y: 33, r: 1.5, bright: true  },
  { x: 30, y: 87, r: 0.8, bright: false },
  { x: 43, y: 17, r: 1,   bright: false },
  { x: 56, y: 92, r: 0.8, bright: true  },
  { x: 68, y: 7,  r: 1.2, bright: false },
  { x: 73, y: 56, r: 0.8, bright: false },
  { x: 79, y: 27, r: 1.5, bright: true  },
  { x: 86, y: 79, r: 0.8, bright: false },
  { x: 92, y: 41, r: 1,   bright: true  },
  { x: 97, y: 14, r: 0.8, bright: false },
  { x: 5,  y: 53, r: 0.8, bright: true  },
  { x: 17, y: 93, r: 1.2, bright: false },
  { x: 37, y: 63, r: 0.8, bright: false },
  { x: 63, y: 83, r: 1.5, bright: true  },
  { x: 89, y: 63, r: 0.8, bright: false },
  { x: 4,  y: 29, r: 1,   bright: false },
  { x: 47, y: 4,  r: 0.8, bright: true  },
  { x: 95, y: 89, r: 1,   bright: false },
  { x: 25, y: 50, r: 0.8, bright: false },
  { x: 60, y: 38, r: 1,   bright: true  },
  { x: 82, y: 18, r: 0.8, bright: false },
  { x: 11, y: 45, r: 1.2, bright: false },
];

// Decorative tick squares scattered in the field
const TICKS: Array<{ x: number; y: number; size: number }> = [
  { x: 20, y: 22, size: 4 },
  { x: 76, y: 18, size: 4 },
  { x: 13, y: 63, size: 4 },
  { x: 84, y: 71, size: 3 },
  { x: 50, y: 96, size: 4 },
  { x: 49, y: 10, size: 3 },
  { x: 93, y: 30, size: 3 },
];

function SunIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {[0, 90, 180, 270].map((deg) => (
        <path key={deg} d="M11 1L9.75 7.2L12.25 7.2Z" fill="#D9A441"
          transform={deg ? `rotate(${deg},11,11)` : undefined} />
      ))}
      {[45, 135, 225, 315].map((deg) => (
        <path key={deg} d="M11 3.5L9.75 7.2L12.25 7.2Z" fill="#D9A441"
          transform={`rotate(${deg},11,11)`} />
      ))}
      <circle cx="11" cy="11" r="4" fill="#D9A441" />
      <circle cx="11" cy="11" r="2" fill="#F4D78B" />
    </svg>
  );
}

export default function NotFound() {
  const ringRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseRef  = useRef<{ x: number; y: number } | null>(null);
  const rafRef    = useRef<number>(0);
  const currentRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  const handleMouseLeave = () => { mouseRef.current = null; };

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      if (ringRef.current) {
        const target = mouseRef.current
          ? { x: (mouseRef.current.x - 0.5) * 14, y: (mouseRef.current.y - 0.5) * 9 }
          : { x: 0, y: 0 };
        currentRef.current.x = lerp(currentRef.current.x, target.x, 0.04);
        currentRef.current.y = lerp(currentRef.current.y, target.y, 0.04);
        ringRef.current.style.transform =
          `translate(${currentRef.current.x.toFixed(2)}px, ${currentRef.current.y.toFixed(2)}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#030609", display: "flex", flexDirection: "column" }}>
      <ResponsiveMenu />

      <Box
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          py: { xs: 8, md: 6 },
        }}
      >
        {/* ── Star field ── */}
        {STARS.map((s, i) => (
          <Box key={i} aria-hidden sx={{
            position: "absolute",
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.r * 2}px`, height: `${s.r * 2}px`,
            borderRadius: "50%",
            bgcolor: s.bright ? "rgba(244,215,139,0.9)" : "rgba(217,164,65,0.55)",
            boxShadow: s.bright ? "0 0 5px 2px rgba(217,164,65,0.35)" : "none",
            pointerEvents: "none",
          }} />
        ))}

        {/* ── Decorative tick squares ── */}
        {TICKS.map((t, i) => (
          <Box key={i} aria-hidden sx={{
            position: "absolute",
            left: `${t.x}%`, top: `${t.y}%`,
            width: `${t.size}px`, height: `${t.size}px`,
            border: "1px solid rgba(217,164,65,0.45)",
            pointerEvents: "none",
            display: { xs: i > 3 ? "none" : "block", sm: "block" },
          }} />
        ))}

        {/* ── Crosshair lines through center ── */}
        <Box aria-hidden sx={{
          position: "absolute", top: "50%", left: 0, right: 0, height: "1px",
          background: "linear-gradient(to right, transparent 0%, rgba(217,164,65,0.1) 20%, rgba(217,164,65,0.1) 80%, transparent 100%)",
          pointerEvents: "none",
        }} />
        {/* Vertical line faded to near-invisible — ring carries the weight */}
        <Box aria-hidden sx={{
          position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(217,164,65,0.02) 30%, rgba(217,164,65,0.02) 70%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* ── Corner bracket reticles ── */}
        <Box aria-hidden sx={{
          position: "absolute", top: "11%", left: "7%",
          width: "36px", height: "36px",
          borderTop: "1px solid rgba(217,164,65,0.38)",
          borderLeft: "1px solid rgba(217,164,65,0.38)",
          pointerEvents: "none", display: { xs: "none", sm: "block" },
        }} />
        <Box aria-hidden sx={{
          position: "absolute", top: "11%", right: "7%",
          width: "36px", height: "36px",
          borderTop: "1px solid rgba(217,164,65,0.38)",
          borderRight: "1px solid rgba(217,164,65,0.38)",
          pointerEvents: "none", display: { xs: "none", sm: "block" },
        }} />
        <Box aria-hidden sx={{
          position: "absolute", bottom: "11%", left: "7%",
          width: "36px", height: "36px",
          borderBottom: "1px solid rgba(217,164,65,0.38)",
          borderLeft: "1px solid rgba(217,164,65,0.38)",
          pointerEvents: "none", display: { xs: "none", sm: "block" },
        }} />
        <Box aria-hidden sx={{
          position: "absolute", bottom: "11%", right: "7%",
          width: "36px", height: "36px",
          borderBottom: "1px solid rgba(217,164,65,0.38)",
          borderRight: "1px solid rgba(217,164,65,0.38)",
          pointerEvents: "none", display: { xs: "none", sm: "block" },
        }} />

        {/* ── Right-edge reticle circle ── */}
        <Box aria-hidden sx={{
          position: "absolute", right: "9%", top: "51%",
          width: "18px", height: "18px", borderRadius: "50%",
          border: "1px solid rgba(217,164,65,0.3)",
          display: { xs: "none", md: "block" },
          pointerEvents: "none",
          "&::after": {
            content: '""', position: "absolute", inset: 0, margin: "auto",
            width: "4px", height: "4px", borderRadius: "50%",
            bgcolor: "rgba(217,164,65,0.45)",
          },
        }} />

        {/* ── Hexagon lower-left ── */}
        <Box
          aria-hidden component="svg" viewBox="0 0 24 24"
          sx={{
            position: "absolute", left: "6%", bottom: "22%",
            width: "20px", height: "20px", opacity: 0.38,
            display: { xs: "none", md: "block" }, pointerEvents: "none",
          }}
        >
          <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="none" stroke="#D9A441" strokeWidth="1.5" />
        </Box>

        {/* ── Eclipse ring + content (parallax target) ── */}
        <Box
          ref={ringRef}
          sx={{
            position: "relative",
            width: { xs: "min(68vw, 270px)", sm: "min(72vw, 450px)", md: "min(58vw, 540px)", lg: "580px" },
            aspectRatio: "1",
            willChange: "transform",
            flexShrink: 0,
          }}
        >
          {/* SVG ring — overflow visible so glow bleeds beyond bounds */}
          <Box
            component="svg"
            viewBox="0 0 600 600"
            aria-hidden
            sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
          >
            <defs>
              {/* Dim amber bottom-right → bright solar gold top-left (10-11 o'clock) */}
              <linearGradient id="nf-ring-grad" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%"   stopColor="rgba(110,65,15,0.10)" />
                <stop offset="30%"  stopColor="rgba(205,150,42,0.58)" />
                <stop offset="60%"  stopColor="rgba(238,192,72,0.88)" />
                <stop offset="84%"  stopColor="rgba(255,225,145,1)"   />
                <stop offset="100%" stopColor="rgba(255,255,220,1)"   />
              </linearGradient>

              {/* Tight glow on the ring stroke */}
              <filter id="nf-ring-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Wide soft halo behind the ring */}
              <filter id="nf-halo" x="-130%" y="-130%" width="360%" height="360%">
                <feGaussianBlur stdDeviation="30" />
              </filter>

              {/* Tight glow for the limb hot-spot */}
              <filter id="nf-spot" x="-300%" y="-300%" width="700%" height="700%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>

            {/* Wide amber atmospheric halo — brightened */}
            <circle cx="300" cy="300" r="248" fill="none"
              stroke="rgba(190,120,25,0.42)" strokeWidth="85" filter="url(#nf-halo)" />

            {/* Outer observatory ring guide */}
            <circle cx="300" cy="300" r="270" fill="none"
              stroke="rgba(217,164,65,0.08)" strokeWidth="1" />

            {/* Secondary orbit — slightly elliptical, tilted -9°, like a secondary body */}
            <ellipse cx="300" cy="300" rx="316" ry="298" fill="none"
              stroke="rgba(217,164,65,0.07)" strokeWidth="1"
              transform="rotate(-9, 300, 300)" />

            {/* Main ring — slightly wider stroke for presence */}
            <circle cx="300" cy="300" r="248" fill="none"
              stroke="url(#nf-ring-grad)" strokeWidth="2" filter="url(#nf-ring-glow)" />

            {/* ── Observatory nodes: cardinal point squares on the ring ── */}
            {/* North */}
            <rect x="297" y="49" width="6" height="6" fill="rgba(217,164,65,0.65)" />
            {/* East */}
            <rect x="545" y="297" width="6" height="6" fill="rgba(217,164,65,0.4)" />
            {/* South */}
            <rect x="297" y="545" width="6" height="6" fill="rgba(217,164,65,0.3)" />
            {/* West */}
            <rect x="49" y="297" width="6" height="6" fill="rgba(217,164,65,0.5)" />

            {/* Diagonal alignment circles at intercardinal positions */}
            <circle cx="475" cy="125" r="2.5" fill="none" stroke="rgba(217,164,65,0.35)" strokeWidth="1" />
            <circle cx="475" cy="475" r="2.5" fill="none" stroke="rgba(217,164,65,0.22)" strokeWidth="1" />
            <circle cx="125" cy="475" r="2.5" fill="none" stroke="rgba(217,164,65,0.28)" strokeWidth="1" />
            <circle cx="125" cy="125" r="2.5" fill="none" stroke="rgba(217,164,65,0.55)" strokeWidth="1" />

            {/* Cardinal outward tick marks */}
            <line x1="300" y1="41" x2="300" y2="50" stroke="rgba(217,164,65,0.5)" strokeWidth="1" />
            <line x1="550" y1="300" x2="559" y2="300" stroke="rgba(217,164,65,0.32)" strokeWidth="1" />
            <line x1="300" y1="550" x2="300" y2="559" stroke="rgba(217,164,65,0.24)" strokeWidth="1" />
            <line x1="41" y1="300" x2="50" y2="300" stroke="rgba(217,164,65,0.4)" strokeWidth="1" />

            {/* Limb hot-spot — relocated to 10:30 o'clock (upper-left orbit) */}
            <circle cx="125" cy="125" r="24" fill="rgba(255,250,220,0.92)" filter="url(#nf-spot)" />
            <circle cx="125" cy="125" r="5"  fill="rgba(255,255,250,1)" />
          </Box>

          {/* ── Content stack centered in ring ── */}
          <Box sx={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            px: { xs: 3, sm: 5, md: 6 },
            pb: { xs: "40px", sm: 0 },
          }}>
            {/* Sun icon */}
            <Box sx={{ ...anim("0.1s"), mb: { xs: 0.5, md: 0.75 }, lineHeight: 0 }}>
              <SunIcon size={18} />
            </Box>

            {/* · ERROR · */}
            <Box sx={{ ...anim("0.2s"), mb: { xs: 0.5, md: 0.75 } }}>
              <Typography sx={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 500,
                fontSize: { xs: "9px", md: "10px" },
                letterSpacing: "0.4em",
                color: "#D9A441",
                userSelect: "none",
              }}>
                · ERROR ·
              </Typography>
            </Box>

            {/* 404 */}
            <Box sx={{ ...anim("0.32s") }}>
              <Typography
                component="div"
                sx={{
                  fontFamily: "var(--font-instrument-serif), serif",
                  fontWeight: 400,
                  fontSize: { xs: "82px", sm: "108px", md: "140px", lg: "158px" },
                  lineHeight: 0.88,
                  color: "#D9A441",
                  textShadow: "0 0 50px rgba(217,164,65,0.52), 0 0 120px rgba(175,115,28,0.3)",
                  userSelect: "none",
                }}
              >
                404
              </Typography>
            </Box>

            {/* Decorative rule */}
            <Box sx={{
              ...anim("0.48s"),
              display: "flex", alignItems: "center",
              gap: { xs: 1.5, md: 2 },
              mt: { xs: 1, md: 1.5 },
              mb: { xs: 1.5, md: 2 },
            }}>
              <Box sx={{ width: { xs: 26, sm: 36, md: 44 }, height: "1px", bgcolor: "rgba(217,164,65,0.32)" }} />
              <Box component="span" sx={{ color: "#C49550", fontSize: { xs: "7px", md: "9px" }, lineHeight: 1 }}>✦</Box>
              <Box sx={{ width: { xs: 26, sm: 36, md: 44 }, height: "1px", bgcolor: "rgba(217,164,65,0.32)" }} />
            </Box>

            {/* Tagline */}
            <Typography sx={{
              ...anim("0.58s"),
              fontFamily: "var(--font-instrument-serif), serif",
              fontSize: { xs: "17px", sm: "20px", md: "24px" },
              color: "rgba(246,242,235,0.9)",
              textAlign: "center",
              lineHeight: 1.35,
              mb: { xs: 2.5, md: 3 },
            }}>
              Beyond the horizon.
            </Typography>

            {/* Return Home CTA */}
            <Box sx={{ ...anim("0.72s"), mb: { xs: 0.75, md: 1 } }}>
              <Button
                href="/"
                disableRipple
                disableElevation
                sx={{
                  background: "rgba(3,5,10,0.9)",
                  border: "1px solid rgba(217,164,65,0.52)",
                  color: "#D9A441",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 500,
                  fontSize: { xs: "12px", md: "13px" },
                  letterSpacing: "0.02em",
                  px: { xs: 1.75, md: 2.25 },
                  py: { xs: 0.9, md: 1.1 },
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  transition: "border-color 0.25s, color 0.25s, background 0.25s",
                  "&:hover": {
                    background: "rgba(217,164,65,0.07)",
                    borderColor: "rgba(217,164,65,0.82)",
                    color: "#F4D78B",
                  },
                }}
              >
                <Box sx={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: { xs: "20px", md: "22px" }, height: { xs: "20px", md: "22px" },
                  borderRadius: "50%",
                  bgcolor: "rgba(217,164,65,0.13)",
                  flexShrink: 0,
                }}>
                  <SunIcon size={11} />
                </Box>
                Return Home
              </Button>
            </Box>

          </Box>
        </Box>
      </Box>

      {/* Footer dimmed so the ring remains the hero of the composition */}
      <Box sx={{ opacity: 0.5 }}>
        <Footer />
      </Box>
    </Box>
  );
}
