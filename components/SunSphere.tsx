"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// ---------------------------------------------------------------------------
// GLSL shaders
// ---------------------------------------------------------------------------

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDisplacement;

  varying vec3 vSphereNormal;

  float hash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yxz + 19.19);
    return fract((p.x + p.y) * p.z);
  }

  float vnoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i),                 hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)),   hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)),   hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)),   hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * vnoise(p);
      p  = p * 2.1 + vec3(5.2, 1.3, 8.7);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vSphereNormal = normalize(position);

    vec3 noiseCoord = position * 1.4
      + vec3(uTime * 0.15, uTime * 0.12, uTime * 0.18);

    float n = fbm(noiseCoord);
    float displacement = (n - 0.45) * uDisplacement;

    vec3 displaced = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;

  varying vec3 vSphereNormal;

  // 4-stop palette cycling through the target hues.
  // Colors as linear RGB (hex / 255):
  //   c0  #6B21A8  deep violet
  //   c1  #06B6D4  electric cyan
  //   c2  #84CC16  vivid lime
  //   c3  #EC4899  hot pink / magenta
  vec3 palette(float t) {
    t = fract(t);

    vec3 c0 = vec3(0.420, 0.129, 0.659); // #6B21A8
    vec3 c1 = vec3(0.024, 0.714, 0.831); // #06B6D4
    vec3 c2 = vec3(0.518, 0.800, 0.086); // #84CC16
    vec3 c3 = vec3(0.925, 0.282, 0.600); // #EC4899

    float s = t * 4.0;
    if (s < 1.0) return mix(c0, c1, smoothstep(0.0, 1.0, s));
    if (s < 2.0) return mix(c1, c2, smoothstep(0.0, 1.0, s - 1.0));
    if (s < 3.0) return mix(c2, c3, smoothstep(0.0, 1.0, s - 2.0));
                 return mix(c3, c0, smoothstep(0.0, 1.0, s - 3.0));
  }

  void main() {
    // Longitude (0→1) drives the primary color band
    float lon = atan(vSphereNormal.x, vSphereNormal.z) / (2.0 * 3.14159265) + 0.5;
    // Latitude shifts the hue slightly so poles feel different from equator
    float lat = vSphereNormal.y * 0.5 + 0.5;

    // Slow time drift keeps colors rolling even without mouse movement
    float t = fract(lon + lat * 0.2 + uTime * 0.04);

    gl_FragColor = vec4(palette(t), 1.0);
  }
`

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SunSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { pointer, gl } = useThree()

  useEffect(() => {
    gl.setClearColor(0x000000, 0)
  }, [gl])

  const rotX = useRef(0)
  const rotY = useRef(0)

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime:         { value: 0 },
          uDisplacement: { value: 0.38 },
        },
        wireframe: true,
      }),
    []
  )

  useFrame((state, delta) => {
    if (!meshRef.current) return

    material.uniforms.uTime.value = state.clock.elapsedTime

    // pointer is -1…+1 normalized to the canvas — full-screen canvas means
    // this tracks cursor across the entire page
    const targetX = -pointer.y * 0.3
    const targetY =  pointer.x * 0.45

    const smooth = 1 - Math.exp(-5 * delta)
    rotX.current += (targetX - rotX.current) * smooth
    rotY.current += (targetY - rotY.current) * smooth

    meshRef.current.rotation.x = rotX.current
    meshRef.current.rotation.y = rotY.current + state.clock.elapsedTime * 0.04
  })

  return (
    <mesh ref={meshRef} material={material}>
      <sphereGeometry args={[1.5, 96, 96]} />
    </mesh>
  )
}
