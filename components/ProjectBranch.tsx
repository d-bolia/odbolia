// Individual project detail — placeholder shell

const PROJECTS: Record<
  string,
  { title: string; tags: string[]; description: string }
> = {
  drone: {
    title: "Fiber-Optic Tethered Drone",
    tags: ["Embedded Systems", "MAVLink", "AI Inference", "Fiber Optics"],
    description:
      "An autonomous drone platform tethered via fiber-optic cable for high-bandwidth, low-latency telemetry. Onboard AI inference pipeline processes sensor data in real time. MAVLink protocol handles flight controller communication. Full project documentation coming soon.",
  },
  vlsi: {
    title: "VLSI JK Flip-Flop",
    tags: ["Cadence Virtuoso", "CMOS", "VLSI", "IC Design"],
    description:
      "Full-custom CMOS JK flip-flop designed and simulated in Cadence Virtuoso. Includes schematic, layout, DRC/LVS verification, and transient analysis. Project documentation coming soon.",
  },
  adder: {
    title: "4-Bit Ripple Carry Adder",
    tags: ["SystemVerilog", "Digital Logic", "FPGA"],
    description:
      "Behavioral and structural RTL implementation of a 4-bit ripple carry adder in SystemVerilog. Includes testbench verification and timing analysis. Project documentation coming soon.",
  },
  otft: {
    title: "OTFT Fabrication Analysis",
    tags: ["Optoelectronics", "Thin Film", "Device Physics", "MATLAB"],
    description:
      "Analysis of organic thin-film transistor (OTFT) fabrication parameters and their effect on device performance. Includes mobility extraction, threshold voltage characterization, and MATLAB modeling. Project documentation coming soon.",
  },
}

export default function ProjectBranch({ projectId }: { projectId: string }) {
  const project = PROJECTS[projectId]
  if (!project) return null

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontWeight: 600,
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          letterSpacing: "0.14em",
          color: "#e8e8e8",
          textTransform: "uppercase",
          marginBottom: "1.25rem",
        }}
      >
        {project.title}
      </h2>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(232,232,232,0.5)",
              border: "1px solid rgba(232,232,232,0.15)",
              padding: "4px 10px",
              borderRadius: 2,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontWeight: 300,
          fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
          color: "rgba(232,232,232,0.6)",
          lineHeight: 1.85,
          maxWidth: 680,
        }}
      >
        {project.description}
      </p>

      {/* Placeholder content area */}
      <div
        style={{
          marginTop: "3rem",
          height: 240,
          border: "1px solid rgba(232,232,232,0.08)",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(232,232,232,0.2)",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Schematics / media coming soon
      </div>
    </div>
  )
}
