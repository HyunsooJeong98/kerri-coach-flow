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
          "케리 요금제 안내. 무료로 시작해 AI 레슨 기록 사용량에 맞춰 Basic·Pro 플랜을 선택하세요. 첫 100명의 창립 코치에게 12개월 출시가를 보장합니다.",
      },
      { property: "og:title", content: "요금제 | 케리 KERRI" },
      {
        property: "og:description",
        content: "부담 없이 시작하고, 더 체계적인 코칭을 완성하세요. 창립 코치 출시가와 AI 레슨 기록 제공량을 확인하세요.",
      },
      { property: "og:url", content: "https://kerri.co.kr/pricing" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "요금제 | 케리 KERRI" },
      {
        name: "twitter:description",
        content: "부담 없이 시작하고, 더 체계적인 코칭을 완성하세요. 창립 코치 출시가와 AI 레슨 기록 제공량을 확인하세요.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kerri.co.kr/pricing" }],
  }),
  component: PricingPage,
});

/* ── 가격 데이터 (단일 소스) ───────────────────────────────── */

const PRICING = {
  free: {
    name: "Free",
    desc: "기본 회원 관리를 가볍게 시작해 보세요.",
    monthly: 0,
    yearly: 0,
    features: ["회원 3명까지 등록", "일정·출석·횟수·결제 관리", "AI 레슨 기록 월 3개"],
    cta: "무료로 시작하기",
  },
  basic: {
    name: "Basic",
    desc: "회원 관리와 기본 AI 분석이 필요한 코치",
    monthlyList: 19000,
    monthly: 9900,
    yearlyList: 217000,
    yearly: 113000,
    monthlyEquiv: 9417,
    launchDiscount: 48,
    features: [
      "회원 무제한 등록",
      "일정·출석·횟수·결제 관리",
      "회원 관리 자동 알림",
      "AI 레슨 기록 월 10개",
      "AI 맞춤 코칭 분석 기본 제공",
    ],
    cta: "Basic 시작하기",
  },
  pro: {
    name: "Pro",
    desc: "AI 분석을 적극적으로 활용하는 전문 코치",
    monthlyList: 39000,
    monthly: 19000,
    yearlyList: 445000,
    yearly: 217000,
    monthlyEquiv: 18083,
    launchDiscount: 51,
    features: [
      "Basic의 모든 기능",
      "AI 레슨 기록 월 100개",
      "AI 맞춤 코칭 분석 상세 제공",
      "회원별 반복 이슈 키워드 분석",
      "개인화 AI·코치 브랜딩",
    ],
    cta: "Pro 시작하기",
  },
  annualExtraDiscount: 5,
} as const;

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

const COMPARE_ROWS: {
  label: string;
  note?: string;
  free: string;
  basic: string;
  pro: string;
}[] = [
  { label: "월간 출시가", free: "무료", basic: won(PRICING.basic.monthly), pro: won(PRICING.pro.monthly) },
  { label: "연간 출시가", free: "없음", basic: won(PRICING.basic.yearly), pro: won(PRICING.pro.yearly) },
  { label: "회원 등록", free: "3명", basic: "무제한", pro: "무제한" },
  { label: "회원 운영 관리", free: "기본", basic: "전체", pro: "전체" },
  {
    label: "회원 관리 자동 알림",
    note: "미납·재등록·레슨 일정을 놓치지 않게 알려드려요",
    free: "제외",
    basic: "제공",
    pro: "제공",
  },
  { label: "AI 레슨 기록", free: "월 3개", basic: "월 10개", pro: "월 100개" },
  {
    label: "AI 맞춤 코칭 분석",
    note: "회원별 훈련 플랜과 반복되는 문제를 분석해요",
    free: "제외",
    basic: "기본",
    pro: "상세",
  },
  { label: "개인화 AI·코치 브랜딩", free: "제외", basic: "제외", pro: "제공" },
];

const FOUNDER_BENEFITS = [
  "첫 결제일부터 12개월 동안 출시가 보장",
  "Basic 정가 대비 48% 할인",
  "Pro 정가 대비 51% 할인",
  "연간 결제 시 약 5% 추가 할인",
  "초기 회원 데이터 설정 및 온보딩 지원",
  "창립 코치 전용 배지",
  "신규 기능 우선 체험",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "출시가는 누구에게 적용되나요?",
    a: "선착순 100명의 첫 유료 구독자에게 적용됩니다.",
  },
  {
    q: "출시가 적용 기간은 언제 시작되나요?",
    a: "첫 유료 구독 결제일부터 시작되며 12개월 동안 적용됩니다.",
  },
  {
    q: "12개월 후에는 가격이 어떻게 되나요?",
    a: "출시가 적용 기간이 종료되면 Basic 월 19,000원, Pro 월 39,000원의 정가가 적용됩니다. 연간 구독은 갱신 전에 적용 가격을 안내합니다.",
  },
  {
    q: "연간 구독은 얼마나 할인되나요?",
    a: "월간 구독을 12개월 이용하는 금액보다 약 5% 저렴합니다.",
  },
  {
    q: "출시가 적용 기간에 플랜을 변경할 수 있나요?",
    a: "출시가 적용 기간에 Basic과 Pro를 변경해도 남아 있는 출시가 적용 기간은 유지됩니다.",
  },
  {
    q: "구독을 해지하면 출시가 혜택이 유지되나요?",
    a: "구독을 해지하고 이용 기간이 종료되면 출시가 혜택도 종료됩니다. 이후 다시 가입하면 선착순 혜택이 적용되지 않을 수 있습니다.",
  },
  {
    q: "AI 레슨 기록 개수는 언제 초기화되나요?",
    a: "월간·연간 구독 모두 AI 레슨 기록 이용 개수는 구독 시작일을 기준으로 매월 초기화됩니다. 사용하지 않은 AI 레슨 기록 개수는 다음 달로 이월되지 않습니다.",
  },
  {
    q: "분석에 실패해도 이용 개수가 차감되나요?",
    a: "분석이 정상적으로 완료되지 않은 경우에는 이용 개수가 차감되지 않습니다.",
  },
  {
    q: "결제와 구독 취소는 어디에서 하나요?",
    a: "결제와 구독 관리는 App Store 또는 Google Play 계정에서 진행할 수 있습니다.",
  },
  {
    q: "표시된 가격에 부가세가 포함되어 있나요?",
    a: "페이지에 표시된 모든 가격은 부가세가 포함된 최종 결제금액입니다.",
  },
];

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const goSection = useSectionNav();

  const paidPlans = [
    { ...PRICING.basic, highlight: false, badge: undefined as string | undefined },
    { ...PRICING.pro, highlight: true, badge: "가장 인기" },
  ];

  return (
    <Section id="pricing" className="!pt-20 sm:!pt-24 lg:!pt-28">
      <Container>
        <Reveal>
          <h1 className="eyebrow">요금제</h1>
        </Reveal>
        <SectionHead
          title={
            <>
              부담 없이 시작하고,
              <br />
              <span className="text-primary">더 체계적인 코칭</span>을 완성하세요.
            </>
          }
          body="첫 100명의 창립 코치에게 첫 12개월 최대 51% 할인 혜택을 제공합니다."
        />

        {/* Billing toggle */}
        <Reveal delay={40}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
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
              약 5% 추가 할인
            </span>
          </div>
        </Reveal>

        {/* Founding coach banner */}
        <Reveal delay={60}>
          <div className="mt-14 flex flex-wrap items-center gap-5 rounded-[1.5rem] border border-primary/20 bg-primary/[0.06] px-7 py-6">
            <div className="rounded-full bg-card px-4 py-1.5 text-[0.75rem] font-bold text-primary">선착순 100명</div>
            <div className="text-[1.15rem] font-bold break-keep">첫 결제일부터 12개월 출시가 보장</div>
            <div className="text-[0.95rem] text-foreground/75 break-keep">Basic 48% · Pro 51% 할인</div>
          </div>
        </Reveal>

        {/* Plan cards */}
        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3">
          {/* Free */}
          <Reveal>
            <div className="surface surface-hover relative h-full rounded-[1.75rem] p-9 sm:p-10 transition-all duration-500">
              <div className="text-[0.75rem] font-bold tracking-[0.18em] text-primary">{PRICING.free.name}</div>
              <div className="mt-5 min-h-[6.4rem]">
                <div className="text-[2.1rem] font-extrabold tracking-tight">
                  무료
                  <span className="ml-1.5 text-[1rem] font-semibold text-muted-foreground">/월</span>
                </div>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground break-keep">
                  {PRICING.free.desc}
                </p>
              </div>
              <ul className="mt-8 space-y-3 border-t border-border/60 pt-8">
                {PRICING.free.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[0.95rem] leading-relaxed break-keep">
                    <span aria-hidden className="mt-[0.15rem] text-primary">·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => goSection("install")} className="btn-base btn-ghost mt-10 w-full !text-[0.95rem]">
                {PRICING.free.cta}
              </button>
            </div>
          </Reveal>

          {/* Basic / Pro */}
          {paidPlans.map((p, i) => (
            <Reveal key={p.name} delay={(i + 1) * 90}>
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

                <div className="mt-5 min-h-[6.4rem]">
                  {annual ? (
                    <div>
                      <div className="text-[0.9rem] font-medium text-muted-foreground line-through">
                        {won(p.yearlyList)}
                      </div>
                      <div className="text-[2.1rem] font-extrabold tracking-tight">
                        {won(p.yearly)}
                        <span className="ml-1.5 text-[1rem] font-semibold text-muted-foreground">/년</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="text-[0.9rem] text-muted-foreground">월 약 {won(p.monthlyEquiv)}</span>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.72rem] font-bold text-primary">
                          연간 결제 약 {PRICING.annualExtraDiscount}% 추가 할인
                        </span>
                      </div>
                      <p className="mt-2 text-[0.82rem] text-muted-foreground">12개월 이용권</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[0.9rem] font-medium text-muted-foreground line-through">
                        {won(p.monthlyList)}
                      </div>
                      <div className="text-[2.1rem] font-extrabold tracking-tight">
                        {won(p.monthly)}
                        <span className="ml-1.5 text-[1rem] font-semibold text-muted-foreground">/월</span>
                      </div>
                      <div className="mt-1">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.72rem] font-bold text-primary">
                          정가 대비 {p.launchDiscount}% 할인
                        </span>
                      </div>
                      <p className="mt-2 text-[0.82rem] text-muted-foreground">첫 결제일부터 12개월 적용</p>
                    </div>
                  )}
                </div>

                <p className="mt-6 text-[0.9rem] leading-relaxed text-muted-foreground break-keep">{p.desc}</p>

                <ul className="mt-6 space-y-3 border-t border-border/60 pt-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[0.95rem] leading-relaxed break-keep">
                      <span aria-hidden className="mt-[0.15rem] text-primary">·</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => goSection("install")}
                  className={`btn-base mt-10 w-full !text-[0.95rem] ${p.highlight ? "btn-primary" : "btn-ghost"}`}
                >
                  {p.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Comparison table */}
        <Reveal className="mt-24">
          <div className="surface overflow-hidden rounded-[1.75rem]">
            {/* Desktop */}
            <div className="hidden md:block">
              <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] border-b border-border/60 px-8 py-5 text-[0.8rem] font-bold tracking-[0.08em] text-muted-foreground">
                <div>기능</div>
                <div className="text-center">Free</div>
                <div className="text-center">Basic</div>
                <div className="text-center text-primary">Pro</div>
              </div>
              {COMPARE_ROWS.map((r) => (
                <div
                  key={r.label}
                  className="grid grid-cols-[1.6fr_repeat(3,1fr)] items-center border-b border-border/40 px-8 py-5 last:border-b-0"
                >
                  <div>
                    <div className="text-[0.95rem] font-semibold break-keep">{r.label}</div>
                    {r.note && (
                      <div className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground break-keep">{r.note}</div>
                    )}
                  </div>
                  <div className="text-center text-[0.95rem] text-foreground/75">{r.free}</div>
                  <div className="text-center text-[0.95rem] text-foreground/85">{r.basic}</div>
                  <div className="text-center text-[0.95rem] font-bold text-primary">{r.pro}</div>
                </div>
              ))}
            </div>
            {/* Mobile */}
            <div className="md:hidden">
              {COMPARE_ROWS.map((r) => (
                <div key={r.label} className="border-b border-border/40 px-6 py-5 last:border-b-0">
                  <div className="text-[0.95rem] font-semibold break-keep">{r.label}</div>
                  {r.note && (
                    <div className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground break-keep">{r.note}</div>
                  )}
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    {[
                      { k: "Free", v: r.free, cls: "text-foreground/75" },
                      { k: "Basic", v: r.basic, cls: "text-foreground/85" },
                      { k: "Pro", v: r.pro, cls: "font-bold text-primary" },
                    ].map((c) => (
                      <div key={c.k} className="rounded-xl bg-muted/40 px-2 py-2.5">
                        <div className="text-[0.7rem] font-bold tracking-[0.06em] text-muted-foreground">{c.k}</div>
                        <div className={`mt-1 text-[0.88rem] break-keep ${c.cls}`}>{c.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Founding coach benefits */}
        <Reveal className="mt-24">
          <div className="rounded-[1.75rem] border border-primary/20 bg-primary/[0.06] p-9 sm:p-10">
            <h2 className="text-[clamp(1.2rem,3.2vw,1.5rem)] font-extrabold tracking-tight break-keep">
              첫 100명의 창립 코치 혜택
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {FOUNDER_BENEFITS.map((b) => (
                <li key={b} className="flex gap-2.5 text-[0.95rem] leading-relaxed break-keep">
                  <span aria-hidden className="mt-[0.15rem] text-primary">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-[0.88rem] leading-relaxed text-muted-foreground break-keep">
              창립 코치 혜택은 선착순 100명의 첫 유료 구독자에게 적용됩니다. 무료 플랜 이용자는 유료 구독을 시작한 시점부터
              선착순 혜택 대상에 포함됩니다.
            </p>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal className="mt-24">
          <h2 className="text-[clamp(1.2rem,3.2vw,1.5rem)] font-extrabold tracking-tight">요금제 FAQ</h2>
          <div className="mt-7 divide-y divide-border/50 border-y border-border/50">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="grid w-full grid-cols-[1fr_auto] items-start gap-4 py-5 text-left"
                  >
                    <span className="text-[1rem] font-semibold break-keep">{f.q}</span>
                    <span
                      aria-hidden
                      className={`mt-1 text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 text-[0.95rem] leading-[1.85] text-muted-foreground break-keep">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Footnotes */}
        <Reveal className="mt-14">
          <p className="text-[0.82rem] leading-[1.9] text-muted-foreground break-keep">
            모든 요금은 부가세가 포함된 최종 결제금액입니다.
          </p>
          <ul className="mt-3 space-y-1.5 text-[0.82rem] leading-[1.9] text-muted-foreground break-keep">
            <li>창립 코치 출시가는 첫 결제일부터 12개월 동안 적용되며 이후 정가로 갱신됩니다.</li>
            <li>연간 구독은 월간 구독 12개월 금액보다 약 5% 할인됩니다.</li>
            <li>결제와 구독 관리는 App Store 또는 Google Play에서 진행됩니다.</li>
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
