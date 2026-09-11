"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const STAR_COUNT = 150;

/** reads the live --accent token so the effect follows the theme */
function useAccentColor() {
  const [color, setColor] = useState(() => new THREE.Color("#ff6a00"));

  useEffect(() => {
    const read = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      if (value) setColor(new THREE.Color(value));
    };
    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", read);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", read);
    };
  }, []);

  return color;
}

/** pointer position in clip space (-1..1), eased so the effect trails the cursor */
function usePointer() {
  const target = useRef(new THREE.Vector2(0, 0));
  const current = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return { target, current };
}

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

function Scene({ dark }: { dark: boolean }) {
  const accent = useAccentColor();
  const { size, viewport } = useThree();
  const { target, current } = usePointer();

  const gradientRef = useRef<THREE.ShaderMaterial>(null);
  const starRef = useRef<THREE.ShaderMaterial>(null);

  const stars = useMemo(() => {
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
  }, []);

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

  useEffect(() => {
    gradientUniforms.uColor.value.copy(accent);
    starUniforms.uColor.value.copy(accent);
    // the wash has to work over near-white as well as over black
    gradientUniforms.uStrength.value = dark ? 0.3 : 0.16;
    starUniforms.uOpacity.value = dark ? 0.72 : 0.5;
  }, [accent, dark, gradientUniforms, starUniforms]);

  useFrame((_, delta) => {
    // ease towards the pointer so the field trails rather than snaps
    const ease = Math.min(1, delta * 3.2);
    current.current.lerp(target.current, ease);

    gradientUniforms.uMouse.value.copy(current.current);
    starUniforms.uMouse.value.copy(current.current);
    gradientUniforms.uRes.value.set(size.width, size.height);
    gradientUniforms.uTime.value += delta;
    starUniforms.uTime.value += delta;
    starUniforms.uScale.value = Math.min(viewport.dpr, 2);
  });

  return (
    <>
      <mesh frustumCulled={false}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={gradientRef}
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
            args={[stars.positions, 3]}
          />
          <bufferAttribute attach="attributes-aSize" args={[stars.sizes, 1]} />
          <bufferAttribute
            attach="attributes-aPhase"
            args={[stars.phases, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={starRef}
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

/**
 * Ambient layer behind the dashboard: an orange wash that follows the pointer
 * plus a field of stars that lean towards it. Purely decorative — it sits
 * behind everything, never takes pointer events, and is skipped entirely when
 * the visitor prefers reduced motion or the browser has no WebGL.
 */
export default function DashboardBackground() {
  const [enabled, setEnabled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    // some browsers/GPUs have no usable WebGL — fall back to the CSS wash
    let ok = false;
    try {
      const probe = document.createElement("canvas");
      ok = Boolean(
        probe.getContext("webgl2") ?? probe.getContext("webgl"),
      );
    } catch {
      ok = false;
    }
    if (!ok) return;

    const readTheme = () => {
      const attr = document.documentElement.getAttribute("data-theme");
      setDark(
        attr === "dark" ||
          (attr !== "light" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches),
      );
    };
    readTheme();
    setEnabled(true);

    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", readTheme);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", readTheme);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Scene dark={dark} />
      </Canvas>
    </div>
  );
}
