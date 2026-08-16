import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Container,
  Footer,
  Nav,
  Reveal,
  Section,
  SectionHead,
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
    cta: "14일 무료로 시작하기",
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
      "AI 레슨 기록 월 50개",
      "AI 맞춤 코칭 분석 상세 제공",
      "회원별 반복 이슈 키워드 분석",
      "개인화 AI·코치 브랜딩",
    ],
    cta: "14일 무료로 시작하기",
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
  { label: "AI 레슨 기록", free: "월 3개", basic: "월 10개", pro: "월 50개" },
  { label: "14일 무료 체험", free: "제외", basic: "제공", pro: "제공" },
  {
    label: "AI 레슨 기록 충전권",
    note: "10회 충전 · 4,900원 · 1회 결제",
    free: "구매 불가",
    basic: "구매 가능",
    pro: "구매 가능",
  },
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

const TOPUP = {
  title: "AI 레슨 기록이 더 필요하다면",
  price: "10회 충전 · 4,900원",
  desc: "월 기본 제공량을 모두 사용해도 필요한 만큼 추가할 수 있습니다.",
  notes: ["Basic / Pro 이용자만 구매 가능", "1회 결제 · 자동결제 없음", "충전한 횟수는 월이 바뀌어도 사라지지 않음"],
};

const TRIAL_NOTE = "무료 체험 후 선택한 요금제로 전환됩니다. 유료 전환 전 필요한 동의 절차가 진행됩니다.";

const FAQS: { q: string; a: string }[] = [
  {
    q: "14일 무료 체험은 어떻게 이용하나요?",
    a: "Basic 또는 Pro 플랜을 선택하면 대상 이용자는 14일 동안 무료로 체험할 수 있습니다. 무료 체험 조건과 이용 가능 여부는 결제 화면에서 확인할 수 있습니다.",
  },
  {
    q: "무료 체험이 끝나면 바로 결제되나요?",
    a: "유료 전환에 필요한 동의가 완료된 경우 14일 무료 체험 종료 후 선택한 Basic 또는 Pro 플랜으로 전환되어 결제가 진행됩니다. 필요한 동의를 하지 않은 경우에는 유료 요금이 청구되지 않으며 구독이 종료될 수 있습니다.",
  },
  {
    q: "무료 체험 중에도 취소할 수 있나요?",
    a: "네. 무료 체험 종료 전에 언제든지 Apple App Store 또는 Google Play의 구독 관리 화면에서 취소할 수 있습니다.",
  },
  {
    q: "AI 레슨 기록은 몇 개까지 만들 수 있나요?",
    a: "매월 Free는 3개, Basic은 10개, Pro는 50개의 AI 레슨 기록을 만들 수 있습니다. 월 기본 제공량은 매월 초기화되며 사용하지 않은 기본 제공량은 다음 달로 이월되지 않습니다.",
  },
  {
    q: "AI 레슨 기록을 모두 사용하면 어떻게 하나요?",
    a: "Basic 또는 Pro 이용자는 AI 레슨 기록 10회 충전권을 4,900원에 추가 구매할 수 있습니다. 충전권은 1회 결제 상품이며 자동으로 다시 결제되지 않습니다.",
  },
  {
    q: "충전한 AI 레슨 기록도 매달 사라지나요?",
    a: "아니요. 월 요금제에서 기본으로 제공되는 AI 레슨 기록과 달리, 별도로 충전한 횟수는 월이 바뀌어도 초기화되지 않고 소진할 때까지 보관됩니다.",
  },
  {
    q: "구독을 해지하면 충전한 횟수는 없어지나요?",
    a: "아니요. 남은 충전 횟수는 계정에 보관됩니다. 다만 Basic 또는 Pro 구독이 종료된 동안에는 사용할 수 없으며, 같은 계정으로 다시 구독하면 남은 횟수를 이어서 사용할 수 있습니다.",
  },
  {
    q: "Basic과 Pro의 가장 큰 차이는 무엇인가요?",
    a: "핵심 기능은 동일하게 사용할 수 있으며, 가장 큰 차이는 AI 레슨 기록 제공량과 Pro 전용 기능입니다. 각 플랜에 포함된 기능은 위 요금제 비교표에서 확인할 수 있습니다.",
  },
  {
    q: "월간 구독과 연간 구독의 차이는 무엇인가요?",
    a: "이용 가능한 플랜 기능은 동일합니다. 연간 구독은 1년 단위로 결제하며 월간 구독을 12개월 이용하는 것보다 할인된 가격으로 이용할 수 있습니다.",
  },
  {
    q: "구독은 언제든지 취소할 수 있나요?",
    a: "네. Apple App Store 또는 Google Play의 구독 관리 화면에서 언제든지 자동 갱신을 취소할 수 있습니다. 취소하더라도 별도 환불이 이루어지지 않는 한 이미 결제한 이용기간 종료일까지 이용할 수 있습니다.",
  },
  {
    q: "앱을 삭제하면 구독도 자동으로 취소되나요?",
    a: "아니요. 앱 삭제나 KERRI 계정 삭제만으로 App Store 또는 Google Play 구독이 취소되지는 않습니다. 구독을 중단하려면 반드시 해당 스토어의 구독 관리 화면에서 별도로 취소해야 합니다.",
  },
  {
    q: "결제나 환불은 어디에서 처리되나요?",
    a: "KERRI의 유료 구독 및 충전권 결제는 Apple App Store 또는 Google Play를 통해 처리됩니다. 환불은 관련 법령과 각 스토어의 환불 정책에 따라 처리됩니다.",
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
              <Link
                to="/download"
                className="btn-base btn-ghost inline-flex justify-center mt-10 w-full text-[0.85rem] sm:text-[0.95rem] active:scale-[0.98] touch-manipulation"
              >
                {PRICING.free.cta}
              </Link>
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
                <div className="mt-4">
                  <Link
                    to="/download"
                    className="inline-flex min-h-[2rem] items-center justify-center rounded-full bg-primary/10 px-3 py-2 text-[0.75rem] font-bold text-primary transition-colors hover:bg-primary/20 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:px-2.5 sm:py-1 sm:text-[0.72rem]"
                  >
                    14일 무료 체험
                  </Link>
                </div>

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

                <Link
                  to="/download"
                  className={`btn-base inline-flex justify-center mt-10 w-full text-[0.85rem] sm:text-[0.95rem] active:scale-[0.98] touch-manipulation ${
                    p.highlight ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {p.cta}
                </Link>
                <p className="mt-3 text-[0.78rem] leading-[1.7] text-foreground/50 break-keep">{TRIAL_NOTE}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* AI 레슨 기록 충전권 */}
        <Reveal delay={40}>
          <div className="mt-8 rounded-[1.25rem] border border-border/60 bg-card/60 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-7">
            <div className="min-w-0">
              <div className="text-[0.95rem] font-bold break-keep">{TOPUP.title}</div>
              <div className="mt-1.5 text-[1.05rem] font-extrabold text-primary">{TOPUP.price}</div>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground break-keep">{TOPUP.desc}</p>
            </div>
            <ul className="mt-4 shrink-0 space-y-1.5 sm:mt-0">
              {TOPUP.notes.map((n) => (
                <li key={n} className="flex gap-2 text-[0.82rem] leading-relaxed text-muted-foreground break-keep">
                  <span aria-hidden className="text-primary">·</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

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
          <Link
            to="/refund-policy"
            className="mt-6 inline-block text-[0.85rem] font-semibold text-primary underline-offset-4 hover:underline"
          >
            자세한 내용은 유료서비스·구독·환불정책에서 확인하세요 →
          </Link>
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
