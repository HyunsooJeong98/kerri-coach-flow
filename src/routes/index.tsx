import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ClipboardList,
  History,
  Dumbbell,
  CalendarDays,
  Ticket,
  BellRing,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

/** ▼▼ 여기에 KERRI AI 레슨 리포트 시뮬레이터 공개 URL을 넣어주세요 ▼▼ */
const SIMULATOR_URL = "https://ai-coach-notes.lovable.app";



/** 고정 헤더의 실제 높이(모바일 메뉴 확장분 제외)를 계산 */
function headerOffset() {
  const header = document.querySelector("header");
  if (!(header instanceof HTMLElement)) return 64;
  // 헤더의 첫 번째 행(로고/메뉴 바)만 기준 — 모바일 메뉴가 열려 있어도 정확
  const bar = header.firstElementChild;
  const h = bar instanceof HTMLElement ? bar.offsetHeight : header.offsetHeight;
  return Math.round(h);
}

function scrollTo(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) {
    window.dispatchEvent(new CustomEvent("kerri:focus", { detail: id }));
    return;
  }

  const gap = window.innerWidth < 640 ? 8 : 16;
  const targetTop = () =>
    Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - headerOffset() - gap));

  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo({ top: targetTop(), behavior: "smooth" });
  }

  // 스크롤이 멈춘 뒤 헤더 높이를 다시 측정해 오차를 보정하고, 이동 완료를 알림
  let last = -1;
  let idle = 0;
  let corrected = false;
  const tick = () => {
    const y = Math.round(window.scrollY);
    if (y === last) idle += 1;
    else {
      idle = 0;
      last = y;
    }
    if (idle > 3) {
      if (!corrected && id !== "top") {
        corrected = true;
        const want = targetTop();
        if (Math.abs(want - y) > 2) {
          window.scrollTo({ top: want, behavior: "smooth" });
          idle = 0;
          last = -1;
          requestAnimationFrame(tick);
          return;
        }
      }
      window.dispatchEvent(new CustomEvent("kerri:focus", { detail: id }));
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ── Scroll reveal ─────────────────────────────────────────── */

function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "header";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Comp>
  );
}

/* ── Shell primitives ──────────────────────────────────────── */

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 lg:px-10 ${className}`}>{children}</div>;
}

function Section({
  id,
  children,
  className = "",
  tone = "plain",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "plain" | "cream";
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-28 sm:py-32 lg:py-40 ${
        tone === "cream" ? "cream-band noise" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  body,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className={`display-2 ${eyebrow ? "mt-6" : ""}`}>{title}</h2>
      {body && <p className="lead mt-8">{body}</p>}
    </Reveal>
  );
}

/* ── Nav ───────────────────────────────────────────────────── */

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = [
    { label: "기능", id: "features" },
    { label: "AI 리포트", id: "report" },
    { label: "요금제", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <button
          onClick={() => scrollTo("top")}
          className="text-[1.35rem] font-extrabold leading-none text-foreground"
          style={{ letterSpacing: "-0.05em" }}
        >
          KERRI
        </button>

        <nav className="hidden md:flex items-center gap-10 text-[0.95rem] font-medium text-foreground/70">
          {items.map((i) => (
            <button
              key={i.id}
              onClick={() => scrollTo(i.id)}
              className="transition-colors duration-200 hover:text-foreground"
            >
              {i.label}
            </button>
          ))}
          <Link to="/account-deletion" className="transition-colors duration-200 hover:text-foreground">
            계정 삭제
          </Link>
          <button
            onClick={() => scrollTo("install")}
            className="btn-base btn-primary !min-h-[3rem] !px-6 !text-[0.95rem] !rounded-[0.95rem]"
          >
            무료로 시작하기
          </button>
        </nav>

        <button
          className="md:hidden -mr-2 p-2 text-foreground"
          aria-label="메뉴 열기"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <Container className="flex flex-col gap-1 py-6">
            {items.map((i) => (
              <button
                key={i.id}
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollTo(i.id), 60);
                }}
                className="border-b border-border/50 py-4 text-left text-[1.05rem] font-medium text-foreground/85"
              >
                {i.label}
              </button>
            ))}
            <Link
              to="/account-deletion"
              onClick={() => setOpen(false)}
              className="border-b border-border/50 py-4 text-left text-[1.05rem] font-medium text-foreground/85"
            >
              계정 삭제
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollTo("install"), 60);
              }}
              className="btn-base btn-primary mt-6 w-full"
            >
              무료로 시작하기
            </button>
          </Container>
        </div>
      )}
    </header>
  );
}

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
  const cards = [
    {
      h: "레슨이 끝난 후",
      p: "회원에게 피드백을 보내는 일이\n번거롭습니다.",
    },
    {
      h: "횟수, 일정, 결제 내역을 수기와 엑셀로 관리하고 있습니다.",
      p: "체크가 누락되거나 잘못 기록되면\n회원과 불필요한 오해가 생길 수 있습니다.",
    },
    {
      h: "노쇼나 재등록 시기를 놓친 적이 있습니다.",
      p: "회원 한 명 한 명 직접 확인하고\n연락하는 일이 반복됩니다.",
    },
    {
      h: "레슨이 많아질수록",
      p: "회원별 이전 레슨 내용을 기억하기 어렵습니다.\n지난 레슨에서 무엇을 알려줬는지\n다시 찾아보거나 기억에 의존하게 됩니다.",
    },
  ];

  return (
    <Section id="empathy" tone="cream" className="!py-24 sm:!py-28 lg:!py-36">
      <Container>
        <SectionHead title="이런 경험 있으신가요?" center />
        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="h-full rounded-[1.5rem] border border-border/50 bg-card p-8 sm:p-10 shadow-[0_1px_2px_rgba(36,30,26,0.03)]">
                <h3 className="text-[1.15rem] font-semibold leading-snug tracking-tight text-foreground">
                  {c.h}
                </h3>
                <p className="mt-4 whitespace-pre-line text-[1rem] leading-[1.75] text-foreground/70">
                  {c.p}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden noise">
      <div className="warm-glow pointer-events-none absolute inset-0 -z-10" />
      <Container className="flex flex-col items-center pb-10 pt-6 text-center lg:pb-32 lg:pt-24">
        <div className="section-fade flex flex-col items-center">
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
      </Container>
    </section>
  );
}

/* ── AI Simulator ──────────────────────────────────────────── */

function SimulatorSection() {
  return (
    <section id="simulator" className="relative overflow-hidden noise">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60" style={{ background: "radial-gradient(600px 360px at 50% 20%, rgba(192,117,90,0.18), transparent 60%)" }} />
      <Container className="flex flex-col items-center pb-20 pt-4 text-center sm:pb-28 lg:pb-40 lg:pt-8">
        <Reveal>
          <div className="eyebrow">직접 체험</div>
          <h2 className="display-2 mt-5">
            AI 레슨 리포트를
            <br className="sm:hidden" />
            <span className="text-primary"> 지금 바로</span> 체험해 보세요
          </h2>
          <p className="lead mt-6 max-w-xl text-balance">
            아래 시뮬레이터에서 실제 코치가 받게 되는 AI 레슨 리포트를 확인해 보세요.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12 flex justify-center lg:mt-16">
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

/* ── Ops ───────────────────────────────────────────────────── */

function Ops() {
  const cards = [
    { t: "회원 관리", d: "회원 정보를 한곳에서 관리" },
    { t: "레슨 일정", d: "오늘의 레슨을 한눈에 확인" },
    { t: "출석 · 횟수 관리", d: "남은 횟수를 자동 관리" },
    { t: "재등록 알림", d: "회원의 재등록 시점을 놓치지 않도록" },
    { t: "결제 관리", d: "미납 회원과 결제 현황을 쉽게 확인" },
    { t: "AI 레슨 리포트", d: "레슨이 끝나면 회원에게 자동 전달" },
  ];
  return (
    <Section id="features">
      <Container>
        <SectionHead
          eyebrow="Operations"
          title={
            <>
              코치는 <span className="text-primary">레슨에만</span> 집중하세요
            </>
          }
          body={
            <>
              회원 관리부터 결제, 일정, 리포트까지.
              <br className="hidden sm:block" /> 케리가 대신 관리합니다.
            </>
          }
        />

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 70}>
              <div className="surface surface-hover h-full p-8">
                <div className="flex items-center gap-4">
                  <span className="text-[0.8rem] font-bold tracking-[0.14em] text-primary/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.2rem] font-bold tracking-tight">{c.t}</h3>
                </div>
                <p className="mt-4 text-[0.975rem] leading-[1.8] text-muted-foreground">{c.d}</p>
                <div className="mt-8 aspect-[16/10] rounded-2xl border border-border/60 bg-[var(--cream)]" />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── Problem ───────────────────────────────────────────────── */

function Problem() {
  const items = [
    { h: "“오늘 뭐 배웠어요?”", p: "회원에게 매번 카톡으로 길게 설명합니다." },
    { h: "회원이 늘수록", p: "누가 무엇을 배웠는지 기억하기 어려워집니다." },
    { h: "열심히 가르쳐도", p: "회원은 레슨의 가치를 눈으로 확인하기 어렵습니다." },
  ];
  return (
    <Section tone="cream">
      <Container>
        <SectionHead
          title={
            <>
              레슨은 기억에 남지만,
              <br />
              <span className="text-primary">기록</span>은 남지 않았습니다.
            </>
          }
        />
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {items.map((i, idx) => (
            <Reveal key={i.h} delay={idx * 90}>
              <div className="surface surface-hover h-full p-9">
                <h3 className="text-[1.2rem] font-bold leading-snug">{i.h}</h3>
                <p className="mt-4 text-[0.975rem] leading-[1.85] text-muted-foreground">{i.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── Report ────────────────────────────────────────────────── */

function Report() {
  const steps = [
    {
      n: "STEP 1",
      t: "레슨 중",
      d: "클립 녹음기 또는 휴대폰으로 녹음",
      mock: (
        <div className="text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/12">
            <div className="h-4 w-4 animate-pulse rounded-full bg-primary" />
          </div>
          <div className="mt-5 text-[13px] font-semibold text-foreground">녹음 중 · 32:14</div>
        </div>
      ),
    },
    {
      n: "STEP 2",
      t: "AI가 분석",
      d: "잘한 점, 개선 포인트, 연습 방법, 다음 레슨 목표를 자동 정리",
      mock: (
        <div className="w-full text-left">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">AI 분석 결과</div>
          {["잘한 점", "개선 포인트", "연습 방법", "다음 목표"].map((k) => (
            <div
              key={k}
              className="mt-2.5 rounded-xl border border-border/50 bg-white/80 px-3.5 py-2.5 text-[11.5px] font-medium text-foreground/80"
            >
              {k}
            </div>
          ))}
        </div>
      ),
    },
    {
      n: "STEP 3",
      t: "회원앱 자동 전송",
      d: "회원은 언제든 나만의 레슨 기록을 확인",
      mock: (
        <div className="w-full text-left">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">KERRI Member</div>
          <div className="mt-2 text-[15px] font-bold">오늘의 리포트</div>
          <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-[11.5px] leading-[1.75] text-foreground/80">
            포핸드가 안정적이었어요. 다음 시간엔 스텝 워크를 집중 연습해요.
          </div>
        </div>
      ),
    },
  ];
  return (
    <Section id="report">
      <Container>
        <SectionHead
          eyebrow="AI 레슨 리포트"
          title={
            <>
              녹음 → AI 분석 → 회원 전달
              <br />
              <span className="text-primary">3분이면 끝.</span>
            </>
          }
        />
        <div className="mt-24 grid gap-16 md:grid-cols-3 md:gap-10">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 110} className="text-center">
              <PhoneMock className="!w-[228px] sm:!w-[248px]" bodyClassName="flex items-center justify-center px-6">
                {s.mock}
              </PhoneMock>
              <div className="mt-10 text-[0.72rem] font-bold tracking-[0.18em] text-primary">{s.n}</div>
              <h3 className="mt-3 text-[1.4rem] font-bold tracking-tight">{s.t}</h3>
              <p className="mx-auto mt-4 max-w-xs text-[0.975rem] leading-[1.85] text-muted-foreground">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── Sample report ─────────────────────────────────────────── */

function SampleReport() {
  const cards = [
    {
      tag: "코치 리포트",
      title: "김민수 회원 · 8회차",
      body: [
        ["포핸드", "팔로우스루 안정. 스윙 궤도 일관됨."],
        ["백핸드", "그립 두께 조정 필요. 임팩트 지점 앞으로."],
        ["풋워크", "크로스 스텝 반응 속도 개선."],
        ["다음 레슨", "발리 기본 자세 도입"],
      ],
    },
    {
      tag: "회원 리포트",
      title: "오늘의 나의 레슨",
      body: [
        ["잘한 점", "포핸드 자세가 좋아졌어요!"],
        ["개선할 점", "백핸드 그립을 조금 더 얇게 잡아보세요."],
        ["연습 방법", "벽치기 10분, 그립 체크 5회"],
        ["다음 목표", "발리 자세 익히기"],
      ],
    },
  ];
  return (
    <Section tone="cream">
      <Container>
        <SectionHead
          eyebrow="실제 리포트 예시"
          title={
            <>
              코치와 회원이
              <br />
              함께 보는 <span className="text-primary">레슨 기록</span>
            </>
          }
        />
        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.tag} delay={i * 100}>
              <div className="surface h-full rounded-[1.75rem] p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3.5 py-1.5 text-[0.72rem] font-bold text-primary">
                    {c.tag}
                  </span>
                  <span className="text-[0.8rem] text-muted-foreground">2026.07.18</span>
                </div>
                <h3 className="mt-6 text-[1.25rem] font-bold tracking-tight">{c.title}</h3>
                <div className="mt-7 divide-y divide-border/60">
                  {c.body.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[88px_1fr] gap-4 py-4">
                      <div className="pt-0.5 text-[0.8rem] font-bold text-muted-foreground">{k}</div>
                      <div className="text-[0.975rem] leading-[1.8] text-foreground/85">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
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
const MEMBER_APP_URL = "https://apps.apple.com/kr/app/kerri-member/id6783235236";

function StoreButtons({ appStoreUrl }: { appStoreUrl: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-[0.95rem] bg-[var(--ink)] px-5 py-3.5 text-[0.85rem] font-semibold text-[var(--cream)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
      >
        <span className="opacity-60">Download on the</span>
        <span className="font-bold">App Store</span>
      </a>
      <div
        aria-disabled="true"
        className="inline-flex cursor-not-allowed items-center gap-2 rounded-[0.95rem] border border-border bg-muted px-5 py-3.5 text-[0.85rem] font-semibold text-foreground/45"
      >
        <span>준비 중</span>
        <span className="font-bold">Google Play</span>
      </div>
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

/* ── Member app ────────────────────────────────────────────── */

function MemberApp() {
  const features = [
    { icon: ClipboardList, t: "오늘 레슨 기록", d: "오늘 배운 핵심 내용 확인" },
    { icon: History, t: "지난 레슨 기록", d: "누적된 레슨 히스토리" },
    { icon: Dumbbell, t: "개인 연습 플랜", d: "AI가 제안하는 맞춤 연습" },
    { icon: CalendarDays, t: "다음 레슨 일정", d: "예정된 일정 한눈에" },
    { icon: Ticket, t: "남은 레슨 횟수", d: "잔여 횟수 실시간 확인" },
    { icon: BellRing, t: "리마인드 알림", d: "레슨 전 자동 알림" },
    { icon: TrendingUp, t: "성장 기록", d: "변화하는 나의 데이터" },
  ];

  const cards = [
    { t: "레슨을 더 잘 이해합니다.", d: "오늘 배운 핵심 내용을 다시 확인하며 레슨 내용을 더 오래 기억할 수 있습니다." },
    { t: "혼자서도 연습할 수 있습니다.", d: "AI가 제안하는 개인 연습 플랜으로 다음 레슨 전까지 꾸준히 운동할 수 있습니다." },
    { t: "성장이 눈에 보입니다.", d: "레슨 기록이 쌓일수록 회원은 자신의 변화를 확인하고, 다음 레슨에 대한 동기를 얻습니다." },
  ];

  return (
    <Section id="member">
      <Container>
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="display-2">
              회원도 함께 사용할 때,
              <br />
              <span className="text-primary">KERRI의 가치</span>가 커집니다.
            </h2>
            <p className="lead mt-8">
              레슨이 끝난 뒤에도 회원이 계속 운동할 수 있도록 돕고, 코치는 회원별 성장 과정을 체계적으로
              관리할 수 있습니다.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[1.75rem] border border-border/60 bg-[var(--cream)] p-7 sm:p-9">
              <p className="text-[0.95rem] font-semibold text-foreground/70">
                회원은 KERRI Member 앱에서 언제든 확인할 수 있습니다.
              </p>
              <ul className="mt-7 grid grid-cols-2 gap-4">
                {features.map((f) => (
                  <li key={f.t} className="surface surface-hover p-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/[0.05] text-foreground/70">
                      <f.icon size={18} strokeWidth={1.6} />
                    </span>
                    <p className="mt-4 text-[0.95rem] font-bold leading-snug">{f.t}</p>
                    <p className="mt-1.5 text-[0.8rem] leading-[1.7] text-muted-foreground">{f.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="surface surface-hover h-full p-9">
                <h3 className="text-[1.2rem] font-bold tracking-tight">{c.t}</h3>
                <p className="mt-4 text-[0.975rem] leading-[1.85] text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <p className="mx-auto mt-20 max-w-3xl text-center text-[1.15rem] font-semibold leading-[1.85] text-foreground/80">
            회원은 성장 과정을 확인하고, 코치는 더 체계적인 관리와 높은 재등록률을 기대할 수 있습니다.
          </p>
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
          eyebrow="Download"
          title={
            <>
              코치와 회원,
              <br />
              <span className="text-primary">모두를 위한</span> 레슨 플랫폼
            </>
          }
        />

        <div className="mt-12 grid gap-6 sm:mt-16 md:mt-20 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <div
              className={`surface h-full rounded-[1.85rem] p-8 sm:p-12 transition-all duration-500 ${
                pulse
                  ? "!border-primary ring-4 ring-primary/20 -translate-y-1.5 shadow-[0_36px_70px_-30px_rgba(192,117,90,0.5)] animate-[installPulse_1.1s_ease-in-out_2]"
                  : ""
              }`}
            >
              <div className="eyebrow">추천</div>
              <h3 className="mt-4 text-[1.9rem] font-extrabold tracking-tight sm:text-[2.2rem]">KERRI Coach</h3>
              <p className="mt-6 max-w-md text-[1.02rem] leading-[1.85] text-muted-foreground">
                회원 관리 · 레슨 일정 · 결제 관리 · AI 레슨 리포트.
                <br />
                레슨 운영을 하나로.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <StoreButtons appStoreUrl={COACH_APP_URL} />
                <QR url={COACH_APP_URL} label="KERRI Coach" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={110} className="md:col-span-2">
            <div className="surface h-full rounded-[1.85rem] p-8 sm:p-12">
              <div className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">회원용</div>
              <h3 className="mt-4 text-[1.6rem] font-extrabold tracking-tight sm:text-[1.8rem]">KERRI Member</h3>
              <p className="mt-6 text-[0.975rem] leading-[1.85] text-muted-foreground">
                오늘의 레슨 · AI 리포트 · 성장 기록 · 남은 횟수 확인.
                <br />
                내 레슨을 한곳에서.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <StoreButtons appStoreUrl={MEMBER_APP_URL} />
                <QR url={MEMBER_APP_URL} label="KERRI Member" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── Pricing ───────────────────────────────────────────────── */

function Pricing() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "FREE",
      monthly: 0,
      yearly: 0,
      reports: "월 3회",
      note: "리포트를 직접 만들어보세요.",
    },
    {
      name: "BASIC",
      monthly: 9900,
      yearly: 99000,
      reports: "월 10회",
      note: "",
    },
    {
      name: "PRO",
      monthly: 19000,
      yearly: 190000,
      reports: "월 50회",
      note: "",
      badge: "가장 인기",
      highlight: true,
    },
  ];

  const formatPrice = (n: number) => n.toLocaleString("ko-KR");
  const monthlyEquiv = (yearly: number) => Math.round(yearly / 12);

  return (
    <Section id="pricing">
      <Container>
        <SectionHead
          eyebrow="Pricing"
          title={
            <>
              부담 없이 시작하고,
              <br />
              <span className="text-primary">필요한 만큼</span> 사용하세요.
            </>
          }
        />

        {/* Billing toggle */}
        <Reveal delay={40}>
          <div className="mt-16 flex items-center justify-center gap-4">
            <span className={`text-[0.95rem] font-semibold transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
              월간
            </span>
            <button
              onClick={() => setAnnual((v) => !v)}
              aria-label={annual ? "월간 요금제로 전환" : "연간 요금제로 전환"}
              className="relative h-10 w-[3.8rem] rounded-full border border-border bg-muted/60 transition-colors duration-300"
            >
              <span
                className={`absolute top-1 left-1 h-8 w-8 rounded-full bg-primary shadow-md transition-transform duration-300 ${
                  annual ? "translate-x-[1.5rem]" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-[0.95rem] font-semibold transition-colors ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              연간
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[0.75rem] font-bold text-primary">
              2개월 무료
            </span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-14 flex flex-wrap items-center gap-5 rounded-[1.5rem] border border-primary/20 bg-primary/[0.06] px-7 py-6">
            <div className="rounded-full bg-card px-4 py-1.5 text-[0.75rem] font-bold text-primary">6개월 선결제</div>
            <div className="text-[1.15rem] font-bold">99,000원</div>
            <div className="text-[0.95rem] text-foreground/75">
              클립형 녹음기 제공 <span className="text-muted-foreground">(6개월 이용 완료 시 무상)</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((p, i) => {
            const yearlyEquiv = monthlyEquiv(p.yearly);
            const saving = p.monthly * 12 - p.yearly;
            return (
              <Reveal key={p.name} delay={i * 90}>
                <div
                  className={`relative h-full rounded-[1.75rem] p-9 sm:p-10 transition-all duration-500 ${
                    p.highlight
                      ? "border border-primary/60 bg-card shadow-[0_32px_70px_-32px_rgba(192,117,90,0.45)] md:-translate-y-2"
                      : "surface surface-hover"
                  }`}
                >
                  {p.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-[0.72rem] font-bold text-primary-foreground shadow-[0_10px_24px_-12px_rgba(192,117,90,0.9)]">
                      {p.badge}
                    </div>
                  )}
                  <div className="text-[0.75rem] font-bold tracking-[0.18em] text-primary">{p.name}</div>

                  <div className="mt-5 min-h-[3.6rem]">
                    {annual ? (
                      <div>
                        <div className="text-[2.1rem] font-extrabold tracking-tight">
                          {p.yearly === 0 ? "무료" : `${formatPrice(p.yearly)}원`}
                          <span className="ml-1.5 text-[1rem] font-semibold text-muted-foreground">/년</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[0.9rem] text-muted-foreground">
                            월 {p.yearly === 0 ? "무료" : `${formatPrice(yearlyEquiv)}원`}
                          </span>
                          {saving > 0 && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.72rem] font-bold text-primary">
                              연 {formatPrice(saving)}원 절약
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-[2.1rem] font-extrabold tracking-tight">
                        {p.monthly === 0 ? "무료" : `${formatPrice(p.monthly)}원`}
                        <span className="ml-1.5 text-[1rem] font-semibold text-muted-foreground">/월</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 space-y-3 border-t border-border/60 pt-8">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[0.95rem] text-muted-foreground">AI 리포트</span>
                      <span className="text-[1.05rem] font-bold">{p.reports}</span>
                    </div>
                    {p.note && <p className="pt-2 text-[0.85rem] leading-relaxed text-muted-foreground">{p.note}</p>}
                  </div>
                  <button
                    onClick={() => scrollTo("install")}
                    className={`btn-base mt-10 w-full !text-[0.95rem] ${p.highlight ? "btn-primary" : "btn-ghost"}`}
                  >
                    시작하기
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>


        <Reveal>
          <p className="mt-12 text-[0.95rem] leading-[1.85] text-muted-foreground">
            리포트 충전권을 추가 구매할 수 있습니다.
            <br />
            충전권은 유효기간 없이 사용할 수 있습니다.
          </p>
        </Reveal>
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

/* ── Footer ────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background py-8 sm:py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1 text-[0.85rem] text-foreground/75">
          <div><span className="text-muted-foreground">회사명</span> · 케리</div>
          <div><span className="text-muted-foreground">대표자</span> · 정현수</div>
          <div><span className="text-muted-foreground">사업자등록번호</span> · 214-20-87491</div>
          <div>
            <span className="text-muted-foreground">연락처</span> ·{" "}
            <a
              href="mailto:hyunsoo@kerri.co.kr"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              hyunsoo@kerri.co.kr
            </a>
          </div>
        </div>
        <div className="text-[0.85rem]">
          <div className="font-medium text-foreground">정책</div>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-muted-foreground">
            <li><a href="#" className="transition-colors hover:text-primary">이용약관</a></li>
            <li><a href="#" className="transition-colors hover:text-primary">개인정보처리방침</a></li>
            <li><a href="#" className="transition-colors hover:text-primary">환불정책</a></li>
            <li><Link to="/account-deletion" className="transition-colors hover:text-primary">계정 및 데이터 삭제 요청</Link></li>
          </ul>
        </div>
      </Container>
      <Container className="mt-6 border-t border-border/30 pt-4 text-[0.7rem] tracking-wide text-muted-foreground">
        © {new Date().getFullYear()} KERRI (케리). All rights reserved.
      </Container>
    </footer>
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
        <SimulatorSection />
        <Empathy />
        <Ops />
        <Problem />
        <Report />
        <SampleReport />
        <Impact />
        <MemberApp />
        <AppSection />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
