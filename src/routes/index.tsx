import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Nav() {
  const [open, setOpen] = useState(false);
  const items = [
    { label: "기능", id: "features" },
    { label: "AI 리포트", id: "report" },
    { label: "요금제", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo("top")}
          className="text-xl font-extrabold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.04em" }}
        >
          KERRI
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          {items.map((i) => (
            <button
              key={i.id}
              onClick={() => scrollTo(i.id)}
              className="hover:text-primary transition-colors"
            >
              {i.label}
            </button>
          ))}
          <Link to="/account-deletion" className="hover:text-primary transition-colors">
            계정 삭제
          </Link>
          <button
            onClick={() => scrollTo("install")}
            className="rounded-full bg-primary px-5 py-2.5 text-primary-foreground text-sm font-semibold shadow-sm hover:bg-[var(--clay-dark)] transition-colors"
          >
            무료로 시작하기
          </button>
        </nav>
        <button
          className="md:hidden text-foreground p-2"
          aria-label="메뉴 열기"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="px-5 py-4 flex flex-col gap-1">
            {items.map((i) => (
              <button
                key={i.id}
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollTo(i.id), 50);
                }}
                className="text-left py-3 text-foreground/90 font-medium border-b border-border/40"
              >
                {i.label}
              </button>
            ))}
            <Link
              to="/account-deletion"
              onClick={() => setOpen(false)}
              className="text-left py-3 text-foreground/90 font-medium border-b border-border/40"
            >
              계정 삭제
            </Link>
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
      className={`relative mx-auto w-[260px] sm:w-[280px] aspect-[9/19] rounded-[2.5rem] bg-[var(--ink)] p-2 shadow-[0_30px_60px_-20px_rgba(62,43,34,0.35)] ${className}`}
    >
      <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-b-2xl bg-[var(--ink)] z-10" />
      <div className="h-full w-full rounded-[2rem] bg-[var(--cream)] overflow-hidden flex items-center justify-center text-center px-6">
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
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(1000px 500px at 85% -10%, rgba(192,117,90,0.18), transparent 60%), radial-gradient(700px 400px at 0% 30%, rgba(192,117,90,0.08), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-14 items-center">
        <div className="section-fade">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            스포츠 강사를 위한 운영 플랫폼
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15]">
            당신의 코칭을,
            <br />
            <span className="text-primary">눈에 보이는 가치</span>로 만드세요.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-foreground/75 leading-relaxed">
            AI가 회원별 레슨 기록을 자동으로 정리하고 전달합니다.
          </p>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            쌓인 기록은 회원의 성장 데이터가 되고,
            <br />
            코치의 전문성과 코칭 실적을 증명하는 자산이 됩니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("install")}
              className="rounded-full bg-primary px-6 py-3.5 text-primary-foreground font-semibold shadow-sm hover:bg-[var(--clay-dark)] hover:-translate-y-0.5 transition-all"
            >
              무료로 시작하기
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <PhoneMock>
            <div className="text-left w-full py-8">
              <div className="text-[10px] uppercase tracking-widest text-primary font-bold">KERRI Coach</div>
              <div className="mt-1 text-sm font-bold text-foreground">오늘의 레슨</div>
              <div className="mt-4 space-y-2">
                {["김민수 · 15:00", "박서연 · 16:30", "이지훈 · 18:00"].map((t) => (
                  <div key={t} className="rounded-xl bg-white/70 border border-border/60 px-3 py-2.5 text-xs text-foreground/80">
                    {t}
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-primary/10 border border-primary/20 px-3 py-2.5">
                <div className="text-[10px] font-bold text-primary">AI 리포트</div>
                <div className="mt-1 text-[11px] text-foreground/80 leading-snug">
                  포핸드 팔로우스루 안정. 백핸드 그립 개선 필요.
                </div>
              </div>
            </div>
          </PhoneMock>
        </div>
      </div>
    </section>
  );
}

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
    <section id="features" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            코치는 <span className="text-primary">레슨에만</span> 집중하세요
          </h2>
          <p className="mt-5 text-base sm:text-lg text-foreground/70 leading-relaxed">
            회원 관리부터 결제, 일정, 리포트까지.
            <br className="hidden sm:block" />
            케리가 대신 관리합니다.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <div
              key={c.t}
              className="group rounded-2xl bg-card border border-border/60 p-6 hover:shadow-[0_20px_40px_-24px_rgba(62,43,34,0.25)] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="grid place-items-center h-9 w-9 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold">{c.t}</h3>
              </div>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{c.d}</p>
              <div className="mt-5 aspect-[16/10] rounded-xl bg-[var(--cream)] border border-dashed border-border grid place-items-center text-xs text-muted-foreground">
                앱 화면 이미지 자리
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
    { h: "“오늘 뭐 배웠어요?”", p: "회원에게 매번 카톡으로 길게 설명합니다." },
    { h: "회원이 늘수록", p: "누가 무엇을 배웠는지 기억하기 어려워집니다." },
    { h: "열심히 가르쳐도", p: "회원은 레슨의 가치를 눈으로 확인하기 어렵습니다." },
  ];
  return (
    <section className="py-20 lg:py-28 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl">
          레슨은 기억에 남지만,
          <br />
          <span className="text-primary">기록</span>은 남지 않았습니다.
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {items.map((i) => (
            <div key={i.h} className="rounded-2xl bg-background border border-border/60 p-7">
              <h3 className="text-lg font-bold text-foreground leading-snug">{i.h}</h3>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{i.p}</p>
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
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/15 grid place-items-center">
            <div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
          </div>
          <div className="mt-3 text-xs font-semibold text-foreground">녹음 중 · 32:14</div>
        </div>
      ),
    },
    {
      n: "STEP 2",
      t: "AI가 분석",
      d: "잘한 점, 개선 포인트, 연습 방법, 다음 레슨 목표를 자동 정리",
      mock: (
        <div className="text-left w-full">
          <div className="text-[10px] font-bold text-primary uppercase">AI 분석 결과</div>
          {["잘한 점", "개선 포인트", "연습 방법", "다음 목표"].map((k) => (
            <div key={k} className="mt-2 rounded-lg bg-white/70 border border-border/60 px-3 py-2 text-[11px] font-medium text-foreground/80">
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
          <div className="text-[10px] uppercase tracking-widest text-primary font-bold">KERRI Member</div>
          <div className="mt-1 text-sm font-bold">오늘의 리포트</div>
          <div className="mt-3 rounded-xl bg-primary/10 border border-primary/20 p-3 text-[11px] leading-relaxed text-foreground/80">
            포핸드가 안정적이었어요. 다음 시간엔 스텝 워크를 집중 연습해요.
          </div>
        </div>
      ),
    },
  ];
  return (
    <section id="report" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            AI 레슨 리포트
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            녹음 → AI 분석 → 회원 전달
            <br />
            <span className="text-primary">3분이면 끝.</span>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <PhoneMock className="!w-[220px] sm:!w-[240px]">{s.mock}</PhoneMock>
              <div className="mt-6 text-xs font-bold tracking-widest text-primary">{s.n}</div>
              <h3 className="mt-2 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed max-w-xs mx-auto">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleReport() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-bold text-primary uppercase tracking-widest">실제 리포트 예시</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            코치와 회원이
            <br />
            함께 보는 <span className="text-primary">레슨 기록</span>
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
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
            <div key={c.tag} className="rounded-3xl bg-background border border-border/60 p-6 sm:p-8 shadow-[0_20px_50px_-30px_rgba(62,43,34,0.3)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-primary bg-primary/10 rounded-full px-3 py-1">{c.tag}</span>
                <span className="text-xs text-muted-foreground">2026.07.18</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
              <div className="mt-5 divide-y divide-border/60">
                {c.body.map(([k, v]) => (
                  <div key={k} className="py-3 grid grid-cols-[80px_1fr] gap-3">
                    <div className="text-xs font-bold text-foreground/60 pt-0.5">{k}</div>
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
    { t: "프로다운 브랜딩", d: "리포트 하나만으로도 ‘관리해주는 코치’라는 인상을 남깁니다." },
    { t: "회원 데이터 축적", d: "회원별 진도와 피드백이 자동으로 쌓여 다음 레슨 준비가 쉬워집니다." },
  ];
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl">
          회원은 <span className="text-primary">더 오래</span> 다니고,
          <br />
          코치는 더 전문적으로 성장합니다.
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {items.map((i) => (
            <div
              key={i.t}
              className="rounded-2xl bg-card border border-border/60 p-7 hover:shadow-[0_20px_40px_-24px_rgba(62,43,34,0.25)] transition-shadow"
            >
              <h3 className="text-lg font-bold">{i.t}</h3>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const COACH_APP_URL = "https://apps.apple.com/kr/app/kerri/id6783224934";
const MEMBER_APP_URL = "https://apps.apple.com/kr/app/kerri-member/id6783235236";

function StoreButtons({ appStoreUrl }: { appStoreUrl: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-[var(--ink)] text-white px-4 py-2.5 text-xs font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <span className="opacity-70">Download on the</span>
        <span className="font-bold">App Store</span>
      </a>
      <div
        aria-disabled="true"
        className="rounded-lg border border-border bg-muted text-foreground/50 px-4 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-not-allowed"
      >
        <span className="opacity-70">준비 중</span>
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
      className="hidden md:grid place-items-center h-20 w-20 rounded-lg bg-white border border-border overflow-hidden"
    >
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&data=${encodeURIComponent(url)}`}
        alt={`${label} App Store 다운로드 QR 코드`}
        width={80}
        height={80}
        loading="lazy"
        className="h-20 w-20"
      />
    </a>
  );
}


function AppSection() {
  return (
    <section id="install" className="py-20 lg:py-28 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            코치와 회원,
            <br />
            <span className="text-primary">모두를 위한</span> 레슨 플랫폼
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 rounded-3xl bg-background border border-border/60 p-7 sm:p-10 shadow-[0_20px_50px_-30px_rgba(62,43,34,0.35)]">
            <div className="text-xs font-bold text-primary uppercase tracking-widest">추천</div>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold">KERRI Coach</h3>
            <p className="mt-4 text-sm sm:text-base text-foreground/75 leading-relaxed">
              회원 관리 · 레슨 일정 · 결제 관리 · AI 레슨 리포트.
              <br />
              레슨 운영을 하나로.
            </p>
            <div className="mt-7 flex items-center gap-4 flex-wrap">
              <StoreButtons appStoreUrl={COACH_APP_URL} />
              <QR url={COACH_APP_URL} label="KERRI Coach" />
            </div>
          </div>
          <div className="md:col-span-2 rounded-3xl bg-background border border-border/60 p-7 sm:p-10">
            <div className="text-xs font-bold text-foreground/60 uppercase tracking-widest">회원용</div>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold">KERRI Member</h3>
            <p className="mt-4 text-sm text-foreground/75 leading-relaxed">
              오늘의 레슨 · AI 리포트 · 성장 기록 · 남은 횟수 확인.
              <br />
              내 레슨을 한곳에서.
            </p>
            <div className="mt-7 flex items-center gap-4 flex-wrap">
              <StoreButtons appStoreUrl={MEMBER_APP_URL} />
              <QR url={MEMBER_APP_URL} label="KERRI Member" />
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
    <section id="pricing" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            부담 없이 시작하고,
            <br />
            <span className="text-primary">필요한 만큼</span> 사용하세요.
          </h2>
        </div>

        <div className="mt-10 rounded-2xl bg-primary/10 border border-primary/25 px-5 sm:px-7 py-5 flex flex-wrap items-center gap-4">
          <div className="text-xs font-bold text-primary bg-background rounded-full px-3 py-1">6개월 선결제</div>
          <div className="text-base sm:text-lg font-bold text-foreground">99,000원</div>
          <div className="text-sm text-foreground/75">클립형 녹음기 제공 <span className="text-muted-foreground">(6개월 이용 완료 시 무상)</span></div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-7 sm:p-8 border transition-all ${
                p.highlight
                  ? "bg-background border-primary shadow-[0_25px_60px_-25px_rgba(192,117,90,0.5)] md:scale-[1.04]"
                  : "bg-card border-border/60"
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
                  {p.badge}
                </div>
              )}
              <div className="text-xs font-bold text-primary tracking-widest">{p.name}</div>
              <div className="mt-3 text-3xl font-extrabold">{p.price}</div>
              <div className="mt-6 border-t border-border/60 pt-6 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-foreground/70">AI 리포트</span>
                  <span className="text-base font-bold text-foreground">{p.reports}</span>
                </div>
                {p.note && <p className="text-xs text-muted-foreground mt-3">{p.note}</p>}
              </div>
              <button
                onClick={() => scrollTo("install")}
                className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition-colors ${
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:bg-[var(--clay-dark)]"
                    : "bg-foreground/[0.06] text-foreground hover:bg-foreground/10"
                }`}
              >
                시작하기
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-foreground/70 leading-relaxed">
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
    <section id="faq" className="py-20 lg:py-28 bg-[var(--cream)]">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
          자주 묻는 <span className="text-primary">질문</span>
        </h2>
        <div className="mt-10 divide-y divide-border rounded-2xl bg-background border border-border/60">
          {items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <div key={it.q}>
                <button
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-foreground/[0.02] transition-colors"
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  <span className="text-base sm:text-lg font-bold text-foreground">{it.q}</span>
                  <span
                    className={`shrink-0 mt-1 h-6 w-6 rounded-full bg-primary/10 text-primary grid place-items-center font-bold transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 -mt-1 text-sm text-foreground/75 leading-relaxed whitespace-pre-line">
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
      className="py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(140deg, #C0755A 0%, #A55E45 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center text-[var(--cream)]">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
          회원 관리부터 AI 레슨 리포트까지.
          <br />
          케리 하나면 충분합니다.
        </h2>
        <p className="mt-6 text-base sm:text-lg opacity-90 leading-relaxed">
          코치는 레슨에만 집중하고,
          <br className="sm:hidden" />
          운영은 KERRI가 관리합니다.
        </p>
        <button
          onClick={() => scrollTo("install")}
          className="mt-9 rounded-full bg-[var(--cream)] text-[var(--ink)] px-8 py-4 font-bold hover:-translate-y-0.5 transition-transform shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)]"
        >
          코치앱 설치하기
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-14 bg-background">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 grid md:grid-cols-3 gap-10">
        <div>
          <div className="text-xl font-extrabold tracking-tight" style={{ letterSpacing: "-0.04em" }}>
            KERRI
          </div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            스포츠 강사를 위한 운영 플랫폼.
          </p>
          <div className="mt-5">
            <StoreButtons appStoreUrl={COACH_APP_URL} />
          </div>
        </div>
        <div className="text-sm text-foreground/70 space-y-1.5">
          <div><span className="text-muted-foreground">회사명</span> · KERRI</div>
          <div><span className="text-muted-foreground">대표자</span> · —</div>
          <div><span className="text-muted-foreground">사업자등록번호</span> · —</div>
          <div><span className="text-muted-foreground">연락처</span> · —</div>
        </div>
        <div className="text-sm">
          <div className="font-bold text-foreground">정책</div>
          <ul className="mt-3 space-y-2 text-foreground/70">
            <li><a href="#" className="hover:text-primary">이용약관</a></li>
            <li><a href="#" className="hover:text-primary">개인정보처리방침</a></li>
            <li><a href="#" className="hover:text-primary">환불정책</a></li>
            <li><Link to="/account-deletion" className="hover:text-primary">계정 및 데이터 삭제 요청</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 lg:px-8 mt-10 pt-6 border-t border-border/60 text-xs text-muted-foreground">
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
