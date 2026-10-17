import { createFileRoute, Link } from "@tanstack/react-router";
import { DownloadCards } from "@/components/landing/download";
import appHome from "@/assets/app-home.png.asset.json";
import appNotify from "@/assets/app-notify.jpg.asset.json";
import appPayment from "@/assets/app-payment.png.asset.json";
import appSchedule from "@/assets/app-schedule.png.asset.json";
import appReport from "@/assets/app-report.png.asset.json";
import heroPc from "@/assets/hero-pc.webp.asset.json";
import heroMobile from "@/assets/hero-mobile.webp.asset.json";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  FileText,
  CalendarCheck,
  TrendingUp,
  Smartphone,
  History,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Database,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      // 현재 화면에 해당하는 Hero 배경만 우선 로드 (LCP 개선)
      {
        rel: "preload",
        as: "image",
        href: heroMobile.url,
        type: "image/webp",
        media: "(max-width: 767px)",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        href: heroPc.url,
        type: "image/webp",
        media: "(min-width: 768px)",
        fetchPriority: "high",
      },
    ],
  }),
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
      h: "“오늘 레슨 내용 보내드려야 하는데…”",
      p: "정리할 시간이 없으셨나요?",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: (
          <>
            레슨 기록을 전하고
            <br />
            회원의 성장까지 챙기세요
          </>
        ),
        body: (
          <>
            레슨 중 음성을 녹음하거나
            <br />
            수업 후 핵심만 짧게 입력하세요
            <br />
            AI가 수업 내용과 잘한 점과
            <br />
            개선할 내용을 리포트로 정리해줍니다
            <span className="block h-3" />
            쌓인 레슨 기록으로
            <br />
            회원이 나아진 점과 <span className="hidden sm:block lg:hidden" />반복되는 교정 포인트를 살펴보고
            <br />
            다음 수업에서 챙길 목표까지 이어가세요
          </>
        ),
      },
    },
    {
      h: "“저 몇 회 남았어요?”",
      p: "물어볼 때마다 다시 확인하고 있나요?",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: "일정·출석·남은 횟수·납부 내역을 한곳에서 관리하세요.",
        body: (
          <>
            카톡을 뒤지고, 장부를 열고, 출석을 세어보고.
            <br />
            회원도 강사도 같은 내역을 확인할 수 있다면
            <br />
            매번 확인하고 설명하는 수고를 줄일 수 있습니다.
          </>
        ),
      },
    },
    {
      h: "“벌써 마지막 레슨이었네.”",
      p: "재등록 이야기, 또 늦어졌나요?",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: "마지막 수업 전에, 다음 레슨을 미리 이야기하세요.",
        body: (
          <>
            오늘 수업을 챙기다 보면
            <br />
            곧 레슨이 끝나는 회원까지 살피기 어렵습니다.
            <br />
            회원별 남은 횟수를 한곳에서 확인하고,
            <br />
            재등록 알림 설정으로 시기를 놓치지 않도록 챙기세요.
          </>
        ),
      },
    },
    {
      h: "“지난번에 어디까지 했더라?”",
      p: "수업 직전, 기억을 더듬고 있나요?",
      solve: {
        caption: "KERRI가 해결합니다.",
        title: "회원이 다시 설명하기 전에, 지난 레슨부터 챙기는 강사.",
        body: (
          <>
            AI가 회원별 레슨 리포트에서
            <br />
            반복해서 짚었던 교정 포인트를 추려줍니다.
            <br />
            홈 대시보드에서 핵심 내용만 한눈에 확인하고,
            <br />
            오늘 수업에서 이어서 지도할 내용을 챙기세요.
          </>
        ),
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
          eyebrow={
            <span className="tracking-[0.02em]">
              레슨이 끝나도 계속되는 회원 관리
            </span>
          }
          title={
            <>
              잘 가르치는 건 기본
              <br />
              잘 챙기는 강사로 기억되세요
            </>
          }
          body={
            <>
              레슨 기록부터 성장 관리와 다음 수업 준비까지
              <br />
              회원 한 명 한 명 챙기는 일을 KERRI로 더 쉽게
            </>
          }
          center
        />
        <div className="mt-16 grid items-start gap-5 sm:grid-cols-2">
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

function BarChart({ value, label }: { value: number; label: ReactNode }) {
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
    <Section id="member-demand" className="pt-24 pb-14 sm:pt-32 sm:pb-18 lg:pt-40 lg:pb-20">
      <Container>
        <div className="text-center">
          <div className="eyebrow">회원 설문</div>
          <h2 className="display-2 mx-auto mt-5 max-w-[19em] break-keep text-foreground">
            열심히 가르친 오늘의 레슨
            <br />
            회원의 기억에만 맡기고 있나요?
          </h2>
        </div>

        <div className="mt-14 space-y-5 sm:mt-18 md:mt-20">
          {/* Main card — 78%: opening hook */}
          <Reveal>
            <div className="rounded-[1.5rem] border border-border/50 bg-card p-[clamp(1.25rem,4.8vw,3.5rem)] shadow-[var(--shadow-soft)]">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 max-w-2xl">
                  <div className="stat-xl text-primary">78%</div>
                  <p className="heading-3 mt-5 max-w-[18em] break-keep text-foreground">
                    회원 10명 중 약 8명
                    <br />
                    배운 내용을 잊어버린 경험이 있습니다
                  </p>
                  <p className="body-2 mt-3 max-w-[21em] break-keep text-muted-foreground">
                    수업 중에는 이해했던 설명도
                    <br />
                    혼자 연습할 때는 떠오르지 않을 수 있습니다
                    <br />
                    다시 볼 기록이 없다면
                    <br />
                    정성껏 알려준 내용도 기억에만 의존하게 됩니다
                  </p>
                  <p className="mt-5 text-[0.75rem] font-medium uppercase tracking-wider text-muted-foreground/80 sm:text-[0.8rem]">
                    개인 레슨 이용자 설문 결과
                  </p>
                </div>
                <div className="flex shrink-0 items-center justify-center sm:pl-6">
                  <div className="relative">
                    <DonutChart value={78} size={144} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[1.2rem] font-extrabold text-primary sm:text-[1.4rem]">78</span>
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
                <p className="heading-3 mt-5 max-w-[14em] break-keep text-foreground">
                  레슨 설명은 말로
                  <br />
                  다시 볼 기록은 남기고 있나요
                </p>
                <p className="body-2 mt-3 max-w-[26em] break-keep text-muted-foreground">
                  설문 응답자의 90%가
                  <br />
                  레슨 내용을 말로만 전달받는다고 답했습니다
                  <span className="block h-3" />
                  오늘 짚어준 자세와 연습할 내용
                  <br />
                  수업이 끝난 뒤에도 회원이 <span className="hidden md:block lg:hidden" />꺼내 볼 수 있도록 남겨주세요
                </p>
                <BarChart value={90} label="레슨 내용을 말로만 전달받음" />
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="h-full rounded-[1.5rem] border border-border/50 bg-card p-[clamp(1.25rem,4.8vw,3rem)] shadow-[var(--shadow-soft)]">
                <div className="stat-lg text-primary">96.6%</div>
                <p className="heading-3 mt-5 max-w-[14em] break-keep text-foreground">
                  체계적으로 챙겨주는 강사와
                  <br />
                  더 오래 함께하고 싶으니까
                </p>
                <p className="body-2 mt-3 max-w-[23em] break-keep text-muted-foreground">
                  응답자의 96.6%가
                  <br />
                  체계적인 레슨 기록과 맞춤 관리가 있다면
                  <br />
                  현재 강사와 더 오래 <span className="hidden md:block lg:hidden" />함께하고 싶다고 답했습니다
                  <span className="block h-3" />
                  회원이 원하는 세심한 관리
                  <br />
                  레슨 기록과 성장 확인으로 보여주세요
                </p>
                <BarChart
                  value={96.6}
                  label={
                    <>
                      기록과 맞춤 관리가 있다면 <span className="hidden md:block lg:hidden" />더 오래 함께하고 싶음
                    </>
                  }
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Closing brand message */}
        <Reveal delay={120}>
          <div className="mt-14 text-center sm:mt-16">
            <p className="statement mx-auto max-w-[34em] break-keep text-foreground">
              <span>회원 한 명 한 명을 챙기는 관리로</span>
              <br className="lg:hidden" />{" "}
              <span className="text-primary">재등록률을 높여보세요</span>
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
  after: string;
}[] = [
  {
    icon: FileText,
    label: "레슨 기록",
    before: "수업 내용을 직접 정리해 전달",
    after: "녹음이나 짧은 입력을 AI 레슨 리포트로",
  },
  {
    icon: Workflow,
    label: "다음 수업 준비",
    before: "지난 기록을 찾아 지도할 내용 확인",
    after: "반복 교정 포인트를 홈에서 한눈에",
  },
  {
    icon: TrendingUp,
    label: "성장 관리",
    before: "기록을 하나씩 비교해 변화 확인",
    after: "쌓인 기록으로 변화와 다음 목표 확인",
  },
];

const COMPARE_COLS = "grid-cols-[26%_37%_37%] xl:grid-cols-[24%_38%_38%]";

function Compare() {
  return (
    <Section id="compare" className="pt-24 pb-14 sm:pt-32 sm:pb-18 lg:pt-40 lg:pb-20">
      <Container>
        <SectionHead
          eyebrow="KERRI의 차이"
          title={
            <>
              회원 관리에
              <br />
              레슨의 깊이를 더하세요
            </>
          }
          center
        />

        <Reveal delay={80}>
          {/* PC: 3열 비교표 */}
          <div
            className={`mt-14 hidden overflow-hidden rounded-[1.5rem] border border-border/60 bg-card sm:mt-18 lg:mt-20 lg:block`}
          >
            <div className={`grid border-b border-border/50 ${COMPARE_COLS}`}>
              <div className="px-5 pb-4 pt-7 lg:px-6">
                <div className="text-[0.78rem] font-semibold tracking-wide text-muted-foreground">
                  비교 항목
                </div>
              </div>
              <div className="px-5 pb-4 pt-7 lg:px-7">
                <div className="text-[0.92rem] font-bold tracking-tight text-foreground">
                  직접 관리할 때
                </div>
              </div>
              <div className="bg-primary/[0.06] px-5 pb-4 pt-7 lg:px-7">
                <div className="text-[0.92rem] font-bold tracking-tight text-primary">
                  KERRI
                </div>
              </div>
            </div>

            <div className="divide-y divide-border/50">
              {COMPARE_ROWS.map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.label} className={`grid ${COMPARE_COLS}`}>
                    <div className="px-5 py-6 lg:px-6">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <Icon
                          className="h-[18px] w-[18px] shrink-0 text-primary"
                          strokeWidth={1.6}
                        />
                        <span className="body-1 min-w-0 break-keep font-semibold tracking-tight text-foreground">
                          {row.label}
                        </span>
                      </div>
                    </div>
                    <div className="body-2 break-keep px-5 py-6 text-muted-foreground lg:px-7">
                      {row.before}
                    </div>
                    <div className="body-2 break-keep bg-primary/[0.06] px-5 py-6 text-foreground lg:px-7">
                      {row.after}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 모바일: 항목별 짧게 대비 */}
          <div className="mt-10 space-y-2.5 lg:hidden">
            {COMPARE_ROWS.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.label}
                  className="overflow-hidden rounded-[1.25rem] border border-border/60 bg-card"
                >
                  <div className="flex min-w-0 items-center gap-2.5 px-4 pb-2.5 pt-3.5">
                    <Icon
                      className="h-[17px] w-[17px] shrink-0 text-primary"
                      strokeWidth={1.6}
                    />
                    <span className="min-w-0 break-keep text-[1.02rem] font-semibold tracking-tight text-foreground">
                      {row.label}
                    </span>
                  </div>
                  <div className="px-4 pb-3">
                    <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground/80">
                      직접 관리할 때
                    </div>
                    <p className="mt-1 break-keep text-[1rem] leading-[1.7] text-muted-foreground">
                      {row.before}
                    </p>
                  </div>
                  <div className="bg-primary/[0.08] px-4 py-3.5">
                    <div className="text-[0.7rem] font-bold uppercase tracking-wider text-primary">
                      KERRI
                    </div>
                    <p className="mt-1 break-keep text-[1rem] leading-[1.7] text-foreground">
                      {row.after}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-[0.8rem] font-medium break-keep tracking-tight text-muted-foreground md:mt-8">
            일정 · 출석 · 횟수 · 납부 관리도 한곳에서
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}






/* ── Hero ──────────────────────────────────────────────────── */


function Hero() {
  return (
    <section id="top" className="relative overflow-hidden noise">
      {/* 현재 화면에 필요한 배경 이미지 1장만 다운로드 */}
      <picture className="pointer-events-none absolute inset-0 block">
        <source media="(min-width: 768px)" srcSet={heroPc.url} type="image/webp" />
        <img
          src={heroMobile.url}
          alt=""
          aria-hidden="true"
          width={941}
          height={1672}
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <Container className="relative grid grid-cols-1 items-center gap-6 pb-10 pt-6 text-center lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-32 lg:pt-24 lg:text-left">
        <div className="section-fade relative isolate flex flex-col items-center lg:items-start">
          <div
            className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 sm:-inset-x-14"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--cream) 96%, transparent), color-mix(in oklab, var(--cream) 90%, transparent) 62%, transparent)",
              backdropFilter: "blur(7px)",
              WebkitBackdropFilter: "blur(7px)",
              maskImage:
                "radial-gradient(closest-side, black, black 55%, transparent)",
              WebkitMaskImage:
                "radial-gradient(closest-side, black, black 55%, transparent)",
            }}
          />
          <div
            className="inline-flex items-center backdrop-blur-[12px]"
            style={{
              background: "rgba(247, 240, 233, 0.76)",
              border: "1px solid rgba(255, 255, 255, 0.70)",
              borderRadius: "16px",
              boxShadow: "0 6px 24px rgba(62, 43, 34, 0.05)",
              padding: "10px 18px",
            }}
          >
            <span
              className="text-[0.78rem] font-semibold sm:text-[0.83rem]"
              style={{
                color: "#3E2B22",
                letterSpacing: "-0.02em",
              }}
            >
              스포츠 강사를 위한 AI 레슨·회원 관리앱
            </span>
          </div>

          <h1 className="hero-display mt-3 max-w-[13ch] break-keep">
            회원에게
            <br />
            <span className="text-primary">신뢰받는 강사</span>
          </h1>

          <p className="lead mt-3 max-w-[30ch] break-keep sm:max-w-[34ch]">
            횟수·일정·납부 내역은 투명하게,
            <br />
            지난 레슨과 피드백은 세심하게
            <br />
            AI 레슨 기록과 회원 관리로
            <br className="sm:hidden" /> 당신의 전문성을 회원에게 보여주세요
          </p>

        </div>

        {/* 첫 화면은 지연 없이 한 번에 표시 (스크롤 리빌 제외) */}
        <div id="try-ai" className="flex justify-center">
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
        </div>
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
  width = 883,
  height = 1920,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
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
        decoding="async"
        width={width}
        height={height}
        style={{ aspectRatio: `${width} / ${height}`, height: "auto" }}
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
          eyebrow="케리 코치앱"
          title={
            <>
              세심한 회원 케어,
              <br />
              <span className="text-primary">KERRI 하나로.</span>
            </>
          }
          body={
            <>
              AI 레슨 기록부터 일정·횟수·납부 내역까지. 체계적인 회원 관리를 실제 앱 화면으로 확인하세요.
            </>
          }
        />

        {/* 01 홈 대시보드 */}
        <Reveal>
          <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-[1fr_46%] lg:gap-16">
            <FeatureCopy
              num="01"
              message="오늘의 레슨과 회원 현황을 한눈에."
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
                message="필요한 알림을 간편하게 설정하세요."
                title="알림 설정"
                desc="레슨 전날·당일, 재등록 알림을 항목별로 켜고 끄기"
              />
              <FeatureCopy
                num="03"
                message="누가, 언제, 얼마를 납부했는지 명확하게."
                title="결제 내역 관리"
                desc="회원별 납부 내역과 미납 현황 관리"
              />
            </div>

            <div className="relative mx-auto w-[92%] max-w-[420px] pb-[16%] lg:w-full lg:max-w-[520px]">
              <div className="w-[74%]">
                <Shot
                  src={appNotify.url}
                  width={928}
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
              message="복잡한 일정도 체계적으로."
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
                당신의 피드백,
                <br />
                <span className="text-primary">레슨 뒤에도 이어지도록.</span>
              </h3>
              <p className="body-1 mx-auto mt-5 max-w-[34ch] break-keep text-white/65">
                AI가 레슨 내용을 핵심 내용, 잘한 점, 연습할 내용으로 정리합니다. 내용을 검토하고 회원에게 피드백을 전달하세요.
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
                  decoding="async"
                  width={883}
                  height={1920}
                  style={{ aspectRatio: "883 / 1920", height: "auto" }}
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
      title: "믿을 수 있는 강사",
      desc: "일정·출석·남은 횟수·납부 내역을 명확하게 관리하세요. 회원이 안심하고 레슨에 집중할 수 있도록.",
    },
    {
      icon: ShieldCheck,
      title: "나를 기억하는 강사",
      desc: "지난 레슨과 피드백을 확인해, 회원에게 필요한 지도를 이어가세요.",
    },
    {
      icon: Database,
      title: "성장을 챙기는 강사",
      desc: "잘한 점과 연습할 내용을 기록으로 남기세요. 회원과 함께 변화를 살펴보고 다음 연습 방향을 잡을 수 있도록.",
    },
    {
      icon: Workflow,
      title: "레슨에 집중하는 강사",
      desc: "회원·일정·횟수·납부 관리를 한곳에서. 확인하는 수고를 줄이고 회원에게 더 집중하세요.",
    },
  ];

  return (
    <Section id="impact">
      <Container>
        <SectionHead eyebrow="회원이 느끼는 가치" title="회원이 느끼는 당신의 차이." center />
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
              강사의 세심한 관리,
              <br />
              회원의 손안까지.
            </>
          }
        />

        <DownloadCards pulse={pulse} />
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
            나를 제대로 챙겨주는 강사.
          </h2>
          <p className="body-1 mx-auto mt-8 max-w-[28ch] break-keep opacity-85">
            지난 피드백을 기억하고,
            <br />
            일정과 남은 횟수를 명확하게.
            <br />
            세심한 회원 케어를 KERRI로 시작하세요.
          </p>
          <button onClick={() => scrollTo("install")} className="btn-base btn-light mt-12">
            케리 코치앱 설치하기
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
        케리 코치앱 설치하기
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
