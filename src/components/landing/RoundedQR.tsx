import { useMemo } from "react";
import QRCode from "qrcode";
import kerriLogo from "@/assets/kerri-logo.jpg.asset.json";

/**
 * KERRI 라운드 QR
 * - 데이터 모듈: 둥근 점
 * - 큰 모서리 3개(파인더): 둥근 사각 링 + 둥근 코어
 * - 컬러: 테라코타(primary), 배경: 흰색/크림
 * - 중앙: KERRI 심볼
 */
export function RoundedQR({
  value,
  size = 96,
  className = "",
}: {
  value: string;
  size?: number;
  className?: string;
}) {
  const { count, dots } = useMemo(() => {
    const qr = QRCode.create(value, { errorCorrectionLevel: "H" });
    const n = qr.modules.size;
    const data = qr.modules.data;

    const inFinder = (r: number, c: number) =>
      (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);

    // 중앙 로고 영역은 비워둔다 (ECC High로 보정)
    const mid = n / 2;
    const hole = Math.round(n * 0.13);
    const inLogo = (r: number, c: number) =>
      Math.abs(r + 0.5 - mid) <= hole && Math.abs(c + 0.5 - mid) <= hole;

    const list: Array<[number, number]> = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (!data[r * n + c]) continue;
        if (inFinder(r, c) || inLogo(r, c)) continue;
        list.push([r, c]);
      }
    }
    return { count: n, dots: list };
  }, [value]);

  const pad = 2; // quiet zone (모듈 단위)
  const vb = count + pad * 2;
  const logoSize = count * 0.24;

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

  return (
    <svg
      viewBox={`0 0 ${vb} ${vb}`}
      width={size}
      height={size}
      role="img"
      className={`text-primary ${className}`}
      shapeRendering="geometricPrecision"
    >
      <g transform={`translate(${pad} ${pad})`}>
        {dots.map(([r, c]) => (
          <circle key={`${r}-${c}`} cx={c + 0.5} cy={r + 0.5} r={0.42} fill="currentColor" />
        ))}
        <Finder x={0} y={0} />
        <Finder x={count - 7} y={0} />
        <Finder x={0} y={count - 7} />
        <image
          href={kerriLogo.url}
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
}
