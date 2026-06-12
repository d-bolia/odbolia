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

// Scroll-range layout (in progress units, 0 → 1):
//   Hero OUTER is 200dvh tall (everyone else is 100dvh), so the hero-pinned
//   phase splits in two: a hero-only sub-phase where the name/title text can
//   fully exit, then the profile slide-in. Total document = 500dvh, scrollable
//   range = 400dvh, mapped linearly to scrollYProgress.
//
//     0   ──────────── HERO_END (0.25) ──── S1 (0.5) ──── S2 (0.75) ──── S3 (1)
//     │                  │                    │              │              │
//     │ hero-only (text  │ profile slides     │ projects     │ contact      │
//     │ exits here)      │ in over hero       │ slides in    │ slides in    │
const S0       = 0
const HERO_END = 0.25
const S1       = 0.5
const S2       = 0.75
const S3       = 1

// Outer sticky div: plain div — no transforms, so position:sticky works reliably.
// Inner motion.div: carries the scroll-driven scale. Keeps transforms off the
// sticky element to avoid browser quirks with sticky + transform interaction.
const OUTER: React.CSSProperties = {
  position: "sticky",
  top:      0,
  width:    "100%",
  height:   "100dvh",
  overflow: "hidden",
  background: "#0a0a0a",
}

// Hero is twice as tall so its sticky pin lasts an extra viewport-height —
// that extra 100dvh of scroll is what the text exit owns, before the profile
// section's flow position reaches the viewport bottom.
const HERO_OUTER: React.CSSProperties = {
  ...OUTER,
  height: "200dvh",
}

const INNER: React.CSSProperties = {
  width:           "100%",
  height:          "100%",
  transformOrigin: "top center",
}

export default function Home() {
  const [pastHero,       setPastHero]       = useState(false)
  const [profileDocked,  setProfileDocked]  = useState(false)
  const [branchOpen,     setBranchOpen]     = useState(false)

  const aboutRef   = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // ── Scroll-driven transforms ──────────────────────────────────────────────
  const { scrollYProgress } = useScroll()

  // Hero scale/radius only animate during the profile slide-in window
  // (HERO_END → S1) — during the prior hero-only sub-phase the hero stays
  // at full size while the text exits.
  const heroScale    = useTransform(scrollYProgress, [HERO_END, S1], [1,     0.94])
  const aboutScale   = useTransform(scrollYProgress, [S1, S2],       [1,     0.94])
  const projectScale = useTransform(scrollYProgress, [S2, S3],       [1,     0.94])

  const heroRadius    = useTransform(scrollYProgress, [HERO_END, S1], ["0px", "12px"])
  const aboutRadius   = useTransform(scrollYProgress, [S1, S2],       ["0px", "12px"])
  const projectRadius = useTransform(scrollYProgress, [S2, S3],       ["0px", "12px"])

  // Bar fades out in the last ~8% of each section's scroll range (as it docks at top)
  const aboutBarOpacity   = useTransform(scrollYProgress, [S1 - 0.08, S1], [1, 0])
  const projectBarOpacity = useTransform(scrollYProgress, [S2 - 0.08, S2], [1, 0])
  const contactBarOpacity = useTransform(scrollYProgress, [S3 - 0.08, S3], [1, 0])

  // ── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => { window.scrollTo(0, 0) }, [])

  // ── pastHero / profileDocked: scroll-based (IO won't work on sticky-pinned)
  // pastHero      fires early (15% of vh) — drives Waves, FixedNav, Top button.
  // profileDocked fires late: profile docks at scrollY = 200vh now (hero pins
  //               for 200dvh), so threshold moves to 185% of vh — fires just
  //               before the profile finishes docking at the top.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      setPastHero(y > vh * 0.15)
      setProfileDocked(y > vh * 1.85)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToHero = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <>
      {/* ── Hero — sticky card 1 (200dvh so text exit clears before profile) */}
      <div style={{ ...HERO_OUTER, zIndex: 1 }}>
        <motion.div style={{ ...INNER, scale: heroScale, borderRadius: heroRadius }}>
          <HeroSection pastHero={pastHero} />
        </motion.div>
      </div>

      {/* ── Profile — sticky card 2 ───────────────────────────────────────── */}
      <div style={{ ...OUTER, zIndex: 2 }}>
        {/* Leading bar — visible while sliding up, fades once docked at top */}
        <motion.div
          aria-hidden
          style={{
            position:      "absolute",
            top:           0,
            left:          0,
            right:         0,
            height:        28,
            background:    "#0a0a0a",
            zIndex:        10,
            pointerEvents: "none",
            opacity:       aboutBarOpacity,
          }}
        />
        <motion.div style={{ ...INNER, scale: aboutScale, borderRadius: aboutRadius }}>
          <AboutSection
            sectionRef={aboutRef}
            onOpenBranch={() => setBranchOpen(true)}
            branchOpen={branchOpen}
          />
        </motion.div>
      </div>

      {/* ── Projects — sticky card 3 ──────────────────────────────────────── */}
      <div style={{ ...OUTER, zIndex: 3 }}>
        <motion.div
          aria-hidden
          style={{
            position:      "absolute",
            top:           0,
            left:          0,
            right:         0,
            height:        28,
            background:    "#0a0a0a",
            zIndex:        10,
            pointerEvents: "none",
            opacity:       projectBarOpacity,
          }}
        />
        <motion.div style={{ ...INNER, scale: projectScale, borderRadius: projectRadius }}>
          <Projects />
        </motion.div>
      </div>

      {/* ── Contact — sticky card 4 (last, no scale-back) ─────────────────── */}
      <div style={{ ...OUTER, zIndex: 4 }}>
        <motion.div
          aria-hidden
          style={{
            position:      "absolute",
            top:           0,
            left:          0,
            right:         0,
            height:        28,
            background:    "#0a0a0a",
            zIndex:        10,
            pointerEvents: "none",
            opacity:       contactBarOpacity,
          }}
        />
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
        {profileDocked && (
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
