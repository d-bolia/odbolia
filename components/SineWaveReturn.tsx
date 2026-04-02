"use client"

// Decaying sine wave — amplitude diminishes left-to-right
// Used as the "return / back" icon inside branch panels

const WIDTH = 44
const HEIGHT = 22
const STEPS = 120
const FREQ = 2.5 // full cycles across the width

function buildPath() {
  const pts: string[] = []
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS
    const decay = Math.pow(1 - t, 1.2) // envelope: full amplitude → near zero
    const x = t * WIDTH
    const y =
      HEIGHT / 2 +
      Math.sin(t * Math.PI * 2 * FREQ) * (HEIGHT / 2 - 2) * decay
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return pts.join(" ")
}

const PATH_D = buildPath()

export default function SineWaveReturn({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Go back"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.5,
        transition: "opacity 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
    >
      <svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        fill="none"
        aria-hidden="true"
      >
        <path d={PATH_D} stroke="#e8e8e8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  )
}
