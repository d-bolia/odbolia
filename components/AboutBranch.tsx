// Extended About / Career Journey — placeholder content

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  textTransform: "uppercase",
}

export default function AboutBranch() {
  return (
    <div>
      <h2
        style={{
          ...MONO,
          fontWeight: 600,
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          letterSpacing: "0.14em",
          color: "#e8e8e8",
          marginBottom: "2.5rem",
        }}
      >
        Career Journey
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          color: "rgba(232,232,232,0.6)",
          fontFamily: "var(--font-mono), monospace",
          fontWeight: 300,
          fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
          lineHeight: 1.8,
        }}
      >
        <TimelineEntry
          period="2020 — 2024"
          title="B.S. Electrical Engineering"
          sub="University of California, Irvine — Semiconductor & Optoelectronics"
          body="Concentrated in IC design and optoelectronics. Completed coursework in VLSI design, analog circuits, photonics, and digital systems. Developed a fiber-optic-tethered drone platform as a senior capstone project."
        />
        <TimelineEntry
          period="2022 — 2023"
          title="Project Engineer"
          sub="Helix Electrical, Inc."
          body="Managed electrical construction projects across commercial and industrial sites. Coordinated subcontractors, maintained schedules, and interfaced with clients on system specifications and change orders."
        />
        <TimelineEntry
          period="Ongoing"
          title="Independent Engineering Projects"
          sub="Hardware · Firmware · IC Design"
          body="Continuing to develop expertise in embedded systems, FPGA design, and autonomous hardware platforms. Extended content coming soon."
        />
      </div>
    </div>
  )
}

function TimelineEntry({
  period,
  title,
  sub,
  body,
}: {
  period: string
  title: string
  sub: string
  body: string
}) {
  return (
    <div
      style={{
        borderLeft: "1px solid rgba(232,232,232,0.12)",
        paddingLeft: "1.5rem",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          fontSize: "0.7rem",
          color: "rgba(232,232,232,0.3)",
          marginBottom: "0.4rem",
        }}
      >
        {period}
      </p>
      <p
        style={{
          fontWeight: 600,
          color: "#e8e8e8",
          marginBottom: "0.25rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontSize: "0.9rem",
        }}
      >
        {title}
      </p>
      <p
        style={{
          color: "rgba(232,232,232,0.45)",
          letterSpacing: "0.08em",
          fontSize: "0.78rem",
          marginBottom: "0.75rem",
          textTransform: "uppercase",
        }}
      >
        {sub}
      </p>
      <p style={{ fontSize: "0.92rem", textTransform: "none", letterSpacing: "0.01em" }}>
        {body}
      </p>
    </div>
  )
}
