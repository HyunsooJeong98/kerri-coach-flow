import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Container, Footer, Nav, Reveal, scrollTo } from "@/components/landing/shared";
import { AppScreen, InfoChip, type MemberScreenKey } from "@/components/member/AppScreen";

export const Route = createFileRoute("/member")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "회원앱 | 케리 KERRI Member 레슨 기록·성장 기록 앱" },
      {
        name: "description",
        content:
          "KERRI Member에서 회원은 오늘 배운 내용, AI 레슨 기록, 성장 기록, 다음 레슨 일정과 남은 횟수, 코치와의 대화를 한곳에서 확인해요.",
      },
      { property: "og:title", content: "회원앱 | 케리 KERRI Member" },
      {
        property: "og:description",
        content: "레슨이 끝난 뒤에도 오늘의 코칭은 남아요. 레슨 기록부터 성장 과정까지 이어지는 KERRI Member.",
      },
      { property: "og:url", content: "https://kerri.co.kr/member" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "회원앱 | 케리 KERRI Member" },
      {
        name: "twitter:description",
        content: "레슨이 끝난 뒤에도 오늘의 코칭은 남아요. 레슨 기록부터 성장 과정까지 이어지는 KERRI Member.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kerri.co.kr/member" }],
  }),
  component: MemberPage,
});

const MEMBER_APP_URL = "https://apps.apple.com/kr/app/kerri-member/id6783235236";
const MEMBER_PLAY_URL = "https://play.google.com/store/apps/details?id=com.kerri.memberapp";

function useInView<T extends HTMLElement>(margin = "0px 0px -20% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setInView(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return { ref, inView };
}

function Heading({ eyebrow, title, body, center }: { eyebrow: string; title: ReactNode; body: ReactNode; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-2 mt-4 text-foreground">{title}</h2>
      <p className="lead mt-5">{body}</p>
    </Reveal>
  );
}

/* ── 01 HERO ─────────────────────────────── */
function Hero() {
  return (
    <section className="warm-glow noise overflow-hidden pb-16 pt-10 sm:pb-24 lg:pb-28 lg:pt-16">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_44%] lg:gap-16">
        <Reveal>
          <p className="eyebrow">KERRI Member</p>
          <h1 className="hero-display mt-5 text-foreground">
            레슨이 끝난 뒤에도
            <br />
            <span className="text-primary">오늘의 코칭</span>은 남아요
          </h1>
          <p className="lead mt-6 max-w-lg">
            오늘 배운 내용부터 다음 레슨 일정
            <br className="hidden sm:block" /> 남은 횟수와 성장 기록까지 한곳에서 확인해요
          </p>
          <button onClick={() => scrollTo("member-start")} className="btn-base btn-primary mt-9">
            KERRI Member 시작하기
          </button>
        </Reveal>
        <Reveal delay={100} className="relative mx-auto w-[86%] max-w-[340px] sm:w-[62%] lg:w-full">
          <AppScreen screen="home" priority />
          <InfoChip label="오늘의 레슨" value="포핸드 타점 교정" className="absolute -left-[14%] top-[14%] hidden sm:block" />
          <InfoChip label="남은 레슨" value="4회" className="absolute -right-[10%] top-[32%]" />
          <InfoChip label="다음 레슨" value="11.24" className="absolute -left-[10%] top-[56%]" />
          <InfoChip label="포핸드" value="+1" className="absolute -right-[8%] bottom-[14%] hidden sm:block" />
        </Reveal>
      </Container>
    </section>
  );
}

/* ── 02~04 STORY (PC sticky / mobile stacked) ── */
const GROWTH = [
  { k: "포핸드", a: 6, b: 7 },
  { k: "풋워크", a: 5, b: 6 },
  { k: "서브", a: 6, b: 6 },
];

function GrowthBars() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="mt-8 space-y-4 rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-soft)]">
      {GROWTH.map((g) => (
        <div key={g.k}>
          <div className="flex justify-between text-sm font-semibold">
            <span>{g.k}</span>
            <span className="text-foreground/70">
              {g.a} → <span className={g.b > g.a ? "text-primary" : ""}>{g.b}</span>
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full origin-left rounded-full bg-primary transition-transform duration-[900ms] ease-out motion-reduce:transition-none"
              style={{ transform: `scaleX(${(inView ? g.b : g.a) / 10})` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const STEPS: {
  screen: MemberScreenKey;
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  extra: ReactNode;
}[] = [
  {
    screen: "report",
    eyebrow: "AI 레슨 기록",
    title: (<>오늘 배운 내용<br />잊기 전에 다시 한번</>),
    body: (<>레슨에서 배운 핵심 내용과 교정 포인트를 정리해<br className="hidden sm:block" /> 언제든 다시 꺼내볼 수 있어요</>),
    extra: (
      <ol className="mt-8 space-y-3 text-[0.95rem] font-semibold text-foreground/75">
        {["오늘의 요약", "잘한 점", "교정 포인트", "개인 맞춤 연습", "다음 레슨 목표"].map((t, i) => (
          <li key={t} className="flex items-center gap-3">
            <span className="text-xs font-bold text-primary">0{i + 1}</span>
            {t}
          </li>
        ))}
      </ol>
    ),
  },
  {
    screen: "growth",
    eyebrow: "성장 기록",
    title: (<>쌓이는 레슨만큼<br />달라지는 모습도 보여요</>),
    body: (<>매번 남겨진 레슨 기록을 바탕으로<br className="hidden sm:block" /> 어떤 부분이 좋아지고 있는지 확인해요</>),
    extra: <GrowthBars />,
  },
  {
    screen: "schedule",
    eyebrow: "레슨 관리",
    title: (<>내 레슨<br />이제 물어보지 않아도 돼요</>),
    body: (<>다음 레슨은 언제인지, 몇 회가 남았는지<br className="hidden sm:block" /> 필요할 때 바로 확인해요</>),
    extra: (
      <div className="mt-8 flex flex-wrap gap-3">
        <InfoChip label="다음 레슨" value="11월 24일 19:00" className="!shadow-[var(--shadow-soft)]" />
        <InfoChip label="남은 횟수" value="4회" className="!shadow-[var(--shadow-soft)]" />
        <InfoChip label="레슨 알림" value="하루 전 · 1시간 전" className="!shadow-[var(--shadow-soft)]" />
      </div>
    ),
  },
];

function Story() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-background py-16 sm:py-24 lg:py-12">
      <Container className="lg:grid lg:grid-cols-[1fr_40%] lg:gap-20">
        <div>
          {STEPS.map((s, i) => (
            <div
              key={s.eyebrow}
              data-step={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={`lg:flex lg:min-h-[88vh] lg:flex-col lg:justify-center ${i > 0 ? "mt-24 sm:mt-32 lg:mt-0" : ""}`}
            >
              <Heading eyebrow={s.eyebrow} title={s.title} body={s.body} />
              <Reveal delay={80} className="mx-auto mt-10 w-[88%] max-w-[360px] lg:hidden">
                <AppScreen screen={s.screen} />
              </Reveal>
              <Reveal delay={120}>{s.extra}</Reveal>
            </div>
          ))}
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-[calc(50vh-min(40vh,330px))] mx-auto w-full max-w-[330px]">
            <div className="relative aspect-[9/19.5]">
              {STEPS.map((s, i) => (
                <div
                  key={s.screen}
                  aria-hidden={i !== active}
                  className="absolute inset-0 transition-all duration-[600ms] ease-out motion-reduce:transition-none"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "none" : `translateY(${i < active ? -16 : 16}px) scale(0.98)`,
                  }}
                >
                  <AppScreen screen={s.screen} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── 05 COACH CONNECTION ─────────────────── */
function Connection() {
  return (
    <section className="cream-band py-16 sm:py-24 lg:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[40%_1fr] lg:gap-20">
        <Reveal className="relative order-2 mx-auto w-[88%] max-w-[340px] lg:order-1 lg:w-full">
          <AppScreen screen="message" />
          <div className="absolute -right-[8%] top-[18%] max-w-[72%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 text-[0.85rem] font-medium leading-relaxed text-primary-foreground shadow-[var(--shadow-lift)]">
            오늘 포핸드는 타점이 많이 안정됐어요
          </div>
          <div className="absolute -left-[8%] top-[34%] max-w-[72%] rounded-2xl rounded-tl-md border border-border/70 bg-card px-4 py-3 text-[0.85rem] font-medium leading-relaxed shadow-[var(--shadow-lift)]">
            다음 시간까지 스플릿스텝만 신경 써주세요
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <Heading
            eyebrow="코치와 연결"
            title={(<>레슨이 끝나도<br />코치와 자연스럽게 이어져요</>)}
            body={(<>레슨 피드백부터 일정 안내까지<br className="hidden sm:block" /> 코치와 나눈 이야기를 한곳에 모아봐요</>)}
          />
          <Reveal delay={120} className="mt-8 flex flex-wrap gap-2.5">
            {["레슨 리포트 도착", "다음 레슨 안내", "보강 요청"].map((t) => (
              <span key={t} className="rounded-full border border-border/80 bg-card px-4 py-2 text-sm font-semibold text-foreground/75">
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ── 06 COACH PROFILE ────────────────────── */
function Profile() {
  return (
    <section className="bg-background py-16 sm:py-24 lg:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_40%] lg:gap-20">
        <div>
          <Heading
            eyebrow="코치 프로필"
            title={(<>나를 가르치는 코치를<br />더 잘 알 수 있어요</>)}
            body={(<>코치의 소개와 경력<br className="hidden sm:block" /> 레슨 정보와 리뷰를 한눈에 확인해요</>)}
          />
          <Reveal delay={120}>
            <p className="mt-10 border-l-2 border-primary pl-4 text-[1.05rem] font-semibold leading-relaxed text-foreground/80">
              좋은 레슨 경험이
              <br />
              좋은 코치의 브랜드가 돼요
            </p>
          </Reveal>
        </div>
        <Reveal delay={80} className="mx-auto w-[88%] max-w-[340px] lg:w-full">
          <AppScreen screen="profile" />
        </Reveal>
      </Container>
    </section>
  );
}

/* ── 07 BEFORE / AFTER ───────────────────── */
function Compare() {
  const before = ["일정 다시 물어보기", "남은 횟수 물어보기", "지난 레슨 내용은 기억에 의존", "레슨이 끝나면 피드백도 사라짐", "성장 과정 확인이 어려움"];
  const after = ["일정 직접 확인", "남은 횟수 바로 확인", "매번 레슨 기록이 쌓임", "개인 연습 내용 다시 확인", "성장 과정을 계속 확인"];
  return (
    <section className="cream-band py-16 sm:py-24 lg:py-32">
      <Container>
        <Heading
          center
          eyebrow="레슨 경험"
          title={(<>같은 레슨도<br />경험은 달라질 수 있어요</>)}
          body={(<>레슨 일정부터 오늘 배운 내용과 성장 과정까지<br className="hidden sm:block" /> 흩어지지 않고 하나의 기록으로 이어져요</>)}
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal className="rounded-[1.5rem] bg-muted/70 p-7 sm:p-9">
            <p className="text-sm font-bold tracking-[0.14em] text-muted-foreground">BEFORE</p>
            <ul className="mt-6 space-y-4 text-[0.975rem] text-foreground/55">
              {before.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={100} className="rounded-[1.5rem] border border-primary/25 bg-card p-7 shadow-[var(--shadow-lift)] sm:p-9">
            <p className="text-sm font-bold tracking-[0.14em] text-primary">WITH KERRI</p>
            <ul className="mt-6 space-y-4 text-[0.975rem] font-semibold text-foreground">
              {after.map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ── 08 FINAL CTA ────────────────────────── */
function FinalCta() {
  const store = "inline-flex items-center gap-2 rounded-[0.95rem] border border-border bg-card px-5 py-3 text-[0.85rem] font-semibold text-foreground transition-transform duration-300 hover:-translate-y-0.5";
  return (
    <section id="member-start" className="bg-background py-20 sm:py-28 lg:py-36">
      <Container className="text-center">
        <Reveal>
          <h2 className="display-2 text-foreground">
            좋은 레슨이
            <br />
            <span className="text-primary">좋은 기억</span>으로 남도록
          </h2>
          <p className="lead mx-auto mt-5 max-w-md">레슨이 끝난 뒤의 경험까지 KERRI가 자연스럽게 이어드려요</p>
          <Link to="/download" className="btn-base btn-primary mt-9">
            KERRI 시작하기
          </Link>
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-16 max-w-md rounded-[1.5rem] bg-[var(--cream)] p-7">
          <p className="text-sm font-bold text-foreground">회원이신가요?</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            코치에게 받은 초대코드로 KERRI Member를 시작하세요
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            <a href={MEMBER_APP_URL} target="_blank" rel="noopener noreferrer" className={store}>App Store</a>
            <a href={MEMBER_PLAY_URL} target="_blank" rel="noopener noreferrer" className={store}>Google Play</a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function MemberPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Story />
        <Connection />
        <Profile />
        <Compare />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
