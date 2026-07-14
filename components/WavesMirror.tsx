"use client"
import { useEffect, useRef } from "react"
import { getWavesCanvas } from "./Waves"

interface WavesMirrorProps {
  opacity?: number
}

// Cheap per-section view into the single global Waves simulation running in
// <Waves>. Each mirror just blits the current master frame every tick — no
// noise/physics work of its own — so sections can reveal the wave field
// locally (behind their own content) without duplicating the simulation.
export function WavesMirror({ opacity = 0.35 }: WavesMirrorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const master = getWavesCanvas()
      if (master && master.width > 0 && master.height > 0 && canvas.width > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(
          master,
          0, 0, master.width, master.height,
          0, 0, canvas.width, canvas.height
        )
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        // Negative so it paints behind plain non-positioned section content
        // (positioned elements otherwise paint after static content
        // regardless of DOM order) while staying above BGPattern's -10.
        zIndex: -1,
        opacity,
        pointerEvents: "none",
      }}
    />
  )
}
