import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import kerriLogo from "@/assets/kerri-logo.jpg.asset.json";

/** 현재 디스플레이의 DPR (Retina 대응). SSR 안전. */
function useDevicePixelRatio() {
  const [dpr, setDpr] = useState(1);
  useEffect(() => {
    const read = () => setDpr(Math.min(4, Math.max(1, window.devicePixelRatio || 1)));
    read();
    const mq = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
    mq.addEventListener?.("change", read);
    window.addEventListener("resize", read);
    return () => {
      mq.removeEventListener?.("change", read);
      window.removeEventListener("resize", read);
    };
  }, []);
  return dpr;
}

/** 로고 원본을 정사각 center-crop 후 PNG data URL 로 변환 */
async function logoToDataUrl(pxSize: number): Promise<string> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = kerriLogo.url;
  await (img.decode?.() ?? Promise.resolve());
  const s = Math.max(1, Math.round(pxSize));
  const canvas = document.createElement("canvas");
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d");
  if (!ctx) return kerriLogo.url;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  const side = Math.min(img.naturalWidth, img.naturalHeight);
  ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, s, s);
  try {
    return canvas.toDataURL("image/png");
  } catch {
    return kerriLogo.url;
  }
}

/**
 * 중앙 심볼을 실제 표시 크기 × DPR 로 리샘플링해 data URL 로 변환.
 * 브라우저가 원본 JPEG 를 임의 배율로 축소할 때 생기는 흐림을 방지한다.
 */
function useCrispLogo(pxSize: number) {
  const [src, setSrc] = useState<string>(kerriLogo.url);
  useEffect(() => {
    if (!pxSize || typeof document === "undefined") return;
    let cancelled = false;
    logoToDataUrl(pxSize).then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, [pxSize]);
  return src;
}

/* ── QR 기하 계산 (컴포넌트/내보내기 공용) ───────────────────── */

const PAD = 2; // quiet zone (모듈 단위)

function computeQr(value: string) {
  const qr = QRCode.create(value, { errorCorrectionLevel: "H" });
  const n = qr.modules.size;
  const data = qr.modules.data;

  const inFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);

  const mid = n / 2;
  const hole = Math.round(n * 0.13);
  const inLogo = (r: number, c: number) =>
    Math.abs(r + 0.5 - mid) <= hole && Math.abs(c + 0.5 - mid) <= hole;

  const dots: Array<[number, number]> = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!data[r * n + c]) continue;
      if (inFinder(r, c) || inLogo(r, c)) continue;
      dots.push([r, c]);
    }
  }
  return { count: n, dots, viewBox: n + PAD * 2, logoSize: n * 0.24 };
}

/** 테라코타(primary) 값을 실제 rgb 문자열로 해석 (독립 파일 내보내기용) */
function resolvePrimaryColor(): string {
  if (typeof document === "undefined") return "#C2624A";
  const probe = document.createElement("span");
  probe.className = "text-primary";
  probe.style.position = "absolute";
  probe.style.opacity = "0";
  document.body.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color || "#C2624A";
}

/**
 * 독립 실행 가능한 고해상도 SVG 문자열 생성.
 * 색상은 rgb 로 고정하고 로고는 data URL 로 인라인한다.
 */
export async function buildRoundedQRSvg(
  value: string,
  { size = 1024, background = "#FFFFFF" }: { size?: number; background?: string } = {},
): Promise<string> {
  const { count, dots, viewBox, logoSize } = computeQr(value);
  const color = resolvePrimaryColor();
  const logo = await logoToDataUrl((logoSize / viewBox) * size);
  const finder = (x: number, y: number) => `
    <g transform="translate(${x} ${y})">
      <rect x="0.6" y="0.6" width="5.8" height="5.8" rx="2.1" ry="2.1" fill="none" stroke="${color}" stroke-width="1.15"/>
      <rect x="2.25" y="2.25" width="2.5" height="2.5" rx="1.05" ry="1.05" fill="${color}"/>
    </g>`;
  const circles = dots
    .map(([r, c]) => `<circle cx="${c + 0.5}" cy="${r + 0.5}" r="0.42" fill="${color}"/>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${viewBox} ${viewBox}" shape-rendering="geometricPrecision">
  <rect width="${viewBox}" height="${viewBox}" fill="${background}"/>
  <g transform="translate(${PAD} ${PAD})">
    ${circles}
    ${finder(0, 0)}
    ${finder(count - 7, 0)}
    ${finder(0, count - 7)}
    <image href="${logo}" x="${(count - logoSize) / 2}" y="${(count - logoSize) / 2}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid slice"/>
  </g>
</svg>`;
}

function triggerDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.click();
}

function slug(value: string) {
  return value.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9]+/g, "-").slice(0, 40) || "qr";
}

/** 고해상도 SVG 내보내기 */
export async function exportRoundedQRSvg(value: string, opts?: { size?: number; filename?: string }) {
  const svg = await buildRoundedQRSvg(value, { size: opts?.size ?? 1024 });
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  triggerDownload(url, opts?.filename ?? `kerri-qr-${slug(value)}.svg`);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** 고해상도 PNG 내보내기 (기본 2048px, 투명 배경 옵션) */
export async function exportRoundedQRPng(
  value: string,
  opts?: { size?: number; filename?: string; transparent?: boolean },
) {
  const size = opts?.size ?? 2048;
  const svg = await buildRoundedQRSvg(value, {
    size,
    background: opts?.transparent ? "transparent" : "#FFFFFF",
  });
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const img = new Image();
    img.src = url;
    await (img.decode?.() ?? Promise.resolve());
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, size, size);
    triggerDownload(canvas.toDataURL("image/png"), opts?.filename ?? `kerri-qr-${slug(value)}.png`);
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

/**
 * KERRI 라운드 QR
 * - 데이터 모듈: 둥근 점
 * - 큰 모서리 3개(파인더): 둥근 사각 링 + 둥근 코어
 * - 컬러: 테라코타(primary), 배경: 흰색/크림
 * - 중앙: KERRI 심볼 (DPR 기준 리샘플링으로 Retina 에서도 선명)
 * - exportable: PNG / SVG 고해상도 내보내기 버튼 표시
 */
export function RoundedQR({
  value,
  size = 96,
  className = "",
  exportable = false,
  exportSize = 2048,
}: {
  value: string;
  size?: number;
  className?: string;
  exportable?: boolean;
  exportSize?: number;
}) {
  const { count, dots, viewBox: vb, logoSize } = useMemo(() => computeQr(value), [value]);

  const dpr = useDevicePixelRatio();
  // 모듈 경계가 물리 픽셀에 정렬되도록 CSS 크기를 스냅 → 서브픽셀 번짐 제거
  const renderSize = useMemo(() => {
    const devicePx = Math.max(1, Math.round((size * dpr) / vb)) * vb;
    return devicePx / dpr;
  }, [size, dpr, vb]);

  const logo = useCrispLogo((logoSize / vb) * renderSize * dpr);

  const Finder = ({ x, y }: { x: number; y: number }) => (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={0.6}
        y={0.6}
        width={5.8}
        height={5.8}
        rx={2.1}
        ry={2.1}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.15}
      />
      <rect x={2.25} y={2.25} width={2.5} height={2.5} rx={1.05} ry={1.05} fill="currentColor" />
    </g>
  );

  const svg = (
    <svg
      viewBox={`0 0 ${vb} ${vb}`}
      width={renderSize}
      height={renderSize}
      role="img"
      className={`text-primary ${className}`}
      shapeRendering="geometricPrecision"
      style={{ imageRendering: "auto", transform: "translateZ(0)" }}
    >
      <g transform={`translate(${PAD} ${PAD})`}>
        {dots.map(([r, c]) => (
          <circle key={`${r}-${c}`} cx={c + 0.5} cy={r + 0.5} r={0.42} fill="currentColor" />
        ))}
        <Finder x={0} y={0} />
        <Finder x={count - 7} y={0} />
        <Finder x={0} y={count - 7} />
        <image
          href={logo}
          x={(count - logoSize) / 2}
          y={(count - logoSize) / 2}
          width={logoSize}
          height={logoSize}
          preserveAspectRatio="xMidYMid slice"
          clipPath="inset(0 round 1.4px)"
        />
      </g>
    </svg>
  );

  if (!exportable) return svg;

  return (
    <div className="grid justify-items-center gap-2">
      {svg}
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-tight">
        <button
          type="button"
          onClick={() => void exportRoundedQRPng(value, { size: exportSize })}
          className="rounded-full border border-border/70 px-2.5 py-1 text-primary transition-colors hover:bg-primary/10"
        >
          PNG
        </button>
        <button
          type="button"
          onClick={() => void exportRoundedQRSvg(value, { size: exportSize })}
          className="rounded-full border border-border/70 px-2.5 py-1 text-primary transition-colors hover:bg-primary/10"
        >
          SVG
        </button>
      </div>
    </div>
  );
}
