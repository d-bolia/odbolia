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
const IMG_FILTER = "brightness(0.22) saturate(0.4)"

// ── Icons — each clips the project photo inside its silhouette ────────────────

function DroneIcon({ uid, src }: { uid: string; src: string }) {
  const rotors: [number, number][] = [[38, 38], [162, 38], [162, 162], [38, 162]]
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <clipPath id={uid}>
          {rotors.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={30} />
          ))}
          <rect x="15" y="94" width="170" height="12" transform="rotate(45 100 100)" />
          <rect x="15" y="94" width="170" height="12" transform="rotate(-45 100 100)" />
          <circle cx="100" cy="100" r="14" />
        </clipPath>
      </defs>

      {/* Photo inside silhouette */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <image href={src} x="0" y="0" width="200" height="200"
        clipPath={`url(#${uid})`} preserveAspectRatio="xMidYMid slice"
        style={{ filter: IMG_FILTER }} />

      {/* Rotor rings */}
      {rotors.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={30} fill="none" stroke="rgba(232,232,232,0.78)" strokeWidth="1.3" />
          <circle cx={cx} cy={cy} r={21} fill="none" stroke="rgba(232,232,232,0.28)" strokeWidth="0.7" />
          <circle cx={cx} cy={cy} r={7}  fill="none" stroke="rgba(232,232,232,0.55)" strokeWidth="1" />
        </g>
      ))}
      {/* Propeller blades — 2 per rotor, cross pattern */}
      {rotors.map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx - 26} y1={cy} x2={cx + 26} y2={cy}
            stroke="rgba(232,232,232,0.68)" strokeWidth="1.5" />
          <line x1={cx} y1={cy - 26} x2={cx} y2={cy + 26}
            stroke="rgba(232,232,232,0.3)" strokeWidth="1.5" />
        </g>
      ))}
      {/* Arm outlines */}
      <rect x="15" y="95.5" width="170" height="9" fill="none"
        stroke="rgba(232,232,232,0.32)" strokeWidth="0.8" transform="rotate(45 100 100)" />
      <rect x="15" y="95.5" width="170" height="9" fill="none"
        stroke="rgba(232,232,232,0.32)" strokeWidth="0.8" transform="rotate(-45 100 100)" />
      {/* Center hub */}
      <circle cx="100" cy="100" r="14" fill="none" stroke="rgba(232,232,232,0.82)" strokeWidth="1.4" />
      <circle cx="100" cy="100" r="6"  fill="none" stroke="rgba(232,232,232,0.38)" strokeWidth="0.9" />
    </svg>
  )
}

function ChipIcon({ uid, src }: { uid: string; src: string }) {
  // QFP package: central die + 6 pins per side
  const pins = [65, 77, 89, 101, 113, 125]
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <clipPath id={uid}>
          <rect x="58" y="58" width="84" height="84" />
          {pins.flatMap((v) => [
            <rect key={`l${v}`} x="42" y={v} width="16" height="9" />,
            <rect key={`r${v}`} x="142" y={v} width="16" height="9" />,
            <rect key={`t${v}`} x={v} y="42" width="9" height="16" />,
            <rect key={`b${v}`} x={v} y="142" width="9" height="16" />,
          ])}
        </clipPath>
      </defs>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <image href={src} x="0" y="0" width="200" height="200"
        clipPath={`url(#${uid})`} preserveAspectRatio="xMidYMid slice"
        style={{ filter: IMG_FILTER }} />

      {/* Body */}
      <rect x="58" y="58" width="84" height="84" fill="none" stroke="rgba(232,232,232,0.82)" strokeWidth="1.5" />
      {/* Inner die area */}
      <rect x="70" y="70" width="60" height="60" fill="none" stroke="rgba(232,232,232,0.22)" strokeWidth="0.8" />
      {/* Pin 1 dot */}
      <circle cx="65" cy="65" r="3" fill="rgba(232,232,232,0.55)" />
      {/* Pins */}
      {pins.map((v) => (
        <g key={v}>
          <rect x="42" y={v} width="16" height="9" fill="none" stroke="rgba(232,232,232,0.65)" strokeWidth="0.9" />
          <rect x="142" y={v} width="16" height="9" fill="none" stroke="rgba(232,232,232,0.65)" strokeWidth="0.9" />
          <rect x={v} y="42" width="9" height="16" fill="none" stroke="rgba(232,232,232,0.65)" strokeWidth="0.9" />
          <rect x={v} y="142" width="9" height="16" fill="none" stroke="rgba(232,232,232,0.65)" strokeWidth="0.9" />
        </g>
      ))}
      {/* Internal trace cross */}
      <line x1="70" y1="100" x2="130" y2="100" stroke="rgba(232,232,232,0.15)" strokeWidth="0.7" />
      <line x1="100" y1="70" x2="100" y2="130" stroke="rgba(232,232,232,0.15)" strokeWidth="0.7" />
    </svg>
  )
}

function UsbIcon({ uid, src }: { uid: string; src: string }) {
  // USB trident symbol — top circle, main stem, horizontal bar, left+right arms with terminals
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <clipPath id={uid}>
          {/* Top circle */}
          <circle cx="100" cy="36" r="24" />
          {/* Main stem */}
          <rect x="93" y="60" width="14" height="68" />
          {/* Horizontal bar */}
          <rect x="44" y="120" width="112" height="13" />
          {/* Left arm */}
          <rect x="44" y="82" width="13" height="51" />
          {/* Right arm */}
          <rect x="143" y="82" width="13" height="51" />
          {/* Left terminal — square */}
          <rect x="26" y="64" width="30" height="30" />
          {/* Right terminal — triangle pointing right */}
          <polygon points="143,64 175,79 143,94" />
          {/* Bottom connector stub */}
          <rect x="93" y="133" width="14" height="30" />
          <rect x="80" y="158" width="40" height="10" />
        </clipPath>
      </defs>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <image href={src} x="0" y="0" width="200" height="200"
        clipPath={`url(#${uid})`} preserveAspectRatio="xMidYMid slice"
        style={{ filter: IMG_FILTER }} />

      {/* Top circle */}
      <circle cx="100" cy="36" r="24" fill="none" stroke="rgba(232,232,232,0.8)" strokeWidth="1.4" />
      {/* Inner circle (contacts) */}
      <circle cx="100" cy="36" r="14" fill="none" stroke="rgba(232,232,232,0.28)" strokeWidth="0.8" />
      {/* Main stem */}
      <rect x="93" y="60" width="14" height="68" fill="none" stroke="rgba(232,232,232,0.5)" strokeWidth="0.9" />
      {/* Horizontal bar */}
      <rect x="44" y="120" width="112" height="13" fill="none" stroke="rgba(232,232,232,0.55)" strokeWidth="1" />
      {/* Left arm */}
      <rect x="44" y="82" width="13" height="51" fill="none" stroke="rgba(232,232,232,0.55)" strokeWidth="1" />
      {/* Right arm */}
      <rect x="143" y="82" width="13" height="51" fill="none" stroke="rgba(232,232,232,0.55)" strokeWidth="1" />
      {/* Left terminal */}
      <rect x="26" y="64" width="30" height="30" fill="none" stroke="rgba(232,232,232,0.78)" strokeWidth="1.3" />
      {/* Right terminal */}
      <polygon points="143,64 175,79 143,94" fill="none" stroke="rgba(232,232,232,0.78)" strokeWidth="1.3" />
      {/* Bottom stub */}
      <rect x="93" y="133" width="14" height="30" fill="none" stroke="rgba(232,232,232,0.4)" strokeWidth="0.8" />
      <rect x="80" y="158" width="40" height="10" fill="none" stroke="rgba(232,232,232,0.65)" strokeWidth="1" />
    </svg>
  )
}

function VlsiIcon({ uid, src }: { uid: string; src: string }) {
  // Silicon die with bond pads protruding outside the die boundary
  const dX = 42, dY = 42, dW = 116, dH = 116
  const padXs = [57, 82, 107, 132]
  const padYs = [57, 82, 107, 132]
  const pw = 12, ph = 14

  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <clipPath id={uid}>
          <rect x={dX} y={dY} width={dW} height={dH} />
          {/* Bond pads — top, bottom, left, right */}
          {padXs.flatMap((x) => [
            <rect key={`t${x}`} x={x} y={dY - ph + 4} width={pw} height={ph} />,
            <rect key={`b${x}`} x={x} y={dY + dH - 4} width={pw} height={ph} />,
          ])}
          {padYs.flatMap((y) => [
            <rect key={`l${y}`} x={dX - ph + 4} y={y} width={ph} height={pw} />,
            <rect key={`r${y}`} x={dX + dW - 4} y={y} width={ph} height={pw} />,
          ])}
        </clipPath>
      </defs>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <image href={src} x="0" y="0" width="200" height="200"
        clipPath={`url(#${uid})`} preserveAspectRatio="xMidYMid slice"
        style={{ filter: IMG_FILTER }} />

      {/* Die outline */}
      <rect x={dX} y={dY} width={dW} height={dH} fill="none" stroke="rgba(232,232,232,0.85)" strokeWidth="1.5" />
      {/* Bond pads */}
      {padXs.map((x) => (
        <g key={x}>
          <rect x={x} y={dY - ph + 4} width={pw} height={ph} fill="none" stroke="rgba(232,232,232,0.65)" strokeWidth="0.9" />
          <rect x={x} y={dY + dH - 4} width={pw} height={ph} fill="none" stroke="rgba(232,232,232,0.65)" strokeWidth="0.9" />
        </g>
      ))}
      {padYs.map((y) => (
        <g key={y}>
          <rect x={dX - ph + 4} y={y} width={ph} height={pw} fill="none" stroke="rgba(232,232,232,0.65)" strokeWidth="0.9" />
          <rect x={dX + dW - 4} y={y} width={ph} height={pw} fill="none" stroke="rgba(232,232,232,0.65)" strokeWidth="0.9" />
        </g>
      ))}
      {/* Internal logic blocks */}
      <rect x="56" y="56" width="38" height="34" fill="none" stroke="rgba(232,232,232,0.2)" strokeWidth="0.8" />
      <rect x="106" y="56" width="38" height="34" fill="none" stroke="rgba(232,232,232,0.2)" strokeWidth="0.8" />
      <rect x="56" y="110" width="38" height="34" fill="none" stroke="rgba(232,232,232,0.2)" strokeWidth="0.8" />
      <rect x="106" y="110" width="38" height="34" fill="none" stroke="rgba(232,232,232,0.2)" strokeWidth="0.8" />
      {/* Interconnect traces between blocks */}
      <line x1="94" y1="73"  x2="106" y2="73"  stroke="rgba(232,232,232,0.18)" strokeWidth="0.8" />
      <line x1="75" y1="90"  x2="75"  y2="110" stroke="rgba(232,232,232,0.18)" strokeWidth="0.8" />
      <line x1="94" y1="127" x2="106" y2="127" stroke="rgba(232,232,232,0.18)" strokeWidth="0.8" />
      <line x1="125" y1="90" x2="125" y2="110" stroke="rgba(232,232,232,0.18)" strokeWidth="0.8" />
    </svg>
  )
}

function ProjectIcon({ project }: { project: Project }) {
  const uid = `clip-p${project.id}`
  const src = project.images[0] ?? ""
  switch (project.id) {
    case 1: return <DroneIcon uid={uid} src={src} />
    case 2: return <ChipIcon  uid={uid} src={src} />
    case 3: return <UsbIcon   uid={uid} src={src} />
    case 4: return <VlsiIcon  uid={uid} src={src} />
    default: return null
  }
}

// ── Image slider (used in expanded card) ──────────────────────────────────────

function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)
  if (images.length === 0) return null

  return (
    <div style={{ position: "relative", width: "100%", userSelect: "none" }}>
      <div style={{
        position: "relative", width: "100%", aspectRatio: "16/9",
        background: "#111", borderRadius: 6, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
      }}>
        <AnimatePresence mode="wait">
          <motion.div key={index}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "absolute", inset: 0 }}>
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

// ── Main section ──────────────────────────────────────────────────────────────

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

      {/* Card grid */}
      <div style={{
        padding: "0 clamp(2rem, 8vw, 8rem)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
      }}>
        {projectsData.map((project, i) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setExpandedId(project.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ borderColor: "rgba(232,232,232,0.28)" }}
            style={{
              position: "relative",
              aspectRatio: "1",
              border: "1px solid rgba(232,232,232,0.1)",
              borderRadius: 3,
              cursor: "pointer",
              overflow: "hidden",
              background: "#0d0d0d",
            }}
          >
            {/* Icon fills the entire card */}
            <div style={{ position: "absolute", inset: 0 }}>
              <ProjectIcon project={project} />
            </div>

            {/* Title — centered, overlaid at bottom */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "2.5rem 0.75rem 0.85rem",
              background: "linear-gradient(to bottom, transparent, rgba(8,8,8,0.95))",
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontWeight: 500,
                fontSize: "clamp(0.7rem, 1vw, 0.82rem)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#e8e8e8",
                margin: 0,
              }}>
                {project.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <>
            {/* Backdrop */}
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }} onClick={close}
              style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)",
                zIndex: 200, backdropFilter: "blur(5px)",
              }} />

            {/* Centering shell — NOT the layoutId element */}
            <div style={{
              position: "fixed", inset: 0, zIndex: 201,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "2rem", pointerEvents: "none",
            }}>
              <motion.div
                layoutId={`card-${expanded.id}`}
                transition={SPRING}
                style={{
                  width: "min(100%, 860px)", maxHeight: "85vh", overflowY: "auto",
                  background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 4, pointerEvents: "all", position: "relative",
                }}
              >
                <div style={{ padding: "clamp(1.5rem, 4vw, 2.25rem)" }}>
                  {/* Close */}
                  <button onClick={close} aria-label="Close" style={{
                    position: "absolute", top: 14, right: 14,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 3, color: "rgba(232,232,232,0.55)", width: 30, height: 30,
                    cursor: "pointer", fontFamily: "var(--font-mono), monospace", fontSize: 20,
                    display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
                  }}>×</button>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "var(--font-display), var(--font-mono), sans-serif",
                    fontWeight: 700, fontSize: "clamp(1rem, 2.2vw, 1.45rem)",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "#e8e8e8", marginBottom: "1.5rem", paddingRight: 40,
                  }}>
                    {expanded.title}
                  </h3>

                  {/* Slider */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <ImageSlider images={expanded.images} title={expanded.title} />
                  </div>

                  {/* Description */}
                  <p style={{
                    fontFamily: "var(--font-mono), monospace", fontWeight: 300,
                    fontSize: "clamp(0.76rem, 1.05vw, 0.86rem)", color: "rgba(232,232,232,0.6)",
                    lineHeight: 1.85, marginBottom: "1.5rem",
                  }}>
                    {expanded.description}
                  </p>

                  {/* Tags */}
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

                  {/* GitHub */}
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
