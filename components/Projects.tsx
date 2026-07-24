"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { WavesMirror } from "./WavesMirror"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  github: string | null
  images: string[]
  captions?: string[]
  codeSnippets?: { atIndex: number; code: string }[]
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Photon Flight",
    description:
      "Designed and integrated a fiber-optic-tethered autonomous quadcopter platform for operation in RF-denied and GPS-degraded environments, enabling resilient navigation and communication without wireless dependency. Developed MAVLink telemetry pipeline and onboard AI inference engine achieving 75% object detection accuracy during controlled flight demonstrations exceeding 20 minutes of sustained operation. Performed notch filter analysis of flight log data in MATLAB and ArduPilot to identify noise sources in the control loop; optimized PID gains improving closed-loop stability and dynamic response by ~12%. Executed hardware integration and 3D modeling in SolidWorks.",
    tags: ["MAVLink", "ArduPilot", "PID Control", "AI Inference", "SolidWorks", "MATLAB"],
    github: "https://github.com/mervinnguyen/photonflight_fiber_optic_d",
    images: ["/images/projects/photon-flight-hero.png"],
  },
  {
    id: 2,
    title: "MSPM0 Exploration Board",
    description:
      "Custom PCB designed in KiCad around the Texas Instruments MSPM0 microcontroller, replicating the basic pinout and setup of an Arduino Nano. A ground-up exercise in schematic capture and PCB layout for a familiar embedded target.",
    tags: ["KiCad", "MSPM0", "Texas Instruments", "PCB Layout", "Schematic", "Embedded"],
    github: null,
    images: [
      "/images/projects/MSPM0-pcb1-3d.png",
      "/images/projects/MSPM0-pcb1-schem.png",
      "/images/projects/MSPM0-pcb1-trace.png",
    ],
  },
  {
    id: 3,
    title: "USB to UART Bridge",
    description:
      "Compact USB to UART bridge PCB built around the CP2102. Designed for reliable serial communication between development hardware and a host machine.",
    tags: ["KiCad", "CP2102", "USB", "UART", "PCB Layout", "Schematic"],
    github: null,
    images: [
      "/images/projects/usbuart-pcb2-3d.png",
      "/images/projects/usbuart-pcb2-schem.png",
      "/images/projects/usbuart-pcb2-trace.png",
    ],
  },
  {
    id: 4,
    title: "Analog & VLSI",
    description:
      "IC design and layout work completed in Cadence Virtuoso on TSMC 250nm process. Projects increase in complexity from basic logic gates through a 4-bit ripple-carry adder/subtractor and a JK master-slave flip-flop at 1GHz. Includes schematic capture, layout, DRC/LVS verification, and transient simulation waveforms.",
    tags: ["Cadence Virtuoso", "TSMC 250nm", "CMOS", "DRC/LVS", "Schematic", "Layout"],
    github: null,
    images: [
      "/images/projects/vlsi-norschem.png",
      "/images/projects/vlsi-2inputnand.png",
      "/images/projects/vlsi-3inputnand.png",
      "/images/projects/vlsi-booleanchem.png",
      "/images/projects/vlsi-booleandrc.png",
      "/images/projects/vlsi-booleansymbol.png",
      "/images/projects/vlsi-booleantransient.png",
      "/images/projects/vlsi-xor.png",
      "/images/projects/vlsi-1bitadder-schem.png",
      "/images/projects/vlsi-4bitadder-schem.png",
      "/images/projects/vlsi-jkffschem.png",
      "/images/projects/4bitadder.1.png",
      "/images/projects/4bitadder.2.png",
      "/images/projects/4bitadder.3.png",
      "/images/projects/4bitadder.4.png",
    ],
    captions: [
      "Two-Input NOR Gate Schematic (Body Bias)",
      "Two-Input NAND Gate Schematic (Body Bias)",
      "Three-Input NAND Gate Schematic (Body Bias)",
      "Six-Input Logic Schematic | G = !((A + B + C) · D · (E + F))",
      "DRC Verification for Six-Input Boolean Logic",
      "Six-Input Boolean Symbol",
      "Six-Input Boolean Transient Analysis",
      "Two-Input XOR Schematic",
      "One-Bit Adder Symbol",
      "4-Bit Ripple Carry Adder Symbol",
      "JK-MS Flip Flop Symbol",
      "4-Bit Ripple Carry Adder Verification (1)",
      "4-Bit Ripple Carry Adder Verification (2)",
      "4-Bit Ripple Carry Adder Verification (3)",
      "4-Bit Ripple Carry Adder Verification (4)",
    ],
  },
  {
    id: 5,
    title: "MATLAB",
    description:
      "A collection of projects spanning a range of engineering domains — demonstrating fluency across MATLAB and Simulink for modeling, simulation, signal processing, and data analysis.",
    tags: ["MATLAB", "Simulink", "Signal Processing", "Data Analysis", "Modeling", "Simulation"],
    github: null,
    images: [
      "/images/projects/matlab-acRC-sig.png",
      "/images/projects/matlab-acRC-scope.png",
      "/images/projects/matlab-delta-sig.png",
      "/images/projects/matlab-delta-scope.png",
      "/images/projects/matlab-yconfig-sig.png",
      "/images/projects/matlab-yconfig-scope.png",
      "__CODE_SLIDE__",
      "/images/projects/HW5_q3_fig.png",
      "__CODE_SLIDE__",
      "/images/projects/HW5_q2_fig.png",
    ],
    captions: [
      "MATLAB Simulink Modeling Resistive Capacitive (RC) AC Electric Circuit Measuring Instantaneous, Average, Reactive, Apparent Power and Power Factor",
      "P-I-V Scope Measurements for RC Model",
      "MATLAB Simulink Modeling 3-Phase Y Configured RLC Circuit",
      "I-V Scope Measurements per Phase (Y)",
      "MATLAB Simulink 3-Phase Delta RLC Electric Circuit Modeling Instantaneous, Average, Apparent Power",
      "I-V Scope Measurements per Phase (Delta)",
      "MATLAB Script to Model Frequency Response, Gain, Phase Response and Group Delay",
      "Output of Frequency Response, Gain, Phase Response and Group Delay",
      "MATLAB Script to Plot Magnitude Response, Unwrapped Phase Response, and Group Delay",
      "Output of Magnitude Response, Unwrapped Phase Response, and Group Delay",
    ],
    codeSnippets: [
      {
        atIndex: 6,
        code: `% MATLAB Code for Problem 3 and 4: Plot Gain, Phase, and Group Delay for Different r and θ

% Parameters
r_values = [0.3, 0.6, 0.9]; % Values of r
Omega = linspace(-pi, pi, 1000); % Frequency range
theta_pi = pi; % θ = π
theta_pi2 = pi / 2; % θ = π/2

% Function for frequency response
H = @(r, theta, Omega) 1 - r * exp(1j * theta) * exp(-1j * Omega);

% Plot for θ = π
figure;
for i = 1:length(r_values)
    r = r_values(i);

    % Compute frequency response for θ = π
    H_pi = H(r, theta_pi, Omega);
    gain_dB_pi = 20 * log10(abs(H_pi)); % Gain in dB
    phase_pi = angle(H_pi); % Phase response
    group_delay_pi = -diff(unwrap(phase_pi)) ./ diff(Omega); % Group delay

    % Plot gain in dB
    subplot(3, 3, 1); hold on;
    plot(Omega, gain_dB_pi, 'LineWidth', 1.5);
    xlabel('\\Omega (rad/sample)');
    ylabel('Gain (dB)');
    title('Gain in dB (\\theta = \\pi)');
    grid on;

    % Plot phase response
    subplot(3, 3, 2); hold on;
    plot(Omega, unwrap(phase_pi), 'LineWidth', 1.5);
    xlabel('\\Omega (rad/sample)');
    ylabel('Phase (rad)');
    title('Phase Response (\\theta = \\pi)');
    grid on;

    % Plot group delay
    subplot(3, 3, 3); hold on;
    plot(Omega(1:end-1), group_delay_pi, 'LineWidth', 1.5);
    xlabel('\\Omega (rad/sample)');
    ylabel('Group Delay (samples)');
    title('Group Delay (\\theta = \\pi)');
    grid on;
end

% Plot for θ = π/2
for i = 1:length(r_values)
    r = r_values(i);

    % Compute frequency response for θ = π/2
    H_pi2 = H(r, theta_pi2, Omega);
    gain_dB_pi2 = 20 * log10(abs(H_pi2)); % Gain in dB
    phase_pi2 = angle(H_pi2); % Phase response
    group_delay_pi2 = -diff(unwrap(phase_pi2)) ./ diff(Omega); % Group delay

    % Plot gain in dB
    subplot(3, 3, 4); hold on;
    plot(Omega, gain_dB_pi2, 'LineWidth', 1.5);
    xlabel('\\Omega (rad/sample)');
    ylabel('Gain (dB)');
    title('Gain in dB (\\theta = \\pi/2)');
    grid on;

    % Plot phase response
    subplot(3, 3, 5); hold on;
    plot(Omega, unwrap(phase_pi2), 'LineWidth', 1.5);
    xlabel('\\Omega (rad/sample)');
    ylabel('Phase (rad)');
    title('Phase Response (\\theta = \\pi/2)');
    grid on;

    % Plot group delay
    subplot(3, 3, 6); hold on;
    plot(Omega(1:end-1), group_delay_pi2, 'LineWidth', 1.5);
    xlabel('\\Omega (rad/sample)');
    ylabel('Group Delay (samples)');
    title('Group Delay (\\theta = \\pi/2)');
    grid on;
end

% Legends for plots
subplot(3, 3, 1); legend(arrayfun(@(r) sprintf('r = %.1f', r), r_values, 'UniformOutput', false), 'Location', 'Best');
subplot(3, 3, 2); legend(arrayfun(@(r) sprintf('r = %.1f', r), r_values, 'UniformOutput', false), 'Location', 'Best');
subplot(3, 3, 3); legend(arrayfun(@(r) sprintf('r = %.1f', r), r_values, 'UniformOutput', false), 'Location', 'Best');
subplot(3, 3, 4); legend(arrayfun(@(r) sprintf('r = %.1f', r), r_values, 'UniformOutput', false), 'Location', 'Best');
subplot(3, 3, 5); legend(arrayfun(@(r) sprintf('r = %.1f', r), r_values, 'UniformOutput', false), 'Location', 'Best');
subplot(3, 3, 6); legend(arrayfun(@(r) sprintf('r = %.1f', r), r_values, 'UniformOutput', false), 'Location', 'Best');`,
      },
      {
        atIndex: 8,
        code: `%|H(Ω)|, Gain, Unwrapped Phase, and Group Delay
% Parameters
K = 3/8; % Given K for maximum |H(Ω)| of 1
Omega = linspace(-pi, pi, 1000); % Frequency range
% Transfer function H(z) coefficients
num = K * [1, 0, -1]; % Numerator coefficients for H(z)
den = [1, 0, -0.25]; % Denominator coefficients for H(z)
% Frequency response of the system
[H, w] = freqz(num, den, Omega, 'whole'); % Compute frequency response
% Part h: Magnitude response |H(Ω)|
H_magnitude = abs(H);
% Part i: Gain in dB
gain_dB = 20 * log10(H_magnitude);
% Part k: Unwrapped phase response
unwrapped_phase = unwrap(angle(H));
% Part m: Group delay
[gd, w] = grpdelay(num, den, Omega, 'whole');
% Plot all graphs in the same figure
figure;
% Plot magnitude response |H(Ω)|
subplot(4, 1, 1);
plot(w - pi, H_magnitude, 'b', 'LineWidth', 1.5); % Shift w from [0, 2π] to [-π, π]
xlabel('\\Omega (rad/sample)', 'FontSize', 12);
ylabel('|H(\\Omega)|', 'FontSize', 12);
title('Magnitude Response |H(\\Omega)|', 'FontSize', 14);
grid on;
xlim([-pi pi]);
ylim([0 1.1]);
set(gca, 'FontSize', 12);
% Plot gain in dB
subplot(4, 1, 2);
plot(w - pi, gain_dB, 'r', 'LineWidth', 1.5);
xlabel('\\Omega (rad/sample)', 'FontSize', 12);
ylabel('Gain (dB)', 'FontSize', 12);
title('Gain in dB', 'FontSize', 14);
grid on;
xlim([-pi pi]);
set(gca, 'FontSize', 12);
% Plot unwrapped phase response
subplot(4, 1, 3);
plot(w - pi, unwrapped_phase, 'g', 'LineWidth', 1.5);
xlabel('\\Omega (rad/sample)', 'FontSize', 12);
ylabel('Phase (rad)', 'FontSize', 12);
title('Unwrapped Phase Response', 'FontSize', 14);
grid on;
xlim([-pi pi]);
set(gca, 'FontSize', 12);
% Plot group delay
subplot(4, 1, 4);
plot(w - pi, gd, 'm', 'LineWidth', 1.5);
xlabel('\\Omega (rad/sample)', 'FontSize', 12);
ylabel('Group Delay (samples)', 'FontSize', 12);
title('Group Delay', 'FontSize', 14);
grid on;
xlim([-pi pi]);
set(gca, 'FontSize', 12);`,
      },
    ],
  },
]

// ── Spring config ─────────────────────────────────────────────────────────────
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 }

// ── Stroke constants ──────────────────────────────────────────────────────────
const STR     = "rgba(232,232,232,0.85)"
const STR_DIM = "rgba(232,232,232,0.28)"
const SW      = 1.6

// ── Icons ─────────────────────────────────────────────────────────────────────

function DroneIcon() {
  const corners: [number, number][] = [[14, 14], [66, 14], [14, 66], [66, 66]]
  return (
    <svg viewBox="0 0 80 80" width={52} height={52} fill="none" aria-hidden>
      {/* Arms */}
      {corners.map(([cx, cy], i) => (
        <line key={i} x1="40" y1="40" x2={cx} y2={cy}
          stroke={STR} strokeWidth={SW} strokeLinecap="round" />
      ))}
      {/* Rotor rings + crosshairs + hub */}
      {corners.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={10} stroke={STR} strokeWidth={SW} />
          <line x1={cx - 7} y1={cy} x2={cx + 7} y2={cy} stroke={STR_DIM} strokeWidth={0.85} />
          <line x1={cx} y1={cy - 7} x2={cx} y2={cy + 7} stroke={STR_DIM} strokeWidth={0.85} />
          <circle cx={cx} cy={cy} r={2.2} fill={STR} />
        </g>
      ))}
      {/* Body */}
      <rect x="33" y="33" width="14" height="14" rx="2" stroke={STR} strokeWidth={SW} />
      {/* Gimbal */}
      <circle cx="40" cy="54" r="3" stroke={STR_DIM} strokeWidth={0.9} />
      <line x1="40" y1="47" x2="40" y2="51" stroke={STR_DIM} strokeWidth={0.9} />
    </svg>
  )
}

function PcbIcon() {
  const vias: [number, number][] = [[16, 40], [64, 40], [40, 16], [40, 64]]
  return (
    <svg viewBox="0 0 80 80" width={52} height={52} fill="none" aria-hidden>
      {/* Traces */}
      <polyline points="32,40 16,40 8,32"   stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="48,40 64,40 72,48"  stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="40,32 40,16 48,8"   stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="40,48 40,64 32,72"  stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="32,32 20,20"        stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" />
      <polyline points="48,32 60,20"        stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" />
      {/* Via rings */}
      {vias.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={3.5} stroke={STR} strokeWidth={0.9} />
          <circle cx={cx} cy={cy} r={1.2} fill={STR} />
        </g>
      ))}
      {/* IC body + inner die */}
      <rect x="28" y="28" width="24" height="24" stroke={STR} strokeWidth={SW} />
      <rect x="33" y="33" width="14" height="14" stroke={STR_DIM} strokeWidth={0.7} />
      {/* IC pins */}
      {[31, 35, 39, 43].map((v) => (
        <g key={v}>
          <rect x="22" y={v} width="6" height="3" fill={STR_DIM} />
          <rect x="52" y={v} width="6" height="3" fill={STR_DIM} />
        </g>
      ))}
    </svg>
  )
}

function VlsiIcon() {
  const grid = [20, 28, 36, 44, 52, 60]
  return (
    <svg viewBox="0 0 80 80" width={52} height={52} fill="none" aria-hidden>
      <defs>
        <clipPath id="vlsi-icon-grid-clip">
          <circle cx="40" cy="40" r="26" />
        </clipPath>
      </defs>
      {/* Grid clipped to wafer */}
      <g clipPath="url(#vlsi-icon-grid-clip)">
        {grid.map((v) => (
          <g key={v}>
            <line x1={v} y1="0"  x2={v} y2="80" stroke={STR_DIM} strokeWidth={0.7} />
            <line x1="0" y1={v}  x2="80" y2={v}  stroke={STR_DIM} strokeWidth={0.7} />
          </g>
        ))}
      </g>
      {/* Wafer outline */}
      <circle cx="40" cy="40" r="26" stroke={STR} strokeWidth={SW} />
      {/* Flat notch */}
      <line x1="34" y1="65.4" x2="46" y2="65.4" stroke={STR} strokeWidth={SW} />
      {/* Corner L-brackets */}
      <path d="M5,11 L5,5 L11,5"   fill="none" stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M69,5 L75,5 L75,11" fill="none" stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5,69 L5,75 L11,75" fill="none" stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M69,75 L75,75 L75,69" fill="none" stroke={STR_DIM} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MatlabIcon() {
  const line1: [number, number][] = [[22, 52], [36, 34], [50, 44], [64, 22]]
  const line2: [number, number][] = [[22, 58], [36, 48], [50, 54], [64, 38]]
  return (
    <svg viewBox="0 0 80 80" width={52} height={52} fill="none" aria-hidden>
      {/* Axes */}
      <line x1="16" y1="66" x2="16" y2="10" stroke={STR} strokeWidth={SW} strokeLinecap="round" />
      <line x1="12" y1="62" x2="70" y2="62" stroke={STR} strokeWidth={SW} strokeLinecap="round" />
      {/* Arrowheads */}
      <polyline points="12,14 16,10 20,14" fill="none" stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="66,58 70,62 66,66" fill="none" stroke={STR} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      {/* Data line 1 — purple accent */}
      <polyline points={line1.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none" stroke="#c084fc" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      {line1.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.5} fill="#c084fc" />)}
      {/* Data line 2 — dim */}
      <polyline points={line2.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none" stroke={STR_DIM} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      {line2.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.8} fill={STR_DIM} />)}
    </svg>
  )
}

function ProjectIcon({ id }: { id: number }) {
  if (id === 1) return <DroneIcon />
  if (id === 2 || id === 3) return <PcbIcon />
  if (id === 4) return <VlsiIcon />
  return <MatlabIcon />
}

// ── Panel slide variants ──────────────────────────────────────────────────────

const panelVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    zIndex: 2,
  }),
  center: {
    y: 0,
    opacity: 1,
    zIndex: 2,
    transition: SPRING,
  },
  exit: (dir: number) => ({
    y: dir > 0 ? "-12%" : "12%",
    opacity: 0,
    zIndex: 1,
    transition: { duration: 0.28, ease: "easeIn" as const },
  }),
}

// ── Chroma aberration keyframes (injected once) ───────────────────────────────

const CHROMA_CSS = `@keyframes chroma-ab {
  0%   { text-shadow: -4px 0 #ff0060, 4px 0 #00e5ff; }
  35%  { text-shadow:  3px 0 #ff0060,-3px 0 #00e5ff; }
  68%  { text-shadow: -1px 0 #ff0060, 1px 0 #00e5ff; }
  100% { text-shadow: none; }
}`

// ── Arrow button ──────────────────────────────────────────────────────────────

function ArrowBtn({
  dir,
  disabled,
  onClick,
}: {
  dir: "left" | "right"
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous image" : "Next image"}
      style={{
        position:       "absolute",
        [dir]:          10,
        top:            "50%",
        transform:      "translateY(-50%)",
        zIndex:         10,
        background:     "rgba(10,10,10,0.7)",
        border:         "1px solid rgba(255,255,255,0.1)",
        borderRadius:   6,
        color:          "rgba(232,232,232,0.85)",
        width:          32,
        height:         32,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        cursor:         "pointer",
        fontSize:       20,
        lineHeight:     1,
        padding:        0,
        opacity:        disabled ? 0 : 1,
        pointerEvents:  disabled ? "none" : "auto",
        transition:     "opacity 0.2s ease",
      }}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  )
}

// ── Code viewer slide ──────────────────────────────────────────────────────────

const CODE_SCROLL_SPEED = 18 // px/sec

function CodeSlide({ code }: { code: string }) {
  const [hovered, setHovered] = useState(false)
  const trackRef     = useRef<HTMLDivElement>(null)
  const firstCopyRef = useRef<HTMLDivElement>(null)
  const [copyHeight, setCopyHeight] = useState(0)
  const yRef        = useRef(0)
  const rafRef      = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (firstCopyRef.current) {
      setCopyHeight(firstCopyRef.current.getBoundingClientRect().height)
    }
  }, [code])

  useEffect(() => {
    const step = (time: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time
      const dt = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      if (!hovered && copyHeight > 0) {
        yRef.current -= CODE_SCROLL_SPEED * dt
        if (yRef.current <= -copyHeight) yRef.current += copyHeight
        if (trackRef.current) {
          trackRef.current.style.transform = `translateY(${yRef.current}px)`
        }
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTimeRef.current = undefined
    }
  }, [hovered, copyHeight])

  const lines = code.split("\n")

  const renderLines = (keyPrefix: string) =>
    lines.map((line, i) => (
      <div
        key={`${keyPrefix}-${i}`}
        style={{
          whiteSpace: "pre",
          color:      line.trim().startsWith("%") ? "#4ade80" : "#e8e8e8",
        }}
      >
        {line.length === 0 ? " " : line}
      </div>
    ))

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:   "absolute",
        inset:      0,
        overflow:   "hidden",
        padding:    "1rem",
        fontFamily: "var(--font-mono), monospace",
        fontSize:   "0.7rem",
        lineHeight: 1.5,
      }}
    >
      <div ref={trackRef} style={{ willChange: "transform" }}>
        <div ref={firstCopyRef}>{renderLines("a")}</div>
        <div>{renderLines("b")}</div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [imageIdx,  setImageIdx]  = useState(0)
  const [direction, setDirection] = useState(1)
  const [glitchKey, setGlitchKey] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  const stateRef   = useRef({ activeIdx: 0, imageIdx: 0 })

  useEffect(() => { stateRef.current = { activeIdx, imageIdx } }, [activeIdx, imageIdx])
  useEffect(() => { setImageIdx(0) }, [activeIdx])

  // Inject chroma CSS once
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = CHROMA_CSS
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  // Keyboard arrow keys advance the carousel when the section is active
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.top > 50 || rect.bottom < window.innerHeight - 50) return

      const { activeIdx: aIdx, imageIdx: iIdx } = stateRef.current
      const imgs = projectsData[aIdx].images
      if (imgs.length <= 1) return

      if (e.key === "ArrowRight" && iIdx < imgs.length - 1) {
        setImageIdx((i) => i + 1)
      } else if (e.key === "ArrowLeft" && iIdx > 0) {
        setImageIdx((i) => i - 1)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const project = projectsData[activeIdx]
  const activeCodeSlide = project.codeSnippets?.find((cs) => cs.atIndex === imageIdx)

  const changeProject = (i: number) => {
    if (i === activeIdx) return
    setDirection(i > activeIdx ? 1 : -1)
    setActiveIdx(i)
    setGlitchKey((k) => k + 1)
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        height:        "100vh",
        display:       "flex",
        flexDirection: "column",
        overflow:      "hidden",
        position:      "relative",
      }}
    >
      <WavesMirror />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ padding: "2.5rem clamp(2rem, 6vw, 6rem) 1.25rem", flexShrink: 0 }}>
        <h2
          style={{
            fontFamily:     "var(--font-chakra), sans-serif",
            fontWeight:     500,
            fontSize:       "clamp(1.1rem, 2.2vw, 1.8rem)",
            letterSpacing:  "0.1em",
            color:          "#ffffff",
            lineHeight:     1,
            textTransform:  "uppercase",
            background:     "#0a0a0a",
            border:         "1px solid rgba(255,255,255,0.07)",
            borderLeft:     "3px solid #c084fc",
            borderRadius:   "0 4px 4px 0",
            padding:        "0.5rem 1.2rem 0.5rem 1rem",
            display:        "inline-block",
            margin:         0,
          }}
        >
          Projects
        </h2>
      </div>

      {/* ── Two-panel body ─────────────────────────────────────────────────── */}
      <div
        style={{
          flex:    1,
          display: "flex",
          overflow: "hidden",
          padding: "0.5rem clamp(2rem, 6vw, 6rem) 2.5rem",
          gap:     "clamp(2rem, 5vw, 6rem)",
          minHeight: 0,
        }}
      >
        {/* ── LEFT PANEL ── project list ──────────────────────────────────── */}
        <div
          style={{
            width:         "clamp(150px, 24%, 260px)",
            flexShrink:    0,
            display:       "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap:           "clamp(0.3rem, 1.2vh, 0.9rem)",
            background:    "rgba(10,10,10,0.92)",
            backdropFilter: "blur(8px)",
            border:        "1px solid rgba(192,132,252,0.15)",
            borderRadius:  "10px",
            padding:       "20px 16px",
          }}
        >
          {projectsData.map((p, i) => {
            const isActive = i === activeIdx
            return (
              <button
                key={p.id}
                onClick={() => changeProject(i)}
                style={{
                  background:  "none",
                  border:      "none",
                  cursor:      "pointer",
                  padding:     "0.35rem 0",
                  textAlign:   "left",
                  display:     "flex",
                  alignItems:  "center",
                  gap:         "0.85rem",
                }}
              >
                {/* Active bar */}
                <div
                  style={{
                    width:      isActive ? 20 : 5,
                    height:     1,
                    background: isActive ? "#c084fc" : "rgba(232,232,232,0.15)",
                    flexShrink: 0,
                    transition: "width 0.3s ease",
                  }}
                />
                {/* Icon */}
                <div
                  style={{
                    flexShrink: 0,
                    opacity:    isActive ? 1 : 0.3,
                    transition: "opacity 0.3s ease",
                    display:    "flex",
                    alignItems: "center",
                  }}
                >
                  <ProjectIcon id={p.id} />
                </div>
                {/* Name — remount on activation to replay chroma animation */}
                <span
                  key={isActive ? `active-${glitchKey}` : `inactive-${p.id}`}
                  style={{
                    fontFamily:    "var(--font-chakra), sans-serif",
                    fontWeight:    isActive ? 600 : 400,
                    fontSize:      "clamp(0.72rem, 1.1vw, 0.9rem)",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color:         isActive ? "#e879f9" : "#6b7280",
                    lineHeight:    1.2,
                    animation:     isActive ? "chroma-ab 0.44s ease-out forwards" : "none",
                  }}
                >
                  {p.title}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── RIGHT PANEL ── active project ───────────────────────────────── */}
        <div
          style={{
            flex:     1,
            minWidth: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatePresence custom={direction}>
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                position:      "absolute",
                inset:         0,
                display:       "flex",
                flexDirection: "column",
                gap:           "0.9rem",
                background:    "rgba(10,10,10,0.92)",
                backdropFilter: "blur(8px)",
                border:        "1px solid rgba(192,132,252,0.15)",
                borderRadius:  "10px",
                padding:       "20px",
              }}
            >
              {/* Counter + title */}
              <div style={{ flexShrink: 0 }}>
                <p
                  style={{
                    fontFamily:    "var(--font-chakra), sans-serif",
                    fontSize:      "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color:         "rgba(232,232,232,0.25)",
                    marginBottom:  "0.3rem",
                  }}
                >
                  {String(activeIdx + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}
                </p>
                <h3
                  style={{
                    fontFamily:            "var(--font-chakra), sans-serif",
                    fontWeight:            600,
                    fontSize:              "clamp(1.4rem, 3.5vw, 2.8rem)",
                    letterSpacing:         "0.05em",
                    textTransform:         "uppercase",
                    background:            "linear-gradient(135deg, #c084fc, #f472b6)",
                    WebkitBackgroundClip:  "text",
                    WebkitTextFillColor:   "transparent",
                    backgroundClip:        "text",
                    margin:                0,
                    lineHeight:            1.05,
                  }}
                >
                  {project.title}
                </h3>
              </div>

              {/* Dean's Award / Project Repository links — Photon Flight only */}
              {project.id === 1 && (
                <div
                  style={{
                    flexShrink: 0,
                    marginTop:  "-0.3rem",
                    display:    "flex",
                    alignItems: "baseline",
                    gap:        "0.5rem",
                  }}
                >
                  <a
                    href="https://engineering.uci.edu/news/2026/3/eleven-senior-projects-win-deans-choice-awards-2026-annual-design-review"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily:     "var(--font-mono), monospace",
                      fontSize:       "0.68rem",
                      letterSpacing:  "0.08em",
                      color:          "#f472b6",
                      textDecoration: "none",
                      borderBottom:   "1px solid rgba(244,114,182,0.35)",
                      paddingBottom:  "1px",
                    }}
                  >
                    Dean&apos;s Award Recipient
                  </a>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize:   "0.68rem",
                      color:      "rgba(244,114,182,0.35)",
                    }}
                  >
                    |
                  </span>
                  <a
                    href="https://github.com/mervinnguyen/photonflight-fiber-optic-drone"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily:     "var(--font-mono), monospace",
                      fontSize:       "0.68rem",
                      letterSpacing:  "0.08em",
                      color:          "#f472b6",
                      textDecoration: "none",
                      borderBottom:   "1px solid rgba(244,114,182,0.35)",
                      paddingBottom:  "1px",
                    }}
                  >
                    Project Repository
                  </a>
                </div>
              )}

              {/* Carousel */}
              <div style={{ flexShrink: 0 }}>
                <div
                  style={{
                    position:     "relative",
                    width:        "100%",
                    aspectRatio:  "16/9",
                    maxHeight:    "35vh",
                    background:   "#0a0a0a",
                    borderRadius: 16,
                    overflow:     "hidden",
                    border:       "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imageIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ position: "absolute", inset: 0 }}
                    >
                      {activeCodeSlide ? (
                        <CodeSlide code={activeCodeSlide.code} />
                      ) : (
                        <Image
                          src={project.images[imageIdx]}
                          alt={`${project.title} ${imageIdx + 1}`}
                          fill
                          style={{ objectFit: "contain" }}
                          sizes="(max-width: 768px) 100vw, 65vw"
                        />
                      )}
                      {project.captions?.[imageIdx] && (
                        <div
                          style={{
                            position:      "absolute",
                            bottom:        0,
                            left:          0,
                            right:         0,
                            background:    "linear-gradient(to top, rgba(10,10,10,0.85), transparent)",
                            padding:       "0.5rem 0.8rem",
                            fontFamily:    "var(--font-mono), monospace",
                            fontSize:      "0.7rem",
                            letterSpacing: "0.04em",
                            color:         "#e8e8e8",
                          }}
                        >
                          {project.captions[imageIdx]}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Prev / next arrow buttons */}
                  {project.images.length > 1 && (
                    <>
                      <ArrowBtn
                        dir="left"
                        disabled={imageIdx === 0}
                        onClick={() => setImageIdx((i) => i - 1)}
                      />
                      <ArrowBtn
                        dir="right"
                        disabled={imageIdx === project.images.length - 1}
                        onClick={() => setImageIdx((i) => i + 1)}
                      />
                    </>
                  )}
                </div>

                {/* Dot indicators */}
                {project.images.length > 1 && (
                  <div
                    style={{
                      display:        "flex",
                      justifyContent: "center",
                      gap:            6,
                      marginTop:      "0.55rem",
                    }}
                  >
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImageIdx(i)}
                        aria-label={`Image ${i + 1}`}
                        style={{
                          width:        7,
                          height:       7,
                          borderRadius: "50%",
                          border:       i === imageIdx ? "none" : "1px solid #f472b6",
                          background:   i === imageIdx ? "#f472b6" : "transparent",
                          cursor:       "pointer",
                          padding:      0,
                          flexShrink:   0,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-dmsans), sans-serif",
                  fontWeight: 400,
                  fontSize:   "clamp(0.7rem, 0.92vw, 0.82rem)",
                  color:      "#ffffff",
                  lineHeight: 1.82,
                  margin:     0,
                  flexShrink: 0,
                }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, flexShrink: 0 }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily:   "var(--font-inter), sans-serif",
                      fontSize:     "0.72rem",
                      letterSpacing: "0.02em",
                      color:        "#c084fc",
                      background:   "rgba(192,132,252,0.07)",
                      border:       "1px solid rgba(192,132,252,0.18)",
                      borderRadius: 100,
                      padding:      "2px 9px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* GitHub link */}
              {project.github && (
                <div style={{ flexShrink: 0 }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:        "inline-flex",
                      alignItems:     "center",
                      gap:            7,
                      fontFamily:     "var(--font-inter), sans-serif",
                      fontWeight:     500,
                      fontSize:       "0.72rem",
                      letterSpacing:  "0.06em",
                      color:          "#c084fc",
                      textDecoration: "none",
                      border:         "1px solid rgba(192,132,252,0.2)",
                      borderRadius:   4,
                      padding:        "0.36rem 0.8rem",
                      background:     "rgba(192,132,252,0.06)",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
