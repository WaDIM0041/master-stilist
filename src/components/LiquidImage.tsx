import { useEffect, useRef, useState } from "react";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_time;
uniform vec2 u_plane;
uniform vec2 u_img;
uniform vec2 u_mouse;
uniform float u_strength;

vec2 coverUv(vec2 uv) {
  float ca = u_plane.x / u_plane.y;
  float ia = u_image.x / u_image.y;
  vec2 t = uv;
  if (ca > ia) {
    t.y = 0.5 + (uv.y - 0.5) * (ia / ca);
  } else {
    t.x = 0.5 + (uv.x - 0.5) * (ca / ia);
  }
  return t;
}

void main() {
  vec2 m = u_mouse;
  vec2 p = v_uv;
  float da = u_plane.x / max(u_plane.y, 1.0);
  vec2 delta = vec2((p.x - m.x) * da, p.y - m.y);
  float d = length(delta);
  float falloff = smoothstep(0.42, 0.0, d);
  float wave = 0.5 + 0.5 * sin(d * 26.0 - u_time * 6.5);
  vec2 dir = normalize(delta + vec2(1e-5));
  vec2 disp = dir * wave * falloff * u_strength * 0.055;
  vec2 tuv = coverUv(clamp(p + disp, 0.0, 1.0));
  vec3 col = texture2D(u_tex, tuv).rgb;
  /* золотой отблеск по волне — эффект «жидкого золота» */
  col += vec3(1.0, 0.86, 0.58) * wave * falloff * u_strength * 0.09;
  gl_FragColor = vec4(col, 1.0);
}`;

interface Props {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
}

/**
 * Фотография с шейдерным эффектом liquid distortion при наведении.
 * Raw WebGL — без тяжёлых зависимостей. При отсутствии WebGL
 * деградирует до обычного <img>.
 */
export default function LiquidImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  strength = 1,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: false,
    });
    if (!gl) {
      setFallback(true);
      return;
    }

    const compile = (type: number, code: string): WebGLShader => {
      const sh = gl.createShader(type) as WebGLShader;
      gl.shaderSource(sh, code);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(sh) ?? "shader error");
      }
      return sh;
    };

    let program: WebGLProgram;
    try {
      program = gl.createProgram() as WebGLProgram;
      gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error("link error");
      }
    } catch {
      setFallback(true);
      return;
    }
    gl.useProgram(program);

    // fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTex = gl.getUniformLocation(program, "u_tex");
    const uPlane = gl.getUniformLocation(program, "u_plane");
    const uImg = gl.getUniformLocation(program, "u_img");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uStr = gl.getUniformLocation(program, "u_strength");
    gl.uniform1i(uTex, 0);

    // texture
    const tex = gl.createTexture();
    let imgW = 1;
    let imgH = 1;
    let texReady = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgW = img.naturalWidth || 1;
      imgH = img.naturalHeight || 1;
      try {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        texReady = true;
      } catch {
        setFallback(true);
      }
    };
    img.onerror = () => setFallback(true);
    img.src = src;

    // sizing
    let cw = 1;
    let ch = 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    const resize = () => {
      cw = Math.max(1, wrap.clientWidth);
      ch = Math.max(1, wrap.clientHeight);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // interaction
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let power = 0;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const nx = (e.clientX - r.left) / Math.max(r.width, 1);
      const ny = 1 - (e.clientY - r.top) / Math.max(r.height, 1);
      power = Math.min(
        1,
        power + Math.hypot(nx - mouse.tx, ny - mouse.ty) * 16
      );
      mouse.tx = nx;
      mouse.ty = ny;
    };
    wrap.addEventListener("pointermove", onMove);

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "140px" }
    );
    io.observe(wrap);

    let raf = 0;
    let t = Math.random() * 10;
    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible || !texReady) return;
      t += 0.016;
      mouse.x += (mouse.tx - mouse.x) * 0.14;
      mouse.y += (mouse.ty - mouse.y) * 0.14;
      power *= 0.93;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uPlane, cw, ch);
      gl.uniform2f(uImg, imgW, imgH);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uStr, power * strength);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src, strength]);

  if (fallback) {
    return (
      <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className={`block h-full w-full ${imgClassName}`}
      />
    </div>
  );
}
