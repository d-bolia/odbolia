"use client"

import { motion } from "framer-motion"
import { BGPattern } from "./BGPattern"

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  textTransform: "uppercase",
}

// ── Project card icons ────────────────────────────────────────────────────────

function DroneIcon() {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 2" />
      <line x1="20" y1="10" x2="20" y2="4"  stroke="currentColor" strokeWidth="1.2" />
      <line x1="20" y1="30" x2="20" y2="36" stroke="currentColor" strokeWidth="1.2" />
      <line x1="10" y1="20" x2="4"  y2="20" stroke="currentColor" strokeWidth="1.2" />
      <line x1="30" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="4"  r="2" stroke="currentColor" strokeWidth="1" />
      <circle cx="20" cy="36" r="2" stroke="currentColor" strokeWidth="1" />
      <circle cx="4"  cy="20" r="2" stroke="currentColor" strokeWidth="1" />
      <circle cx="36" cy="20" r="2" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function ChipIcon() {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="11" y="11" width="18" height="18" stroke="currentColor" strokeWidth="1.2" />
      <rect x="15" y="15" width="10" height="10" stroke="currentColor" strokeWidth="0.7" />
      {[14, 20, 26].map((y) => (
        <line key={`l${y}`} x1="4" y1={y} x2="11" y2={y} stroke="currentColor" strokeWidth="1.2" />
      ))}
      {[14, 20, 26].map((y) => (
        <line key={`r${y}`} x1="29" y1={y} x2="36" y2={y} stroke="currentColor" strokeWidth="1.2" />
      ))}
      {[14, 20, 26].map((x) => (
        <line key={`t${x}`} x1={x} y1="4" x2={x} y2="11" stroke="currentColor" strokeWidth="1.2" />
      ))}
      {[14, 20, 26].map((x) => (
        <line key={`b${x}`} x1={x} y1="29" x2={x} y2="36" stroke="currentColor" strokeWidth="1.2" />
      ))}
    </svg>
  )
}

function AdderIcon() {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="24" height="24" stroke="currentColor" strokeWidth="1.2" />
      <line x1="20" y1="13" x2="20" y2="27" stroke="currentColor" strokeWidth="1.2" />
      <line x1="13" y1="20" x2="27" y2="20" stroke="currentColor" strokeWidth="1.2" />
      <rect x="4"  y="14" width="4" height="4" stroke="currentColor" strokeWidth="0.8" />
      <rect x="4"  y="22" width="4" height="4" stroke="currentColor" strokeWidth="0.8" />
      <rect x="32" y="18" width="4" height="4" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  )
}

function ThinFilmIcon() {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Layered thin film cross-section */}
      <rect x="6" y="10" width="28" height="4" stroke="currentColor" strokeWidth="1" />
      <rect x="6" y="18" width="28" height="4" stroke="currentColor" strokeWidth="1" />
      <rect x="6" y="26" width="28" height="4" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="6" x2="12" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="28" y1="6" x2="28" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="6"  y1="34" x2="34" y2="34" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

// ── Types ─────────────────────────────────────────────────────────────────────

type ProjectId = "drone" | "vlsi" | "adder" | "otft"

interface ProjectCardProps {
  id: ProjectId
  title: string
  subtitle: string
  icon: React.ReactNode
  index: number
  onClick: (id: ProjectId) => void
}

// ── Card ──────────────────────────────────────────────────────────────────────

function ProjectCard({ id, title, subtitle, icon, index, onClick }: ProjectCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(id)}
      style={{
        background: "transparent",
        border: "1px solid rgba(232,232,232,0.1)",
        cursor: "pointer",
        padding: "2rem",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        transition: "border-color 0.25s",
        borderRadius: 2,
        width: "100%",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(232,232,232,0.3)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(232,232,232,0.1)")
      }
    >
      <span style={{ color: "rgba(232,232,232,0.35)" }}>{icon}</span>
      <div>
        <p
          style={{
            ...MONO,
            fontWeight: 600,
            fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)",
            letterSpacing: "0.1em",
            color: "#e8e8e8",
            marginBottom: "0.35rem",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontWeight: 300,
            fontSize: "0.68rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(232,232,232,0.3)",
          }}
        >
          {subtitle}
        </p>
      </div>
    </motion.button>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

interface PortfolioSectionProps {
  onOpenBranch: (id: ProjectId) => void
  sectionRef: React.RefObject<HTMLElement | null>
}

export default function PortfolioSection({ onOpenBranch, sectionRef }: PortfolioSectionProps) {
  const projects: Omit<ProjectCardProps, "index" | "onClick">[] = [
    {
      id: "drone",
      title: "Fiber-Optic Tethered Drone",
      subtitle: "Embedded · AI · MAVLink",
      icon: <DroneIcon />,
    },
    {
      id: "vlsi",
      title: "VLSI JK Flip-Flop",
      subtitle: "Cadence Virtuoso · CMOS",
      icon: <ChipIcon />,
    },
    {
      id: "adder",
      title: "4-Bit Ripple Carry Adder",
      subtitle: "SystemVerilog · Digital Logic",
      icon: <AdderIcon />,
    },
    {
      id: "otft",
      title: "OTFT Fabrication Analysis",
      subtitle: "Optoelectronics · Thin Film",
      icon: <ThinFilmIcon />,
    },
  ]

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="portfolio"
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: "#0a0a0a",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <BGPattern
        variant="grid"
        mask="fade-edges"
        fill="rgba(6,182,212,0.09)"
        size={28}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          padding: "6rem clamp(2rem, 8vw, 8rem)",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...MONO,
            fontWeight: 600,
            fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
            letterSpacing: "0.14em",
            color: "#e8e8e8",
            marginBottom: "3rem",
            lineHeight: 1,
          }}
        >
          Selected Works
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              {...p}
              index={i}
              onClick={onOpenBranch}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
