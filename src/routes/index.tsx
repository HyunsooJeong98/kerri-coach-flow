import { createFileRoute, Link } from "@tanstack/react-router";
import kerriHome from "@/assets/kerri-home.png.asset.json";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  FileText,
  CalendarCheck,
  Users,
  Smartphone,
  ClipboardList,
  History,
  Dumbbell,
  CalendarDays,
  Ticket,
  BellRing,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp,
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
        <SectionHead title="이런 경험 있으신가요?" center />
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

function MemberDemand() {
  return (
    <Section id="member-demand" className="!py-24 sm:!py-32 lg:!py-40">
      <Container>
        <SectionHead title="회원도 레슨 기록을 원합니다" center />

        <div className="mt-14 space-y-5 sm:mt-18 md:mt-20">
          {/* Main card — message first, number second */}
          <Reveal>
            <div className="rounded-[1.5rem] border border-border/50 bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
              <div className="max-w-3xl">
                <h3 className="text-[1.55rem] font-bold leading-[1.25] tracking-tight text-foreground sm:text-[2rem] lg:text-[2.35rem]">
                  <span className="sm:hidden">레슨 기록이 남는다면<br />코치와 더 오래 함께하고<br />싶습니다.</span>
                  <span className="hidden sm:inline">
                    <span className="block">레슨 기록이 남는다면</span>
                    <span className="block">코치와 더 오래 함께하고 싶습니다.</span>
                  </span>
                </h3>
                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
                  <div className="text-[3.5rem] font-extrabold leading-none tracking-tight text-primary sm:text-[5rem] lg:text-[6rem]">
                    96.6%
                  </div>
                  <p className="text-[0.8rem] font-medium text-muted-foreground sm:text-[0.85rem] sm:text-right">
                    개인 레슨 이용자 설문 결과
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Two supporting cards */}
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal delay={80}>
              <div className="h-full rounded-[1.5rem] border border-border/50 bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
                <div className="text-[2.5rem] font-extrabold leading-none tracking-tight text-primary sm:text-[3rem] lg:text-[3.5rem]">
                  90%
                </div>
                <p className="mt-5 text-[1.15rem] font-semibold leading-[1.35] tracking-tight text-foreground sm:text-[1.3rem] lg:text-[1.4rem]">
                  <span className="sm:hidden">레슨 피드백은 대부분<br />말로만 전달됩니다.</span>
                  <span className="hidden sm:inline">
                    <span className="block">레슨 피드백은</span>
                    <span className="block">대부분 말로만 전달됩니다.</span>
                  </span>
                </p>
                <p className="mt-3 text-[0.9rem] leading-[1.7] text-muted-foreground sm:text-[1rem]">
                  <span className="sm:hidden">레슨이 끝나면 기록은<br />남지 않습니다.</span>
                  <span className="hidden sm:inline">
                    <span className="block">레슨이 끝나면</span>
                    <span className="block">기록은 남지 않습니다.</span>
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="h-full rounded-[1.5rem] border border-border/50 bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
                <div className="text-[2.5rem] font-extrabold leading-none tracking-tight text-primary sm:text-[3rem] lg:text-[3.5rem]">
                  55%
                </div>
                <p className="mt-5 text-[1.15rem] font-semibold leading-[1.35] tracking-tight text-foreground sm:text-[1.3rem] lg:text-[1.4rem]">
                  <span className="sm:hidden">배운 내용을 잊어버린<br />경험이 있습니다.</span>
                  <span className="hidden sm:inline">
                    <span className="block">배운 내용을</span>
                    <span className="block">잊어버린 경험이 있습니다.</span>
                  </span>
                </p>
                <p className="mt-3 text-[0.9rem] leading-[1.7] text-muted-foreground sm:text-[1rem]">
                  <span className="sm:hidden">레슨이 끝난 뒤 복습할<br />기록이 없습니다.</span>
                  <span className="hidden sm:inline">
                    <span className="block">레슨이 끝난 뒤</span>
                    <span className="block">복습할 기록이 없습니다.</span>
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Closing brand message */}
        <Reveal delay={120}>
          <div className="mt-18 text-center sm:mt-24">
            <p className="mx-auto max-w-3xl text-[1.35rem] font-bold leading-[1.35] tracking-tight text-foreground sm:text-[1.8rem] lg:text-[2.1rem]">
              <span className="sm:hidden">좋은 코칭은 기록될 때<br /><span className="text-primary">더 큰 가치가 됩니다.</span></span>
              <span className="hidden sm:inline">
                <span className="block">좋은 코칭은 기록될 때</span>
                <span className="block text-primary">더 큰 가치가 됩니다.</span>
              </span>
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-[0.9rem] leading-[1.8] text-muted-foreground sm:text-[1rem]">
              <span className="sm:hidden">회원은 지난 레슨을 다시 확인하며 성장하고,<br />코치는 코칭의 흐름을 이어갑니다.<br />쌓인 코칭 데이터는 코치만의 자산이 됩니다.</span>
              <span className="hidden sm:inline">
                <span className="block">회원은 지난 레슨을 다시 확인하며 성장하고,</span>
                <span className="block">코치는 코칭의 흐름을 이어갑니다.</span>
                <span className="block">쌓인 코칭 데이터는 코치만의 자산이 됩니다.</span>
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
        <SectionHead title="기존 방식과 무엇이 다를까요?" center />

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

/* ── Feature showcase (탭 전환) ─────────────────────────────── */

type ShowcaseTab = {
  key: string;
  tab: string;
  badge?: string;
  title: string;
  headline: ReactNode;
  desc: ReactNode;
  points: string[];
  flow?: { icon: string; label: string }[];
  shot?: { src: string; position: string; zoom: number };
};

const SHOWCASE: ShowcaseTab[] = [
  {
    key: "ai",
    tab: "AI 레슨 기록",
    badge: "핵심 기능",
    title: "AI 레슨 기록",
    headline: (
      <>
        레슨의 핵심을
        <br />
        <span className="text-primary">AI가 자동으로 정리합니다.</span>
      </>
    ),
    desc: (
      <>
        레슨 중 코치의 설명을 기록하면 AI가 핵심 내용과 개선점을 정리해 회원의 레슨 기록으로 남깁니다.
      </>
    ),
    points: ["오늘 레슨 핵심 요약", "개선 포인트", "추천 연습"],
    flow: [
      { icon: "🎙", label: "레슨 기록" },
      { icon: "✨", label: "AI 핵심 정리" },
      { icon: "📄", label: "회원 기록" },
    ],
  },
  {
    key: "ops",
    tab: "운영 관리",
    title: "회원 운영 관리",
    headline: (
      <>
        놓치기 쉬운 회원을
        <br />
        <span className="text-primary">먼저 확인하세요.</span>
      </>
    ),
    desc: <>미납 · 잔여 횟수 · 만료 예정 · 재등록 시점을 한눈에 확인합니다.</>,
    points: ["미납", "잔여 횟수", "만료 예정", "재등록"],
    shot: { src: kerriHome.url, position: "50% 22%", zoom: 1.35 },
  },
  {
    key: "schedule",
    tab: "일정",
    title: "레슨 일정",
    headline: (
      <>
        오늘부터 이번 주 레슨까지
        <br />
        <span className="text-primary">한눈에 확인하세요.</span>
      </>
    ),
    desc: <>회원별 레슨 일정을 확인하고 스케줄을 한 곳에서 관리합니다.</>,
    points: ["오늘 레슨", "주간 일정", "회원별 스케줄"],
    shot: { src: kerriHome.url, position: "50% 78%", zoom: 1.35 },
  },
  {
    key: "payment",
    tab: "결제",
    title: "결제 관리",
    headline: (
      <>
        누가 결제했고,
        <br />
        <span className="text-primary">누가 아직 결제하지 않았는지.</span>
      </>
    ),
    desc: <>회원별 결제 내역과 미납 상태를 한 곳에서 확인합니다.</>,
    points: ["납부 필요 회원", "결제 금액", "결제 완료 내역"],
  },
  {
    key: "members",
    tab: "회원 관리",
    title: "회원 관리",
    headline: (
      <>
        회원의 레슨이
        <br />
        <span className="text-primary">하나의 기록으로 이어집니다.</span>
      </>
    ),
    desc: <>횟수 · 일정 · 결제 · 레슨 기록을 회원별로 연결해서 관리합니다.</>,
    points: ["회원 정보", "잔여 횟수", "반복 이슈 태그", "AI 레슨 분석"],
  },
];

function ShotFrame({ item }: { item: ShowcaseTab }) {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-[1.5rem] border border-border/60 bg-[var(--cream)] sm:h-[360px] lg:h-[520px]">
      {item.shot ? (
        <img
          src={item.shot.src}
          alt={`KERRI 앱 ${item.title} 화면`}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{
            objectPosition: item.shot.position,
            transform: `scale(${item.shot.zoom})`,
            transformOrigin: item.shot.position,
          }}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-8 text-center">
          {item.flow ? (
            <div className="w-full max-w-[300px] space-y-3">
              {item.points.map((p) => (
                <div
                  key={p}
                  className="rounded-2xl border border-border/60 bg-white/85 px-4 py-3.5 text-left text-[0.9rem] font-semibold text-foreground/80"
                >
                  {p}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-[0.85rem] leading-relaxed text-muted-foreground">
              {item.title} 앱 화면
              <br />
              스크린샷 등록 예정
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function Ops() {
  const [active, setActive] = useState(0);
  const item = SHOWCASE[active]!;

  return (
    <Section id="features" tone="cream" className="!pt-16 sm:!pt-20 lg:!pt-28 !pb-16 sm:!pb-20 lg:!pb-28">
      <Container>
        <SectionHead
          eyebrow="Product"
          title={
            <>
              레슨부터 회원 운영까지
              <br />
              <span className="text-primary">KERRI 하나로.</span>
            </>
          }
          body={
            <>
              레슨 기록부터 일정, 횟수, 결제까지
              <br className="hidden sm:block" /> 코치에게 필요한 운영을 한 곳에서 관리합니다.
            </>
          }
        />

        {/* Tabs */}
        <div className="-mx-6 mt-14 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0">
          <div className="flex w-max gap-2.5 lg:w-auto lg:flex-wrap">
            {SHOWCASE.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-[0.925rem] font-semibold transition-colors ${
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/60 bg-white/70 text-foreground/70 hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {s.tab}
                  {s.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold tracking-tight ${
                        on ? "bg-white/20 text-primary-foreground" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {s.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase card */}
        <div className="surface mt-8 overflow-hidden p-6 sm:p-9 lg:p-12">
          <div
            key={item.key}
            className="grid animate-[fadeUp_0.45s_ease-out] items-center gap-8 lg:grid-cols-[42%_1fr] lg:gap-12"
          >
            <div>
              <div className="eyebrow">{item.title}</div>
              <h3 className="mt-4 text-[1.65rem] font-bold leading-[1.25] tracking-tight sm:text-[2rem]">
                {item.headline}
              </h3>
              <p className="mt-5 text-[0.975rem] leading-[1.85] text-muted-foreground">{item.desc}</p>

              {item.flow ? (
                <div className="mt-8 flex flex-wrap items-center gap-2.5">
                  {item.flow.map((f, i) => (
                    <div key={f.label} className="flex items-center gap-2.5">
                      <div className="flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/8 px-4 py-2.5">
                        <span aria-hidden className="text-[1rem]">
                          {f.icon}
                        </span>
                        <span className="text-[0.875rem] font-bold text-foreground/85">{f.label}</span>
                      </div>
                      {i < item.flow!.length - 1 && <span className="text-primary/50">→</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-8 flex flex-wrap gap-2">
                  {item.points.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-border/60 bg-[var(--cream)] px-3.5 py-1.5 text-[0.825rem] font-semibold text-foreground/70"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <ShotFrame item={item} />
          </div>
        </div>
      </Container>
    </Section>
  );
}



/* ── Impact ────────────────────────────────────────────────── */

function Impact() {
  const items = [
    { t: "재등록률 향상", d: "회원이 성장 기록을 확인하며 레슨을 계속할 이유가 생깁니다." },
    { t: "프로다운 브랜딩", d: "리포트 하나만으로도 ‘관리해주는 코치’라는 인상을 남깁니다." },
    { t: "회원 데이터 축적", d: "회원별 진도와 피드백이 자동으로 쌓여 다음 레슨 준비가 쉬워집니다." },
  ];
  return (
    <Section>
      <Container>
        <SectionHead
          title={
            <>
              회원은 <span className="text-primary">더 오래</span> 다니고,
              <br />
              코치는 더 전문적으로 성장합니다.
            </>
          }
        />
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {items.map((i, idx) => (
            <Reveal key={i.t} delay={idx * 90}>
              <div className="surface surface-hover h-full p-9">
                <h3 className="text-[1.2rem] font-bold tracking-tight">{i.t}</h3>
                <p className="mt-4 text-[0.975rem] leading-[1.85] text-muted-foreground">{i.d}</p>
              </div>
            </Reveal>
          ))}
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

function StoreButtons({
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
        className="inline-flex items-center gap-2 rounded-[0.95rem] bg-[var(--ink)] px-5 py-3.5 text-[0.85rem] font-semibold text-[var(--cream)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
      >
        <span className="opacity-60">App Store에서</span>
        <span className="font-bold">다운로드</span>
      </a>
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-[0.95rem] bg-[var(--ink)] px-5 py-3.5 text-[0.85rem] font-semibold text-[var(--cream)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
      >
        <span className="opacity-60">Google Play에서</span>
        <span className="font-bold">다운로드</span>
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

/* ── Member app teaser ─────────────────────────────────────── */

function MemberApp() {
  return (
    <Section id="member">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="display-2">회원도 함께 사용하는 앱</h2>
          <p className="lead mt-8">
            회원은 지난 레슨 기록과 다음 목표를 확인하며 꾸준히 운동을 이어갑니다.
          </p>
          <Link
            to="/member"
            className="btn-base btn-primary mt-10 inline-flex items-center gap-2"
          >
            회원앱 자세히 보기
            <ArrowRight size={18} strokeWidth={1.8} />
          </Link>
        </Reveal>
      </Container>
    </Section>
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
    <Section id="install" tone="cream" className="!pt-20 sm:!pt-28 lg:!pt-36">
      <Container>
        <SectionHead
          title={
            <>
              레슨 운영을 더 쉽게
              <br />
              <span className="text-primary">시작하세요.</span>
            </>
          }
        />

        <div className="mt-12 grid gap-6 sm:mt-16 md:mt-20 md:grid-cols-2">
          <Reveal>
            <div
              className={`surface h-full rounded-[1.85rem] p-8 sm:p-12 transition-all duration-500 ${
                pulse
                  ? "!border-primary ring-4 ring-primary/20 -translate-y-1.5 shadow-[0_36px_70px_-30px_rgba(192,117,90,0.5)] animate-[installPulse_1.1s_ease-in-out_2]"
                  : ""
              }`}
            >
              <div className="eyebrow">추천</div>
              <h3 className="mt-4 text-[1.9rem] font-extrabold tracking-tight sm:text-[2.2rem]">케리 코치앱</h3>
              <p className="mt-6 text-[1.02rem] leading-[1.85] text-muted-foreground">
                회원 관리 · 일정 · 결제 · AI 레슨 기록
                <br />
                운영을 하나의 앱으로 관리하세요.
              </p>
              <div className="mt-10">
                <StoreButtons appStoreUrl={COACH_APP_URL} playStoreUrl={COACH_PLAY_URL} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="surface h-full rounded-[1.85rem] p-8 sm:p-12">
              <h3 className="text-[1.9rem] font-extrabold tracking-tight sm:text-[2.2rem]">케리 회원앱</h3>
              <p className="mt-6 text-[1.02rem] leading-[1.85] text-muted-foreground">
                레슨 기록 · 성장 기록 · 일정 · 남은 횟수
                <br />
                회원도 자신의 레슨을 기록으로 관리하세요.
              </p>
              <div className="mt-10">
                <StoreButtons appStoreUrl={MEMBER_APP_URL} playStoreUrl={MEMBER_PLAY_URL} />
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

        <Ops />
        
        <Impact />
        <MemberApp />
        <AppSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
