"use client"

import { motion } from "framer-motion"

interface TimelineEntry {
  id: number
  type: string
  organization: string
  role: string
  dates: string
  location: string
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
    description: "Undergraduate degree in Film.",
    context: "PLACEHOLDER — Desmond to write",
  },
]

const TYPE_COLOR: Record<string, string> = {
  education: "#06B6D4",
  project:   "#22C55E",
  experience: "rgba(232,232,232,0.5)",
  personal:  "#A78BFA",
}

const rowVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
}

const centerVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
}

const leftVariant = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30, delay: 0.12 },
  },
}

const rightVariant = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30, delay: 0.26 },
  },
}

function isPlaceholder(text: string) {
  return text.toLowerCase().startsWith("placeholder")
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      style={{
        background: "#0a0a0a",
        padding: "8rem 0 10rem",
        position: "relative",
      }}
    >
      {/* Section heading */}
      <div
        style={{
          padding: "0 clamp(2rem, 8vw, 8rem)",
          marginBottom: "5rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block" }}
        >
          <h2
            style={{
              fontFamily:    "var(--font-display), var(--font-mono), sans-serif",
              fontWeight:    700,
              fontSize:      "clamp(1.4rem, 3.5vw, 2.8rem)",
              letterSpacing: "0.1em",
              color:         "#e8e8e8",
              lineHeight:    1,
              textTransform: "uppercase",
              background:    "rgba(255,255,255,0.03)",
              border:        "1px solid rgba(255,255,255,0.07)",
              borderLeft:    "3px solid #06B6D4",
              borderRadius:  "0 4px 4px 0",
              padding:       "0.6rem 1.4rem 0.6rem 1.2rem",
              backdropFilter: "blur(12px)",
              margin:        0,
            }}
          >
            Timeline
          </h2>
        </motion.div>
      </div>

      {/* Entries */}
      <div
        style={{
          width: "100%",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(1rem, 4vw, 4rem)",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
        }}
      >
        {timelineData.map((entry) => (
          <motion.div
            key={entry.id}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: "clamp(1rem, 3vw, 3rem)",
              alignItems: "start",
              position: "relative",
            }}
          >
            {/* Left: role + description */}
            <motion.div variants={leftVariant} style={{ textAlign: "right" }}>
              <p
                style={{
                  fontFamily:    "var(--font-mono), monospace",
                  fontWeight:    500,
                  fontSize:      "clamp(0.78rem, 1.1vw, 0.9rem)",
                  letterSpacing: "0.06em",
                  color:         "#e8e8e8",
                  marginBottom:  "0.6rem",
                  lineHeight:    1.4,
                }}
              >
                {entry.role}
              </p>
              <p
                style={{
                  fontFamily:    "var(--font-mono), monospace",
                  fontWeight:    300,
                  fontSize:      "clamp(0.72rem, 1vw, 0.82rem)",
                  color:         "rgba(232,232,232,0.5)",
                  lineHeight:    1.75,
                }}
              >
                {entry.description}
              </p>
            </motion.div>

            {/* Center: org + dates + connector line */}
            <motion.div
              variants={centerVariant}
              style={{
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "center",
                gap:            "0.5rem",
                minWidth:       "clamp(120px, 16vw, 220px)",
                position:       "relative",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width:        10,
                  height:       10,
                  borderRadius: "50%",
                  background:   TYPE_COLOR[entry.type] ?? "rgba(232,232,232,0.4)",
                  flexShrink:   0,
                  boxShadow:    `0 0 8px ${TYPE_COLOR[entry.type] ?? "rgba(232,232,232,0.4)"}`,
                }}
              />
              <p
                style={{
                  fontFamily:    "var(--font-display), var(--font-mono), sans-serif",
                  fontWeight:    700,
                  fontSize:      "clamp(0.72rem, 1.1vw, 0.9rem)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color:         "#e8e8e8",
                  textAlign:     "center",
                  lineHeight:    1.3,
                }}
              >
                {entry.organization}
              </p>
              <p
                style={{
                  fontFamily:    "var(--font-mono), monospace",
                  fontWeight:    300,
                  fontSize:      "clamp(0.65rem, 0.9vw, 0.75rem)",
                  letterSpacing: "0.06em",
                  color:         "rgba(232,232,232,0.4)",
                  textAlign:     "center",
                }}
              >
                {entry.dates}
              </p>
              <p
                style={{
                  fontFamily:    "var(--font-mono), monospace",
                  fontWeight:    300,
                  fontSize:      "clamp(0.6rem, 0.85vw, 0.7rem)",
                  letterSpacing: "0.04em",
                  color:         "rgba(232,232,232,0.28)",
                  textAlign:     "center",
                }}
              >
                {entry.location}
              </p>
            </motion.div>

            {/* Right: context blurb */}
            <motion.div variants={rightVariant} style={{ textAlign: "left" }}>
              {entry.context !== null && (
                isPlaceholder(entry.context) ? (
                  <p
                    style={{
                      fontFamily:    "var(--font-mono), monospace",
                      fontWeight:    300,
                      fontSize:      "clamp(0.72rem, 1vw, 0.82rem)",
                      fontStyle:     "italic",
                      color:         "#F59E0B",
                      lineHeight:    1.75,
                    }}
                  >
                    {entry.context}
                  </p>
                ) : (
                  <p
                    style={{
                      fontFamily:    "var(--font-mono), monospace",
                      fontWeight:    300,
                      fontSize:      "clamp(0.72rem, 1vw, 0.82rem)",
                      fontStyle:     "italic",
                      color:         "rgba(232,232,232,0.42)",
                      lineHeight:    1.75,
                    }}
                  >
                    {entry.context}
                  </p>
                )
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Vertical spine line */}
      <div
        aria-hidden
        style={{
          position:       "absolute",
          top:            "8rem",
          bottom:         "10rem",
          left:           "50%",
          transform:      "translateX(-50%)",
          width:          1,
          background:     "linear-gradient(to bottom, transparent, rgba(232,232,232,0.08) 10%, rgba(232,232,232,0.08) 90%, transparent)",
          pointerEvents:  "none",
        }}
      />
    </section>
  )
}
