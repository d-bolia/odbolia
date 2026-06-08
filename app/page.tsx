"use client"

import { useRef, useState, useEffect } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
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

if (typeof window !== "undefined") {
  history.scrollRestoration = "manual"
}

const WAVE_GRADIENT = [
  { color: "#15803D", offset: 0    },
  { color: "#06B6D4", offset: 0.25 },
  { color: "#6B21A8", offset: 0.5  },
  { color: "#EC4899", offset: 1    },
]

// 4 equal-height sections → each occupies 1/3 of the total scroll range
// (max scroll = 3 × 100dvh; each section scrolled over in 1/3 of that)
const S0 = 0
const S1 = 1 / 3
const S2 = 2 / 3
const S3 = 1

export default function Home() {
  const [pastHero,   setPastHero]   = useState(false)
  const [branchOpen, setBranchOpen] = useState(false)

  const aboutRef   = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // ── Scroll-driven transforms ──────────────────────────────────────────────
  const { scrollYProgress } = useScroll()

  const heroScale            = useTransform(scrollYProgress, [S0, S1], [1,     0.94])
  const heroBorderRadius     = useTransform(scrollYProgress, [S0, S1], ["0px", "12px"])

  const aboutScale           = useTransform(scrollYProgress, [S1, S2], [1,     0.94])
  const aboutBorderRadius    = useTransform(scrollYProgress, [S1, S2], ["0px", "12px"])

  const projectScale         = useTransform(scrollYProgress, [S2, S3], [1,     0.94])
  const projectBorderRadius  = useTransform(scrollYProgress, [S2, S3], ["0px", "12px"])

  // ── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => { window.scrollTo(0, 0) }, [])

  // ── pastHero: scroll-based (IO doesn't work on sticky-pinned elements) ────
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.15)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToHero = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <>
      {/* ── Hero — sticky card 1 ─────────────────────────────────────────── */}
      <motion.div
        style={{
          position:        "sticky",
          top:             0,
          height:          "100dvh",
          zIndex:          1,
          overflow:        "hidden",
          scale:           heroScale,
          borderRadius:    heroBorderRadius,
          transformOrigin: "50% 0%",
        }}
      >
        <HeroSection pastHero={pastHero} />
      </motion.div>

      {/* ── Profile — sticky card 2 ───────────────────────────────────────── */}
      <motion.div
        style={{
          position:        "sticky",
          top:             0,
          height:          "100dvh",
          zIndex:          2,
          overflow:        "hidden",
          scale:           aboutScale,
          borderRadius:    aboutBorderRadius,
          transformOrigin: "50% 0%",
        }}
      >
        <AboutSection
          sectionRef={aboutRef}
          onOpenBranch={() => setBranchOpen(true)}
          branchOpen={branchOpen}
        />
      </motion.div>

      {/* ── Projects — sticky card 3 ──────────────────────────────────────── */}
      <motion.div
        style={{
          position:        "sticky",
          top:             0,
          height:          "100dvh",
          zIndex:          3,
          overflow:        "hidden",
          scale:           projectScale,
          borderRadius:    projectBorderRadius,
          transformOrigin: "50% 0%",
        }}
      >
        <Projects />
      </motion.div>

      {/* ── Contact — sticky card 4 (last, no scale-back) ─────────────────── */}
      <div
        style={{
          position: "sticky",
          top:      0,
          height:   "100dvh",
          zIndex:   4,
          overflow: "hidden",
        }}
      >
        <ContactSection sectionRef={contactRef} />
      </div>

      {/* ── Global Waves background ───────────────────────────────────────── */}
      <div
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        5,
          pointerEvents: "none",
          opacity:       pastHero ? 0.35 : 0,
          transition:    "opacity 0.6s ease",
        }}
      >
        <Waves
          gradientColors={WAVE_GRADIENT}
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
              position:     "fixed",
              top:          16,
              left:         16,
              width:        52,
              height:       52,
              cursor:       "pointer",
              zIndex:       200,
              borderRadius: "50%",
              overflow:     "hidden",
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
            style={{ zIndex: 150 }}
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
              position:       "fixed",
              bottom:         24,
              right:          24,
              zIndex:         200,
              display:        "flex",
              alignItems:     "center",
              gap:            "0.4rem",
              padding:        "0.45rem 0.85rem",
              background:     "rgba(10,10,10,0.85)",
              border:         "1px solid rgba(244,114,182,0.3)",
              borderRadius:   8,
              color:          "#f472b6",
              fontFamily:     "var(--font-mono), monospace",
              fontSize:       "0.72rem",
              letterSpacing:  "0.1em",
              cursor:         "pointer",
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
