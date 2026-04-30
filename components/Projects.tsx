"use client"

import { useState, useEffect, useCallback } from "react"
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
]

const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 }
const IMG_DIM = "brightness(0.2) saturate(0.35)"

// ── Icons ─────────────────────────────────────────────────────────────────────

// Drone: realistic top-down quadcopter silhouette
// Reference: drones.jpg — 3/4-perspective quads with swept arms, large prop discs, camera
function DroneIcon({ uid, src }: { uid: string; src: string }) {
  // Rotors at true corners, body is a compact hexagon, arms swept back slightly
  const rotors: [number, number][] = [[36, 42], [164, 42], [164, 158], [36, 158]]

  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <clipPath id={uid}>
          {/* Large prop discs */}
          {rotors.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={32} />)}

          {/* Swept arms — angled rectangles connecting body to each rotor */}
          {/* TL arm */}
          <rect x="12" y="94" width="176" height="12" transform="rotate(40 100 100)" />
          {/* TR arm */}
          <rect x="12" y="94" width="176" height="12" transform="rotate(-40 100 100)" />

          {/* Central body — hexagonal fuselage */}
          <polygon points="100,76 118,88 118,112 100,124 82,112 82,88" />

          {/* Camera gimbal — disc hanging at front of body */}
          <ellipse cx="100" cy="134" rx="10" ry="8" />

          {/* Landing gear stubs at body corners */}
          <rect x="76" y="108" width="8" height="18" rx="2" />
          <rect x="116" y="108" width="8" height="18" rx="2" />
        </clipPath>
      </defs>

      {/* Photo inside silhouette */}
      <image href={src} x="0" y="0" width="200" height="200"
        clipPath={`url(#${uid})`} preserveAspectRatio="xMidYMid slice"
        style={{ filter: IMG_DIM }} />

      {/* Rotor housing rings */}
      {rotors.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={32} fill="none" stroke="rgba(232,232,232,0.82)" strokeWidth="1.4" />
          <circle cx={cx} cy={cy} r={23} fill="none" stroke="rgba(232,232,232,0.25)" strokeWidth="0.7" />
          {/* Prop blades — two swept lines at 30° offset */}
          <line
            x1={cx - 28 * Math.cos(Math.PI / 6)} y1={cy - 28 * Math.sin(Math.PI / 6)}
            x2={cx + 28 * Math.cos(Math.PI / 6)} y2={cy + 28 * Math.sin(Math.PI / 6)}
            stroke="rgba(232,232,232,0.7)" strokeWidth="1.6" strokeLinecap="round" />
          <line
            x1={cx - 28 * Math.cos(Math.PI / 6 + Math.PI / 2)} y1={cy - 28 * Math.sin(Math.PI / 6 + Math.PI / 2)}
            x2={cx + 28 * Math.cos(Math.PI / 6 + Math.PI / 2)} y2={cy + 28 * Math.sin(Math.PI / 6 + Math.PI / 2)}
            stroke="rgba(232,232,232,0.35)" strokeWidth="1.6" strokeLinecap="round" />
          {/* Motor hub */}
          <circle cx={cx} cy={cy} r={7} fill="none" stroke="rgba(232,232,232,0.6)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r={3} fill="rgba(232,232,232,0.3)" />
        </g>
      ))}

      {/* Swept arm outlines */}
      <rect x="12" y="94" width="176" height="12" fill="none"
        stroke="rgba(232,232,232,0.3)" strokeWidth="0.8" transform="rotate(40 100 100)" />
      <rect x="12" y="94" width="176" height="12" fill="none"
        stroke="rgba(232,232,232,0.3)" strokeWidth="0.8" transform="rotate(-40 100 100)" />

      {/* Body outline */}
      <polygon points="100,76 118,88 118,112 100,124 82,112 82,88"
        fill="none" stroke="rgba(232,232,232,0.85)" strokeWidth="1.4" />
      {/* Body centre detail */}
      <polygon points="100,84 110,90 110,110 100,116 90,110 90,90"
        fill="none" stroke="rgba(232,232,232,0.22)" strokeWidth="0.7" />

      {/* Camera gimbal */}
      <ellipse cx="100" cy="134" rx="10" ry="8"
        fill="none" stroke="rgba(232,232,232,0.7)" strokeWidth="1.2" />
      <ellipse cx="100" cy="134" rx="5" ry="4"
        fill="none" stroke="rgba(232,232,232,0.35)" strokeWidth="0.7" />

      {/* Landing gear */}
      <rect x="76" y="108" width="8" height="18" rx="2"
        fill="none" stroke="rgba(232,232,232,0.5)" strokeWidth="1" />
      <rect x="116" y="108" width="8" height="18" rx="2"
        fill="none" stroke="rgba(232,232,232,0.5)" strokeWidth="1" />
    </svg>
  )
}

// PCB: circuit trace layout — central QFP IC, 45° routed traces, via dots, component pads
// Reference: pcb.jpg — horizontal panoramic PCB with IC centre and angular routing
// Used for both PCB projects (MSPM0 and USB to UART)
function PcbIcon({ uid, src }: { uid: string; src: string }) {
  // Stroked paths inside clipPath contribute their stroke area to the clip region
  const traceSw = 6  // trace strokeWidth for clipping

  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <clipPath id={uid}>
          {/* Central IC body */}
          <rect x="70" y="70" width="60" height="60" />

          {/* QFP pins — 5 per side */}
          {[78, 87, 96, 105, 114].map((v) => (
            [
              <rect key={`l${v}`} x="53" y={v} width="17" height="6" />,
              <rect key={`r${v}`} x="130" y={v} width="17" height="6" />,
              <rect key={`t${v}`} x={v} y="53" width="6" height="17" />,
              <rect key={`b${v}`} x={v} y="130" width="6" height="17" />,
            ]
          ))}

          {/* Traces — horizontal → 45° routing (stroke area used for clip) */}
          {/* Left routes */}
          <polyline points="70,84 36,84 18,66" fill="none" stroke="white" strokeWidth={traceSw} />
          <polyline points="70,116 36,116 18,134" fill="none" stroke="white" strokeWidth={traceSw} />
          {/* Right routes */}
          <polyline points="130,84 164,84 182,66" fill="none" stroke="white" strokeWidth={traceSw} />
          <polyline points="130,116 164,116 182,134" fill="none" stroke="white" strokeWidth={traceSw} />
          {/* Top routes */}
          <polyline points="84,70 84,44 66,26" fill="none" stroke="white" strokeWidth={traceSw} />
          <polyline points="116,70 116,44 134,26" fill="none" stroke="white" strokeWidth={traceSw} />
          {/* Bottom routes */}
          <polyline points="84,130 84,156 66,174" fill="none" stroke="white" strokeWidth={traceSw} />
          <polyline points="116,130 116,156 134,174" fill="none" stroke="white" strokeWidth={traceSw} />

          {/* Component pads at trace ends */}
          <rect x="8"  y="60"  width="16" height="12" />
          <rect x="8"  y="128" width="16" height="12" />
          <rect x="176" y="60"  width="16" height="12" />
          <rect x="176" y="128" width="16" height="12" />
          <rect x="58" y="16"  width="12" height="16" />
          <rect x="130" y="16"  width="12" height="16" />
          <rect x="58" y="168" width="12" height="16" />
          <rect x="130" y="168" width="12" height="16" />

          {/* Via dots at 45° elbows */}
          {([
            [36, 84], [36, 116], [164, 84], [164, 116],
            [84, 44], [116, 44], [84, 156], [116, 156],
          ] as [number, number][]).map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={5} />
          ))}
        </clipPath>
      </defs>

      {/* Photo inside clip */}
      <image href={src} x="0" y="0" width="200" height="200"
        clipPath={`url(#${uid})`} preserveAspectRatio="xMidYMid slice"
        style={{ filter: IMG_DIM }} />

      {/* IC body strokes */}
      <rect x="70" y="70" width="60" height="60" fill="none" stroke="rgba(232,232,232,0.88)" strokeWidth="1.5" />
      <rect x="80" y="80" width="40" height="40" fill="none" stroke="rgba(232,232,232,0.2)" strokeWidth="0.7" />
      {/* Pin 1 dot */}
      <circle cx="76" cy="76" r="2.5" fill="rgba(232,232,232,0.6)" />

      {/* IC pin outlines */}
      {[78, 87, 96, 105, 114].map((v) => (
        <g key={v}>
          <rect x="53" y={v} width="17" height="6" fill="none" stroke="rgba(232,232,232,0.6)" strokeWidth="0.9" />
          <rect x="130" y={v} width="17" height="6" fill="none" stroke="rgba(232,232,232,0.6)" strokeWidth="0.9" />
          <rect x={v} y="53" width="6" height="17" fill="none" stroke="rgba(232,232,232,0.6)" strokeWidth="0.9" />
          <rect x={v} y="130" width="6" height="17" fill="none" stroke="rgba(232,232,232,0.6)" strokeWidth="0.9" />
        </g>
      ))}

      {/* Trace lines */}
      {([
        "70,84 36,84 18,66",
        "70,116 36,116 18,134",
        "130,84 164,84 182,66",
        "130,116 164,116 182,134",
        "84,70 84,44 66,26",
        "116,70 116,44 134,26",
        "84,130 84,156 66,174",
        "116,130 116,156 134,174",
      ] as string[]).map((pts, i) => (
        <polyline key={i} points={pts} fill="none" stroke="rgba(232,232,232,0.52)" strokeWidth="1.1" />
      ))}

      {/* Component pads */}
      {([
        [8, 60, 16, 12], [8, 128, 16, 12],
        [176, 60, 16, 12], [176, 128, 16, 12],
        [58, 16, 12, 16], [130, 16, 12, 16],
        [58, 168, 12, 16], [130, 168, 12, 16],
      ] as [number, number, number, number][]).map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h}
          fill="none" stroke="rgba(232,232,232,0.65)" strokeWidth="1" />
      ))}

      {/* Via rings */}
      {([
        [36, 84], [36, 116], [164, 84], [164, 116],
        [84, 44], [116, 44], [84, 156], [116, 156],
      ] as [number, number][]).map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={5} fill="none" stroke="rgba(232,232,232,0.75)" strokeWidth="1.1" />
          <circle cx={cx} cy={cy} r={2} fill="rgba(232,232,232,0.35)" />
        </g>
      ))}
    </svg>
  )
}

// VLSI: silicon wafer — circle with die-array grid + corner registration marks
// Reference: vlsi.png — wafer circle, uniform grid, L-bracket corners
function VlsiIcon({ uid, src }: { uid: string; src: string }) {
  const cx = 100, cy = 100, r = 76
  // Grid lines every 13px across the wafer diameter
  const gridLines = [22, 35, 48, 61, 74, 87, 100, 113, 126, 139, 152, 165, 178]

  return (
    <svg viewBox="0 0 200 200" width="100%" height={{ display: "block" } as never}
      style={{ display: "block", width: "100%", height: "100%" }}>
      <defs>
        {/* Clip: just the wafer circle */}
        <clipPath id={uid}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
        {/* Second clip for grid lines (reuse wafer shape) */}
        <clipPath id={`${uid}-g`}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>

      {/* Photo inside wafer circle */}
      <image href={src} x="0" y="0" width="200" height="200"
        clipPath={`url(#${uid})`} preserveAspectRatio="xMidYMid slice"
        style={{ filter: IMG_DIM }} />

      {/* Die-array grid — clipped to wafer circle */}
      <g clipPath={`url(#${uid}-g)`}>
        {gridLines.map((v) => (
          <g key={v}>
            <line x1={v} y1="0" x2={v} y2="200" stroke="rgba(232,232,232,0.55)" strokeWidth="0.85" />
            <line x1="0" y1={v} x2="200" y2={v} stroke="rgba(232,232,232,0.55)" strokeWidth="0.85" />
          </g>
        ))}
      </g>

      {/* Wafer outline */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(232,232,232,0.9)" strokeWidth="1.6" />
      {/* Flat (wafer orientation notch) — small chord at bottom */}
      <line x1="86" y1="175.2" x2="114" y2="175.2" stroke="rgba(232,232,232,0.9)" strokeWidth="1.6" />

      {/* Corner registration marks — L-brackets at each corner */}
      {/* Top-left */}
      <path d="M10,22 L10,10 L22,10" fill="none" stroke="rgba(232,232,232,0.75)" strokeWidth="1.6" />
      {/* Top-right */}
      <path d="M178,10 L190,10 L190,22" fill="none" stroke="rgba(232,232,232,0.75)" strokeWidth="1.6" />
      {/* Bottom-left */}
      <path d="M10,178 L10,190 L22,190" fill="none" stroke="rgba(232,232,232,0.75)" strokeWidth="1.6" />
      {/* Bottom-right */}
      <path d="M178,190 L190,190 L190,178" fill="none" stroke="rgba(232,232,232,0.75)" strokeWidth="1.6" />
    </svg>
  )
}

function ProjectIcon({ project }: { project: Project }) {
  const uid = `clip-p${project.id}`
  const src = project.images[0] ?? ""
  // Both PCB projects share the same icon type
  if (project.id === 1) return <DroneIcon uid={uid} src={src} />
  if (project.id === 4) return <VlsiIcon  uid={uid} src={src} />
  return <PcbIcon uid={uid} src={src} />
}

// ── Image slider ──────────────────────────────────────────────────────────────

function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)
  if (!images.length) return null

  return (
    <div style={{ position: "relative", width: "100%", userSelect: "none" }}>
      <div style={{
        position: "relative", width: "100%", aspectRatio: "16/9",
        background: "#111", borderRadius: 4, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
      }}>
        <AnimatePresence mode="wait">
          <motion.div key={index}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} style={{ position: "absolute", inset: 0 }}>
            <Image src={images[index]} alt={`${title} — image ${index + 1}`} fill
              style={{ objectFit: "contain" }} sizes="(max-width: 900px) 100vw, 60vw" />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <>
          {(["prev", "next"] as const).map((dir) => (
            <button key={dir} onClick={dir === "prev" ? prev : next} aria-label={dir}
              style={{
                position: "absolute", top: "50%", transform: "translateY(-50%)",
                [dir === "prev" ? "left" : "right"]: 8,
                background: "rgba(10,10,10,0.75)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4, color: "#e8e8e8", width: 32, height: 32, cursor: "pointer",
                fontFamily: "var(--font-mono), monospace", fontSize: 18,
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}>
              {dir === "prev" ? "‹" : "›"}
            </button>
          ))}
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Image ${i + 1}`}
                style={{
                  width: i === index ? 20 : 6, height: 6, borderRadius: 3, border: "none",
                  background: i === index ? "#06B6D4" : "rgba(232,232,232,0.25)",
                  cursor: "pointer", padding: 0,
                  transition: "width 0.2s ease, background 0.2s ease",
                }} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const close = useCallback(() => setExpandedId(null), [])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [close])

  const expanded = projectsData.find((p) => p.id === expandedId) ?? null

  return (
    <section id="projects" style={{ background: "#0a0a0a", padding: "8rem 0 10rem", position: "relative" }}>

      {/* Section heading */}
      <div style={{ padding: "0 clamp(2rem, 8vw, 8rem)", marginBottom: "3.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block" }}>
          <h2 style={{
            fontFamily: "var(--font-display), var(--font-mono), sans-serif",
            fontWeight: 700, fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
            letterSpacing: "0.1em", color: "#e8e8e8", lineHeight: 1,
            textTransform: "uppercase", background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)", borderLeft: "3px solid #84CC16",
            borderRadius: "0 4px 4px 0", padding: "0.6rem 1.4rem 0.6rem 1.2rem",
            backdropFilter: "blur(12px)", margin: 0,
          }}>
            Selected Works
          </h2>
        </motion.div>
      </div>

      {/* Vertical card list — one per row, icon left, title right */}
      <div style={{
        padding: "0 clamp(2rem, 8vw, 8rem)",
        display: "flex",
        flexDirection: "column",
      }}>
        {projectsData.map((project, i) => (
          <motion.div
            key={project.id}
            onClick={() => setExpandedId(project.id)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(1.5rem, 4vw, 4rem)",
              padding: "2.25rem 0",
              borderTop: "1px solid rgba(232,232,232,0.07)",
              cursor: "pointer",
            }}
          >
            {/* Icon — square, fixed size */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={SPRING}
              style={{
                width:    "clamp(120px, 16vw, 200px)",
                height:   "clamp(120px, 16vw, 200px)",
                flexShrink: 0,
              }}
            >
              <ProjectIcon project={project} />
            </motion.div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily:    "var(--font-mono), monospace",
                fontWeight:    300,
                fontSize:      "clamp(0.65rem, 0.85vw, 0.75rem)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:         "rgba(232,232,232,0.28)",
                marginBottom:  "0.5rem",
              }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p style={{
                fontFamily:    "var(--font-display), var(--font-mono), sans-serif",
                fontWeight:    700,
                fontSize:      "clamp(1rem, 2.2vw, 1.75rem)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color:         "#e8e8e8",
                lineHeight:    1.15,
                margin:        0,
              }}>
                {project.title}
              </p>
            </div>

            {/* Arrow hint */}
            <span style={{
              fontFamily:    "var(--font-mono), monospace",
              fontSize:      "clamp(0.8rem, 1.2vw, 1rem)",
              color:         "rgba(232,232,232,0.2)",
              flexShrink:    0,
            }}>
              →
            </span>
          </motion.div>
        ))}
        {/* Bottom rule */}
        <div style={{ borderTop: "1px solid rgba(232,232,232,0.07)" }} />
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }} onClick={close}
              style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)",
                zIndex: 200, backdropFilter: "blur(5px)",
              }} />

            <div style={{
              position: "fixed", inset: 0, zIndex: 201,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "2rem", pointerEvents: "none",
            }}>
              <motion.div
                key={`modal-${expanded.id}`}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={SPRING}
                style={{
                  width: "min(100%, 860px)", maxHeight: "85vh", overflowY: "auto",
                  background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 4, pointerEvents: "all", position: "relative",
                }}
              >
                <div style={{ padding: "clamp(1.5rem, 4vw, 2.25rem)" }}>
                  <button onClick={close} aria-label="Close" style={{
                    position: "absolute", top: 14, right: 14,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 3, color: "rgba(232,232,232,0.55)", width: 30, height: 30,
                    cursor: "pointer", fontFamily: "var(--font-mono), monospace", fontSize: 20,
                    display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
                  }}>×</button>

                  <h3 style={{
                    fontFamily: "var(--font-display), var(--font-mono), sans-serif",
                    fontWeight: 700, fontSize: "clamp(1rem, 2.2vw, 1.45rem)",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "#e8e8e8", marginBottom: "1.5rem", paddingRight: 40,
                  }}>
                    {expanded.title}
                  </h3>

                  <div style={{ marginBottom: "1.75rem" }}>
                    <ImageSlider images={expanded.images} title={expanded.title} />
                  </div>

                  <p style={{
                    fontFamily: "var(--font-mono), monospace", fontWeight: 300,
                    fontSize: "clamp(0.76rem, 1.05vw, 0.86rem)", color: "rgba(232,232,232,0.6)",
                    lineHeight: 1.85, marginBottom: "1.5rem",
                  }}>
                    {expanded.description}
                  </p>

                  <div style={{
                    display: "flex", flexWrap: "wrap", gap: 6,
                    marginBottom: expanded.github ? "1.5rem" : 0,
                  }}>
                    {expanded.tags.map((tag) => (
                      <span key={tag} style={{
                        fontFamily: "var(--font-mono), monospace", fontSize: "0.66rem",
                        letterSpacing: "0.06em", color: "rgba(6,182,212,0.75)",
                        background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.16)",
                        borderRadius: 3, padding: "3px 8px",
                      }}>{tag}</span>
                    ))}
                  </div>

                  {expanded.github && (
                    <a href={expanded.github} target="_blank" rel="noopener noreferrer" style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      fontFamily: "var(--font-mono), monospace", fontSize: "0.76rem",
                      letterSpacing: "0.06em", color: "rgba(6,182,212,0.8)",
                      textDecoration: "none", border: "1px solid rgba(6,182,212,0.2)",
                      borderRadius: 4, padding: "0.42rem 0.85rem", background: "rgba(6,182,212,0.05)",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      View on GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
