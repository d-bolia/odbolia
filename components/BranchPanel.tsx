"use client"

import { motion } from "framer-motion"
import SineWaveReturn from "./SineWaveReturn"

interface BranchPanelProps {
  onClose: () => void
  children: React.ReactNode
}

export default function BranchPanel({ onClose, children }: BranchPanelProps) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 220 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        zIndex: 200,
        overflowY: "auto",
      }}
    >
      {/* Subtle grid in panel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      {/* Return button */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, padding: "20px 24px" }}>
        <SineWaveReturn onClick={onClose} />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          padding: "0 clamp(2rem, 8vw, 8rem) 6rem",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
