"use client"

import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion"
import SunSphere from "./SunSphere"

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Shared type token — Geist Mono base
const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  textTransform: "uppercase",
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export default function HeroSection() {
  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100dvh",
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      {/* ---- Full-screen canvas so pointer tracks over the entire page ---- */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
          style={{ background: "#0a0a0a" }}
        >
          <SunSphere />
        </Canvas>
      </div>

      {/* ---- Top-right nav ---- */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: "absolute",
          top: 28,
          right: 32,
          display: "flex",
          alignItems: "center",
          gap: 24,
          zIndex: 10,
        }}
      >
        <NavLink href="https://github.com/desmondbolia" label="GitHub">
          <GitHubIcon />
        </NavLink>
        <NavLink href="https://linkedin.com/in/desmondbolia" label="LinkedIn">
          <LinkedInIcon />
        </NavLink>
      </motion.nav>

      {/* ---- Name + title — pinned to lower portion ---- */}
      <div
        style={{
          position: "absolute",
          bottom: "11%",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {/* h1 — heading: semibold (600), all-caps, tight tracking, rounded Geist forms */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...MONO,
            fontWeight: 600,
            fontSize: "clamp(1.6rem, 4.5vw, 3.8rem)",
            letterSpacing: "0.14em",
            lineHeight: 1,
            color: "#e8e8e8",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          Desmond Bolia
        </motion.h1>

        {/* subheading — light (300), all-caps, wide tracking */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...MONO,
            fontWeight: 300,
            fontSize: "clamp(0.55rem, 1.1vw, 0.78rem)",
            letterSpacing: "0.42em",
            color: "rgba(232,232,232,0.35)",
            marginTop: "1rem",
          }}
        >
          Electrical Engineer
        </motion.p>
      </div>
    </main>
  )
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function NavLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        color: "rgba(232,232,232,0.4)",
        display: "flex",
        alignItems: "center",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(232,232,232,0.9)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,232,232,0.4)")}
    >
      {children}
    </a>
  )
}
