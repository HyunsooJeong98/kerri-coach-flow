import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import kerriAppHome from "@/assets/kerri-app-home.png.asset.json";


export const Route = createFileRoute("/")({
  component: Landing,
});

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 text-primary ${className}`}>
      <span className="h-px w-8 bg-primary/60" />
      <span className="font-display text-sm">{children}</span>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const items = [
    { label: "기능", id: "features" },
    { label: "AI 리포트", id: "report" },
    { label: "요금제", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];
  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-foreground/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8 h-[68px] flex items-center justify-between">
        <button
          onClick={() => scrollTo("top")}
          className="text-[22px] font-extrabold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.05em" }}
        >
          KERRI
        </button>
        <nav className="hidden md:flex items-center gap-9 text-[14px] font-medium text-foreground/75">
          {items.map((i) => (
            <button
              key={i.id}
              onClick={() => scrollTo(i.id)}
              className="hover:text-foreground transition-colors"
            >
              {i.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("install")}
            className="rounded-full bg-primary px-5 py-2.5 text-primary-foreground text-[13px] font-semibold shadow-[0_10px_30px_-12px_rgba(192,117,90,0.6)] hover:bg-[var(--clay-dark)] hover:-translate-y-0.5 transition-all"
          >
            무료로 시작하기
          </button>
        </nav>
        <button
          className="md:hidden text-foreground p-2"
          aria-label="메뉴 열기"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
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
      </div>
      {open && (
        <div className="md:hidden border-t border-foreground/[0.06] bg-background/95 backdrop-blur-xl">
          <div className="px-5 py-4 flex flex-col gap-1">
            {items.map((i) => (
              <button
                key={i.id}
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollTo(i.id), 50);
                }}
                className="text-left py-3 text-foreground/90 font-medium border-b border-foreground/[0.06]"
              >
                {i.label}
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollTo("install"), 50);
              }}
              className="mt-3 rounded-full bg-primary px-5 py-3 text-primary-foreground font-semibold"
            >
              무료로 시작하기
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function PhoneMock({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[260px] sm:w-[280px] aspect-[9/19] rounded-[2.75rem] bg-[var(--ink)] p-2.5 shadow-[0_40px_80px_-30px_rgba(62,43,34,0.45),0_0_0_1px_rgba(62,43,34,0.06)] ${className}`}
    >
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-5 w-24 rounded-b-2xl bg-[var(--ink)] z-10" />
      <div className="h-full w-full rounded-[2.25rem] bg-[var(--cream)] overflow-hidden flex items-center justify-center text-center px-6">
        {children ?? (
          <span className="text-xs text-muted-foreground">[스크린샷 교체 예정]</span>
        )}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 90% -5%, rgba(192,117,90,0.22), transparent 60%), radial-gradient(700px 400px at -5% 40%, rgba(192,117,90,0.10), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px -z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(62,43,34,0.08), transparent)" }}
      />
      <div className="mx-auto max-w-6xl px-5 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-36 grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
        <div className="section-fade">
          <Eyebrow>Personal Coaching Platform</Eyebrow>
          <h1 className="mt-6 text-[2.5rem] sm:text-6xl lg:text-[3.75rem] font-extrabold leading-[1.1]" style={{ letterSpacing: "-0.045em" }}>
            레슨이 끝나면,
            <br />
            <span className="font-display text-primary">리포트</span>
            <span>가 도착합니다</span>
          </h1>
          <p className="mt-7 text-base sm:text-lg text-foreground/70 leading-[1.75] max-w-lg">
            회원 관리부터 AI 레슨 리포트까지.
            <br />
            개인 레슨 코치를 위한 운영 플랫폼 <b className="text-foreground">KERRI</b>.
          </p>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-[1.75] max-w-lg">
            녹음 한 번이면 AI가 오늘 레슨을 정리해 회원에게 전달합니다.
            <br />
            코치는 코칭에만 집중하세요.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("install")}
              className="rounded-full bg-primary px-7 py-4 text-primary-foreground font-semibold shadow-[0_20px_40px_-15px_rgba(192,117,90,0.55)] hover:bg-[var(--clay-dark)] hover:-translate-y-0.5 transition-all"
            >
              무료로 시작하기
            </button>
            <button
              onClick={() => scrollTo("cta")}
              className="rounded-full border border-foreground/12 bg-background/60 backdrop-blur px-7 py-4 text-foreground font-semibold hover:border-primary/40 hover:text-primary transition-colors"
            >
              데모 신청하기
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-8 bg-primary/15 blur-3xl rounded-full -z-10" />
            <PhoneMock>
              <div className="text-left w-full py-8">
                <div className="eyebrow text-[11px] text-primary">Kerri Coach</div>
                <div className="mt-1.5 text-[15px] font-bold text-foreground">오늘의 레슨</div>
                <div className="mt-5 space-y-2">
                  {["김민수 · 15:00", "박서연 · 16:30", "이지훈 · 18:00"].map((t) => (
                    <div key={t} className="rounded-xl bg-white/80 border border-foreground/[0.06] px-3.5 py-3 text-xs text-foreground/80 shadow-[0_1px_2px_rgba(62,43,34,0.03)]">
                      {t}
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-primary/10 border border-primary/20 px-3.5 py-3">
                  <div className="text-[10px] font-bold text-primary tracking-widest">AI 리포트</div>
                  <div className="mt-1.5 text-[11px] text-foreground/80 leading-snug">
                    포핸드 팔로우스루 안정. 백핸드 그립 개선 필요.
                  </div>
                </div>
              </div>
            </PhoneMock>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, children, sub }: { eyebrow?: string; children: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
      <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold leading-[1.15]" style={{ letterSpacing: "-0.035em" }}>
        {children}
      </h2>
      {sub && <p className="mt-6 text-base sm:text-lg text-foreground/65 leading-[1.8]">{sub}</p>}
    </div>
  );
}

function Ops() {
  const cards: { t: string; d: string; img?: string }[] = [
    { t: "회원 관리", d: "회원 정보를 한곳에서 관리" },
    { t: "레슨 일정", d: "오늘의 레슨을 한눈에 확인" },
    { t: "출석 · 횟수 관리", d: "남은 횟수를 자동 관리", img: kerriAppHome.url },
    { t: "재등록 알림", d: "회원의 재등록 시점을 놓치지 않도록" },
    { t: "결제 관리", d: "미납 회원과 결제 현황을 쉽게 확인" },
    { t: "AI 레슨 리포트", d: "레슨이 끝나면 회원에게 자동 전달" },
  ];
  return (
    <section id="features" className="py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Operations"
          sub={
            <>
              회원 관리부터 결제, 일정, 리포트까지.
              <br className="hidden sm:block" />
              케리가 대신 관리합니다.
            </>
          }
        >
          코치는 <span className="font-display text-primary">레슨에만</span> 집중하세요
        </SectionHeader>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div
              key={c.t}
              className="group relative rounded-[1.75rem] bg-white/50 backdrop-blur-sm border border-foreground/[0.06] p-7 hover:bg-white hover:border-foreground/[0.1] hover:shadow-[0_30px_60px_-30px_rgba(62,43,34,0.22)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-primary text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-10 bg-foreground/10 group-hover:w-16 group-hover:bg-primary/40 transition-all duration-500" />
              </div>
              <h3 className="mt-6 text-[19px] font-bold tracking-tight">{c.t}</h3>
              <p className="mt-2.5 text-sm text-foreground/60 leading-relaxed">{c.d}</p>
              <div className="mt-7 aspect-[16/11] rounded-2xl bg-[var(--cream)] border border-foreground/[0.05] grid place-items-center overflow-hidden">
                {c.img ? (
                  <img
                    src={c.img}
                    alt={`${c.t} 앱 화면`}
                    loading="lazy"
                    className="h-full w-auto object-contain py-2"
                  />
                ) : (
                  <span className="font-display text-foreground/25 text-sm">preview</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { h: "\u201C오늘 뭐 배웠어요?\u201D", p: "회원에게 매번 카톡으로 길게 설명합니다." },
    { h: "회원이 늘수록", p: "누가 무엇을 배웠는지 기억하기 어려워집니다." },
    { h: "열심히 가르쳐도", p: "회원은 레슨의 가치를 눈으로 확인하기 어렵습니다." },
  ];
  return (
    <section className="py-24 lg:py-36 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader eyebrow="The Problem">
          레슨은 기억에 남지만,
          <br />
          <span className="font-display text-primary">기록</span>은 남지 않았습니다.
        </SectionHeader>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((i, idx) => (
            <div
              key={i.h}
              className="rounded-[1.75rem] bg-background border border-foreground/[0.06] p-8 hover:shadow-[0_25px_50px_-30px_rgba(62,43,34,0.22)] transition-shadow"
            >
              <div className="font-display text-primary/70 text-xl">0{idx + 1}</div>
              <h3 className="mt-5 text-lg font-bold text-foreground leading-snug">{i.h}</h3>
              <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{i.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Report() {
  const steps = [
    {
      n: "STEP 1",
      t: "레슨 중",
      d: "클립 녹음기 또는 휴대폰으로 녹음",
      mock: (
        <div className="text-center">
          <div className="relative mx-auto h-20 w-20 rounded-full bg-primary/12 grid place-items-center">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <div className="relative h-4 w-4 rounded-full bg-primary" />
          </div>
          <div className="mt-4 text-xs font-semibold text-foreground">녹음 중 · 32:14</div>
        </div>
      ),
    },
    {
      n: "STEP 2",
      t: "AI가 분석",
      d: "잘한 점, 개선 포인트, 연습 방법, 다음 레슨 목표를 자동 정리",
      mock: (
        <div className="text-left w-full">
          <div className="eyebrow text-[11px] text-primary">AI 분석 결과</div>
          {["잘한 점", "개선 포인트", "연습 방법", "다음 목표"].map((k) => (
            <div key={k} className="mt-2 rounded-lg bg-white/80 border border-foreground/[0.06] px-3 py-2.5 text-[11px] font-medium text-foreground/80">
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
        <div className="text-left w-full">
          <div className="eyebrow text-[11px] text-primary">Kerri Member</div>
          <div className="mt-1 text-sm font-bold">오늘의 리포트</div>
          <div className="mt-4 rounded-xl bg-primary/10 border border-primary/20 p-3 text-[11px] leading-relaxed text-foreground/80">
            포핸드가 안정적이었어요. 다음 시간엔 스텝 워크를 집중 연습해요.
          </div>
        </div>
      ),
    },
  ];
  return (
    <section id="report" className="py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader eyebrow="AI Lesson Report">
          녹음 → AI 분석 → 회원 전달
          <br />
          <span className="font-display text-primary">3분이면 끝.</span>
        </SectionHeader>
        <div className="mt-16 grid md:grid-cols-3 gap-10 lg:gap-14">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <PhoneMock className="!w-[220px] sm:!w-[240px]">{s.mock}</PhoneMock>
              <div className="mt-8 font-display text-primary text-sm">{s.n}</div>
              <h3 className="mt-2 text-xl font-bold tracking-tight">{s.t}</h3>
              <p className="mt-3 text-sm text-foreground/65 leading-relaxed max-w-xs mx-auto">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleReport() {
  return (
    <section className="py-24 lg:py-36 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader eyebrow="Sample Report">
          코치와 회원이
          <br />
          함께 보는 <span className="font-display text-primary">레슨 기록</span>
        </SectionHeader>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {[
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
          ].map((c) => (
            <div key={c.tag} className="rounded-[2rem] bg-background border border-foreground/[0.06] p-8 sm:p-10 shadow-[0_30px_70px_-40px_rgba(62,43,34,0.3)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-primary bg-primary/10 rounded-full px-3 py-1">{c.tag}</span>
                <span className="font-display text-muted-foreground text-sm">2026.07.18</span>
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight">{c.title}</h3>
              <div className="mt-6 divide-y divide-foreground/[0.06]">
                {c.body.map(([k, v]) => (
                  <div key={k} className="py-3.5 grid grid-cols-[86px_1fr] gap-3">
                    <div className="text-xs font-bold text-foreground/50 pt-0.5 tracking-wide">{k}</div>
                    <div className="text-sm text-foreground/85 leading-relaxed">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const items = [
    { t: "재등록률 향상", d: "회원이 성장 기록을 확인하며 레슨을 계속할 이유가 생깁니다." },
    { t: "프로다운 브랜딩", d: "리포트 하나만으로도 \u2018관리해주는 코치\u2019라는 인상을 남깁니다." },
    { t: "회원 데이터 축적", d: "회원별 진도와 피드백이 자동으로 쌓여 다음 레슨 준비가 쉬워집니다." },
  ];
  return (
    <section className="py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader eyebrow="The Impact">
          회원은 <span className="font-display text-primary">더 오래</span> 다니고,
          <br />
          코치는 더 전문적으로 성장합니다.
        </SectionHeader>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((i, idx) => (
            <div
              key={i.t}
              className="rounded-[1.75rem] bg-white/50 backdrop-blur-sm border border-foreground/[0.06] p-8 hover:bg-white hover:shadow-[0_30px_60px_-30px_rgba(62,43,34,0.22)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="font-display text-primary text-xl">0{idx + 1}</div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{i.t}</h3>
              <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoreButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="rounded-lg bg-[var(--ink)] text-white px-4 py-2.5 text-xs font-semibold flex items-center gap-2">
         <span className="opacity-70">Download on the</span>
        <span className="font-bold">App Store</span>
      </div>
      <div className="rounded-lg bg-[var(--ink)] text-white px-4 py-2.5 text-xs font-semibold flex items-center gap-2">
        <span className="opacity-70">GET IT ON</span>
        <span className="font-bold">Google Play</span>
      </div>
    </div>
  );
}

function QR() {
  return (
    <div className="hidden md:grid place-items-center h-20 w-20 rounded-lg bg-white border border-foreground/[0.08]">
      <div className="grid grid-cols-5 gap-0.5">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className={`h-2 w-2 ${(i * 7) % 3 === 0 ? "bg-[var(--ink)]" : "bg-transparent"}`} />
        ))}
      </div>
    </div>
  );
}

function AppSection() {
  return (
    <section id="install" className="py-24 lg:py-36 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader eyebrow="Get the App">
          코치와 회원,
          <br />
          <span className="font-display text-primary">모두를 위한</span> 레슨 플랫폼
        </SectionHeader>
        <div className="mt-14 grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 rounded-[2rem] bg-background border border-foreground/[0.06] p-8 sm:p-12 shadow-[0_30px_70px_-40px_rgba(62,43,34,0.35)]">
            <Eyebrow>Recommended</Eyebrow>
            <h3 className="mt-4 text-2xl sm:text-[2rem] font-extrabold tracking-tight">KERRI Coach</h3>
            <p className="mt-5 text-sm sm:text-base text-foreground/70 leading-[1.75]">
              회원 관리 · 레슨 일정 · 결제 관리 · AI 레슨 리포트.
              <br />
              레슨 운영을 하나로.
            </p>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <StoreButtons />
              <QR />
            </div>
          </div>
          <div className="md:col-span-2 rounded-[2rem] bg-background border border-foreground/[0.06] p-8 sm:p-12">
            <div className="eyebrow text-sm text-foreground/50">For Members</div>
            <h3 className="mt-4 text-xl sm:text-2xl font-extrabold tracking-tight">KERRI Member</h3>
            <p className="mt-5 text-sm text-foreground/70 leading-[1.75]">
              오늘의 레슨 · AI 리포트 · 성장 기록 · 남은 횟수 확인.
              <br />
              내 레슨을 한곳에서.
            </p>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <StoreButtons />
              <QR />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "FREE", price: "월 0원", reports: "월 3회", note: "리포트를 직접 만들어보세요." },
    { name: "BASIC", price: "월 9,900원", reports: "월 10회", note: "" },
    { name: "PRO", price: "월 19,000원", reports: "월 50회", note: "", badge: "가장 인기", highlight: true },
  ];
  return (
    <section id="pricing" className="py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader eyebrow="Pricing">
          부담 없이 시작하고,
          <br />
          <span className="font-display text-primary">필요한 만큼</span> 사용하세요.
        </SectionHeader>

        <div className="mt-12 rounded-[1.5rem] bg-primary/8 border border-primary/20 px-6 sm:px-8 py-5 flex flex-wrap items-center gap-4">
          <div className="text-[11px] font-bold text-primary bg-background rounded-full px-3 py-1.5 tracking-widest">6개월 선결제</div>
          <div className="text-base sm:text-lg font-bold text-foreground">99,000원</div>
          <div className="text-sm text-foreground/70">클립형 녹음기 제공 <span className="text-muted-foreground">(6개월 이용 완료 시 무상)</span></div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-[2rem] p-8 sm:p-9 border transition-all ${
                p.highlight
                  ? "bg-background border-primary/40 shadow-[0_40px_80px_-30px_rgba(192,117,90,0.45)] md:scale-[1.04]"
                  : "bg-white/50 backdrop-blur-sm border-foreground/[0.06] hover:bg-white"
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-[11px] font-bold text-primary-foreground tracking-wide">
                  {p.badge}
                </div>
              )}
              <div className="font-display text-primary text-lg">{p.name}</div>
              <div className="mt-3 text-3xl sm:text-[2rem] font-extrabold tracking-tight">{p.price}</div>
              <div className="mt-7 border-t border-foreground/[0.08] pt-6 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-foreground/65">AI 리포트</span>
                  <span className="text-base font-bold text-foreground">{p.reports}</span>
                </div>
                {p.note && <p className="text-xs text-muted-foreground mt-3">{p.note}</p>}
              </div>
              <button
                onClick={() => scrollTo("install")}
                className={`mt-8 w-full rounded-full py-3.5 text-sm font-semibold transition-all ${
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:bg-[var(--clay-dark)] shadow-[0_15px_30px_-10px_rgba(192,117,90,0.5)]"
                    : "bg-foreground/[0.06] text-foreground hover:bg-foreground/[0.1]"
                }`}
              >
                시작하기
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-sm text-foreground/60 leading-relaxed">
          리포트 충전권을 추가 구매할 수 있습니다.
          <br />
          충전권은 유효기간 없이 사용할 수 있습니다.
        </div>
      </div>
    </section>
  );
}

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
    <section id="faq" className="py-24 lg:py-36 bg-[var(--cream)]">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeader eyebrow="FAQ">
          자주 묻는 <span className="font-display text-primary">질문</span>
        </SectionHeader>
        <div className="mt-12 divide-y divide-foreground/[0.08] rounded-[1.75rem] bg-background border border-foreground/[0.06] overflow-hidden">
          {items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <div key={it.q}>
                <button
                  className="w-full text-left px-7 py-6 flex items-start justify-between gap-4 hover:bg-foreground/[0.02] transition-colors"
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  <span className="text-base sm:text-lg font-bold text-foreground tracking-tight">{it.q}</span>
                  <span
                    className={`shrink-0 mt-1 h-7 w-7 rounded-full border border-primary/25 text-primary grid place-items-center font-medium transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-primary/10" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-7 pb-7 -mt-1 text-sm text-foreground/70 leading-relaxed whitespace-pre-line">
                    {it.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{
        background:
          "linear-gradient(140deg, #C0755A 0%, #A55E45 60%, #8f4d38 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(600px 400px at 10% 20%, rgba(247,240,233,0.15), transparent 60%), radial-gradient(500px 350px at 90% 90%, rgba(247,240,233,0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center text-[var(--cream)]">
        <div className="inline-flex items-center gap-3 text-[var(--cream)]/80">
          <span className="h-px w-8 bg-[var(--cream)]/50" />
          <span className="font-display text-sm">Start today</span>
        </div>
        <h2 className="mt-6 text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold leading-[1.15]" style={{ letterSpacing: "-0.035em" }}>
          회원 관리부터 <span className="font-display">AI 레슨 리포트</span>까지.
          <br />
          케리 하나면 충분합니다.
        </h2>
        <p className="mt-7 text-base sm:text-lg opacity-85 leading-[1.75]">
          코치는 레슨에만 집중하고,
          <br className="sm:hidden" />
          운영은 KERRI가 관리합니다.
        </p>
        <button
          onClick={() => scrollTo("install")}
          className="mt-10 rounded-full bg-[var(--cream)] text-[var(--ink)] px-9 py-4 font-bold hover:-translate-y-0.5 transition-transform shadow-[0_25px_50px_-20px_rgba(0,0,0,0.4)]"
        >
          코치앱 설치하기
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-foreground/[0.06] py-16 bg-background">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 grid md:grid-cols-3 gap-10">
        <div>
          <div className="text-2xl font-extrabold tracking-tight" style={{ letterSpacing: "-0.05em" }}>
            KERRI
          </div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            개인 레슨 코치를 위한 운영 플랫폼.
          </p>
          <div className="mt-6">
            <StoreButtons />
          </div>
        </div>
        <div className="text-sm text-foreground/70 space-y-1.5">
          <div><span className="text-muted-foreground">회사명</span> · KERRI</div>
          <div><span className="text-muted-foreground">대표자</span> · —</div>
          <div><span className="text-muted-foreground">사업자등록번호</span> · —</div>
          <div><span className="text-muted-foreground">연락처</span> · —</div>
        </div>
        <div className="text-sm">
          <div className="font-display text-primary">Policies</div>
          <ul className="mt-3 space-y-2 text-foreground/70">
            <li><a href="#" className="hover:text-primary transition-colors">이용약관</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">개인정보처리방침</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">환불정책</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 lg:px-8 mt-12 pt-6 border-t border-foreground/[0.06] text-xs text-muted-foreground">
        © {new Date().getFullYear()} KERRI. All rights reserved.
      </div>
    </footer>
  );
}

function StickyMobileCTA() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const target = document.getElementById("install");
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => setHide(entries[0].isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);
  if (hide) return null;
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-gradient-to-t from-background via-background/95 to-transparent pt-8">
      <button
        onClick={() => scrollTo("install")}
        className="w-full rounded-full bg-primary text-primary-foreground py-4 font-bold shadow-[0_20px_40px_-15px_rgba(192,117,90,0.6)]"
      >
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
        <Ops />
        <Problem />
        <Report />
        <SampleReport />
        <Impact />
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
