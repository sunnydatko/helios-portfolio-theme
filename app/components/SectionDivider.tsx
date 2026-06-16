import Box from "@mui/material/Box";

export default function SectionDivider() {
  return (
    <Box
      aria-hidden
      className="reveal"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        maxWidth: 480,
        mx: "auto",
        px: { xs: 4, md: 6 },
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(217,164,65,0.30) 100%)",
        }}
      />
      <Box
        component="svg"
        viewBox="0 0 16 16"
        sx={{ width: 10, height: 10, flexShrink: 0, opacity: 0.5 }}
        aria-hidden
      >
        <path
          d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z"
          fill="rgba(217,164,65,0.8)"
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(270deg, transparent 0%, rgba(217,164,65,0.30) 100%)",
        }}
      />
    </Box>
  );
}
