import { createFileRoute, Link } from "@tanstack/react-router";
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

/** ▼▼ 여기에 KERRI AI 레슨 리포트 시뮬레이터 공개 URL을 넣어주세요 ▼▼ */
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
          title="KERRI AI 레슨 리포트 시뮬레이터"
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
      h: "레슨이 끝난 후",
      p: "회원에게 피드백을 보내는 일이\n번거롭습니다.",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: "AI 레슨 리포트 자동 생성",
        body: "레슨이 끝나면 AI가 핵심 내용을 정리합니다.\n코치는 검토 후 회원에게 전송만 하면 됩니다.",
      },
    },
    {
      h: "횟수, 일정, 결제 내역을 수기와 엑셀로 관리하고 있습니다.",
      p: "체크가 누락되거나 잘못 기록되면\n회원과 불필요한 오해가 생길 수 있습니다.",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: "회원 운영 통합 관리",
        body: "회원, 횟수, 일정, 결제 내역을 하나의 플랫폼에서 함께 관리합니다.\n관리 실수를 줄이고 회원과의 혼선을 예방할 수 있습니다.",
      },
    },
    {
      h: "노쇼나 재등록 시기를 놓친 적이 있습니다.",
      p: "회원 한 명 한 명 직접 확인하고\n연락하는 일이 반복됩니다.",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: "자동 알림",
        body: "노쇼와 재등록 시기를 자동으로 알려주어 중요한 회원 관리를 놓치지 않습니다.",
      },
    },
    {
      h: "레슨이 많아질수록",
      p: "회원별 이전 레슨 내용을 기억하기 어렵습니다.\n지난 레슨에서 무엇을 알려줬는지\n다시 찾아보거나 기억에 의존하게 됩니다.",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: "회원별 레슨 기록",
        body: "회원별 레슨 기록이 자동으로 저장되어 지난 레슨부터 다음 레슨까지 자연스럽게 이어갈 수 있습니다.",
      },
    },
  ];

  useEffect(() => {
    setHeights(contentRefs.current.map((el) => el?.scrollHeight ?? 0));
  }, []);

  return (
    <Section id="empathy" tone="cream" className="!py-24 sm:!py-28 lg:!py-36">
      <Container>
        <SectionHead eyebrow="코치의 고민" title="이런 경험 있으신가요?" center />
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
                    className="flex w-full items-start justify-between gap-4 p-8 sm:p-10 text-left"
                  >
                    <div className="flex-1">
                      <h3 className="text-[1.15rem] font-semibold leading-snug tracking-tight text-foreground">
                        {c.h}
                      </h3>
                      <p className="mt-4 whitespace-pre-line text-[1rem] leading-[1.75] text-foreground/70">
                        {c.p}
                      </p>
                    </div>
                    <span className="mt-1 shrink-0 text-foreground/50 transition-transform duration-300">
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
                      className="bg-[#F9F1EC] p-8 sm:p-10"
                    >
                      <div className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-primary">
                        {c.solve.caption}
                      </div>
                      <h4 className="mt-3 text-[1.15rem] font-bold tracking-tight text-foreground">
                        {c.solve.title}
                      </h4>
                      <p className="mt-3 whitespace-pre-line text-[1rem] leading-[1.75] text-foreground/70">
                        {c.solve.body}
                      </p>
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
          <h2 className="mt-4 text-[1.8rem] font-bold leading-[1.2] tracking-tight text-foreground sm:text-[2.4rem] lg:text-[3rem]">
            <span className="sm:hidden">회원은 얼마나<br />기억하고 있을까요?</span>
            <span className="hidden sm:inline">회원은 얼마나 기억하고 있을까요?</span>
          </h2>
        </div>

        <div className="mt-14 space-y-5 sm:mt-18 md:mt-20">
          {/* Main card — number and donut chart */}
          <Reveal>
            <div className="rounded-[1.5rem] border border-border/50 bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <div className="text-[3.5rem] font-extrabold leading-none tracking-tight text-primary sm:text-[5rem] lg:text-[6rem]">
                    96.6%
                  </div>
                  <p className="mt-5 text-[1.15rem] font-semibold leading-[1.4] tracking-tight text-foreground sm:text-[1.3rem] lg:text-[1.4rem]">
                    <span className="sm:hidden">레슨 기록과 맞춤 관리는<br />코치 선택에 중요합니다.</span>
                    <span className="hidden sm:inline">
                      <span className="block">레슨 기록과 맞춤 관리는</span>
                      <span className="block">코치 선택에 중요합니다.</span>
                    </span>
                  </p>
                  <p className="mt-3 text-[0.9rem] leading-[1.7] text-muted-foreground sm:text-[1rem]">
                    <span className="sm:hidden">체계적인 레슨 기록과 맞춤 관리가 있다면<br />지금 코치와 더 오래 함께하고 싶다고 답했습니다.</span>
                    <span className="hidden sm:inline">
                      <span className="block">체계적인 레슨 기록과 맞춤 관리가 있다면</span>
                      <span className="block">지금 코치와 더 오래 함께하고 싶다고 답했습니다.</span>
                    </span>
                  </p>
                  <p className="mt-5 text-[0.75rem] font-medium uppercase tracking-wider text-muted-foreground/80 sm:text-[0.8rem]">
                    개인 레슨 이용자 설문 결과
                  </p>
                </div>
                <div className="flex shrink-0 items-center justify-center sm:pl-6">
                  <div className="relative">
                    <DonutChart value={96.6} size={144} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[1.2rem] font-extrabold text-primary sm:text-[1.4rem]">96.6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Two supporting cards with bar charts */}
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal delay={80}>
              <div className="h-full rounded-[1.5rem] border border-border/50 bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
                <div className="text-[2.5rem] font-extrabold leading-none tracking-tight text-primary sm:text-[3rem] lg:text-[3.5rem]">
                  90%
                </div>
                <p className="mt-5 text-[1.15rem] font-semibold leading-[1.35] tracking-tight text-foreground sm:text-[1.3rem] lg:text-[1.4rem]">
                  <span className="sm:hidden">10명 중 9명은<br />피드백을 말로만 받아요.</span>
                  <span className="hidden sm:inline">
                    <span className="block">10명 중 9명은</span>
                    <span className="block">피드백을 말로만 받아요.</span>
                  </span>
                </p>
                <p className="mt-3 text-[0.9rem] leading-[1.7] text-muted-foreground sm:text-[1rem]">
                  <span className="sm:hidden">대부분의 레슨 피드백이<br />수업 중 말로 전달되고 있습니다.</span>
                  <span className="hidden sm:inline">
                    <span className="block">대부분의 레슨 피드백이</span>
                    <span className="block">수업 중 말로 전달되고 있습니다.</span>
                  </span>
                </p>
                <BarChart value={90} label="말로 전달된 피드백" />
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="h-full rounded-[1.5rem] border border-border/50 bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
                <div className="text-[2.5rem] font-extrabold leading-none tracking-tight text-primary sm:text-[3rem] lg:text-[3.5rem]">
                  55%
                </div>
                <p className="mt-5 text-[1.15rem] font-semibold leading-[1.35] tracking-tight text-foreground sm:text-[1.3rem] lg:text-[1.4rem]">
                  <span className="sm:hidden">2명 중 1명은<br />배운 내용을 잊어버려요.</span>
                  <span className="hidden sm:inline">
                    <span className="block">2명 중 1명은</span>
                    <span className="block">배운 내용을 잊어버려요.</span>
                  </span>
                </p>
                <p className="mt-3 text-[0.9rem] leading-[1.7] text-muted-foreground sm:text-[1rem]">
                  <span className="sm:hidden">레슨이 끝난 뒤 배운 내용이 기억나지 않아<br />아쉬웠던 경험이 있습니다.</span>
                  <span className="hidden sm:inline">
                    <span className="block">레슨이 끝난 뒤 배운 내용이 기억나지 않아</span>
                    <span className="block">아쉬웠던 경험이 있습니다.</span>
                  </span>
                </p>
                <BarChart value={55} label="잊어버린 배운 내용" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Closing brand message */}
        <Reveal delay={120}>
          <div className="mt-18 text-center sm:mt-24">
            <p className="mx-auto max-w-3xl text-[1.35rem] font-bold leading-[1.35] tracking-tight text-foreground sm:text-[1.8rem] lg:text-[2.1rem]">
              <span className="sm:hidden">잘 가르치는 것만큼,<br />잘 남기는 것도 중요합니다.</span>
              <span className="hidden sm:inline">
                <span className="block">잘 가르치는 것만큼, 잘 남기는 것도 중요합니다.</span>
              </span>
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-[0.9rem] leading-[1.8] text-muted-foreground sm:text-[1rem]">
              <span className="sm:hidden">KERRI는 매번 사라지던 코칭을<br />회원의 레슨 기록으로 남깁니다.</span>
              <span className="hidden sm:inline">
                <span className="block">KERRI는 매번 사라지던 코칭을</span>
                <span className="block">회원의 레슨 기록으로 남깁니다.</span>
              </span>
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}



/* ── 기존 방식 vs KERRI ────────────────────────────────────── */

const COMPARE_ROWS: {
  icon: typeof FileText;
  label: string;
  before: string;
  after: string;
  note?: string;
  strong?: boolean;
  semibold?: boolean;
}[] = [
  {
    icon: FileText,
    label: "AI 레슨 리포트",
    before: "기억하거나 직접 작성",
    after: "AI가 핵심 내용을 자동으로 정리",
    strong: true,
  },
  {
    icon: CalendarCheck,
    label: "운영 관리",
    before: "일정 · 횟수 · 결제를 직접 확인",
    after: "일정 · 횟수 · 결제가 자동으로 연결",
    note: "출석부터 잔여 횟수 · 결제 · 재등록까지 놓치지 않게",
    semibold: true,
  },
  {
    icon: Users,
    label: "회원 관리",
    before: "카톡 · 엑셀 · 메모에 분산",
    after: "회원 정보를 한곳에서 관리",
  },
  {
    icon: Smartphone,
    label: "회원 확인",
    before: "일정 · 횟수 등을 코치에게 직접 확인",
    after: "회원앱에서 바로 확인",
  },
  {
    icon: History,
    label: "다음 레슨",
    before: "기억과 메모에 의존",
    after: "지난 레슨 기록을 이어서 코칭",
  },
];

function Compare() {
  return (
    <Section id="compare" className="!py-24 sm:!py-32 lg:!py-40 !pb-16 sm:!pb-20 lg:!pb-28">
      <Container>
        <SectionHead eyebrow="기능 비교" title="기존 방식과 무엇이 다를까요?" center />

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
                        <span className="text-[0.975rem] font-semibold leading-[1.5] tracking-tight text-foreground">
                          {row.label}
                        </span>
                      </div>
                      <p className="text-[0.925rem] leading-[1.5] text-muted-foreground">{row.before}</p>
                      <div
                        className={`rounded-xl ${
                          row.strong ? "bg-primary/[0.07] px-4 py-3 -my-1" : ""
                        }`}
                      >
                        <p
                          className={`text-[0.925rem] leading-[1.5] text-foreground ${
                            row.strong ? "font-bold" : row.semibold ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {row.after}
                        </p>
                        {row.note && (
                          <p className="mt-1.5 text-[0.78rem] leading-[1.5] text-muted-foreground">{row.note}</p>
                        )}
                      </div>
                    </div>

                    {/* Mobile row */}
                    <div className="px-6 py-6 md:hidden">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <Icon className="h-[18px] w-[18px] shrink-0 text-primary" strokeWidth={1.6} />
                        <span className="text-[0.95rem] font-semibold leading-[1.5] tracking-tight text-foreground">
                          {row.label}
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="text-[0.72rem] font-semibold uppercase tracking-wider text-muted-foreground/80">
                          기존 방식
                        </div>
                        <p className="mt-1 break-keep text-[0.9rem] leading-[1.55] text-muted-foreground">
                          {row.before}
                        </p>
                      </div>
                      <div className={`mt-4 rounded-xl ${row.strong ? "bg-primary/[0.07] px-4 py-3.5" : ""}`}>
                        <div className="text-[0.72rem] font-bold uppercase tracking-wider text-primary">KERRI</div>
                        <p
                          className={`mt-1 break-keep text-[0.9rem] leading-[1.55] text-foreground ${
                            row.strong ? "font-bold" : row.semibold ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {row.after}
                        </p>
                        {row.note && (
                          <p className="mt-1.5 break-keep text-[0.78rem] leading-[1.55] text-muted-foreground">
                            {row.note}
                          </p>
                        )}
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

          <h1 className="hero-display mt-3">
            <span className="sm:hidden">
              평소처럼
              <br />
              <span className="text-primary">레슨만</span> 하세요.
            </span>
            <span className="hidden sm:inline">
              평소처럼 <span className="text-primary">레슨만</span>
              <br />
              하세요.
            </span>
          </h1>

          <p className="lead mt-3 max-w-lg text-balance">
            <span className="sm:hidden">
              회원 관리부터 AI 레슨 리포트까지.
              <br />
              운영은 KERRI가 대신합니다.
            </span>
            <span className="hidden sm:inline">
              회원 관리부터 AI 레슨 리포트까지. 운영은 KERRI가 대신합니다.
            </span>
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
      <h3 className="mt-3 text-[1.5rem] font-bold leading-[1.3] tracking-tight sm:text-[1.85rem]">
        {message}
      </h3>
      <p className="mt-4 text-[0.95rem] leading-[1.8] text-muted-foreground">
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
              레슨부터 회원 운영까지
              <br />
              <span className="text-primary">KERRI 하나로.</span>
            </>
          }
          body={
            <>
              실제 KERRI 앱 화면으로 확인하세요.
              <br className="hidden sm:block" /> 레슨 기록, 일정, 결제, 알림까지 한 곳에서 관리합니다.
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
              <h3 className="mt-4 text-[1.9rem] font-bold leading-[1.25] tracking-tight text-white sm:text-[2.6rem] lg:text-[3rem]">
                코칭이 끝나도,
                <br />
                <span className="text-primary">기록은 남습니다.</span>
              </h3>
              <p className="mt-5 text-[0.975rem] leading-[1.85] text-white/65 sm:text-[1.05rem]">
                레슨 내용을 AI가 핵심 내용, 성과, 개선점, 연습 방향으로 정리합니다.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-12 w-[90%] max-w-[420px] sm:mt-14 lg:max-w-[460px]">
              <figure
                tabIndex={0}
                aria-label="KERRI AI 레슨 리포트 화면. AI가 정리한 레슨 핵심 내용, 성과, 개선점, 다음 연습 방향이 항목별로 표시됩니다."
                className="m-0 rounded-[1.6rem] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--ink)]"
              >
                <img
                  src={appReport.url}
                  alt="KERRI AI 레슨 리포트 화면. AI가 정리한 레슨 핵심 내용, 성과, 개선점, 다음 연습 방향이 항목별로 표시됩니다."
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
                <div className="surface surface-hover h-full rounded-[1.5rem] p-5 sm:p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary sm:h-11 sm:w-11">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-4 text-[1.05rem] font-bold leading-tight tracking-tight text-foreground sm:text-[1.2rem]">
                    {c.title}
                  </h3>
                  <p className="mt-3 whitespace-pre-line text-[0.8rem] leading-[1.7] text-muted-foreground sm:text-[0.9rem]">
                    {c.desc}
                  </p>
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

function AppStoreBadge({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on the App Store"
      className="inline-block rounded-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <svg viewBox="0 0 176 52" className="h-12 w-auto" role="img" aria-label="Download on the App Store">
        <rect width="176" height="52" rx="9" fill="var(--ink)" />
        <g transform="translate(12, 12) scale(1.15)" fill="#fff">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.84-.91.65.03 2.48.26 3.66 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </g>
        <text x="52" y="22" fill="#fff" fontSize="10" fontFamily="Inter, system-ui, -apple-system, sans-serif" letterSpacing="0.02em">
          Download on the
        </text>
        <text x="52" y="40" fill="#fff" fontSize="19" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="bold">
          App Store
        </text>
      </svg>
    </a>
  );
}

function GooglePlayBadge({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
      className="inline-block rounded-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <svg viewBox="0 0 176 52" className="h-12 w-auto" role="img" aria-label="Get it on Google Play">
        <rect width="176" height="52" rx="9" fill="var(--ink)" />
        <g transform="translate(12, 12) scale(1.15)">
          <path d="M3.6 1.4L13.4 11l-9.8 9.6c-.6-.2-1-.8-1-1.4V2.8c0-.6.4-1.2 1-1.4z" fill="#EA4335" />
          <path d="M4.5 1.2l10.1 9.9 2.6-2.6L5.2 1.2c-.4-.2-.9-.2-1.3 0-.4.2-.7.6-.7 1.1v-.9z" fill="#FBBC04" />
          <path d="M22.4 11.6l-4.2-1.6-3.4 3.4 3.4 3.4 4.2-1.6c1.5-.6 1.5-2.6 0-3.2z" fill="#34A853" />
          <path d="M4.5 22.8c.2.1.5.2.8.2.3 0 .6-.1.8-.2l10.1-9.9-2.6-2.6L4.5 22.8z" fill="#4285F4" />
        </g>
        <text x="52" y="22" fill="#fff" fontSize="10" fontFamily="Inter, system-ui, -apple-system, sans-serif" letterSpacing="0.02em">
          GET IT ON
        </text>
        <text x="52" y="40" fill="#fff" fontSize="19" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="bold">
          Google Play
        </text>
      </svg>
    </a>
  );
}

function StoreBadges({
  appStoreUrl,
  playStoreUrl,
}: {
  appStoreUrl: string;
  playStoreUrl: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <AppStoreBadge url={appStoreUrl} />
      <GooglePlayBadge url={playStoreUrl} />
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
      className="hidden h-24 w-24 place-items-center overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-soft)] md:grid"
    >
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=6&data=${encodeURIComponent(url)}`}
        alt={`${label} App Store 다운로드 QR 코드`}
        width={96}
        height={96}
        loading="lazy"
        className="h-24 w-24"
      />
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
              코치와 회원,
              <br />
              모두를 위한 플랫폼
            </>
          }
        />

        <div className="mt-12 grid gap-6 sm:mt-16 md:mt-20 md:grid-cols-2">
          <Reveal>
            <div
              className={`relative surface h-full rounded-[1.85rem] p-8 sm:p-12 transition-all duration-500 ${
                pulse
                  ? "!border-primary ring-4 ring-primary/20 -translate-y-1.5 shadow-[0_36px_70px_-30px_rgba(192,117,90,0.5)] animate-[installPulse_1.1s_ease-in-out_2]"
                  : ""
              }`}
            >
              <div className="eyebrow absolute right-4 top-4 rounded-md bg-[var(--clay)]/10 px-2 py-1">추천</div>
              <h3 className="mt-4 text-[1.9rem] font-extrabold tracking-tight sm:text-[2.2rem]">케리 코치앱</h3>
              <p className="mt-6 text-[1.02rem] leading-[1.85] text-muted-foreground">
                회원 관리 · 일정 · 결제 · AI 레슨 기록
                <br />
                운영을 하나의 앱으로 관리하세요.
              </p>
              <div className="mt-10">
                <StoreBadges appStoreUrl={COACH_APP_URL} playStoreUrl={COACH_PLAY_URL} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="surface h-full rounded-[1.85rem] p-8 sm:p-12">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-[1.9rem] font-extrabold tracking-tight sm:text-[2.2rem]">케리 회원앱</h3>
                <Link
                  to="/member"
                  className="group inline-flex items-center gap-1 text-[0.85rem] font-semibold text-primary transition-colors duration-200 hover:text-primary/80 hover:underline underline-offset-4"
                >
                  회원앱 자세히 보기
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
              <p className="mt-6 text-[1.02rem] leading-[1.85] text-muted-foreground">
                레슨 기록 · 성장 기록 · 일정 · 남은 횟수
                <br />
                회원도 자신의 레슨을 기록으로 관리하세요.
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
      q: "회원도 앱을 설치해야 하나요?",
      a: "네. 리포트는 KERRI Member 앱에서 확인합니다. 회원에게는 설치 안내가 자동 발송됩니다.",
    },
    {
      q: "녹음기가 꼭 필요한가요?",
      a: "휴대폰 녹음으로도 사용할 수 있습니다. Pro 6개월 선결제 시 클립형 녹음기를 제공합니다.",
    },
    {
      q: "남은 리포트 횟수는 이월되나요?",
      a: "기본 제공 횟수는 매 결제 주기마다 새로 지급됩니다. 충전권은 유효기간 없이 사용할 수 있습니다.",
    },
    {
      q: "환불이 가능한가요?",
      a: "언제든 해지할 수 있으며, 이용 기간 기준으로 정산하여 환불됩니다.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" tone="cream">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-10">
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
                    className="flex w-full items-start justify-between gap-6 px-7 py-7 text-left transition-colors duration-200 hover:bg-foreground/[0.015]"
                    onClick={() => setOpen(isOpen ? null : idx)}
                  >
                    <span className="text-[1.05rem] font-bold sm:text-[1.15rem]">{it.q}</span>
                    <span
                      className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-foreground/[0.05] text-foreground/60 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="whitespace-pre-line px-7 pb-8 -mt-2 text-[0.975rem] leading-[1.9] text-muted-foreground">
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
      <div className="relative mx-auto max-w-4xl px-6 text-center text-[var(--cream)] lg:px-10">
        <Reveal>
          <h2 className="display-2">
            회원 관리부터 AI 레슨 리포트까지.
            <br />
            케리 하나면 충분합니다.
          </h2>
          <p className="mt-8 text-[1.1rem] leading-[1.85] opacity-85">
            코치는 레슨에만 집중하고,
            <br className="sm:hidden" /> 운영은 KERRI가 관리합니다.
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
