import { createFileRoute, Link } from "@tanstack/react-router";
import { RoundedQR } from "@/components/landing/RoundedQR";
import appleStoreBadge from "@/assets/apple-store-badge.svg.asset.json";
import googlePlayBadge from "@/assets/google-play-badge.png.asset.json";
import appHome from "@/assets/app-home.png.asset.json";
import appNotify from "@/assets/app-notify.jpg.asset.json";
import appPayment from "@/assets/app-payment.png.asset.json";
import appSchedule from "@/assets/app-schedule.png.asset.json";
import appReport from "@/assets/app-report.png.asset.json";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  FileText,
  CalendarCheck,
  Users,
  Smartphone,
  History,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  ShieldCheck,
  Database,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

/** ▼▼ 여기에 KERRI AI 레슨 기록 시뮬레이터 공개 URL을 넣어주세요 ▼▼ */
const SIMULATOR_URL = "https://ai-coach-notes.lovable.app";



import {
  Container,
  Footer,
  Nav,
  Reveal,
  Section,
  SectionHead,
  scrollTo,
} from "@/components/landing/shared";


/* ── Device ────────────────────────────────────────────────── */

function PhoneMock({
  children,
  className = "",
  bodyClassName = "flex items-center justify-center text-center px-6",
}: {
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={`relative mx-auto aspect-[9/19] rounded-[2.9rem] bg-[var(--ink)] p-[10px] shadow-[var(--shadow-device)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[2.9rem] ring-1 ring-white/10" />
      <div className="pointer-events-none absolute left-1/2 top-[14px] z-10 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-[var(--ink)]" />
      <div className={`h-full w-full overflow-hidden rounded-[2.3rem] bg-[var(--cream)] ${bodyClassName}`}>
        {children ?? <span className="text-xs text-muted-foreground">[스크린샷 교체 예정]</span>}
      </div>
    </div>
  );
}

/* ── Simulator (390×844 정밀 스케일) ───────────────────────── */

const SIM_W = 390;
const SIM_H = 844;

function SimulatorFrame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      // 390×844 비율을 유지하면서 컨테이너 안에 정확히 맞춤
      // 프레임 안을 꽉 채우도록 살짝 오버스캔(102.5%)
      setScale(Math.min(width / SIM_W, height / SIM_H) * 1.025);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  // 네트워크 등으로 onLoad가 장시간 발생하지 않으면 안내 문구 표시
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setError(true), 15000);
    return () => clearTimeout(timer);
  }, [loading]);

  if (!SIMULATOR_URL) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">KERRI Simulator</div>
        <p className="text-[11px] leading-[1.7] text-muted-foreground">
          시뮬레이터 URL을 <code className="font-semibold">SIMULATOR_URL</code>에 연결하면
          이 화면에서 바로 체험할 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden bg-[var(--cream)]">
      <div
        className="absolute left-1/2 top-1/2 origin-center"
        style={{
          width: SIM_W,
          height: SIM_H,
          transform: `translate(-50%, calc(-50% - 9px)) scale(${scale})`,
        }}
      >


        {/* 로딩 스피너 */}
        {loading && !error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[var(--cream)]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            <p className="text-[11px] font-medium text-muted-foreground">시뮬레이터를 불러오는 중...</p>
          </div>
        )}

        {/* 실패 안내 */}
        {error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[var(--cream)] px-8 text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">KERRI Simulator</div>
            <p className="text-[11px] leading-[1.7] text-muted-foreground">
              시뮬레이터를 불러올 수 없습니다.
              <br />
              네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요.
            </p>
            <button
              onClick={() => {
                setLoading(true);
                setError(false);
                setRetryKey((k) => k + 1);
              }}
              className="mt-1 rounded-full bg-primary px-4 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-primary/90"
            >
              다시 시도
            </button>
          </div>
        )}

        <iframe
          key={retryKey}
          src={SIMULATOR_URL}
          title="KERRI AI 레슨 기록 시뮬레이터"
          width={SIM_W}
          height={SIM_H}
          loading="lazy"
          allowFullScreen
          allow="clipboard-write; fullscreen; autoplay"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="strict-origin-when-cross-origin"
          scrolling="yes"
          onLoad={() => {
            setLoading(false);
            setError(false);
          }}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          className="pointer-events-auto block h-full w-full border-0 bg-[var(--cream)] [touch-action:auto] [-webkit-overflow-scrolling:touch]"
          style={{ paddingTop: 34 }}
        />
      </div>
    </div>
  );
}

/* ── Empathy ───────────────────────────────────────────────── */

function Empathy() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  const cards = [
    {
      h: "오늘 알려준 걸 정리해서 보내줘야 하는데…",
      p: "레슨이 연달아 있으면 회원마다 피드백을 정리해서 보내는 것도 일이 됩니다.",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: "AI가 레슨 내용을 기록으로 정리",
        body: "레슨 중 코칭 내용을 AI가 정리해 회원별 레슨 기록으로 남겨줍니다.",
      },
    },
    {
      h: "이 회원 몇 회 남았지? 결제는 했나?",
      p: "횟수, 일정, 결제를 따로 관리하다 보면 확인할 일이 계속 늘어납니다.",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: "회원 운영을 한곳에서",
        body: "출석부터 남은 횟수, 일정, 결제까지 회원별로 한 번에 확인합니다.",
      },
    },
    {
      h: "누가 곧 끝나지? 내가 먼저 연락해야 하나?",
      p: "회원마다 남은 횟수를 확인하고 재등록 시기에 맞춰 일일이 연락하기 어렵습니다.",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: "재등록 시기를 놓치지 않게",
        body: "남은 횟수를 기준으로 재등록 시기를 알려주고, 회원에게 재등록 안내 문자도 자동으로 발송합니다.",
      },
    },
    {
      h: "지난번에 뭐 알려줬지? 다음엔 뭘 시키지?",
      p: "회원이 많아질수록 지난 레슨 내용과 교정 포인트를 기억하고, 각 회원에게 맞는 다음 훈련까지 준비하기 어렵습니다.",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: "지난 기록부터 다음 훈련까지",
        body: "지난 레슨 기록을 확인해 바로 이어서 코칭하고, 회원의 실력과 레슨 내용에 맞는 훈련 드릴을 추천합니다.",
      },
    },
  ];


  useEffect(() => {
    setHeights(contentRefs.current.map((el) => el?.scrollHeight ?? 0));
  }, []);

  return (
    <Section id="empathy" tone="cream" className="!py-24 sm:!py-28 lg:!py-36">
      <Container>
        <SectionHead
          eyebrow="코치의 고민"
          title={
            <>
              레슨이 끝나도,
              <br />
              코치의 일은 끝나지 않습니다.
            </>
          }
          center
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {cards.map((c, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={i * 80}>
                <div
                  className={`h-full overflow-hidden rounded-[1.5rem] border border-border/50 bg-card shadow-[0_1px_2px_rgba(36,30,26,0.03)] transition-shadow duration-300 ${
                    isOpen ? "ring-1 ring-primary/50 shadow-[0_12px_40px_-16px_rgba(192,117,90,0.2)]" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-3 p-[clamp(1.25rem,4.8vw,2.5rem)] text-left sm:gap-4"
                  >
                    <div className="min-w-0">
                      <h3 className="heading-3 break-keep text-foreground">{c.h}</h3>
                      <p className="body-2 mt-3 break-keep text-foreground/70">{c.p}</p>
                    </div>
                    <span className="mt-0.5 shrink-0 text-foreground/50 transition-transform duration-300">
                      {isOpen ? (
                        <ChevronUp size={22} strokeWidth={1.5} />
                      ) : (
                        <ChevronDown size={22} strokeWidth={1.5} />
                      )}
                    </span>
                  </button>
                  <div
                    className="transition-[max-height,opacity] duration-300 ease-out"
                    style={{
                      maxHeight: isOpen ? heights[i] : 0,
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      ref={(el) => {
                        contentRefs.current[i] = el;
                      }}
                      className="bg-[#F9F1EC] p-[clamp(1.25rem,4.8vw,2.5rem)]"
                    >
                      <div className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-primary">
                        {c.solve.caption}
                      </div>
                      <h4 className="heading-4 mt-3 break-keep text-foreground">{c.solve.title}</h4>
                      <p className="body-2 mt-3 break-keep text-foreground/70">{c.solve.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ── Member demand: 회원도 레슨 기록을 원합니다 ─────────────── */

function DonutChart({ value, size = 120 }: { value: number; size?: number }) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = Math.round((value / 100) * circumference * 100) / 100;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0 rotate-[-90deg]"
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-primary/10"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${circumference}`}
        strokeLinecap="round"
        className="text-primary"
      />
    </svg>
  );
}

function BarChart({ value, label }: { value: number; label: string }) {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between text-[0.75rem] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[0.8rem]">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-primary/10">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function MemberDemand() {
  return (
    <Section id="member-demand" className="!py-24 sm:!py-32 lg:!py-40">
      <Container>
        <div className="text-center">
          <div className="eyebrow">회원 설문</div>
          <p className="mt-6 text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-primary sm:text-[0.9rem]">
            내가 가르친 내용,
          </p>
          <h2 className="display-2 mx-auto mt-4 max-w-[22ch] break-keep text-foreground">
            회원은 얼마나 기억하고 있을까요?
          </h2>
        </div>

        <div className="mt-14 space-y-5 sm:mt-18 md:mt-20">
          {/* Main card — 55%: opening hook */}
          <Reveal>
            <div className="rounded-[1.5rem] border border-border/50 bg-card p-[clamp(1.25rem,4.8vw,3.5rem)] shadow-[var(--shadow-soft)]">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 max-w-2xl">
                  <div className="stat-xl text-primary">55%</div>
                  <p className="heading-3 mt-5 max-w-[24ch] break-keep text-foreground">
                    2명 중 1명은 배운 내용을 잊어버린 경험이 있습니다.
                  </p>
                  <p className="body-2 mt-3 max-w-[34ch] break-keep text-muted-foreground">
                    레슨이 끝난 뒤 배운 내용이 기억나지 않아 아쉬웠던 경험이 있습니다.
                  </p>
                  <p className="mt-5 text-[0.75rem] font-medium uppercase tracking-wider text-muted-foreground/80 sm:text-[0.8rem]">
                    개인 레슨 이용자 설문 결과
                  </p>
                </div>
                <div className="flex shrink-0 items-center justify-center sm:pl-6">
                  <div className="relative">
                    <DonutChart value={55} size={144} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[1.2rem] font-extrabold text-primary sm:text-[1.4rem]">55</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Two supporting cards with bar charts */}
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal delay={80}>
              <div className="h-full rounded-[1.5rem] border border-border/50 bg-card p-[clamp(1.25rem,4.8vw,3rem)] shadow-[var(--shadow-soft)]">
                <div className="stat-lg text-primary">90%</div>
                <p className="heading-3 mt-5 max-w-[24ch] break-keep text-foreground">
                  10명 중 9명은 레슨 피드백을 말로만 전달합니다.
                </p>
                <p className="body-2 mt-3 max-w-[36ch] break-keep text-muted-foreground">
                  레슨 중 피드백은 대부분 말로 전달되고, 회원이 다시 확인할 수 있는 기록으로는 남지 않습니다.
                </p>
                <BarChart value={90} label="피드백을 말로만 전달" />
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="h-full rounded-[1.5rem] border border-border/50 bg-card p-[clamp(1.25rem,4.8vw,3rem)] shadow-[var(--shadow-soft)]">
                <div className="stat-lg text-primary">96.6%</div>
                <p className="heading-3 mt-5 max-w-[24ch] break-keep text-foreground">
                  체계적인 레슨 기록과 맞춤 관리는 코치 선택에도 영향을 줍니다.
                </p>
                <p className="body-2 mt-3 max-w-[36ch] break-keep text-muted-foreground">
                  체계적인 레슨 기록과 맞춤 관리가 있다면 지금 코치와 더 오래 함께하고 싶다고 답했습니다.
                </p>
                <BarChart value={96.6} label="코치 선택에 영향을 줌" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Closing brand message */}
        <Reveal delay={120}>
          <div className="mt-18 text-center sm:mt-24">
            <p className="statement mx-auto max-w-[24ch] break-keep text-foreground">
              잘 가르치는 것만큼, 잘 남기는 것도 중요합니다.
            </p>
            <p className="body-2 mx-auto mt-6 max-w-[34ch] break-keep text-muted-foreground">
              KERRI는 매번 사라지던 코칭을 회원의 레슨 기록으로 남깁니다.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}




/* ── 기존 방식 vs KERRI ────────────────────────────────────── */

const COMPARE_ROWS: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  before: string;
  after: ReactNode;
  strong?: boolean;
}[] = [
  {
    icon: FileText,
    label: "AI 레슨 기록",
    before: "기억하거나 직접 작성",
    after: "AI가 레슨 내용을 자동으로 기록",
    strong: true,
  },
  {
    icon: Users,
    label: "회원 운영",
    before: "일정 · 횟수 · 결제 · 회원 정보를 따로 관리",
    after: "회원 관리부터 일정 · 횟수 · 결제까지 한곳에서 관리",
    strong: true,
  },
  {
    icon: Workflow,
    label: "다음 레슨 준비",
    before: "지난 수업을 기억과 메모에 의존",
    after: "지난 레슨 기록을 이어서 코칭하고, 회원의 실력과 레슨 내용에 맞는 훈련 드릴까지 추천",
    strong: true,
  },
  {
    icon: TrendingUp,
    label: "코칭 실적",
    before: "오래 가르쳐도 나의 코칭 경험과 성과가 남기 어려움",
    after: "레슨 기록과 코칭 실적이 쌓여 나의 코칭을 증명하는 데이터가 됩니다",
    strong: true,
  },
];

function Compare() {
  return (
    <Section id="compare" className="!py-24 sm:!py-32 lg:!py-40 !pb-16 sm:!pb-20 lg:!pb-28">
      <Container>
        <SectionHead eyebrow="기능 비교" title="코치의 일을 이렇게 바꿉니다" center />

        <Reveal delay={80}>
          <div className="mt-14 overflow-hidden rounded-[1.5rem] border border-border/50 bg-card sm:mt-18 lg:mt-20">
            {/* Desktop header */}
            <div className="hidden grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.15fr)] gap-6 border-b border-border/50 px-8 pb-4 pt-7 md:grid lg:gap-10 lg:px-10">
              <div className="text-[0.8rem] font-semibold tracking-wide text-muted-foreground">항목</div>
              <div className="text-[0.8rem] font-semibold tracking-wide text-muted-foreground">기존 방식</div>
              <div className="text-[0.85rem] font-bold tracking-tight text-primary">KERRI</div>
            </div>

            <div className="divide-y divide-border/50">
              {COMPARE_ROWS.map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.label}>
                    {/* Desktop row */}
                    <div className="hidden grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.15fr)] items-start gap-6 px-8 py-6 md:grid lg:gap-10 lg:px-10">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <Icon className="h-[19px] w-[19px] shrink-0 text-primary" strokeWidth={1.6} />
                        <span className="body-1 break-keep font-semibold tracking-tight text-foreground">
                          {row.label}
                        </span>
                      </div>
                      <p className="body-2 break-keep text-muted-foreground">{row.before}</p>
                      <div className="rounded-xl bg-primary/[0.07] px-4 py-3 -my-1">
                        <p className="body-2 break-keep font-bold text-foreground">
                          {row.after}
                        </p>
                      </div>
                    </div>

                    {/* Mobile row */}
                    <div className="px-[clamp(1.125rem,4.5vw,1.75rem)] py-5 md:hidden">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <Icon className="h-[18px] w-[18px] shrink-0 text-primary" strokeWidth={1.6} />
                        <span className="body-1 min-w-0 break-keep font-semibold tracking-tight text-foreground">
                          {row.label}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="text-[0.72rem] font-semibold uppercase tracking-wider text-muted-foreground/80">
                          기존 방식
                        </div>
                        <p className="body-2 mt-1 break-keep text-muted-foreground">
                          {row.before}
                        </p>
                      </div>
                      <div className="mt-3 rounded-xl bg-primary/[0.07] px-4 py-3.5">
                        <div className="text-[0.72rem] font-bold uppercase tracking-wider text-primary">KERRI</div>
                        <p className="body-2 mt-1 break-keep font-bold text-foreground">
                          {row.after}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}






/* ── Hero ──────────────────────────────────────────────────── */


function Hero() {
  return (
    <section id="top" className="relative overflow-hidden noise">
      <div className="warm-glow pointer-events-none absolute inset-0 -z-10" />
      <Container className="grid grid-cols-1 items-center gap-6 pb-10 pt-6 text-center lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-32 lg:pt-24 lg:text-left">
        <div className="section-fade flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-[0.8rem] font-semibold text-foreground/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            스포츠 강사를 위한 운영 플랫폼
          </div>

          <h1 className="hero-display mt-3 max-w-[13ch] break-keep">
            평소처럼 <span className="text-primary">레슨만</span> 하세요.
          </h1>

          <p className="lead mt-3 max-w-[26ch] break-keep sm:max-w-[34ch]">
            회원 관리부터 AI 레슨 기록까지. 운영은 KERRI가 대신합니다.
          </p>
        </div>

        <Reveal delay={120} className="flex justify-center">
          <div className="relative">
            <div className="phone-glow lg:hidden" />
            <div
              className="pointer-events-none absolute -inset-10 -z-10 hidden rounded-full opacity-70 blur-3xl lg:-inset-16 lg:block"
              style={{ background: "radial-gradient(circle, rgba(192,117,90,0.22), transparent 65%)" }}
            />
            <PhoneMock
              className="device-float device-gloss w-[82%] min-w-[260px] max-w-[380px] !aspect-[390/844] lg:w-[390px]"
              bodyClassName="relative flex flex-col overflow-hidden"
            >
              <SimulatorFrame />

            </PhoneMock>

          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ── Product showcase (실제 앱 화면) ────────────────────────── */

function Shot({
  src,
  alt,
  caption,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure
      tabIndex={0}
      aria-label={alt}
      className="group m-0 rounded-[1.6rem] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--cream)]"
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={`block w-full rounded-[1.6rem] border border-black/5 bg-white shadow-[0_34px_70px_-30px_rgba(0,0,0,0.32)] ${className}`}
      />
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}


function FeatureCopy({
  num,
  title,
  desc,
  message,
  className = "",
}: {
  num: string;
  title: string;
  desc: string;
  message: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-[0.8rem] font-bold tracking-[0.18em] text-primary">{num}</div>
      <h3 className="mt-3 max-w-[20ch] break-keep text-[clamp(1.3rem,1rem+1.6vw,1.85rem)] font-bold leading-[1.3] tracking-tight">
        {message}
      </h3>
      <p className="body-2 mt-4 max-w-[36ch] break-keep text-muted-foreground">
        <span className="font-semibold text-foreground/80">{title}</span> · {desc}
      </p>
    </div>
  );
}

function Ops() {
  return (
    <Section
      id="features"
      tone="cream"
      className="!pt-16 sm:!pt-20 lg:!pt-28 !pb-16 sm:!pb-20 lg:!pb-28"
    >
      <Container>
        <SectionHead
          eyebrow="코치앱 기능"
          title={
            <>
              레슨부터 회원 운영까지{" "}
              <span className="text-primary">KERRI 하나로.</span>
            </>
          }
          body={
            <>
              실제 KERRI 앱 화면으로 확인하세요. 레슨 기록, 일정, 결제, 알림까지 한 곳에서 관리합니다.
            </>
          }
        />

        {/* 01 홈 대시보드 */}
        <Reveal>
          <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-[1fr_46%] lg:gap-16">
            <FeatureCopy
              num="01"
              message="오늘의 레슨 운영을 한눈에"
              title="홈 대시보드"
              desc="회원 현황과 오늘 레슨을 한눈에 확인"
            />
            <div className="mx-auto w-[86%] max-w-[360px] lg:w-full lg:max-w-[400px]">
              <Shot
                src={appHome.url}
                alt="KERRI 코치앱 홈 대시보드 화면. 전체 회원 수와 오늘 예정된 레슨 목록, 회원별 남은 레슨 횟수가 정리되어 있습니다."
                caption="홈 대시보드 — 회원 현황과 오늘 레슨을 한눈에 확인"
                priority
              />

            </div>
          </div>
        </Reveal>

        {/* 02 · 03 알림 + 결제 (겹침) */}
        <Reveal>
          <div className="mt-20 grid items-center gap-12 lg:mt-32 lg:grid-cols-[1fr_52%] lg:gap-16">
            <div className="space-y-10">
              <FeatureCopy
                num="02"
                message="놓치기 쉬운 운영은 자동으로"
                title="알림 설정"
                desc="레슨 전날, 당일, 재등록 알림 관리"
              />
              <FeatureCopy
                num="03"
                message="결제와 미납까지 한곳에서"
                title="결제 내역 관리"
                desc="회원별 결제와 미납 현황 관리"
              />
            </div>

            <div className="relative mx-auto w-[92%] max-w-[420px] pb-[16%] lg:w-full lg:max-w-[520px]">
              <div className="w-[74%]">
                <Shot
                  src={appNotify.url}
                  alt="KERRI 코치앱 알림 설정 화면. 레슨 전날·당일 리마인드와 재등록 안내 알림을 항목별로 켜고 끌 수 있습니다."
                  caption="알림 설정 — 레슨 전날, 당일, 재등록 알림 관리"
                />

              </div>
              <div className="absolute bottom-0 right-0 w-[62%]">
                <Shot
                  src={appPayment.url}
                  alt="KERRI 코치앱 결제 내역 화면. 회원별 결제 금액과 결제일, 미납 상태가 목록으로 표시됩니다."
                  caption="결제 내역 관리 — 회원별 결제와 미납 현황 관리"
                />

              </div>
            </div>
          </div>
        </Reveal>

        {/* 04 스케줄 */}
        <Reveal>
          <div className="mt-20 grid items-center gap-10 lg:mt-32 lg:grid-cols-[46%_1fr] lg:gap-16">
            <div className="order-2 mx-auto w-[86%] max-w-[360px] lg:order-1 lg:w-full lg:max-w-[400px]">
              <Shot
                src={appSchedule.url}
                alt="KERRI 코치앱 스케줄 관리 화면. 주간 캘린더에 시간대별 레슨 일정과 회원 이름이 배치되어 있습니다."
                caption="스케줄 관리 — 일일·주간·월간 레슨 일정 관리"
              />

            </div>
            <FeatureCopy
              className="order-1 lg:order-2"
              num="04"
              message="복잡한 레슨 일정도 간편하게"
              title="스케줄 관리"
              desc="일일 · 주간 · 월간 레슨 일정 관리"
            />
          </div>
        </Reveal>
      </Container>

      {/* 05 AI 레슨 기록 — 핵심 강조 */}
      <div className="mt-20 border-y border-border/50 bg-[var(--ink)] py-16 sm:py-20 lg:mt-32 lg:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-[720px] text-center">
              <div className="text-[0.8rem] font-bold tracking-[0.18em] text-primary">05</div>
              <h3 className="mx-auto mt-4 max-w-[16ch] break-keep text-[clamp(1.6rem,1.1rem+2.6vw,3rem)] font-bold leading-[1.25] tracking-tight text-white">
                코칭이 끝나도,
                <br />
                <span className="text-primary">기록은 남습니다.</span>
              </h3>
              <p className="body-1 mx-auto mt-5 max-w-[34ch] break-keep text-white/65">
                레슨 내용을 AI가 핵심 내용, 성과, 개선점, 연습 방향으로 정리합니다.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-12 w-[90%] max-w-[420px] sm:mt-14 lg:max-w-[460px]">
              <figure
                tabIndex={0}
                aria-label="KERRI AI 레슨 기록 화면. AI가 정리한 레슨 핵심 내용, 성과, 개선점, 다음 연습 방향이 항목별로 표시됩니다."
                className="m-0 rounded-[1.6rem] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--ink)]"
              >
                <img
                  src={appReport.url}
                  alt="KERRI AI 레슨 기록 화면. AI가 정리한 레슨 핵심 내용, 성과, 개선점, 다음 연습 방향이 항목별로 표시됩니다."
                  loading="lazy"
                  className="block w-full rounded-[1.6rem] border border-white/10 bg-white shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]"
                />
                <figcaption className="sr-only">
                  AI 레슨 기록 — 레슨 내용을 AI가 핵심 내용, 성과, 개선점, 연습 방향으로 정리
                </figcaption>
              </figure>
            </div>

          </Reveal>
        </Container>
      </div>
    </Section>
  );
}




/* ── Impact: KERRI를 사용하면 달라집니다 ───────────────────── */

function Impact() {
  const cards = [
    {
      icon: TrendingUp,
      title: "재등록률 향상",
      desc: "개인 맞춤 레슨 기록과 지속적인 케어로\n회원이 꾸준히 레슨을 이어갑니다.",
    },
    {
      icon: ShieldCheck,
      title: "회원과의 신뢰",
      desc: "레슨 횟수 · 일정 · 결제 · 레슨 기록이\n투명하게 관리되어 회원과의 신뢰를 높입니다.",
    },
    {
      icon: Database,
      title: "코칭 데이터 자산화",
      desc: "앱을 사용할수록 회원별 코칭 데이터가 쌓여\n나의 코칭을 증명하는 자산이 됩니다.",
    },
    {
      icon: Workflow,
      title: "운영 자동화",
      desc: "일정 · 횟수 · 결제 · 알림까지\n놓치지 않고 한 번에 관리합니다.",
    },
  ];

  return (
    <Section id="impact">
      <Container>
        <SectionHead eyebrow="기대 효과" title="KERRI를 사용하면 달라집니다." center />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:mt-18 lg:mt-20 lg:grid-cols-4">
          {cards.map((c, idx) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={idx * 80}>
                <div className="surface surface-hover h-full rounded-[1.5rem] p-[clamp(1rem,3.6vw,1.75rem)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary sm:h-11 sm:w-11">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="heading-4 mt-4 break-keep text-foreground">{c.title}</h3>
                  <p className="body-3 mt-3 break-keep text-muted-foreground">{c.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ── Store ─────────────────────────────────────────────────── */

const COACH_APP_URL = "https://apps.apple.com/kr/app/kerri/id6783224934";
const COACH_PLAY_URL = "https://play.google.com/store/apps/details?id=com.tenniscoach.app";
const MEMBER_APP_URL = "https://apps.apple.com/kr/app/kerri-member/id6783235236";
const MEMBER_PLAY_URL = "https://play.google.com/store/apps/details?id=com.kerri.memberapp";

function StoreBadges({
  appStoreUrl,
  playStoreUrl,
}: {
  appStoreUrl: string;
  playStoreUrl: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="App Store에서 다운로드"
        className="inline-block h-12 w-auto overflow-hidden rounded-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      >
        <img
          src={appleStoreBadge.url}
          alt="App Store에서 다운로드"
          width={156}
          height={48}
          loading="lazy"
          className="h-12 w-auto object-contain"
        />
      </a>
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Google Play에서 다운로드"
        className="inline-block h-12 w-auto overflow-hidden rounded-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      >
        <img
          src={googlePlayBadge.url}
          alt="Google Play에서 다운로드"
          width={124}
          height={48}
          loading="lazy"
          className="h-12 w-auto object-contain"
        />
      </a>
    </div>
  );
}

function QR({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} App Store QR 코드`}
      className="hidden h-24 w-24 place-items-center overflow-hidden rounded-2xl border border-border/70 bg-white p-2 shadow-[var(--shadow-soft)] md:grid"
    >
      <RoundedQR value={url} size={80} />
    </a>
  );
}




/* ── Install ───────────────────────────────────────────────── */

function AppSection() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onFocus = (e: Event) => {
      if ((e as CustomEvent).detail !== "install") return;
      setPulse(false);
      window.setTimeout(() => setPulse(true), 450);
    };
    window.addEventListener("kerri:focus", onFocus as EventListener);
    return () => window.removeEventListener("kerri:focus", onFocus as EventListener);
  }, []);
  useEffect(() => {
    if (!pulse) return;
    const t = window.setTimeout(() => setPulse(false), 2400);
    return () => window.clearTimeout(t);
  }, [pulse]);

  return (
    <Section id="install" tone="cream" className="!pt-20 sm:!pt-28 lg:!pt-36 !pb-16 sm:!pb-20 lg:!pb-24">
      <Container>
        <SectionHead
          eyebrow="다운로드"
          title={
            <>
              코치와 회원, 모두를 위한 플랫폼
            </>
          }
        />

        <div className="mt-12 grid gap-6 sm:mt-16 md:mt-20 md:grid-cols-2">
          <Reveal>
            <div
              className={`relative surface h-full rounded-[1.85rem] p-[clamp(1.25rem,4.8vw,3rem)] transition-all duration-500 ${
                pulse
                  ? "!border-primary ring-4 ring-primary/20 -translate-y-1.5 shadow-[0_36px_70px_-30px_rgba(192,117,90,0.5)] animate-[installPulse_1.1s_ease-in-out_2]"
                  : ""
              }`}
            >
              <div className="eyebrow absolute right-4 top-4 rounded-md bg-[var(--clay)]/10 px-2 py-1">추천</div>
              <h3 className="mt-4 text-[clamp(1.5rem,1.1rem+1.9vw,2.2rem)] font-extrabold leading-[1.3] tracking-tight">
                케리 코치앱
              </h3>
              <p className="body-1 mt-6 max-w-[30ch] break-keep text-muted-foreground">
                회원 관리 · 일정 · 결제 · AI 레슨 기록. 운영을 하나의 앱으로 관리하세요.
              </p>
              <div className="mt-10">
                <StoreBadges appStoreUrl={COACH_APP_URL} playStoreUrl={COACH_PLAY_URL} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="surface h-full rounded-[1.85rem] p-[clamp(1.25rem,4.8vw,3rem)]">
              <div className="flex flex-col items-start gap-2 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between min-[380px]:gap-3">
                <h3 className="min-w-0 text-[clamp(1.5rem,1.1rem+1.9vw,2.2rem)] font-extrabold leading-[1.3] tracking-tight">
                  케리 회원앱
                </h3>
                <Link
                  to="/member"
                  className="group inline-flex items-center gap-1 text-[0.85rem] font-semibold text-primary transition-colors duration-200 hover:text-primary/80 hover:underline underline-offset-4"
                >
                  회원앱 자세히 보기
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
              <p className="body-1 mt-6 max-w-[30ch] break-keep text-muted-foreground">
                레슨 기록 · 성장 기록 · 일정 · 남은 횟수. 회원도 자신의 레슨을 기록으로 관리하세요.
              </p>
              <div className="mt-10">
                <StoreBadges appStoreUrl={MEMBER_APP_URL} playStoreUrl={MEMBER_PLAY_URL} />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}


/* ── FAQ ───────────────────────────────────────────────────── */

function FAQ() {
  const items = [
    {
      q: "AI 레슨 기록은 어떻게 만들어지나요?",
      a: (
        <>
          레슨 중 코칭 내용을 녹음하면
          <br />
          AI가 핵심 내용을 정리해 회원별 레슨 기록으로 만들어줍니다.
          <br />
          오늘 배운 내용부터 잘한 점, 개선 포인트,
          <br />
          다음 연습 방향까지 한 번에 정리할 수 있습니다.
        </>
      ),
    },
    {
      q: "레슨 전체를 녹음해야 하나요?",
      a: (
        <>
          아니요. 코치가 편한 방식으로 기록할 수 있습니다.
          <br />
          레슨 전체 내용을 남기고 싶다면 수업 시간 동안 녹음하고,
          <br />
          간단히 기록하고 싶다면 레슨이 끝난 뒤
          <br />
          약 10초 정도 핵심 내용만 녹음해도 됩니다.
          <br />
          녹음을 놓쳤다면 직접 타이핑해서 기록할 수도 있습니다.
        </>
      ),
    },
    {
      q: "별도의 녹음 장비가 꼭 필요한가요?",
      a: (
        <>
          아니요. 스마트폰만으로도 사용할 수 있으며,
          <br />
          현재 사용하고 있는 무선 이어폰이나 무선 마이크도 활용할 수 있습니다.
          <br />
          레슨 환경에 맞는 편한 방법으로 코칭 내용을 녹음하면 됩니다.
        </>
      ),
    },
    {
      q: "회원도 앱을 설치해야 하나요?",
      a: (
        <>
          네. 코치가 회원을 초대하면
          <br />
          KERRI 코치앱과 회원앱이 서로 연결됩니다.
          <br />
          연결된 회원은 회원앱에서
          <br />
          자신의 레슨 기록, 일정, 결제 내역, 남은 횟수 등을 직접 확인할 수 있습니다.
        </>
      ),
    },
    {
      q: "테니스 외 다른 스포츠에서도 사용할 수 있나요?",
      a: (
        <>
          네. KERRI는 특정 종목에만 한정되지 않습니다.
          <br />
          테니스, 골프, 배드민턴, 탁구, PT 등
          <br />
          코치와 회원이 레슨을 진행하는 다양한 스포츠에서 사용할 수 있습니다.
        </>
      ),
    },
    {
      q: "무료로 사용해볼 수 있나요?",
      a: (
        <>
          네. 처음 한 달 동안 무료로 체험할 수 있습니다.
          <br />
          직접 사용해보고 계속 이용할지 결정하면 되며,
          <br />
          서비스가 맞지 않는다면 언제든지 해지할 수 있습니다.
        </>
      ),
    },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section id="faq" tone="cream">
      <div className="mx-auto w-full max-w-3xl px-[clamp(1.125rem,4.5vw,2.5rem)]">
        <SectionHead
          eyebrow="FAQ"
          title={
            <>
              자주 묻는 <span className="text-primary">질문</span>
            </>
          }
        />
        <Reveal delay={80}>
          <div className="surface mt-16 divide-y divide-border/60 overflow-hidden rounded-[1.5rem]">
            {items.map((it, idx) => {
              const isOpen = open === idx;
              return (
                <div key={it.q}>
                  <button
                    className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-4 px-[clamp(1.25rem,4.8vw,1.75rem)] py-6 text-left transition-colors duration-200 hover:bg-foreground/[0.015] sm:py-7"
                    onClick={() => setOpen(isOpen ? null : idx)}
                  >
                    <span className="heading-4 min-w-0 break-keep">{it.q}</span>
                    <span
                      className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-foreground/[0.05] text-foreground/60 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="body-2 -mt-1 break-keep px-[clamp(1.25rem,4.8vw,1.75rem)] pb-7 text-muted-foreground">
                      {it.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Final CTA ─────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section
      id="cta"
      className="noise relative overflow-hidden py-28 sm:py-32 lg:py-40"
      style={{ background: "linear-gradient(145deg, #C0755A 0%, #A55E45 55%, #8E4E39 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: "radial-gradient(700px 380px at 20% 0%, rgba(255,255,255,0.22), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-[clamp(1.125rem,4.5vw,2.5rem)] text-center text-[var(--cream)] lg:px-10">
        <Reveal>
          <h2 className="display-2 mx-auto max-w-[20ch] break-keep">
            회원 관리부터 AI 레슨 기록까지. 케리 하나면 충분합니다.
          </h2>
          <p className="body-1 mx-auto mt-8 max-w-[28ch] break-keep opacity-85">
            코치는 레슨에만 집중하고, 운영은 KERRI가 관리합니다.
          </p>
          <button onClick={() => scrollTo("install")} className="btn-base btn-light mt-12">
            코치앱 설치하기
            <ArrowRight size={18} strokeWidth={1.75} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}


/* ── Sticky mobile CTA ─────────────────────────────────────── */

function StickyMobileCTA() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const target = document.getElementById("install");
    if (!target) return;
    const io = new IntersectionObserver((entries) => setHide(entries[0].isIntersecting), { threshold: 0.2 });
    io.observe(target);
    return () => io.disconnect();
  }, []);
  if (hide) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-background via-background/95 to-transparent p-4 pt-10 md:hidden">
      <button onClick={() => scrollTo("install")} className="btn-base btn-primary w-full">
        앱 설치하기
      </button>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Empathy />
        <MemberDemand />
        <Compare />
        <Impact />
        <Ops />
        <AppSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
