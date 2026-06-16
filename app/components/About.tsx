"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { SiReact, SiTypescript, SiJavascript } from "react-icons/si";
import { MdAccessibility } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";

const skills = [
  { label: "React", Icon: SiReact },
  { label: "React Native", Icon: FaMobileAlt },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "JavaScript", Icon: SiJavascript },
  { label: "Accessibility", Icon: MdAccessibility },
];

export default function About() {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 10, md: 14 },
        position: "relative",
        zIndex: 1,
        background:
          "radial-gradient(ellipse 80% 55% at 50% 40%, rgba(217,164,65,0.07) 0%, transparent 70%)",
      }}
    >
      <Container
        sx={{
          textAlign: "center",
          maxWidth: "860px !important",
        }}
      >
        <Typography
          component="span"
          className="reveal"
          sx={{
            display: "block",
            color: "primary.light",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 600,
            fontSize: { xs: 12.5, md: 14 },
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          + About Me
        </Typography>

        <Typography className="reveal" style={{ transitionDelay: "0.1s" }} variant="h3" sx={{ mb: 4 }}>
          Turning product ideas into polished user experiences
        </Typography>

        <Typography
          className="reveal"
          style={{ transitionDelay: "0.2s" }}
          sx={{
            color: "grey.300",
            fontSize: { xs: "17px", md: "21px" },
            lineHeight: 1.7,
            mb: 5,
          }}
        >
          I'm a Senior Software Engineer with a passion for building scalable products, thoughtful design systems, and user experiences that feel effortless to use. I enjoy working across product, design, and engineering to turn ideas into polished, maintainable solutions.
        </Typography>

        <Box
          className="reveal"
          style={{ transitionDelay: "0.3s" }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 3, md: 4 },
            justifyContent: "center",
          }}
        >
          {skills.map(({ label, Icon }) => (
            <Box
              key={label}
              title={label}
              sx={{
                opacity: 0.3,
                transition: "opacity 0.2s ease",
                "&:hover": { opacity: 0.65 },
              }}
            >
              <Icon size={22} color="white" />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
