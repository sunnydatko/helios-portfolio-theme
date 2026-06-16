"use client";

import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import BrandMark from "./BrandMark";

const drawerWidth = 320;

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
  { name: "Blog", href: "/#blog" },
];

export default function ResponsiveMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", pt: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <BrandMark starSize={20} fontSize={15} />
      </Box>
      <Divider />
      <List>
        {[...navItems, { name: "Contact", href: "/#contact" }].map(({ name, href }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              component="a"
              href={href}
              sx={{ textAlign: "center" }}
            >
              <ListItemText
                primary={name}
                slotProps={{
                  primary: {
                    sx: {
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontSize: 13,
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        component="nav"
        elevation={0}
        position="fixed"
        sx={{
          backgroundColor: scrolled ? "rgba(8,13,26,0.60)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition: "background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
          zIndex: 1100,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open navigation"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "common.white", mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Link
            href="/"
            aria-label="Home"
            underline="none"
            sx={{
              paddingBottom: 0,
              "&::before": { display: "none" },
              opacity: 0.7,
              transition: "opacity 0.2s ease",
              "&:hover": { opacity: 1 },
            }}
          >
            <BrandMark starSize={22} fontSize={16} />
          </Link>

          <Box sx={{ ml: "auto", display: { xs: "none", sm: "flex" }, gap: 0.5 }}>
            {navItems.map(({ name, href }) => (
              <Button
                key={name}
                href={href}
                sx={{
                  color: "grey.300",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  letterSpacing: "0.04em",
                  px: 2,
                  "&:hover": { color: "common.white", backgroundColor: "transparent" },
                }}
                variant="text"
              >
                {name}
              </Button>
            ))}
            <Button
              href="/#contact"
              variant="contained"
              sx={{ ml: 1.5, px: 2.5, fontSize: 14 }}
            >
              Contact Me
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "background.paper",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
