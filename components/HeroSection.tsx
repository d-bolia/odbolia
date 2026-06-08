"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion"
import SunSphere from "./SunSphere"
import BinaryReveal from "./BinaryReveal"

// ---------------------------------------------------------------------------
// Icons
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
// HeroSection
// ---------------------------------------------------------------------------

interface HeroSectionProps {
  pastHero?: boolean
}

export default function HeroSection({ pastHero = false }: HeroSectionProps) {
  const [introScale, setIntroScale] = useState(0.05)
  const rafRef = useRef<number | null>(null)

  // Explicit pixel dimensions so R3F receives a definite size from the start
  const [vpW, setVpW] = useState(() => (typeof window !== "undefined" ? window.innerWidth  : 0))
  const [vpH, setVpH] = useState(() => (typeof window !== "undefined" ? window.innerHeight : 0))

  useEffect(() => {
    function onResize() { setVpW(window.innerWidth); setVpH(window.innerHeight) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Grow-in: sphere scales from 5% → 100% over 900 ms
  useEffect(() => {
    const DURATION  = 900
    const START     = 0.05
    const startTime = performance.now()

    function tick(now: number) {
      const t    = Math.min(1, (now - startTime) / DURATION)
      const ease = 1 - Math.pow(1 - t, 3)
      setIntroScale(START + (1 - START) * ease)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setIntroScale(1)
        rafRef.current = null
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <main
      style={{
        position:        "relative",
        width:           "100%",
        height:          "100%",
        background:      "#0a0a0a",
        overflow:        "hidden",
      }}
    >
      {/* ── Sphere canvas — explicit pixel fill so R3F gets a definite size ─── */}
      <div
        style={{
          position:        "absolute",
          top:             0,
          left:            0,
          width:           vpW || "100%",
          height:          vpH || "100%",
          transform:       `scale(${introScale})`,
          transformOrigin: "50% 50%",
          pointerEvents:   "none",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <SunSphere />
        </Canvas>
      </div>

      {/* ── Top-right nav ────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position:    "absolute",
          top:         28,
          right:       32,
          display:     "flex",
          alignItems:  "center",
          gap:         24,
          zIndex:      10,
        }}
      >
        <NavLink href="https://github.com/desmondbolia" label="GitHub">
          <GitHubIcon />
        </NavLink>
        <NavLink href="https://linkedin.com/in/desmondbolia" label="LinkedIn">
          <LinkedInIcon />
        </NavLink>
      </motion.nav>

      {/* ── Name + title — top-left overlay ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        style={{
          position:      "absolute",
          top:           28,
          left:          32,
          zIndex:        10,
          pointerEvents: "none",
          userSelect:    "none",
          display:       "flex",
          flexDirection: "column",
          gap:           "0.6rem",
        }}
      >
        <h1
          style={{
            fontFamily:    "var(--font-mono), monospace",
            textTransform: "uppercase",
            fontWeight:    700,
            fontSize:      "clamp(1.6rem, 3.5vw, 3rem)",
            letterSpacing: "0.12em",
            lineHeight:    1,
            color:         "#e8e8e8",
            margin:        0,
            whiteSpace:    "nowrap",
          }}
        >
          <BinaryReveal text="DESMOND BOLIA" startDelay={1000} totalDuration={3000} />
        </h1>
        <p
          style={{
            fontFamily:    "var(--font-mono), monospace",
            textTransform: "uppercase",
            fontWeight:    300,
            fontSize:      "clamp(0.65rem, 1.2vw, 0.95rem)",
            letterSpacing: "0.38em",
            color:         "rgba(232,232,232,0.4)",
            margin:        0,
          }}
        >
          <BinaryReveal text="ELECTRICAL ENGINEER" startDelay={2600} totalDuration={1800} />
        </p>
      </motion.div>
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
        color:      "rgba(232,232,232,0.4)",
        display:    "flex",
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
