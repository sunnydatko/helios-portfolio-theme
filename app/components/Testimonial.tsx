"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { testimonials } from "../helpers/config";
import testimonialAvatar from "../images/testimonial-avatar.png";

const imageMap: Record<string, StaticImageData> = {
  "testimonial-avatar": testimonialAvatar,
};

export default function Testimonial() {
  const { quote, name, title, image } = testimonials[0];
  const avatarSrc = image ? imageMap[image] : undefined;

  return (
    <Box
      component="section"
      id="testimonial"
      sx={{
        py: { xs: 10, md: 14 },
        borderTop: "1px solid rgba(217,164,65,0.12)",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "120%", md: "900px" },
          height: { xs: "120%", md: "600px" },
          background:
            "radial-gradient(circle, rgba(217,164,65,0.09), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Container sx={{ maxWidth: "560px !important", textAlign: "center", position: "relative" }}>
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
          + Recommendation
        </Typography>

        <Box className="reveal" style={{ transitionDelay: "0.1s" }}>
          <Box
            sx={{
              position: "relative",
              background: "linear-gradient(135deg, rgba(217,164,65,0.04) 0%, rgba(255,255,255,0.015) 100%)",
              border: "1px solid rgba(216,170,70,0.08)",
              borderRadius: "20px",
              p: { xs: 4, md: 6 },
            }}
          >

            <Typography
              sx={{
                color: "primary.light",
                fontFamily: "Georgia, serif",
                fontSize: { xs: "6.3rem", md: "8.4rem" },
                lineHeight: 0.5,
                mb: 5,
                userSelect: "none",
              }}
              aria-hidden
            >
              &ldquo;
            </Typography>

            <Typography
              sx={{
                color: "grey.200",
                fontSize: { xs: "19px", md: "22px" },
                lineHeight: 1.85,
                fontStyle: "italic",
                mb: 1,
              }}
            >
              {quote}
            </Typography>

            <Box
              sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5, mt: 4 }}
            >
              {avatarSrc && (
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid rgba(217,164,65,0.40)",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <Image
                    src={avatarSrc!}
                    alt={name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100px"
                  />
                </Box>
              )}
              <Box>
                <Typography
                  sx={{
                    color: "common.white",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: 15, md: 16 },
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.72)",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: { xs: 12, md: 13 },
                    letterSpacing: "0.04em",
                    mt: 0.5,
                  }}
                >
                  {title}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
