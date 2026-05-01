"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  github: string | null
  images: string[]
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Photon Flight",
    description:
      "Designed and integrated a fiber-optic-tethered autonomous quadcopter platform for operation in RF-denied and GPS-degraded environments, enabling resilient navigation and communication without wireless dependency. Developed MAVLink telemetry pipeline and onboard AI inference engine achieving 75% object detection accuracy during controlled flight demonstrations exceeding 20 minutes of sustained operation. Performed notch filter analysis of flight log data in MATLAB and ArduPilot to identify noise sources in the control loop; optimized PID gains improving closed-loop stability and dynamic response by ~12%. Executed hardware integration and 3D modeling in SolidWorks. Dean's Award Recipient.",
    tags: ["MAVLink", "ArduPilot", "PID Control", "AI Inference", "SolidWorks", "MATLAB"],
    github: "https://github.com/mervinnguyen/photonflight_fiber_optic_d",
    images: ["/images/projects/photon-flight-hero.png"],
  },
  {
    id: 2,
    title: "MSPM0 Exploration Board",
    description:
      "Custom PCB designed in KiCad around the Texas Instruments MSPM0 microcontroller, replicating the basic pinout and setup of an Arduino Nano. A ground-up exercise in schematic capture and PCB layout for a familiar embedded target.",
    tags: ["KiCad", "MSPM0", "Texas Instruments", "PCB Layout", "Schematic", "Embedded"],
    github: null,
    images: [
      "/images/projects/MSPM0-pcb1-3d.png",
      "/images/projects/MSPM0-pcb1-schem.png",
      "/images/projects/MSPM0-pcb1-trace.png",
    ],
  },
  {
    id: 3,
    title: "USB to UART Bridge",
    description:
      "Compact USB to UART bridge PCB built around the CP2102. Designed for reliable serial communication between development hardware and a host machine.",
    tags: ["KiCad", "CP2102", "USB", "UART", "PCB Layout", "Schematic"],
    github: null,
    images: [
      "/images/projects/usbuart-pcb2-3d.png",
      "/images/projects/usbuart-pcb2-schem.png",
      "/images/projects/usbuart-pcb2-trace.png",
    ],
  },
  {
    id: 4,
    title: "Analog & VLSI",
    description:
      "IC design and layout work completed in Cadence Virtuoso on TSMC 250nm process. Projects increase in complexity from basic logic gates through a 4-bit ripple-carry adder/subtractor and a JK master-slave flip-flop at 1GHz. Includes schematic capture, layout, DRC/LVS verification, and transient simulation waveforms.",
    tags: ["Cadence Virtuoso", "TSMC 250nm", "CMOS", "DRC/LVS", "Schematic", "Layout"],
    github: null,
    images: [
      "/images/projects/vlsi-norschem.png",
      "/images/projects/vlsi-2inputnand.png",
      "/images/projects/vlsi-3inputnand.png",
      "/images/projects/vlsi-booleanchem.png",
      "/images/projects/vlsi-booleandrc.png",
      "/images/projects/vlsi-xor.png",
      "/images/projects/vlsi-1bitadder-schem.png",
      "/images/projects/vlsi-4bitadder-schem.png",
      "/images/projects/vlsi-jkffschem.png",
      "/images/projects/4bitadder.1.png",
      "/images/projects/4bitadder.2.png",
      "/images/projects/4bitadder.3.png",
      "/images/projects/4bitadder.4.png",
    ],
  },
  {
    id: 5,
    title: "MATLAB",
    description:
      "A collection of projects spanning a range of engineering domains — demonstrating fluency across MATLAB and Simulink for modeling, simulation, signal processing, and data analysis.",
    tags: ["MATLAB", "Simulink", "Signal Processing", "Data Analysis", "Modeling", "Simulation"],
    github: null,
    images: [
      "/images/projects/matlab-acRC-scope.png",
      "/images/projects/matlab-acRC-sig.png",
      "/images/projects/matlab-delta-scope.png",
      "/images/projects/matlab-delta-sig.png",
      "/images/projects/matlab-yconfig-scope.png",
      "/images/projects/matlab-yconfig-sig.png",
    ],
  },
]

// ── Spring config ─────────────────────────────────────────────────────────────
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 }

// ── Stroke constants ──────────────────────────────────────────────────────────
const STR     = "rgba(232,232,232,0.85)"
const STR_DIM = "rgba(232,232,232,0.28)"
const SW      = 1.6

// ── Icons ─────────────────────────────────────────────────────────────────────

function DroneIcon() {
  const corners: [number, number][] = [[14, 14], [66, 14], [14, 66], [66, 66]]
  return (
    <svg viewBox="0 0 80 80" width={52} height={52} fill="none" aria-hidden>
      {/* Arms */}
      {corners.map(([cx, cy], i) => (
        <line key={i} x1="40" y1="40" x2={cx} y2={cy}
          stroke={STR} strokeWidth={SW} strokeLinecap="round" />
      ))}
      {/* Rotor rings + crosshairs + hub */}
      {corners.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={10} stroke={STR} strokeWidth={SW} />
          <line x1={cx - 7} y1={cy} x2={cx + 7} y2={cy} stroke={STR_DIM} strokeWidth={0.85} />
          <line x1={cx} y1={cy - 7} x2={cx} y2={cy + 7} stroke={STR_DIM} strokeWidth={0.85} />
          <circle cx={cx} cy={cy} r={2.2} fill={STR} />
        </g>
      ))}
      {/* Body */}
      <rect x="33" y="33" width="14" height="14" rx="2" stroke={STR} strokeWidth={SW} />
      {/* Gimbal */}
      <circle cx="40" cy="54" r="3" stroke={STR_DIM} strokeWidth={0.9} />
      <line x1="40" y1="47" x2="40" y2="51" stroke={STR_DIM} strokeWidth={0.9} />
    </svg>
  )
}

function PcbIcon() {
  const vias: [number, number][] = [[16, 40], [64, 40], [40, 16], [40, 64]]
  return (
    <svg viewBox="0 0 80 80" width={52} height={52} fill="none" aria-hidden>
      {/* Traces */}
      <polyline points="32,40 16,40 8,32"   stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="48,40 64,40 72,48"  stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="40,32 40,16 48,8"   stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="40,48 40,64 32,72"  stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="32,32 20,20"        stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" />
      <polyline points="48,32 60,20"        stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" />
      {/* Via rings */}
      {vias.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={3.5} stroke={STR} strokeWidth={0.9} />
          <circle cx={cx} cy={cy} r={1.2} fill={STR} />
        </g>
      ))}
      {/* IC body + inner die */}
      <rect x="28" y="28" width="24" height="24" stroke={STR} strokeWidth={SW} />
      <rect x="33" y="33" width="14" height="14" stroke={STR_DIM} strokeWidth={0.7} />
      {/* IC pins */}
      {[31, 35, 39, 43].map((v) => (
        <g key={v}>
          <rect x="22" y={v} width="6" height="3" fill={STR_DIM} />
          <rect x="52" y={v} width="6" height="3" fill={STR_DIM} />
        </g>
      ))}
    </svg>
  )
}

function VlsiIcon() {
  const grid = [20, 28, 36, 44, 52, 60]
  return (
    <svg viewBox="0 0 80 80" width={52} height={52} fill="none" aria-hidden>
      <defs>
        <clipPath id="vlsi-icon-grid-clip">
          <circle cx="40" cy="40" r="26" />
        </clipPath>
      </defs>
      {/* Grid clipped to wafer */}
      <g clipPath="url(#vlsi-icon-grid-clip)">
        {grid.map((v) => (
          <g key={v}>
            <line x1={v} y1="0"  x2={v} y2="80" stroke={STR_DIM} strokeWidth={0.7} />
            <line x1="0" y1={v}  x2="80" y2={v}  stroke={STR_DIM} strokeWidth={0.7} />
          </g>
        ))}
      </g>
      {/* Wafer outline */}
      <circle cx="40" cy="40" r="26" stroke={STR} strokeWidth={SW} />
      {/* Flat notch */}
      <line x1="34" y1="65.4" x2="46" y2="65.4" stroke={STR} strokeWidth={SW} />
      {/* Corner L-brackets */}
      <path d="M5,11 L5,5 L11,5"   fill="none" stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M69,5 L75,5 L75,11" fill="none" stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5,69 L5,75 L11,75" fill="none" stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M69,75 L75,75 L75,69" fill="none" stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MatlabIcon() {
  const line1: [number, number][] = [[22, 52], [36, 34], [50, 44], [64, 22]]
  const line2: [number, number][] = [[22, 58], [36, 48], [50, 54], [64, 38]]
  return (
    <svg viewBox="0 0 80 80" width={52} height={52} fill="none" aria-hidden>
      {/* Axes */}
      <line x1="16" y1="66" x2="16" y2="10" stroke={STR} strokeWidth={SW} strokeLinecap="round" />
      <line x1="12" y1="62" x2="70" y2="62" stroke={STR} strokeWidth={SW} strokeLinecap="round" />
      {/* Arrowheads */}
      <polyline points="12,14 16,10 20,14" fill="none" stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="66,58 70,62 66,66" fill="none" stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      {/* Data line 1 — purple accent */}
      <polyline points={line1.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none" stroke="#c084fc" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      {line1.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.5} fill="#c084fc" />)}
      {/* Data line 2 — dim */}
      <polyline points={line2.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none" stroke={STR_DIM} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      {line2.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.8} fill={STR_DIM} />)}
    </svg>
  )
}

function ProjectIcon({ id }: { id: number }) {
  if (id === 1) return <DroneIcon />
  if (id === 2 || id === 3) return <PcbIcon />
  if (id === 4) return <VlsiIcon />
  return <MatlabIcon />
}

// ── Panel slide variants ──────────────────────────────────────────────────────

const panelVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    zIndex: 2,
  }),
  center: {
    y: 0,
    opacity: 1,
    zIndex: 2,
    transition: SPRING,
  },
  exit: (dir: number) => ({
    y: dir > 0 ? "-12%" : "12%",
    opacity: 0,
    zIndex: 1,
    transition: { duration: 0.28, ease: "easeIn" as const },
  }),
}

// ── Chroma aberration keyframes (injected once) ───────────────────────────────

const CHROMA_CSS = `@keyframes chroma-ab {
  0%   { text-shadow: -4px 0 #ff0060, 4px 0 #00e5ff; }
  35%  { text-shadow:  3px 0 #ff0060,-3px 0 #00e5ff; }
  68%  { text-shadow: -1px 0 #ff0060, 1px 0 #00e5ff; }
  100% { text-shadow: none; }
}`

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [imageIdx,  setImageIdx]  = useState(0)
  const [direction, setDirection] = useState(1)
  const [glitchKey, setGlitchKey] = useState(0)

  const sectionRef  = useRef<HTMLElement>(null)
  const cooldownRef = useRef(false)
  const stateRef    = useRef({ activeIdx: 0, imageIdx: 0 })

  useEffect(() => { stateRef.current = { activeIdx, imageIdx } }, [activeIdx, imageIdx])
  useEffect(() => { setImageIdx(0) }, [activeIdx])

  // Inject chroma CSS once
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = CHROMA_CSS
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  // Wheel handler on section — capture phase so it fires before any child scroll
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const handler = (e: WheelEvent) => {
      if (cooldownRef.current) return
      const { activeIdx: aIdx, imageIdx: iIdx } = stateRef.current
      const imgs = projectsData[aIdx].images
      const isDown = e.deltaY > 0

      if (isDown) {
        if (iIdx < imgs.length - 1) {
          e.preventDefault()
          setImageIdx((i) => i + 1)
          cooldownRef.current = true
          setTimeout(() => { cooldownRef.current = false }, 440)
        } else if (aIdx < projectsData.length - 1) {
          e.preventDefault()
          setDirection(1)
          setActiveIdx((i) => i + 1)
          setGlitchKey((k) => k + 1)
          cooldownRef.current = true
          setTimeout(() => { cooldownRef.current = false }, 660)
        }
      } else {
        if (iIdx > 0) {
          e.preventDefault()
          setImageIdx((i) => i - 1)
          cooldownRef.current = true
          setTimeout(() => { cooldownRef.current = false }, 440)
        } else if (aIdx > 0) {
          e.preventDefault()
          setDirection(-1)
          setActiveIdx((i) => i - 1)
          setGlitchKey((k) => k + 1)
          cooldownRef.current = true
          setTimeout(() => { cooldownRef.current = false }, 660)
        }
      }
    }

    el.addEventListener("wheel", handler, { passive: false, capture: true })
    return () => el.removeEventListener("wheel", handler, { capture: true } as EventListenerOptions)
  }, [])

  const project = projectsData[activeIdx]

  const changeProject = (i: number) => {
    if (i === activeIdx) return
    setDirection(i > activeIdx ? 1 : -1)
    setActiveIdx(i)
    setGlitchKey((k) => k + 1)
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        background:    "#0a0a0a",
        height:        "100vh",
        display:       "flex",
        flexDirection: "column",
        overflow:      "hidden",
        position:      "relative",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ padding: "2.5rem clamp(2rem, 6vw, 6rem) 1.25rem", flexShrink: 0 }}>
        <h2
          style={{
            fontFamily:     "var(--font-display), var(--font-mono), sans-serif",
            fontWeight:     700,
            fontSize:       "clamp(1.1rem, 2.2vw, 1.8rem)",
            letterSpacing:  "0.1em",
            color:          "#ffffff",
            lineHeight:     1,
            textTransform:  "uppercase",
            background:     "rgba(255,255,255,0.03)",
            border:         "1px solid rgba(255,255,255,0.07)",
            borderLeft:     "3px solid #c084fc",
            borderRadius:   "0 4px 4px 0",
            padding:        "0.5rem 1.2rem 0.5rem 1rem",
            backdropFilter: "blur(12px)",
            display:        "inline-block",
            margin:         0,
          }}
        >
          Projects
        </h2>
      </div>

      {/* ── Two-panel body ─────────────────────────────────────────────────── */}
      <div
        style={{
          flex:    1,
          display: "flex",
          overflow: "hidden",
          padding: "0.5rem clamp(2rem, 6vw, 6rem) 2.5rem",
          gap:     "clamp(2rem, 5vw, 6rem)",
          minHeight: 0,
        }}
      >
        {/* ── LEFT PANEL ── project list ──────────────────────────────────── */}
        <div
          style={{
            width:         "clamp(150px, 24%, 260px)",
            flexShrink:    0,
            display:       "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap:           "clamp(0.3rem, 1.2vh, 0.9rem)",
          }}
        >
          {projectsData.map((p, i) => {
            const isActive = i === activeIdx
            return (
              <button
                key={p.id}
                onClick={() => changeProject(i)}
                style={{
                  background:  "none",
                  border:      "none",
                  cursor:      "pointer",
                  padding:     "0.35rem 0",
                  textAlign:   "left",
                  display:     "flex",
                  alignItems:  "center",
                  gap:         "0.85rem",
                }}
              >
                {/* Active bar */}
                <div
                  style={{
                    width:      isActive ? 20 : 5,
                    height:     1,
                    background: isActive ? "#c084fc" : "rgba(232,232,232,0.15)",
                    flexShrink: 0,
                    transition: "width 0.3s ease",
                  }}
                />
                {/* Icon */}
                <div
                  style={{
                    flexShrink: 0,
                    opacity:    isActive ? 1 : 0.3,
                    transition: "opacity 0.3s ease",
                    display:    "flex",
                    alignItems: "center",
                  }}
                >
                  <ProjectIcon id={p.id} />
                </div>
                {/* Name — remount on activation to replay chroma animation */}
                <span
                  key={isActive ? `active-${glitchKey}` : `inactive-${p.id}`}
                  style={{
                    fontFamily:    "var(--font-display), var(--font-mono), sans-serif",
                    fontWeight:    isActive ? 700 : 400,
                    fontSize:      "clamp(0.72rem, 1.1vw, 0.9rem)",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color:         isActive ? "#e879f9" : "#6b7280",
                    lineHeight:    1.2,
                    animation:     isActive ? "chroma-ab 0.44s ease-out forwards" : "none",
                  }}
                >
                  {p.title}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── RIGHT PANEL ── active project ───────────────────────────────── */}
        <div
          style={{
            flex:     1,
            minWidth: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatePresence custom={direction}>
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                position:      "absolute",
                inset:         0,
                display:       "flex",
                flexDirection: "column",
                gap:           "0.9rem",
              }}
            >
              {/* Counter + title */}
              <div style={{ flexShrink: 0 }}>
                <p
                  style={{
                    fontFamily:    "var(--font-mono), monospace",
                    fontSize:      "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color:         "rgba(232,232,232,0.25)",
                    marginBottom:  "0.3rem",
                  }}
                >
                  {String(activeIdx + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}
                </p>
                <h3
                  style={{
                    fontFamily:            "var(--font-display), var(--font-mono), sans-serif",
                    fontWeight:            700,
                    fontSize:              "clamp(1.4rem, 3.5vw, 2.8rem)",
                    letterSpacing:         "0.05em",
                    textTransform:         "uppercase",
                    background:            "linear-gradient(135deg, #c084fc, #f472b6)",
                    WebkitBackgroundClip:  "text",
                    WebkitTextFillColor:   "transparent",
                    backgroundClip:        "text",
                    margin:                0,
                    lineHeight:            1.05,
                  }}
                >
                  {project.title}
                </h3>
              </div>

              {/* Carousel */}
              <div style={{ flexShrink: 0 }}>
                <div
                  style={{
                    position:     "relative",
                    width:        "100%",
                    aspectRatio:  "16/9",
                    maxHeight:    "40vh",
                    background:   "#111",
                    borderRadius: 16,
                    overflow:     "hidden",
                    border:       "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imageIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ position: "absolute", inset: 0 }}
                    >
                      <Image
                        src={project.images[imageIdx]}
                        alt={`${project.title} ${imageIdx + 1}`}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, 65vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dot indicators */}
                {project.images.length > 1 && (
                  <div
                    style={{
                      display:         "flex",
                      justifyContent:  "center",
                      gap:             6,
                      marginTop:       "0.55rem",
                    }}
                  >
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImageIdx(i)}
                        aria-label={`Image ${i + 1}`}
                        style={{
                          width:        7,
                          height:       7,
                          borderRadius: "50%",
                          border:       i === imageIdx ? "none" : "1px solid #f472b6",
                          background:   i === imageIdx ? "#f472b6" : "transparent",
                          cursor:       "pointer",
                          padding:      0,
                          flexShrink:   0,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontWeight: 300,
                  fontSize:   "clamp(0.7rem, 0.92vw, 0.82rem)",
                  color:      "#ffffff",
                  lineHeight: 1.82,
                  margin:     0,
                  flex:       1,
                  overflow:   "hidden",
                }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, flexShrink: 0 }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily:  "var(--font-mono), monospace",
                      fontSize:    "0.6rem",
                      letterSpacing: "0.05em",
                      color:       "#c084fc",
                      background:  "rgba(192,132,252,0.07)",
                      border:      "1px solid rgba(192,132,252,0.18)",
                      borderRadius: 100,
                      padding:     "2px 9px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* GitHub link */}
              {project.github && (
                <div style={{ flexShrink: 0 }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:     "inline-flex",
                      alignItems:  "center",
                      gap:         7,
                      fontFamily:  "var(--font-mono), monospace",
                      fontSize:    "0.72rem",
                      letterSpacing: "0.06em",
                      color:       "#c084fc",
                      textDecoration: "none",
                      border:      "1px solid rgba(192,132,252,0.2)",
                      borderRadius: 4,
                      padding:     "0.36rem 0.8rem",
                      background:  "rgba(192,132,252,0.06)",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
