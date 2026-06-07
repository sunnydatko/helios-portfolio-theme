"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 600);
    const removeTimer = setTimeout(() => setVisible(false), 1100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        role="status"
        aria-label="Loading"
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#090807",
          zIndex: 9999,
          opacity: fading ? 0 : 1,
          transition: "opacity 0.5s ease",
          pointerEvents: fading ? "none" : "auto",
        }}
      >
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="hlsP-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff8ed" />
              <stop offset="35%" stopColor="#F4D78B" />
              <stop offset="100%" stopColor="#D9A441" />
            </radialGradient>
            <radialGradient
              id="hlsP-ray"
              cx="80"
              cy="80"
              r="60"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#F4D78B" stopOpacity="0" />
              <stop offset="22%" stopColor="#F4D78B" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#D9A441" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D9A441" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hlsP-bloom" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D9A441" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#D9A441" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#D9A441" stopOpacity="0" />
            </radialGradient>
            <filter id="hlsP-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Atmospheric bloom */}
          <circle cx="80" cy="80" r="72" fill="url(#hlsP-bloom)" className="hlsP-bloom" />

          {/* Decorative orbit ring */}
          <circle
            cx="80"
            cy="80"
            r="64"
            fill="none"
            stroke="rgba(217,164,65,0.08)"
            strokeWidth="1"
          />

          {/* Corona — slow rotation */}
          <g className="hlsP-corona">
            {/* Long rays (cardinal) */}
            <line x1="80" y1="60" x2="80" y2="22" stroke="url(#hlsP-ray)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="100" y1="80" x2="138" y2="80" stroke="url(#hlsP-ray)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="80" y1="100" x2="80" y2="138" stroke="url(#hlsP-ray)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="60" y1="80" x2="22" y2="80" stroke="url(#hlsP-ray)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Short rays (diagonal) */}
            <line x1="94" y1="66" x2="108" y2="52" stroke="url(#hlsP-ray)" strokeWidth="1" strokeLinecap="round" />
            <line x1="94" y1="94" x2="108" y2="108" stroke="url(#hlsP-ray)" strokeWidth="1" strokeLinecap="round" />
            <line x1="66" y1="94" x2="52" y2="108" stroke="url(#hlsP-ray)" strokeWidth="1" strokeLinecap="round" />
            <line x1="66" y1="66" x2="52" y2="52" stroke="url(#hlsP-ray)" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Sun halo */}
          <circle cx="80" cy="80" r="16" fill="#D9A441" filter="url(#hlsP-glow)" className="hlsP-halo" />

          {/* Sun core */}
          <circle cx="80" cy="80" r="11" fill="url(#hlsP-sun)" className="hlsP-core" />

          {/* Specular highlight */}
          <ellipse cx="75.5" cy="75" rx="3" ry="2" fill="rgba(255,250,242,0.55)" />
        </svg>

        <span
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Loading
        </span>
      </div>

      <style>{`
        .hlsP-corona {
          transform-origin: 80px 80px;
          animation: hlsPSpin 12s linear infinite;
        }
        .hlsP-core {
          transform-box: fill-box;
          transform-origin: center;
          animation: hlsPPulse 3s ease-in-out infinite;
        }
        .hlsP-halo {
          transform-box: fill-box;
          transform-origin: center;
          animation: hlsPHalo 3s ease-in-out infinite;
        }
        .hlsP-bloom {
          animation: hlsPBloom 4s ease-in-out infinite;
        }
        @keyframes hlsPSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes hlsPPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes hlsPHalo {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.5); opacity: 0.85; }
        }
        @keyframes hlsPBloom {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hlsP-corona, .hlsP-core, .hlsP-halo, .hlsP-bloom {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
