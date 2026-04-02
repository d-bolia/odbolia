"use client"

import { motion } from "framer-motion"
import { BGPattern } from "./BGPattern"

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  textTransform: "uppercase",
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={22} height={22} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={22} height={22} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>
}

export default function ContactSection({ sectionRef }: ContactSectionProps) {
  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="contact"
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
        fill="rgba(236,72,153,0.09)"
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
            marginBottom: "3.5rem",
            lineHeight: 1,
          }}
        >
          Contact
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <ContactLink
            href="https://github.com/desmondbolia"
            label="GitHub"
            handle="github.com/desmondbolia"
            icon={<GitHubIcon />}
            delay={0.15}
          />
          <ContactLink
            href="https://linkedin.com/in/desmondbolia"
            label="LinkedIn"
            handle="linkedin.com/in/desmondbolia"
            icon={<LinkedInIcon />}
            delay={0.25}
          />
        </div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            ...MONO,
            fontWeight: 300,
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            color: "rgba(232,232,232,0.18)",
            marginTop: "6rem",
          }}
        >
          Continue scrolling to loop
        </motion.p>
      </div>
    </section>
  )
}

function ContactLink({
  href,
  label,
  handle,
  icon,
  delay,
}: {
  href: string
  label: string
  handle: string
  icon: React.ReactNode
  delay: number
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "1rem",
        color: "rgba(232,232,232,0.4)",
        textDecoration: "none",
        transition: "color 0.2s",
        width: "fit-content",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(232,232,232,0.9)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,232,232,0.4)")}
    >
      <span>{icon}</span>
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontWeight: 300,
          fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
          letterSpacing: "0.08em",
        }}
      >
        {handle}
      </span>
    </motion.a>
  )
}
