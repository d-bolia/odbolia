"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BGPattern } from "./BGPattern"

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  textTransform: "uppercase",
}

interface AboutSectionProps {
  onOpenBranch: () => void
  sectionRef: React.RefObject<HTMLElement | null>
  branchOpen?: boolean
}

export default function AboutSection({ onOpenBranch, sectionRef, branchOpen }: AboutSectionProps) {
  const [input, setInput] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset when the branch is closed (user clicks return)
  useEffect(() => {
    if (!branchOpen && submitted) {
      setSubmitted(false)
      setInput("")
    }
  }, [branchOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // Global keydown: pressing y anywhere fires the prompt immediately
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (submitted || branchOpen) return
      const tag = (e.target as HTMLElement).tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return
      if (e.key === "y" || e.key === "Y") {
        setInput("y")
        setSubmitted(true)
        onOpenBranch()
      }
    }
    window.addEventListener("keydown", handleGlobalKey)
    return () => window.removeEventListener("keydown", handleGlobalKey)
  }, [submitted, branchOpen, onOpenBranch])

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim().toLowerCase() === "y") {
        setSubmitted(true)
        onOpenBranch()
      } else {
        setInput("")
      }
    }
  }

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="about"
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
        fill="rgba(107,33,168,0.12)"
        size={28}
      />

      {/* Soft-edge backing — fades Waves behind content */}
      <div
        aria-hidden
        style={{
          position:      "absolute",
          inset:         0,
          background:    "radial-gradient(ellipse at center, #0a0a0a 0%, #0a0a0a 60%, transparent 100%)",
          zIndex:        6,
          pointerEvents: "none",
        }}
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
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "3rem", display: "inline-block" }}
        >
          <h2
            style={{
              fontFamily:     "var(--font-display), var(--font-mono), sans-serif",
              fontWeight:     700,
              fontSize:       "clamp(1.4rem, 3.5vw, 2.8rem)",
              letterSpacing:  "0.1em",
              color:          "#e8e8e8",
              lineHeight:     1,
              textTransform:  "uppercase",
              background:     "#0a0a0a",
              border:         "1px solid rgba(255,255,255,0.07)",
              borderLeft:     "3px solid #06B6D4",
              borderRadius:   "0 4px 4px 0",
              padding:        "0.6rem 1.4rem 0.6rem 1.2rem",
              margin:         0,
            }}
          >
            Profile
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontWeight: 300,
            fontSize: "clamp(0.88rem, 1.4vw, 1.05rem)",
            color: "#e8e8e8",
            lineHeight: 1.9,
            maxWidth: 720,
            marginBottom: "5rem",
          }}
        >
          Second Bachelor&apos;s Electrical Engineering graduate with hands-on
          experience in IC design, embedded systems, and autonomous hardware
          development, including a fiber-optic-tethered drone platform with
          onboard AI inference and MAVLink telemetry. Proficient in Cadence
          Virtuoso, SystemVerilog, Python, MATLAB, and circuit prototyping,
          with a project engineering background.
        </motion.p>

        {/* CLI terminal prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "clamp(0.75rem, 1.1vw, 0.88rem)",
            letterSpacing: "0.08em",
            color: "rgba(232,232,232,0.45)",
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
          onClick={() => inputRef.current?.focus()}
        >
          <span style={{ color: "rgba(107,33,168,0.8)", marginRight: "0.5em" }}>›</span>
          <span>explore my career journey to engineering?&nbsp;</span>
          <span style={{ color: "rgba(232,232,232,0.25)" }}>[y]</span>
          <span>:&nbsp;</span>
          {submitted ? (
            <span style={{ color: "rgba(6,182,212,0.8)" }}>y</span>
          ) : (
            <>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(-1))}
                onKeyDown={handleKey}
                maxLength={1}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#e8e8e8",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "inherit",
                  letterSpacing: "inherit",
                  width: "1.2ch",
                  caretColor: "rgba(232,232,232,0.8)",
                }}
                aria-label="Type y to explore career journey"
              />
              {/* Blinking cursor when input is empty */}
              {input === "" && (
                <motion.span
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  style={{
                    display: "inline-block",
                    width: "0.55em",
                    height: "0.9em",
                    background: "rgba(232,232,232,0.5)",
                    verticalAlign: "text-bottom",
                  }}
                />
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
