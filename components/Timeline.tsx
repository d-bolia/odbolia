"use client"

import { useState, useRef, useEffect } from "react"

interface SubProject {
  organization: string
  role: string
  description: string
  context: string | null
}

interface TimelineEntry {
  id: number
  type: string
  organization: string
  role: string
  dates: string
  location: string
  description: string
  context: string | null
  subProject?: SubProject
}

const timelineData: TimelineEntry[] = [
  {
    id: 1,
    type: "education",
    organization: "University of California, Irvine",
    role: "B.S. Electrical Engineering — Semiconductors & Optoelectronics",
    dates: "Sep 2024 – Jun 2026",
    location: "Irvine, CA",
    description:
      "Relevant Coursework: IC Design (Cadence Virtuoso), Digital Systems (SystemVerilog), Signals & Systems, Semiconductor Devices, Power Distribution, Embedded Systems, Network Analysis, MATLAB/Simulink modeling. Dean's Award Recipient — Photon Flight Autonomous UAV Capstone Project.",
    context: null,
    subProject: {
      organization: "Photon Flight",
      role: "Hardware & Systems Engineer — Senior Design Capstone",
      description:
        "Designed and integrated a fiber-optic-tethered autonomous quadcopter platform for operation in RF-denied and GPS-degraded environments, enabling resilient navigation and communication without wireless dependency. Developed MAVLink telemetry pipeline and onboard AI inference engine achieving 75% object detection accuracy during controlled flight demonstrations exceeding 20 minutes of sustained operation. Performed notch filter analysis of flight log data in MATLAB and ArduPilot to identify noise sources in the control loop; optimized PID gains improving closed-loop stability and dynamic response by ~12%. Executed hardware integration and 3D modeling in SolidWorks. Dean's Award Recipient.",
      context: "PLACEHOLDER — Desmond to write",
    },
  },
  {
    id: 2,
    type: "personal",
    organization: "Working Through School",
    role: "Server — Beachcomber Cafe · South of Nick's · R+D Kitchen",
    dates: "Aug 2024 – Present",
    location: "Orange County, CA",
    description:
      "Beachcomber Cafe (Crystal Cove) · South of Nick's (Laguna Beach) · R+D Kitchen (Newport Beach)",
    context:
      "Since attending UCI, I've put myself through school working in the restaurant industry — finding roles where I could earn enough to sustain myself while maintaining a schedule that kept my studies first. Despite forgoing internships in the interest of financial stability, working in service has sharpened communication under pressure, teamwork, and attention to detail in ways a classroom rarely does.",
  },
  {
    id: 3,
    type: "experience",
    organization: "RH (Restoration Hardware)",
    role: "Operations Associate / Design Support",
    dates: "Nov 2019 – Aug 2023",
    location: "Walnut Creek, CA",
    description:
      "Cross-functional coordination across multiple departments contributing to 57% average YoY revenue growth over four years. Executed technical drawings, layouts, and client-facing presentations with the design team. Developed inventory management protocols improving operational accuracy and throughput.",
    context:
      "When I decided to go back to school for electrical engineering, I needed community college first — and a job with a flexible schedule. I found a remarkable team at RH. To this day, my coworkers and leadership were among the most capable, committed people I've worked alongside. The role kept my CAD skills sharp, honed my operations awareness, and let me learn from supervisors who modeled the kind of culture and execution that actually accomplishes things.",
  },
  {
    id: 4,
    type: "experience",
    organization: "Benicia Cabinetry",
    role: "Production Woodworker",
    dates: "Feb 2019 – Aug 2019",
    location: "Benicia, CA",
    description:
      "End-to-end fabrication, assembly, and installation of custom cabinetry. Operated 5-axis CNC, edge bander, and plasma laser cutter to produce components with tight tolerances and high repeatability.",
    context:
      "A short foray intended to bridge work with a technical discipline — to see what engineering means at the production level. Working with my hands, running CNC, and assisting with bids and technical drawings was a great supplement to getting back into school. When it came time to prioritize coursework, the M-F 8-4 schedule made the choice for me.",
  },
  {
    id: 5,
    type: "experience",
    organization: "Caliber Academy",
    role: "Emergency Computer Science Teacher",
    dates: "Aug 2018 – Dec 2018",
    location: "Vallejo, CA",
    description:
      "Stepped in as an emergency semester computer science teacher at a charter school designed around student access to technology.",
    context:
      "I've coached lacrosse for over a decade and always had a voice in the back of my head urging me to try teaching. When a friend called about an emergency CS position, I knew it was the chance to scratch that itch. Caliber's mission — giving kids in a tough community access to technology — was inspiring. But I couldn't have been more relieved to find Christmas break. I learned I was not built for the classroom. I needed to make things. The journey back to school had officially begun.",
  },
  {
    id: 6,
    type: "experience",
    organization: "Rustic Pathways",
    role: "Program Manager / Sales Representative",
    dates: "Jun 2013 – Aug 2016",
    location: "Philadelphia, PA & International",
    description:
      "Led international high school travel and service programs in the Dominican Republic, Australia, and Peru. Managed logistics, vendor relationships, budget, and student safety in complex environments. Delivered 11% YoY increase in program purchases for domestic sales region.",
    context:
      "When I finished my first degree at Ohio State in Film, I needed to squeeze more out of life. I went to NOLS in Patagonia for mountaineering immediately after graduating, and from there found Rustic Pathways — arguably the coolest job a 22-year-old could ask for. Three months in the Dominican Republic, bringing communities running water for the first time. Back for a second summer. Then Australia, then Peru. It taught me logistics, budget, communication, and project management in the most remote and challenging corners of the world.",
  },
  {
    id: 7,
    type: "education",
    organization: "The Ohio State University",
    role: "B.A. Film",
    dates: "2009 – 2013",
    location: "Columbus, OH",
    description: "Undergraduate degree in Film.",
    context: "PLACEHOLDER — Desmond to write",
  },
]

// Spine sits at x=95 (~34% of 280 viewBox) — biased left to give more room for right labels
const NODE_POS = [
  { x: 95, y: 50  },
  { x: 95, y: 160 },
  { x: 95, y: 270 },
  { x: 95, y: 380 },
  { x: 95, y: 490 },
  { x: 95, y: 600 },
  { x: 95, y: 710 },
]

const TRACES = [
  { d: "M 95 50 L 95 160",  len: 110 },
  { d: "M 95 160 L 95 270", len: 110 },
  { d: "M 95 270 L 95 380", len: 110 },
  { d: "M 95 380 L 95 490", len: 110 },
  { d: "M 95 490 L 95 600", len: 110 },
  { d: "M 95 600 L 95 710", len: 110 },
]

const NODE_SHORT = [
  "UC Irvine",
  "Working Through School",
  "RH",
  "Benicia Cabinetry",
  "Caliber Academy",
  "Rustic Pathways",
  "Ohio State",
]

export default function Timeline() {
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx)
            setActiveIdx(idx)
          }
        })
      },
      {
        root: container,
        threshold: 0.6,
      }
    )

    entryRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div
      style={{
        height: "calc(100dvh - 84px)",
        marginBottom: "-6rem",
        marginRight: "calc(-1 * clamp(2rem, 8vw, 8rem))",
        display: "flex",
        gap: "clamp(1.5rem, 3vw, 3rem)",
        overflow: "visible",
      }}
    >
      {/* ── Left panel — 25%, center spine, alternating labels ───────────── */}
      <div
        style={{
          width: "30%",
          flexShrink: 0,
          height: "100%",
          overflow: "visible",
          paddingLeft: "24px",
        }}
      >
        <svg
          viewBox="0 0 280 760"
          width="100%"
          height="100%"
          style={{ display: "block", overflow: "visible" }}
          preserveAspectRatio="xMinYMid meet"
        >
          {/* Base spine */}
          {TRACES.map((trace, i) => (
            <path
              key={`base-${i}`}
              d={trace.d}
              stroke="#1e3a5f"
              strokeWidth={1.5}
              fill="none"
              opacity={0.7}
              strokeLinecap="square"
            />
          ))}

          {/* Lit traces */}
          {TRACES.map((trace, i) => (
            <path
              key={`lit-${i}`}
              d={trace.d}
              stroke="#60a5fa"
              strokeWidth={2}
              fill="none"
              strokeLinecap="square"
              strokeDasharray={`${trace.len} ${trace.len}`}
              style={{
                strokeDashoffset: i < activeIdx ? 0 : trace.len,
                opacity: i < activeIdx ? 0.75 : 0,
                transition: `stroke-dashoffset 0.45s ease-out ${i * 0.07}s, opacity 0.3s ease ${i * 0.07}s`,
              }}
            />
          ))}

          {/* Nodes */}
          {NODE_POS.map((pos, i) => {
            const isActive = i === activeIdx
            const dist = Math.abs(i - activeIdx)
            const nodeOpacity =
              dist === 0 ? 1 : dist === 1 ? 0.65 : dist === 2 ? 0.42 : 0.22
            return (
              <g key={`node-${i}`}>
                {isActive && (
                  <>
                    <circle
                      cx={pos.x} cy={pos.y} r={18}
                      fill="rgba(96,165,250,0.07)"
                    />
                    <circle
                      cx={pos.x} cy={pos.y} r={12}
                      fill="none"
                      stroke="rgba(96,165,250,0.25)"
                      strokeWidth={1}
                    />
                  </>
                )}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 7 : 4.5}
                  fill={isActive ? "#60a5fa" : i < activeIdx ? "#2563eb" : "#374151"}
                  opacity={nodeOpacity}
                  style={{ transition: "r 0.3s ease, fill 0.3s ease, opacity 0.3s ease" }}
                />
              </g>
            )
          })}

          {/* Labels — alternating sides of spine, never crossing it */}
          {NODE_POS.map((pos, i) => {
            const isActive = i === activeIdx
            const dist = Math.abs(i - activeIdx)
            const labelOpacity =
              dist === 0 ? 1 : dist === 1 ? 0.65 : dist === 2 ? 0.42 : 0.22
            // even indices (0,2,4,6) → right of spine; odd (1,3,5) → left of spine
            const isRight = i % 2 === 0
            // 14px gap from spine (x=95): right labels start at 109, left labels end at 81
            const lx = isRight ? 109 : 81
            const anchor = isRight ? "start" : "end"
            const label = NODE_SHORT[i]
            const words = label.split(" ")
            const isLong = label.length > 15
            const line1 = isLong ? words.slice(0, Math.ceil(words.length / 2)).join(" ") : label
            const line2 = isLong ? words.slice(Math.ceil(words.length / 2)).join(" ") : ""
            const textFill = isActive ? "#60a5fa" : i < activeIdx ? "#3b82f6" : "#6b7280"
            return (
              <g
                key={`label-${i}`}
                style={{ opacity: labelOpacity, transition: "opacity 0.3s ease" }}
              >
                <text
                  x={lx}
                  y={isLong ? pos.y - 12 : pos.y - 5}
                  textAnchor={anchor}
                  fill={textFill}
                  fontFamily="var(--font-display), var(--font-mono), sans-serif"
                  fontWeight={isActive ? 700 : 400}
                  fontSize={18}
                  style={{ transition: "fill 0.3s ease" }}
                >
                  {line1}
                </text>
                {isLong && (
                  <text
                    x={lx}
                    y={pos.y + 14}
                    textAnchor={anchor}
                    fill={textFill}
                    fontFamily="var(--font-display), var(--font-mono), sans-serif"
                    fontWeight={isActive ? 700 : 400}
                    fontSize={18}
                    style={{ transition: "fill 0.3s ease" }}
                  >
                    {line2}
                  </text>
                )}
                <text
                  x={lx}
                  y={isLong ? pos.y + 36 : pos.y + 19}
                  textAnchor={anchor}
                  fill="rgba(107,114,128,0.65)"
                  fontFamily="var(--font-mono), monospace"
                  fontSize={12}
                >
                  {timelineData[i].dates}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* ── Right panel — full-height snap sections ──────────────────────── */}
      <div
        ref={scrollRef}
        className="timeline-snap"
        style={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {timelineData.map((entry, i) => {
          const isPlaceholder = entry.context?.toLowerCase().startsWith("placeholder")
          return (
            <div
              key={entry.id}
              ref={(el) => { entryRefs.current[i] = el }}
              data-idx={String(i)}
              style={{
                height: "100%",
                flexShrink: 0,
                scrollSnapAlign: "start",
                overflowY: "auto",
                paddingTop: "2.5rem",
                paddingBottom: "2rem",
                paddingRight: "clamp(0.5rem, 1.5vw, 1.5rem)",
              }}
            >
              {/* Organization */}
              <h3
                style={{
                  fontFamily: "var(--font-display), var(--font-mono), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)",
                  color: "#60a5fa",
                  marginBottom: "0.3rem",
                  lineHeight: 1.2,
                }}
              >
                {entry.organization}
              </h3>

              {/* Dates + location */}
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.05em",
                  color: "#6b7280",
                  margin: "0 0 0.55rem",
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
                  margin: "0 0 1rem",
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
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                {entry.description}
              </p>

              {/* Context — always visible, no toggle */}
              {entry.context && (
                <p
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontWeight: 300,
                    fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                    fontStyle: "italic",
                    color: isPlaceholder ? "#F59E0B" : "#a3a3a3",
                    lineHeight: 1.85,
                    margin: "0.75rem 0 0",
                  }}
                >
                  {entry.context}
                </p>
              )}

              {/* Sub-project (Photon Flight nested under UCI) */}
              {entry.subProject && (() => {
                const sub = entry.subProject!
                const subIsPlaceholder = sub.context?.toLowerCase().startsWith("placeholder")
                return (
                  <div
                    style={{
                      marginTop: "2.5rem",
                      paddingTop: "1.5rem",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#22c55e",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "#6b7280",
                        }}
                      >
                        Capstone Project
                      </span>
                    </div>

                    <h4
                      style={{
                        fontFamily: "var(--font-display), var(--font-mono), sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                        color: "#22c55e",
                        marginBottom: "0.3rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {sub.organization}
                    </h4>

                    <p
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "0.7rem",
                        color: "#6b7280",
                        margin: "0 0 0.85rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {sub.role}
                    </p>

                    <p
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontWeight: 300,
                        fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                        color: "rgba(255,255,255,0.8)",
                        lineHeight: 1.85,
                        margin: 0,
                      }}
                    >
                      {sub.description}
                    </p>

                    {sub.context && (
                      <p
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontWeight: 300,
                          fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                          fontStyle: "italic",
                          color: subIsPlaceholder ? "#F59E0B" : "#a3a3a3",
                          lineHeight: 1.85,
                          margin: "0.75rem 0 0",
                        }}
                      >
                        {sub.context}
                      </p>
                    )}
                  </div>
                )
              })()}
            </div>
          )
        })}
      </div>
    </div>
  )
}
