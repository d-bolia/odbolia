"use client"

import { useEffect, useRef, useState } from "react"

interface BinaryRevealProps {
  text: string
  startDelay?: number   // ms before scrambling begins
  totalDuration?: number // ms for full reveal after startDelay
  style?: React.CSSProperties
  className?: string
}

const CHARS = "01"

export default function BinaryReveal({
  text,
  startDelay = 0,
  totalDuration = 3000,
  style,
  className,
}: BinaryRevealProps) {
  const [displayed, setDisplayed] = useState<string[]>(() =>
    text.split("").map(() => " ")
  )
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const chars = text.split("")
    const lockedAt: number[] = chars.map((_, i) => {
      if (chars[i] === " ") return 0 // spaces lock immediately
      return startDelay + (totalDuration * (i + 1)) / chars.filter((c) => c !== " ").length
    })

    // Remap locked times onto non-space chars in order
    let nonSpaceIdx = 0
    const scheduledLocks = chars.map((c) => {
      if (c === " ") return 0
      const t = startDelay + (totalDuration * (nonSpaceIdx + 1)) / chars.filter((ch) => ch !== " ").length
      nonSpaceIdx++
      return t
    })

    const start = performance.now()

    setDisplayed(chars.map((c) => (c === " " ? " " : " ")))

    const startTimer = setTimeout(() => {
      frameRef.current = setInterval(() => {
        const elapsed = performance.now() - start
        setDisplayed(
          chars.map((c, i) => {
            if (c === " ") return " "
            if (elapsed >= scheduledLocks[i]) return c
            // Scramble: pick a random binary char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
        )

        // Stop when all chars locked
        if (elapsed >= startDelay + totalDuration) {
          if (frameRef.current !== null) clearInterval(frameRef.current)
          setDisplayed(chars)
        }
      }, 60)
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      if (frameRef.current !== null) clearInterval(frameRef.current)
    }
  }, [text, startDelay, totalDuration])

  return (
    <span style={{ fontFamily: "inherit", ...style }} className={className}>
      {displayed.map((ch, i) => (
        <span
          key={i}
          style={{
            fontFamily: "inherit",
            display: "inline-block",
            minWidth: ch === " " ? "0.4em" : undefined,
            opacity: ch === " " || ch === text[i] ? 1 : 0.5,
            transition: ch === text[i] ? "opacity 0.15s ease" : undefined,
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}
