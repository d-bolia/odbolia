"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"

import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import Projects from "@/components/Projects"
import ContactSection from "@/components/ContactSection"
import BranchPanel from "@/components/BranchPanel"
import AboutBranch from "@/components/AboutBranch"
import FixedNav from "@/components/FixedNav"
import MiniSphere from "@/components/MiniSphere"
import { Waves } from "@/components/Waves"

// Disable browser scroll restoration so refresh always starts at the top
if (typeof window !== "undefined") {
  history.scrollRestoration = "manual"
}

type LoopPhase = "idle" | "covering" | "uncovering"

const WAVE_GRADIENT = [
  { color: "#15803D", offset: 0    },
  { color: "#06B6D4", offset: 0.25 },
  { color: "#6B21A8", offset: 0.5  },
  { color: "#EC4899", offset: 1    },
]

export default function Home() {
  const [pastHero,      setPastHero]      = useState(false)
  const [branchOpen,    setBranchOpen]    = useState(false)
  const [loopPhase,     setLoopPhase]     = useState<LoopPhase>("idle")

  const heroRef      = useRef<HTMLDivElement>(null)
  const aboutRef     = useRef<HTMLElement>(null)
  const contactRef   = useRef<HTMLElement>(null)
  const sentinelRef  = useRef<HTMLDivElement>(null)
  const isLoopingRef       = useRef(false)
  const sentinelVisibleRef = useRef(false)
  const touchStartYRef     = useRef(0)

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

  // ── Infinite carousel sentinel ────────────────────────────────────────────
  const triggerLoop = useCallback(async () => {
    if (isLoopingRef.current) return
    isLoopingRef.current = true

    setLoopPhase("covering")
    await new Promise<void>((r) => setTimeout(r, 1200))

    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    setPastHero(false)

    setLoopPhase("uncovering")
  }, [])

  const handleLoopDone = useCallback(() => {
    setLoopPhase("idle")
    isLoopingRef.current = false
  }, [])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([e]) => { sentinelVisibleRef.current = e.isIntersecting },
      { threshold: 0.5 }
    )
    obs.observe(el)

    const onWheel = (e: WheelEvent) => {
      if (sentinelVisibleRef.current && e.deltaY > 0) triggerLoop()
    }
    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (!sentinelVisibleRef.current) return
      const delta = touchStartYRef.current - e.changedTouches[0].clientY
      if (delta > 30) triggerLoop()
    }

    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      obs.disconnect()
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [triggerLoop])

  // ── Helpers ───────────────────────────────────────────────────────────────
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

      {/* Invisible sentinel that triggers the carousel loop */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {/* ── Global Waves background (fixed, post-hero) ────────────────────── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: pastHero && loopPhase === "idle" ? 0.35 : 0,
          transition: "opacity 0.6s ease",
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
        {pastHero && loopPhase === "idle" && (
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
        {pastHero && loopPhase === "idle" && (
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

      {/* ── About / Career Journey branch panel ───────────────────────────── */}
      <AnimatePresence>
        {branchOpen && (
          <BranchPanel
            key="about-branch"
            onClose={() => setBranchOpen(false)}
          >
            <AboutBranch />
          </BranchPanel>
        )}
      </AnimatePresence>

      {/* ── Infinite carousel transition overlay ─────────────────────────── */}
      {loopPhase !== "idle" && (
        <motion.div
          key="loop-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: loopPhase === "covering" ? 1 : 0 }}
          transition={{
            duration: loopPhase === "covering" ? 0.9 : 1.1,
            ease: "easeInOut",
          }}
          onAnimationComplete={
            loopPhase === "uncovering" ? handleLoopDone : undefined
          }
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "#0a0a0a",
            pointerEvents: "all",
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 6.5], fov: 55 }}
            gl={{ antialias: true, alpha: false }}
            style={{ background: "#0a0a0a", width: "100%", height: "100%" }}
          >
            <MiniSphere />
          </Canvas>
        </motion.div>
      )}
    </>
  )
}
