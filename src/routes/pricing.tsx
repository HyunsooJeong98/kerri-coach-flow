import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Container,
  Footer,
  Nav,
  Reveal,
  Section,
  SectionHead,
  useSectionNav,
} from "@/components/landing/shared";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "요금제 | 케리 KERRI 스포츠 강사 운영 플랫폼" },
      {
        name: "description",
        content:
          "케리 요금제 안내. 무료로 시작해 AI 레슨 리포트 사용량에 맞춰 BASIC·PRO 플랜을 선택하세요. 연간 결제 시 2개월 무료.",
      },
      { property: "og:title", content: "요금제 | 케리 KERRI" },
      {
        property: "og:description",
        content: "무료로 시작하고 필요한 만큼 사용하세요. 월간·연간 요금제와 AI 리포트 제공량을 확인하세요.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "요금제 | 케리 KERRI" },
      {
        name: "twitter:description",
        content: "무료로 시작하고 필요한 만큼 사용하세요. 월간·연간 요금제와 AI 리포트 제공량을 확인하세요.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

function Pricing() {
  const [annual, setAnnual] = useState(false);
  const goSection = useSectionNav();

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
    <Section id="pricing" className="!pt-20 sm:!pt-24 lg:!pt-28">
      <Container>
        <Reveal>
          <h1 className="eyebrow">Pricing</h1>
        </Reveal>
        <SectionHead
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
                    onClick={() => goSection("install")}
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
