import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadCards } from "@/components/landing/download";
import { Container, Footer, Nav, Reveal, Section, SectionHead, scrollTo } from "@/components/landing/shared";
import { ProductHero, ProductExperience, CompactProblems, ProductWorkflow, ConnectedExperience, ProductFeatures, CompactSurvey, CoachStories, RecentUpdates, TrialPricing } from "@/components/landing/HomeProduct";
import { PRICING, PRICING_FAQS } from "@/lib/pricing";
import heroPc from "@/assets/hero-pc.webp.asset.json";
import heroMobile from "@/assets/hero-mobile.webp.asset.json";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "스포츠 강사 회원관리·AI 레슨 기록 | 케리 KERRI" },
      { name: "description", content: "회원·일정·출석·레슨 횟수·결제 관리부터 AI 레슨 기록까지. 관리 시간을 줄이고 회원에게 코칭의 가치를 보여주세요. KERRI로 시작하세요." },
      { property: "og:title", content: "스포츠 강사 회원관리·AI 레슨 기록 | 케리 KERRI" },
      { property: "og:description", content: "회원·일정·출석·레슨 횟수·결제 관리부터 AI 레슨 기록까지. 관리 시간을 줄이고 회원에게 코칭의 가치를 보여주세요. KERRI로 시작하세요." },
      { property: "og:url", content: "https://kerri.co.kr/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "스포츠 강사 회원관리·AI 레슨 기록 | 케리 KERRI" },
      { name: "twitter:description", content: "회원·일정·출석·레슨 횟수·결제 관리부터 AI 레슨 기록까지. 관리 시간을 줄이고 회원에게 코칭의 가치를 보여주세요. KERRI로 시작하세요." },
    ],
    links: [
      { rel: "canonical", href: "https://kerri.co.kr/" },
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



function FAQ() {
  const originalItems = [
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
  const items = [
    originalItems[5],
    { q: "회원은 몇 명까지 등록할 수 있나요?", a: `Free는 ${PRICING.free.features[0]}, Basic·Pro는 회원을 무제한으로 등록할 수 있습니다.` },
    originalItems[0],
    originalItems[1],
    originalItems[3],
    ...PRICING_FAQS.filter((item) => ["결제나 환불은 어디에서 처리되나요?", "구독은 언제든지 취소할 수 있나요?"].includes(item.q)),
    { q: "개인정보와 데이터 삭제 안내는 어디에서 확인하나요?", a: <><Link to="/privacy" search={{ service: "coach" }} className="text-primary underline underline-offset-4">개인정보처리방침</Link>과 <Link to="/account-deletion" className="text-primary underline underline-offset-4">계정 및 데이터 삭제 안내</Link>에서 확인할 수 있습니다.</> },
    originalItems[4],
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));
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
          <div className="mt-8 divide-y divide-border border-y border-border">
            {items.map((it, idx) => {
              const isOpen = open === idx;
              return (
                <div key={it.q}>
                  <Button variant="ghost" aria-expanded={isOpen} aria-controls={`faq-answer-${idx}`}
                    className="grid h-auto w-full whitespace-normal rounded-none grid-cols-[minmax(0,1fr)_auto] items-start gap-4 px-[clamp(1.25rem,4.8vw,1.75rem)] py-6 text-left transition-colors duration-200 hover:bg-foreground/[0.015] sm:py-7"
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
                  </Button>
                  {isOpen && (
                    <div id={`faq-answer-${idx}`} className="body-2 -mt-1 break-keep px-[clamp(1.25rem,4.8vw,1.75rem)] pb-7 text-muted-foreground">
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

function FinalCTA() {
  return <section id="cta" className="bg-clay py-14 text-primary-foreground sm:py-20"><Container className="text-center"><Reveal>
    <h2 className="display-2 mx-auto max-w-3xl">잘 가르치는 강사를 넘어<br /><span className="font-extrabold">회원이 잊지 못하는 강사로</span></h2>
    <p className="mt-5 text-base leading-relaxed text-primary-foreground/85">KERRI와 함께<br />회원의 레슨 경험까지 관리해보세요</p>
    <div className="mt-7 flex flex-wrap justify-center gap-3"><Button variant="secondary" onClick={() => scrollTo("install")} className="btn-base btn-light h-auto rounded-lg whitespace-normal">14일 무료로 시작하기<ArrowRight /></Button><Button variant="ghost" asChild className="btn-base h-auto rounded-lg text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/pricing">요금제 보기</Link></Button></div>
  </Reveal></Container></section>;
}

function StickyMobileCTA() {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const sections = document.querySelectorAll("#top, #product, #workflow, #coach-member, #features, #install, #cta, footer");
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
      }
      setHidden(visible.size > 0);
    });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  if (hidden) return null;
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"><Button onClick={() => scrollTo("install")} className="btn-base btn-primary h-auto w-full rounded-lg">14일 무료로 시작하기<ArrowRight /></Button></div>;
}

function Landing() {
  return <div className="home-refined min-h-screen bg-background text-foreground"><Nav /><main><ProductHero /><ProductExperience /><CompactProblems /><ProductWorkflow /><ConnectedExperience /><ProductFeatures /><Impact /><CoachStories /><CompactSurvey /><RecentUpdates /><TrialPricing /><AppSection /><FAQ /><FinalCTA /></main><Footer /><StickyMobileCTA /></div>;
}
