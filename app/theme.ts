"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#F4D78B",
      main: "#D9A441",
      dark: "#8F6424",
    },
    secondary: {
      light: "#FFE8C2",
      main: "#D6B887",
      dark: "#8C7047",
    },
    error: {
      light: "#D98F7A",
      main: "#B85B46",
      dark: "#7A372C",
    },
    background: {
      default: "#080d1a",
      paper: "#0d1220",
    },
    text: {
      primary: "#F6F2EB",
      secondary: "#C4B8A8",
    },
    grey: {
      100: "#F7F3ED",
      200: "#E5DED3",
      300: "#CFC3B2",
      400: "#A99B89",
      500: "#7A6E61",
      600: "#5A5148",
      700: "#3B3531",
      800: "#1D1A19",
      900: "#090807",
    },
  },
  typography: {
    fontFamily: "var(--font-inter), sans-serif",
    h1: {
      fontFamily: "var(--font-instrument-serif), serif",
      fontWeight: 400,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: "var(--font-instrument-serif), serif",
      fontWeight: 400,
    },
    h3: {
      fontFamily: "var(--font-instrument-serif), serif",
      fontWeight: 400,
    },
    h4: {
      fontFamily: "var(--font-instrument-serif), serif",
      fontWeight: 400,
    },
    h5: {
      fontFamily: "var(--font-instrument-serif), serif",
      fontWeight: 400,
    },
    h6: {
      fontFamily: "var(--font-instrument-serif), serif",
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: "contained", disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 4,
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 500,
        },
      },
    },
    MuiLink: {
      defaultProps: { underline: "none" },
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "#D9A441",
          transition: "color 0.3s",
          position: "relative",
          paddingBottom: "3px",
          "&::before": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "2px",
            borderRadius: "4px",
            backgroundColor: "#F4D78B",
            transformOrigin: "right",
            transform: "scaleX(0)",
            transition: "transform 0.3s ease-in-out",
          },
          "&:hover": {
            color: "#F4D78B",
            "&::before": {
              transformOrigin: "left",
              transform: "scaleX(1)",
            },
          },
        },
      },
    },
  },
});

export default theme;
