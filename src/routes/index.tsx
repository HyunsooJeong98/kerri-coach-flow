import { createFileRoute, Link } from "@tanstack/react-router";
import { DownloadCards } from "@/components/landing/download";
import featAiRecord from "@/assets/feat-ai-record.webp.asset.json";
import featDashboard from "@/assets/feat-dashboard.webp.asset.json";
import featSchedule from "@/assets/feat-schedule.webp.asset.json";
import featMember from "@/assets/feat-member.webp.asset.json";
import heroPc from "@/assets/hero-pc.webp.asset.json";
import heroMobile from "@/assets/hero-mobile.webp.asset.json";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CalendarCheck,
  TrendingUp,
  Smartphone,
  History,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "케리 KERRI | 개인 레슨 코치를 위한 운영 플랫폼" },
      { name: "description", content: "회원 관리, 일정, 결제, AI 레슨 기록까지. 스포츠 강사를 위한 운영 플랫폼 KERRI." },
      { property: "og:title", content: "케리 KERRI | 개인 레슨 코치를 위한 운영 플랫폼" },
      { property: "og:description", content: "회원 관리, 일정, 결제, AI 레슨 기록까지. 스포츠 강사를 위한 운영 플랫폼 KERRI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: heroPc.url },
      { name: "twitter:image", content: heroPc.url },
    ],
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
        caption: "KERRI가 해결합니다",
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
            AI가 수업 핵심 내용과 잘한 점
            <br />
            개선할 내용을 레슨 리포트로 정리해줍니다
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
        caption: "KERRI가 해결합니다",
        title: "일정·출석·남은 횟수·납부 내역을 한곳에서 관리하세요",
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
        caption: "KERRI가 해결합니다",
        title: "마지막 수업 전에 다음 레슨을 미리 이야기하세요",
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
        caption: "KERRI가 해결합니다",
        title: "회원이 다시 설명하기 전에 지난 레슨부터 챙기는 강사",
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
    <Section id="empathy" tone="cream">
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
              <span className="text-primary">잘 챙기는 강사로 기억되세요</span>
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
                  className={`h-full overflow-hidden rounded-[20px] lg:rounded-[24px] border border-border/60 bg-card shadow-[var(--shadow-soft)] transition-shadow duration-300 ${
                    isOpen ? "ring-1 ring-primary/50" : ""
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
    <Section id="member-demand" className="!pb-6 lg:!pb-10">
      <Container>
        <div className="text-center">
          <div className="eyebrow">회원 설문</div>
          <h2 className="display-2 mx-auto mt-5 max-w-[19em] break-keep text-foreground">
            열심히 가르친 오늘의 레슨
            <br />
            회원의 기억에만 맡기고 있나요?
          </h2>
        </div>

        <div className="mt-8 space-y-5 lg:mt-10">
          {/* Main card — 78%: opening hook */}
          <Reveal>
            <div className="rounded-[20px] lg:rounded-[24px] border border-border/60 bg-card p-[clamp(1.25rem,4.8vw,3.5rem)] shadow-[var(--shadow-soft)]">
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
              <div className="h-full rounded-[20px] lg:rounded-[24px] border border-border/60 bg-card p-[clamp(1.25rem,4.8vw,3rem)] shadow-[var(--shadow-soft)]">
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
              <div className="h-full rounded-[20px] lg:rounded-[24px] border border-border/60 bg-card p-[clamp(1.25rem,4.8vw,3rem)] shadow-[var(--shadow-soft)]">
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
  label: string;
  before: string;
  after: string;
}[] = [
  {
    label: "레슨 기록",
    before: "수업 내용을 직접 정리해 전달",
    after: "녹음이나 짧은 입력을 AI 레슨 리포트로",
  },
  {
    label: "다음 수업 준비",
    before: "지난 기록을 찾아 지도할 내용 확인",
    after: "반복 교정 포인트를 홈에서 한눈에",
  },
  {
    label: "성장 관리",
    before: "기록을 하나씩 비교해 변화 확인",
    after: "쌓인 기록으로 변화와 다음 목표 확인",
  },
];

const COMPARE_COLS = "grid-cols-[26%_37%_37%] xl:grid-cols-[24%_38%_38%]";

function Compare() {
  return (
    <Section id="compare" className="!pt-6 lg:!pt-10">
      <Container className="!px-6 lg:!px-10">
        <SectionHead
          eyebrow="KERRI의 차이"
          title={
            <>
              성장을 이끄는 강사는
              <br />
              <span className="text-primary">레슨 기록부터 다릅니다</span>
            </>
          }
          center
        />

        <Reveal delay={80}>
          {/* PC: 3열 비교표 */}
          <div
            className="mt-10 hidden overflow-hidden rounded-[20px] border border-border bg-card lg:block"
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
                return (
                  <div key={row.label} className={`grid items-stretch ${COMPARE_COLS}`}>
                    <div className="px-5 py-6 lg:px-6">
                      <div className="flex min-w-0 items-center">
                        <span className="min-w-0 break-keep text-xl font-semibold leading-[1.65] text-foreground">
                          {row.label}
                        </span>
                      </div>
                    </div>
                    <div className="break-keep px-5 py-6 text-base leading-[1.65] text-foreground/70 lg:px-7">
                      {row.before}
                    </div>
                    <div className="break-keep bg-primary/[0.06] px-5 py-6 text-base font-medium leading-[1.65] text-foreground lg:px-7">
                      {row.after}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 모바일: 항목별 짧게 대비 */}
          <div className="mt-8 space-y-5 lg:hidden">
            {COMPARE_ROWS.map((row) => {
              return (
                <div
                  key={row.label}
                  className="overflow-hidden rounded-[20px] border border-border bg-card text-left"
                >
                  <div className="px-6 pt-6">
                    <h3 className="break-keep text-xl font-semibold leading-[1.4] tracking-normal text-foreground">
                      {row.label}
                    </h3>
                  </div>
                  <div className="px-6 pb-6 pt-3">
                    <div className="text-sm font-semibold tracking-normal text-foreground/70">
                      직접 관리할 때
                    </div>
                    <p className="mt-3 break-keep text-base leading-[1.65] tracking-normal text-foreground/70">
                      {row.before}
                    </p>
                  </div>
                  <div className="border-t border-border/50 bg-primary/[0.06] p-6">
                    <div className="text-sm font-semibold tracking-normal text-primary">
                      KERRI
                    </div>
                    <p className="mt-3 break-keep text-base font-medium leading-[1.65] tracking-normal text-foreground">
                      {row.after}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-[0.875rem] font-medium break-keep tracking-tight text-muted-foreground md:mt-8">
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

          <h1 className="hero-display mt-3 break-keep leading-[1.18]">
            <span className="block whitespace-nowrap">회원이 알아보는</span>
            <span className="block whitespace-nowrap text-primary">좋은 강사의 차이</span>
          </h1>


          <p className="lead mt-3 max-w-[30ch] break-keep sm:max-w-[34ch]">
            횟수·일정·납부 내역은 투명하게
            <br />
            회원별 레슨 기록은 세심하게
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

const FEATURE_SHOTS = [
  {
    src: featAiRecord.url,
    alt: "KERRI 코치앱 AI 레슨 기록 화면. 오늘 레슨 요약과 이전 레슨 대비 변화, 다음 레슨 목표가 정리되어 있습니다.",
    caption: "AI 레슨 기록 — 잘 가르친 만큼 제대로 인정받으세요",
  },
  {
    src: featDashboard.url,
    alt: "KERRI 코치앱 홈 대시보드와 AI 브리핑 화면. 오늘 레슨 현황과 회원별 레슨 브리핑, 오늘의 레슨 포인트가 표시되어 있습니다.",
    caption: "홈 대시보드와 AI 브리핑 — 지난 레슨을 기억하는 세심함",
  },
  {
    src: featSchedule.url,
    alt: "KERRI 코치앱 스케줄 관리 화면. 주간 캘린더의 레슨 일정과 일간·월간 현황이 표시되어 있습니다.",
    caption: "스케줄 관리 — 일정 찾느라 레슨 흐름 끊지 마세요",
  },
  {
    src: featMember.url,
    alt: "KERRI 코치앱 회원 관리 화면. 회원 상세 정보와 이용 중인 레슨권, 남은 레슨 횟수, 정기 레슨 시간이 표시되어 있습니다.",
    caption: "회원 관리 — 몇 회 남았는지 다시 세지 마세요",
  },
];

function Ops() {
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoom]);

  return (
    <Section
      id="features"
      tone="cream"
      className=""
    >
      <Container>
        <SectionHead
          eyebrow="케리 코치앱"
          title={
            <>
              세심한 회원 케어
              <br />
              <span className="text-primary">KERRI 하나로</span>
            </>
          }
          body={
            <>
              AI 레슨 기록부터 일정·회원 관리까지. 체계적인 회원 관리를 실제 앱 화면으로 확인하세요.
            </>
          }
        />

        <div className="-mx-2.5 mt-10 space-y-5 sm:mx-0 sm:space-y-6 lg:mt-14 lg:space-y-12">
          {FEATURE_SHOTS.map((s, i) => (
            <Reveal key={s.caption} delay={i * 60}>
              <button
                type="button"
                onClick={() => setZoom(i)}
                aria-label={`${s.caption} 이미지 크게 보기`}
                className="block w-full cursor-zoom-in rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--cream)]"
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  width={1536}
                  height={1024}
                  style={{ aspectRatio: "3 / 2", height: "auto" }}
                  className="block w-full"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {zoom !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={FEATURE_SHOTS[zoom].caption}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          onClick={() => setZoom(null)}
        >
          <button
            type="button"
            onClick={() => setZoom(null)}
            aria-label="확대 보기 닫기"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-foreground shadow-lg transition hover:bg-white"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <img
            src={FEATURE_SHOTS[zoom].src}
            alt={FEATURE_SHOTS[zoom].alt}
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Section>
  );
}




/* ── Impact: KERRI를 사용하면 달라집니다 ───────────────────── */

function Impact() {
  const cards = [
    {
      title: "믿을 수 있는 강사",
      desc: "일정과 남은 횟수부터 납부 내역까지 회원도 안심할 수 있는 투명한 관리",
    },
    {
      title: "나를 기억하는 강사",
      desc: "지난 레슨을 기억하고 회원에게 필요한 지도를 이어가세요",
    },
    {
      title: "성장을 챙기는 강사",
      desc: "쌓인 레슨 기록으로 변화를 살피고 다음 목표까지 함께 챙기세요",
    },
    {
      title: "레슨에 집중하는 강사",
      desc: "회원 관리에 드는 수고를 줄이고 눈앞의 레슨에 집중하세요",
    },
  ];

  return (
    <Section id="impact">
      <Container className="!px-6 lg:!px-10">
        <SectionHead eyebrow="회원이 느끼는 가치" title="회원이 느끼는 좋은 강사의 차이" center />
        <div className="mt-8 grid grid-cols-1 gap-y-8 lg:mt-10 lg:grid-cols-2 lg:gap-x-16">
          {cards.map((c, idx) => {
            return (
              <Reveal key={c.title} delay={idx * 80}>
                <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 border-t border-border pt-7 text-left">
                  <span className="pt-1 text-sm font-medium leading-6 tracking-normal text-primary">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="break-keep text-xl font-semibold leading-[1.4] tracking-normal text-foreground lg:text-[22px]">{c.title}</h3>
                    <p className="mt-3 break-keep text-base leading-[1.65] tracking-normal text-foreground/70">{c.desc}</p>
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
    <Section id="install" tone="cream">
      <Container>
        <SectionHead
          eyebrow="다운로드"
          title={
            <>
              강사의 세심한 관리
              <br />
              회원의 손안까지
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
          회원앱 설치는 선택이에요
          <br />
          강사 혼자서도 코치앱으로 회원을 관리할 수 있어요
          <span className="block h-3.5" />
          레슨 기록과 관리 내역을 회원에게 공유하고 싶다면
          <br />
          케리 회원앱으로 초대해주세요
          <br />
          회원도 자신의 레슨 기록과 일정
          <br />
          납부 내역과 남은 횟수를 직접 확인할 수 있어요
          <span className="block h-3.5" />
          강사의 세심한 관리가 회원에게도 전해져요
        </>
      ),
    },
    {
      q: "테니스 외 다른 스포츠에서도 사용할 수 있나요?",
      a: (
        <>
          현재는 테니스 종목만 지원하고 있어요
          <br />
          앞으로 더 다양한 스포츠 강사님들이 이용할 수 있도록
          <br />
          지원 종목을 순차적으로 확대할 예정이에요
        </>
      ),
    },
    {
      q: "무료로 사용해볼 수 있나요?",
      a: (
        <>
          네. 처음 14일 동안 무료로 체험할 수 있습니다.
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
          <div className="surface mt-8 lg:mt-10 divide-y divide-border/60 overflow-hidden rounded-[20px] lg:rounded-[24px]">
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
        <p className="mt-6 break-keep text-center text-[0.875rem] leading-[1.75] text-muted-foreground">
          더 궁금한 점이 있으신가요?
          <br />
          <a
            href="http://pf.kakao.com/_CrxgwX"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary transition-colors duration-200 hover:text-[var(--clay-dark)]"
          >
            케리(KERRI) 카카오톡 채널
          </a>을 추가하고 편하게 문의해주세요
        </p>
      </div>
    </Section>
  );
}

/* ── Final CTA ─────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section
      id="cta"
      className="noise relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ background: "linear-gradient(145deg, #C0755A 0%, #A55E45 55%, #8E4E39 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: "radial-gradient(700px 380px at 20% 0%, rgba(255,255,255,0.22), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-[clamp(1.125rem,4.5vw,2.5rem)] text-center text-[var(--cream)] lg:px-10">
        <Reveal>
          <h2 className="mx-auto max-w-[26ch] break-keep text-[clamp(1.5rem,0.9rem+2.6vw,3.2rem)] leading-[1.32] tracking-[-0.035em]">
            <span className="font-semibold text-[var(--cream)] opacity-90">잘 가르치는 강사를 넘어</span>
            <br />
            <span className="font-extrabold text-[var(--cream)] [text-shadow:0_2px_18px_rgba(60,25,12,0.28)]">
              회원이 잊지 못하는 강사로
            </span>
          </h2>
          <p className="body-1 mx-auto mt-6 max-w-[26rem] break-keep leading-[1.75] text-[var(--cream)] opacity-80 sm:mt-7">
            레슨 기록부터 성장 관리까지
            <br />
            당신의 세심함을 오래 남는 경험으로
          </p>

          <button onClick={() => scrollTo("install")} className="btn-base btn-light mt-9 sm:mt-10">
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
    <div className="min-h-screen pb-24 md:pb-0 bg-background text-foreground">
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
