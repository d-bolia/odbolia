"use client"

import { useRef, useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"

import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import Projects from "@/components/Projects"
import Timeline from "@/components/Timeline"
import ContactSection from "@/components/ContactSection"
import BranchPanel from "@/components/BranchPanel"
import FixedNav from "@/components/FixedNav"
import MiniSphere from "@/components/MiniSphere"
import { Waves } from "@/components/Waves"

// Disable browser scroll restoration so refresh always starts at the top
if (typeof window !== "undefined") {
  history.scrollRestoration = "manual"
}

export default function Home() {
  const [pastHero,   setPastHero]   = useState(false)
  const [branchOpen, setBranchOpen] = useState(false)

  const heroRef    = useRef<HTMLDivElement>(null)
  const aboutRef   = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Force scroll to top before any scroll-driven transforms initialize
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // ── Hero exit detection ───────────────────────────────────────────────────
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting),
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <div ref={heroRef}>
        <HeroSection pastHero={pastHero} />
      </div>

      <AboutSection
        sectionRef={aboutRef}
        onOpenBranch={() => setBranchOpen(true)}
        branchOpen={branchOpen}
      />
      <Projects />
      <ContactSection sectionRef={contactRef} />

      {/* ── Global Waves background (fixed, post-hero) ────────────────────── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: pastHero ? 0.35 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <Waves
          gradientColors={[
            { color: "#15803D", offset: 0    },
            { color: "#06B6D4", offset: 0.25 },
            { color: "#6B21A8", offset: 0.5  },
            { color: "#EC4899", offset: 1    },
          ]}
          backgroundColor="transparent"
          pointerSize={0}
        />
      </div>

      {/* ── Persistent mini sphere (fixed top-left) ───────────────────────── */}
      <AnimatePresence>
        {pastHero && (
          <motion.div
            key="mini-sphere"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToHero}
            title="Return to top"
            style={{
              position: "fixed",
              top: 16,
              left: 16,
              width: 52,
              height: 52,
              cursor: "pointer",
              zIndex: 100,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 4.2], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              style={{ width: "100%", height: "100%" }}
            >
              <MiniSphere />
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Persistent nav icons (fixed top-right) ────────────────────────── */}
      <AnimatePresence>
        {pastHero && (
          <motion.div
            key="fixed-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ zIndex: 50 }}
          >
            <FixedNav />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Return to Top button (fixed bottom-right) ─────────────────────── */}
      <AnimatePresence>
        {pastHero && (
          <motion.button
            key="return-to-top"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToHero}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.85rem",
              background: "rgba(10,10,10,0.85)",
              border: "1px solid rgba(244,114,182,0.3)",
              borderRadius: 8,
              color: "#f472b6",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
            }}
          >
            ↑ Top
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── About / Career Journey branch panel ───────────────────────────── */}
      <AnimatePresence>
        {branchOpen && (
          <BranchPanel
            key="about-branch"
            onClose={() => setBranchOpen(false)}
          >
            <Timeline />
          </BranchPanel>
        )}
      </AnimatePresence>
    </>
  )
}
