"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const STAR_COUNT = 150;

/**
 * Star field, built once at module load. Deliberately not generated during
 * render — randomness in a render pass is impure and would also reshuffle the
 * field on every re-render.
 */
const STARS = (() => {
  const positions = new Float32Array(STAR_COUNT * 3);
  const sizes = new Float32Array(STAR_COUNT);
  const phases = new Float32Array(STAR_COUNT);
  for (let i = 0; i < STAR_COUNT; i++) {
    positions[i * 3] = Math.random() * 2 - 1;
    positions[i * 3 + 1] = Math.random() * 2 - 1;
    // most stars barely react; a few follow the pointer closely
    positions[i * 3 + 2] = Math.pow(Math.random(), 2.2) * 0.42;
    sizes[i] = 1.4 + Math.random() * 3.6;
    phases[i] = Math.random() * Math.PI * 2;
  }
  return { positions, sizes, phases };
})();

const readAccent = () => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent")
    .trim();
  return value || "#ff6a00";
};

const readDark = () => {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark") return true;
  if (attr === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const gradientVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // drawn straight in clip space so it always covers the viewport
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const gradientFragment = /* glsl */ `
  precision mediump float;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uStrength;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 q = vec2(p.x * aspect, p.y);
    vec2 m = vec2(uMouse.x * aspect, uMouse.y);

    // the pool of colour under the cursor
    float d = distance(q, m);
    float pool = exp(-d * d * 1.15);

    // a second, slowly drifting pool so the background still breathes
    // when the pointer is not moving
    vec2 drift = vec2(cos(uTime * 0.17) * 0.75, sin(uTime * 0.12) * 0.45);
    float ambient = exp(-distance(q, m * 0.35 + drift) * 1.6);

    float alpha = (pool * 0.9 + ambient * 0.35) * uStrength;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const starVertex = /* glsl */ `
  precision mediump float;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uScale;
  attribute float aSize;
  attribute float aPhase;
  varying float vTwinkle;

  void main() {
    // position.xy is the star's home, position.z is how strongly it is
    // pulled towards the pointer — the spread of pulls is what makes the
    // field lean and swarm rather than move as one block
    vec2 home = position.xy;
    float pull = position.z;
    vec2 p = home + (uMouse - home) * pull;

    p += vec2(
      sin(uTime * 0.26 + aPhase) * 0.014,
      cos(uTime * 0.22 + aPhase) * 0.014
    );

    vTwinkle = 0.55 + 0.45 * sin(uTime * 1.7 + aPhase * 6.283);
    gl_Position = vec4(p, 0.0, 1.0);
    gl_PointSize = aSize * uScale * (0.65 + 0.9 * pull);
  }
`;

const starFragment = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vTwinkle;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float core = smoothstep(0.5, 0.0, d);
    // a faint cross flare reads as a star rather than a dot
    float flare =
      max(0.0, 1.0 - abs(c.x) * 14.0) * max(0.0, 1.0 - abs(c.y) * 3.2) +
      max(0.0, 1.0 - abs(c.y) * 14.0) * max(0.0, 1.0 - abs(c.x) * 3.2);
    float a = (core * core * 0.9 + flare * 0.35) * vTwinkle * uOpacity;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

function Scene() {
  const { size, viewport } = useThree();

  // Uniform objects are created pure (no DOM reads, no randomness) so they are
  // safe to build during render; everything that mutates them afterwards goes
  // through the material refs inside effects and the frame loop.
  const gradientUniforms = useMemo(
    () => ({
      uMouse: { value: new THREE.Vector2(0, 0) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#ff6a00") },
      uStrength: { value: 0.16 },
    }),
    [],
  );

  const starUniforms = useMemo(
    () => ({
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#ff6a00") },
      uOpacity: { value: 0.5 },
      uScale: { value: 1 },
    }),
    [],
  );

  const gradientMat = useRef<THREE.ShaderMaterial>(null);
  const starMat = useRef<THREE.ShaderMaterial>(null);
  const pointerTarget = useRef(new THREE.Vector2(0, 0));
  const pointerCurrent = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerTarget.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // follow the live theme: colour from --accent, and a different strength
  // because the wash has to work over near-white as well as over black
  useEffect(() => {
    const sync = () => {
      const accent = new THREE.Color(readAccent());
      const dark = readDark();
      const g = gradientMat.current;
      const st = starMat.current;
      if (g) {
        g.uniforms.uColor.value.copy(accent);
        g.uniforms.uStrength.value = dark ? 0.3 : 0.16;
      }
      if (st) {
        st.uniforms.uColor.value.copy(accent);
        st.uniforms.uOpacity.value = dark ? 0.72 : 0.5;
      }
    };
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  useFrame((_, delta) => {
    // ease towards the pointer so the field trails rather than snaps
    pointerCurrent.current.lerp(pointerTarget.current, Math.min(1, delta * 3.2));

    const g = gradientMat.current;
    const st = starMat.current;
    if (g) {
      g.uniforms.uMouse.value.copy(pointerCurrent.current);
      g.uniforms.uRes.value.set(size.width, size.height);
      g.uniforms.uTime.value += delta;
    }
    if (st) {
      st.uniforms.uMouse.value.copy(pointerCurrent.current);
      st.uniforms.uTime.value += delta;
      st.uniforms.uScale.value = Math.min(viewport.dpr, 2);
    }
  });

  return (
    <>
      <mesh frustumCulled={false}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={gradientMat}
          vertexShader={gradientVertex}
          fragmentShader={gradientFragment}
          uniforms={gradientUniforms}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </mesh>

      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[STARS.positions, 3]}
          />
          <bufferAttribute attach="attributes-aSize" args={[STARS.sizes, 1]} />
          <bufferAttribute
            attach="attributes-aPhase"
            args={[STARS.phases, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={starMat}
          vertexShader={starVertex}
          fragmentShader={starFragment}
          uniforms={starUniforms}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </points>
    </>
  );
}

/** true when the browser can actually give us a WebGL context */
const hasWebGL = () => {
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
  } catch {
    return false;
  }
};

/**
 * Ambient layer behind the dashboard: an orange wash that follows the pointer
 * plus a field of stars that lean towards it. Purely decorative — it sits
 * behind everything, never takes pointer events, and is skipped entirely when
 * the visitor prefers reduced motion or the browser has no WebGL, in which
 * case the static CSS wash in globals.css carries the look instead.
 */
export default function DashboardBackground() {
  // this component is client-only, so the check can settle before first paint
  const [enabled] = useState(
    () =>
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      hasWebGL(),
  );

  // tells the stylesheet to drop the static CSS wash, so the two ambient
  // layers never stack on top of each other
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.setAttribute("data-ambient", "gl");
    return () => root.removeAttribute("data-ambient");
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      data-ambient-canvas
      className="pointer-events-none fixed inset-0 z-0"
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
