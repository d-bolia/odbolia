"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TimelineEntry {
  id: number
  type: string
  organization: string
  role: string
  dates: string
  location: string
  routingStyle: string
  description: string
  context: string | null
}

const timelineData: TimelineEntry[] = [
  {
    id: 1,
    type: "education",
    organization: "University of California, Irvine",
    role: "B.S. Electrical Engineering — Semiconductors & Optoelectronics",
    dates: "Sep 2024 – Jun 2026",
    location: "Irvine, CA",
    routingStyle: "engineering",
    description:
      "Relevant Coursework: IC Design (Cadence Virtuoso), Digital Systems (SystemVerilog), Signals & Systems, Semiconductor Devices, Power Distribution, Embedded Systems, Network Analysis, MATLAB/Simulink modeling. Dean's Award Recipient — Photon Flight Autonomous UAV Capstone Project.",
    context: null,
  },
  {
    id: 2,
    type: "project",
    organization: "Photon Flight",
    role: "Hardware & Systems Engineer — Senior Design Capstone",
    dates: "Sep 2024 – Jun 2026",
    location: "Irvine, CA",
    routingStyle: "engineering",
    description:
      "Designed and integrated a fiber-optic-tethered autonomous quadcopter platform for operation in RF-denied and GPS-degraded environments, enabling resilient navigation and communication without wireless dependency. Developed MAVLink telemetry pipeline and onboard AI inference engine achieving 75% object detection accuracy during controlled flight demonstrations exceeding 20 minutes of sustained operation. Performed notch filter analysis of flight log data in MATLAB and ArduPilot to identify noise sources in the control loop; optimized PID gains improving closed-loop stability and dynamic response by ~12%. Executed hardware integration and 3D modeling in SolidWorks. Dean's Award Recipient.",
    context: "PLACEHOLDER — Desmond to write",
  },
  {
    id: 3,
    type: "experience",
    organization: "Helix Electric, Inc.",
    role: "Project Engineer",
    dates: "Apr 2017 – Aug 2018",
    location: "Oakland, CA",
    routingStyle: "engineering",
    description:
      "Served as Project Engineer across commercial, residential high-rise, and tenant improvement developments; coordinated scope, schedule, budget, and physical implementation between field crews and management. Utilized Autodesk Suite (AutoCAD, Revit, Navisworks) for design coordination and construction documentation; operated TOPCON and Trimble GNSS equipment for field verification. Developed an Excel/Bluebeam-integrated tracking process adopted as the department standard; built and maintained workbooks for labor hour tracking, materials procurement, and budget forecasting. Supported monthly invoicing cycles and change order negotiation.",
    context:
      "Helix is the foundation — the match that lit the fuse. Bouncing between job sites and the office, laying electrical foundations, working in CAD, generating labor tracking in Excel, developing systems that became our department standard. I'd interact with the engineers who drafted our plans, who 3D-modeled complex systems, and I wanted to be a part of that world. Helix was my real-world internship. It is why I went back to school.",
  },
  {
    id: 4,
    type: "personal",
    organization: "Working Through School",
    role: "Server — Beachcomber Cafe · South of Nick's · R+D Kitchen",
    dates: "Aug 2024 – Present",
    location: "Orange County, CA",
    routingStyle: "organic",
    description:
      "Beachcomber Cafe (Crystal Cove) · South of Nick's (Laguna Beach) · R+D Kitchen (Newport Beach)",
    context:
      "Since attending UCI, I've put myself through school working in the restaurant industry — finding roles where I could earn enough to sustain myself while maintaining a schedule that kept my studies first. Despite forgoing internships in the interest of financial stability, working in service has sharpened communication under pressure, teamwork, and attention to detail in ways a classroom rarely does.",
  },
  {
    id: 5,
    type: "experience",
    organization: "RH (Restoration Hardware)",
    role: "Operations Associate / Design Support",
    dates: "Nov 2019 – Aug 2023",
    location: "Walnut Creek, CA",
    routingStyle: "organic",
    description:
      "Cross-functional coordination across multiple departments contributing to 57% average YoY revenue growth over four years. Executed technical drawings, layouts, and client-facing presentations with the design team. Developed inventory management protocols improving operational accuracy and throughput.",
    context:
      "When I decided to go back to school for electrical engineering, I needed community college first — and a job with a flexible schedule. I found a remarkable team at RH. To this day, my coworkers and leadership were among the most capable, committed people I've worked alongside. The role kept my CAD skills sharp, honed my operations awareness, and let me learn from supervisors who modeled the kind of culture and execution that actually accomplishes things.",
  },
  {
    id: 6,
    type: "experience",
    organization: "Benicia Cabinetry",
    role: "Production Woodworker",
    dates: "Feb 2019 – Aug 2019",
    location: "Benicia, CA",
    routingStyle: "engineering",
    description:
      "End-to-end fabrication, assembly, and installation of custom cabinetry. Operated 5-axis CNC, edge bander, and plasma laser cutter to produce components with tight tolerances and high repeatability.",
    context:
      "A short foray intended to bridge work with a technical discipline — to see what engineering means at the production level. Working with my hands, running CNC, and assisting with bids and technical drawings was a great supplement to getting back into school. When it came time to prioritize coursework, the M-F 8-4 schedule made the choice for me.",
  },
  {
    id: 7,
    type: "experience",
    organization: "Caliber Academy",
    role: "Emergency Computer Science Teacher",
    dates: "Aug 2018 – Dec 2018",
    location: "Vallejo, CA",
    routingStyle: "organic",
    description:
      "Stepped in as an emergency semester computer science teacher at a charter school designed around student access to technology.",
    context:
      "I've coached lacrosse for over a decade and always had a voice in the back of my head urging me to try teaching. When a friend called about an emergency CS position, I knew it was the chance to scratch that itch. Caliber's mission — giving kids in a tough community access to technology — was inspiring. But I couldn't have been more relieved to find Christmas break. I learned I was not built for the classroom. I needed to make things. The journey back to school had officially begun.",
  },
  {
    id: 8,
    type: "experience",
    organization: "Rustic Pathways",
    role: "Program Manager / Sales Representative",
    dates: "Jun 2013 – Aug 2016",
    location: "Philadelphia, PA & International",
    routingStyle: "organic",
    description:
      "Led international high school travel and service programs in the Dominican Republic, Australia, and Peru. Managed logistics, vendor relationships, budget, and student safety in complex environments. Delivered 11% YoY increase in program purchases for domestic sales region.",
    context:
      "When I finished my first degree at Ohio State in Film, I needed to squeeze more out of life. I went to NOLS in Patagonia for mountaineering immediately after graduating, and from there found Rustic Pathways — arguably the coolest job a 22-year-old could ask for. Three months in the Dominican Republic, bringing communities running water for the first time. Back for a second summer. Then Australia, then Peru. It taught me logistics, budget, communication, and project management in the most remote and challenging corners of the world.",
  },
  {
    id: 9,
    type: "education",
    organization: "The Ohio State University",
    role: "B.A. Film",
    dates: "2009 – 2013",
    location: "Columbus, OH",
    routingStyle: "organic",
    description: "Undergraduate degree in Film.",
    context: "PLACEHOLDER — Desmond to write",
  },
]

// SVG coordinate space — viewBox="0 0 260 775"
const NODE_POS = [
  { x: 130, y: 50  },
  { x: 175, y: 130 },
  { x: 85,  y: 215 },
  { x: 150, y: 300 },
  { x: 95,  y: 385 },
  { x: 175, y: 470 },
  { x: 120, y: 555 },
  { x: 85,  y: 640 },
  { x: 150, y: 725 },
]

// Traces connecting consecutive nodes — len is approximate path length in px
const TRACES = [
  { d: "M 130 50 L 175 50 L 175 130",         len: 125, style: "engineering" },
  { d: "M 175 130 L 85 130 L 85 215",         len: 175, style: "engineering" },
  { d: "M 85 215 C 85 257 150 257 150 300",   len: 135, style: "organic"     },
  { d: "M 150 300 C 150 342 95 342 95 385",   len: 135, style: "organic"     },
  { d: "M 95 385 L 175 385 L 175 470",        len: 165, style: "engineering" },
  { d: "M 175 470 C 175 512 120 512 120 555", len: 130, style: "organic"     },
  { d: "M 120 555 C 120 597 85 597 85 640",   len: 120, style: "organic"     },
  { d: "M 85 640 C 85 682 150 682 150 725",   len: 120, style: "organic"     },
]

// true = label sits to the right of the node; false = left
const LABEL_RIGHT = [true, false, true, false, true, false, true, true, false]

function ContextAccordion({ context }: { context: string }) {
  const [open, setOpen] = useState(false)
  const isPlaceholder = context.toLowerCase().startsWith("placeholder")

  return (
    <div style={{ borderTop: "1px dashed rgba(255,255,255,0.08)", marginTop: "1.5rem", paddingTop: "1rem" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          background: "none",
          border: "none",
          padding: 0,
          color: "#6b7280",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ fontSize: "0.85rem", lineHeight: 1, color: "#60a5fa" }}>
          {open ? "−" : "+"}
        </span>
        Personal Context
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                paddingTop: "0.85rem",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                fontStyle: "italic",
                color: isPlaceholder ? "#F59E0B" : "rgba(232,232,232,0.5)",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {context}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Timeline() {
  const [activeIdx, setActiveIdx] = useState(0)

  const entry = timelineData[activeIdx]

  return (
    <section
      id="timeline"
      style={{
        background: "#0a0a0a",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div style={{ padding: "5rem clamp(2rem, 8vw, 8rem) 2.5rem", flexShrink: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display), var(--font-mono), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
              letterSpacing: "0.1em",
              color: "#e8e8e8",
              lineHeight: 1,
              textTransform: "uppercase",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderLeft: "3px solid #60a5fa",
              borderRadius: "0 4px 4px 0",
              padding: "0.6rem 1.4rem 0.6rem 1.2rem",
              backdropFilter: "blur(12px)",
              margin: 0,
            }}
          >
            Timeline
          </h2>
        </motion.div>
      </div>

      {/* ── Two-panel body ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: "clamp(2rem, 4vw, 4rem)",
          padding: "0 clamp(2rem, 8vw, 8rem) 3rem",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Left panel — scrollable node map */}
        <div
          style={{
            width: 360,
            flexShrink: 0,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div style={{ position: "relative", width: 360, paddingBottom: "3rem" }}>
            <svg
              viewBox="0 0 260 775"
              width={260}
              style={{ display: "block", overflow: "visible" }}
            >
              {/* ── Base traces (always visible, dim) ── */}
              {TRACES.map((trace, i) => (
                <path
                  key={`base-${i}`}
                  d={trace.d}
                  stroke="#1e3a5f"
                  strokeWidth={1.5}
                  fill="none"
                  opacity={0.65}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* ── Lit traces (animated reveal toward active node) ── */}
              {TRACES.map((trace, i) => (
                <path
                  key={`lit-${i}`}
                  d={trace.d}
                  stroke="#60a5fa"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={`${trace.len} ${trace.len}`}
                  style={{
                    strokeDashoffset: i < activeIdx ? 0 : trace.len,
                    opacity: i < activeIdx ? 0.7 : 0,
                    transition: `stroke-dashoffset 0.45s ease-out ${i * 0.08}s, opacity 0.3s ease ${i * 0.08}s`,
                  }}
                />
              ))}

              {/* ── Nodes ── */}
              {NODE_POS.map((pos, i) => {
                const isActive = i === activeIdx
                const dist = Math.abs(i - activeIdx)
                const nodeOpacity =
                  dist === 0 ? 1 : dist === 1 ? 0.65 : dist === 2 ? 0.42 : 0.22

                return (
                  <g
                    key={`node-${i}`}
                    onClick={() => setActiveIdx(i)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Outer glow */}
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={16}
                      fill="rgba(96,165,250,0.08)"
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                    />
                    {/* Outer ring */}
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={10}
                      fill="none"
                      stroke="rgba(96,165,250,0.3)"
                      strokeWidth={1}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                    />
                    {/* Main dot */}
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      animate={{
                        r: isActive ? 6 : 3.5,
                        fill: isActive
                          ? "#60a5fa"
                          : i < activeIdx
                          ? "#2563eb"
                          : "#374151",
                        opacity: nodeOpacity,
                      }}
                      transition={{ duration: 0.25 }}
                    />
                  </g>
                )
              })}
            </svg>

            {/* ── HTML labels (positioned beside nodes) ── */}
            {NODE_POS.map((pos, i) => {
              const isActive = i === activeIdx
              const dist = Math.abs(i - activeIdx)
              const labelOpacity =
                dist === 0 ? 1 : dist === 1 ? 0.65 : dist === 2 ? 0.42 : 0.22
              const goRight = LABEL_RIGHT[i]

              return (
                <div
                  key={`label-${i}`}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    position: "absolute",
                    top: pos.y - 12,
                    cursor: "pointer",
                    opacity: labelOpacity,
                    transition: "opacity 0.25s",
                    ...(goRight
                      ? { left: pos.x + 14, maxWidth: 360 - pos.x - 14 }
                      : { left: 0, width: pos.x - 14, textAlign: "right" as const }),
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display), var(--font-mono), sans-serif",
                      fontWeight: isActive ? 700 : 400,
                      fontSize: "0.7rem",
                      letterSpacing: "0.05em",
                      color: isActive
                        ? "#60a5fa"
                        : i < activeIdx
                        ? "#3b82f6"
                        : "#6b7280",
                      lineHeight: 1.3,
                      margin: 0,
                      whiteSpace: "nowrap" as const,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      transition: "color 0.25s",
                    }}
                  >
                    {timelineData[i].organization}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "0.58rem",
                      letterSpacing: "0.04em",
                      color: "rgba(107,114,128,0.6)",
                      lineHeight: 1.3,
                      margin: "2px 0 0",
                    }}
                  >
                    {timelineData[i].dates}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right panel — index card */}
        <div style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.75rem",
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#60a5fa",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase" as const,
                    color: "#6b7280",
                  }}
                >
                  INDEX
                </span>
              </div>

              {/* Organization */}
              <h3
                style={{
                  fontFamily: "var(--font-display), var(--font-mono), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                  color: "#60a5fa",
                  marginBottom: "0.4rem",
                  lineHeight: 1.2,
                }}
              >
                {entry.organization}
              </h3>

              {/* Dates + location */}
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.05em",
                  color: "#6b7280",
                  margin: "0 0 0.85rem",
                }}
              >
                {entry.dates} · {entry.location}
              </p>

              {/* Role */}
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontWeight: 500,
                  fontSize: "clamp(0.78rem, 1.1vw, 0.9rem)",
                  color: "#ffffff",
                  lineHeight: 1.5,
                  margin: "0 0 1.25rem",
                }}
              >
                {entry.role}
              </p>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontWeight: 300,
                  fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                {entry.description}
              </p>

              {entry.context && <ContextAccordion context={entry.context} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
