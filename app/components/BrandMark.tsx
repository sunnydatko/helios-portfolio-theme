"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type BrandMarkProps = {
  starSize?: number;
  fontSize?: number;
};

function HeliosSunIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {[0, 90, 180, 270].map((deg) => (
        <path
          key={deg}
          d="M11 1L9.75 7.2L12.25 7.2Z"
          fill="#D9A441"
          transform={deg ? `rotate(${deg},11,11)` : undefined}
        />
      ))}
      {[45, 135, 225, 315].map((deg) => (
        <path
          key={deg}
          d="M11 3.5L9.75 7.2L12.25 7.2Z"
          fill="#D9A441"
          transform={`rotate(${deg},11,11)`}
        />
      ))}
      <circle cx="11" cy="11" r="4" fill="#D9A441" />
      <circle cx="11" cy="11" r="2" fill="#F4D78B" />
    </svg>
  );
}

export default function BrandMark({ starSize = 22, fontSize = 16 }: BrandMarkProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <HeliosSunIcon size={starSize} />
      <Typography
        component="span"
        sx={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 700,
          fontSize,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "common.white",
          lineHeight: 1,
        }}
      >
        Alex Parker
      </Typography>
    </Box>
  );
}
