"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"

import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import PortfolioSection from "@/components/PortfolioSection"
import ContactSection from "@/components/ContactSection"
import BranchPanel from "@/components/BranchPanel"
import AboutBranch from "@/components/AboutBranch"
import ProjectBranch from "@/components/ProjectBranch"
import FixedNav from "@/components/FixedNav"
import MiniSphere from "@/components/MiniSphere"
import { Waves } from "@/components/Waves"

type BranchId = "about" | "drone" | "vlsi" | "adder" | "otft" | null
type LoopPhase = "idle" | "covering" | "uncovering"

const SECTION_COLORS: Record<string, string> = {
  about:     "#6B21A8",
  portfolio: "#06B6D4",
  contact:   "#EC4899",
}

export default function Home() {
  const [pastHero,     setPastHero]     = useState(false)
  const [activeBranch, setActiveBranch] = useState<BranchId>(null)
  const [waveColor,    setWaveColor]    = useState("#6B21A8")
  const [loopPhase,    setLoopPhase]    = useState<LoopPhase>("idle")

  const heroRef      = useRef<HTMLDivElement>(null)
  const aboutRef     = useRef<HTMLElement>(null)
  const portfolioRef = useRef<HTMLElement>(null)
  const contactRef   = useRef<HTMLElement>(null)
  const sentinelRef  = useRef<HTMLDivElement>(null)
  const isLoopingRef = useRef(false)

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

  // ── Section color tracking ────────────────────────────────────────────────
  useEffect(() => {
    const pairs: [React.RefObject<HTMLElement | null>, string][] = [
      [aboutRef,     SECTION_COLORS.about],
      [portfolioRef, SECTION_COLORS.portfolio],
      [contactRef,   SECTION_COLORS.contact],
    ]

    const observers = pairs.map(([ref, color]) => {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setWaveColor(color) },
        { threshold: 0.35 }
      )
      if (ref.current) obs.observe(ref.current)
      return obs
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // ── Infinite carousel sentinel ────────────────────────────────────────────
  const triggerLoop = useCallback(async () => {
    if (isLoopingRef.current) return
    isLoopingRef.current = true

    setLoopPhase("covering")
    await new Promise<void>((r) => setTimeout(r, 650))

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
      ([e]) => { if (e.isIntersecting) triggerLoop() },
      { threshold: 0.8 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [triggerLoop])

  // ── Helpers ───────────────────────────────────────────────────────────────
  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <div ref={heroRef}>
        <HeroSection />
      </div>

      <AboutSection
        sectionRef={aboutRef}
        onOpenBranch={() => setActiveBranch("about")}
      />
      <PortfolioSection
        sectionRef={portfolioRef}
        onOpenBranch={(id) => setActiveBranch(id)}
      />
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
          strokeColor={waveColor}
          backgroundColor="transparent"
          pointerSize={0}
        />
      </div>

      {/* ── Persistent mini sphere (fixed top-left) ───────────────────────── */}
      <AnimatePresence>
        {pastHero && loopPhase === "idle" && (
          <motion.div
            key="mini-sphere"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
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

      {/* ── Branch panels ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeBranch && (
          <BranchPanel
            key={activeBranch}
            onClose={() => setActiveBranch(null)}
          >
            {activeBranch === "about" ? (
              <AboutBranch />
            ) : (
              <ProjectBranch projectId={activeBranch} />
            )}
          </BranchPanel>
        )}
      </AnimatePresence>

      {/* ── Infinite carousel transition overlay ─────────────────────────── */}
      {loopPhase !== "idle" && (
        <motion.div
          key="loop-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: loopPhase === "covering" ? 1 : 0 }}
          transition={{ duration: 0.5 }}
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
          {/* Full sphere as transition visual */}
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
