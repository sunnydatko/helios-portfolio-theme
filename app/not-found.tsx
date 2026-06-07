"use client";

import { useRef, useEffect } from "react";
import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ResponsiveMenu from "./components/ResponsiveMenu";
import Footer from "./components/Footer";
import notFoundBg from "./images/not-found-2.png";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0px); }
`;

// Red channel — clips to horizontal slices and shifts left during burst
const glitch1 = keyframes`
  0%, 80%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
  82%  { clip-path: inset(8%  0 54% 0); transform: translate(-6px); }
  84%  { clip-path: inset(62% 0 16% 0); transform: translate(6px);  }
  86%  { clip-path: inset(28% 0 58% 0); transform: translate(-4px); }
  88%  { clip-path: inset(78% 0  6% 0); transform: translate(5px);  }
  90%  { clip-path: inset(44% 0 38% 0); transform: translate(-6px); }
`;

// Cyan channel — interleaved slices, shifts right
const glitch2 = keyframes`
  0%, 80%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
  83%  { clip-path: inset(52% 0 28% 0); transform: translate(6px);  }
  85%  { clip-path: inset(18% 0 64% 0); transform: translate(-6px); }
  87%  { clip-path: inset(72% 0 10% 0); transform: translate(4px);  }
  89%  { clip-path: inset(34% 0 48% 0); transform: translate(-5px); }
  91%  { clip-path: inset(0  0 100% 0); transform: translate(0);    }
`;

// Power-flicker synced to the glitch window
const flicker = keyframes`
  0%, 92%, 100% { opacity: 1;    }
  93%           { opacity: 0.75; }
  94%           { opacity: 1;    }
  95%           { opacity: 0.45; }
  96%           { opacity: 1;    }
`;

const anim = (delay: string) => ({
  animation: `${fadeUp} 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay} forwards`,
  opacity: 0,
  "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 1 },
});

export default function NotFound() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
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
      if (bgRef.current) {
        const target = mouseRef.current
          ? { x: (mouseRef.current.x - 0.5) * 18, y: (mouseRef.current.y - 0.5) * 10 }
          : { x: 0, y: 0 };

        currentRef.current.x = lerp(currentRef.current.x, target.x, 0.04);
        currentRef.current.y = lerp(currentRef.current.y, target.y, 0.04);

        bgRef.current.style.transform =
          `scale(1.07) translate(${currentRef.current.x.toFixed(2)}px, ${currentRef.current.y.toFixed(2)}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#040810", display: "flex", flexDirection: "column" }}>
      <ResponsiveMenu />

      <Box
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image — parallax driven by RAF loop */}
        <Box
          ref={bgRef}
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${notFoundBg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            opacity: 0.9,
            transform: "scale(1.07)",
            willChange: "transform",
          }}
        />

        {/* Gradient overlay — darkens top & bottom, preserves planet glow */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(4,8,16,0.55) 0%, rgba(4,8,16,0.08) 50%, rgba(4,8,16,0.35) 100%)",
            zIndex: 1,
          }}
        />

        {/* Horizon focal point — amplifies the glow origin in the photo */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            bottom: "18%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 4,
            borderRadius: "50%",
            bgcolor: "rgba(180,210,255,0.9)",
            boxShadow: "0 0 12px 4px rgba(77,130,245,0.5), 0 0 40px 12px rgba(77,130,245,0.18)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* CRT scanlines — reinforce the "lost signal" vibe */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        <Container sx={{ position: "relative", zIndex: 3, py: { xs: 10, md: 12 } }}>
          <Box sx={{ maxWidth: 560, mx: "auto", textAlign: "center" }}>

            {/* Glitch 404 */}
            <Box sx={{ ...anim("0.2s"), mb: { xs: 2, md: 3 } }}>
              <Typography
                component="div"
                sx={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "140px", md: "220px" },
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  userSelect: "none",
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(59,130,246,0.65)",
                  position: "relative",
                  animation: `${flicker} 5s infinite 1.2s`,
                  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                  "&::before": {
                    content: '"404"',
                    position: "absolute",
                    inset: 0,
                    color: "transparent",
                    WebkitTextStroke: "2px rgba(255,50,100,0.8)",
                    animation: `${glitch1} 5s infinite`,
                    "@media (prefers-reduced-motion: reduce)": { display: "none" },
                  },
                  "&::after": {
                    content: '"404"',
                    position: "absolute",
                    inset: 0,
                    color: "transparent",
                    WebkitTextStroke: "2px rgba(0,220,255,0.8)",
                    animation: `${glitch2} 5s infinite 0.04s`,
                    "@media (prefers-reduced-motion: reduce)": { display: "none" },
                  },
                }}
              >
                404
              </Typography>
            </Box>

            {/* Accent rule */}
            <Box
              sx={{
                ...anim("0.45s"),
                width: 48,
                height: 3,
                borderRadius: 2,
                bgcolor: "primary.main",
                mx: "auto",
                mb: { xs: 3, md: 4 },
              }}
            />

            {/* Heading */}
            <Typography
              variant="h2"
              sx={{
                ...anim("0.6s"),
                fontSize: { xs: "22px", md: "26px" },
                color: "common.white",
                mb: 2,
              }}
            >
              Signal Lost
            </Typography>

            {/* Body */}
            <Typography
              sx={{
                ...anim("0.8s"),
                color: "grey.400",
                fontSize: { xs: 15, md: 16 },
                lineHeight: 1.7,
                mb: { xs: 5, md: 6 },
              }}
            >
              Your transmission didn&apos;t reach its destination. This page has drifted beyond known coordinates.
            </Typography>

            {/* CTA */}
            <Box sx={{ ...anim("1.0s") }}>
              <Button
                href="/"
                sx={{
                  fontSize: { xs: 15, md: 16 },
                  px: 3.5,
                  py: 1.4,
                  "& .arrow": { ml: 1.5, transition: "transform 0.3s" },
                  "&:hover .arrow": { transform: "translateX(4px)" },
                }}
              >
                Return to Base
                <Box component="span" className="arrow" aria-hidden>
                  {" "}→
                </Box>
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
