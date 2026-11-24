import { useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Reveal, Section, SectionHead, scrollTo } from "@/components/landing/shared";
import { StoreBadges, COACH_APP_URL, COACH_PLAY_URL, MEMBER_APP_URL, MEMBER_PLAY_URL } from "@/components/landing/download";
import { MEMBER_SCREENS } from "@/components/member/AppScreen";
import { PRICING } from "@/lib/pricing";
import { coachStories, productUpdates, surveySource, visibleStories, visibleUpdates } from "@/lib/publication-content";
import appHome from "@/assets/app-home.png.asset.json";
import report from "@/assets/app-report-summary.png.asset.json";
import plan from "@/assets/app-report-plan.png.asset.json";
import payment from "@/assets/app-payment-ledger.png.asset.json";
import notify from "@/assets/app-notify-alerts.png.asset.json";
import daily from "@/assets/schedule-daily.png.asset.json";
import weekly from "@/assets/schedule-weekly.png.asset.json";
import monthly from "@/assets/schedule-monthly.png.asset.json";
import memberIcon from "@/assets/member-app-icon.png.asset.json";
import heroPc from "@/assets/hero-pc.webp.asset.json";
import heroMobile from "@/assets/hero-mobile.webp.asset.json";

export function ProductScreen({ src, alt, priority = false, className = "" }: { src: string; alt: string; priority?: boolean; className?: string }) {
  return <img src={src} alt={alt} width={884} height={1920} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" className={`block h-auto w-full rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] ${className}`} />;
}

export function ProductHero() {
  return (
    <section id="top" className="product-hero relative isolate overflow-hidden">
      <picture className="pointer-events-none absolute inset-0 -z-10 block">
        <source media="(min-width: 768px)" srcSet={heroPc.url} type="image/webp" />
        <img src={heroMobile.url} alt="" aria-hidden="true" width={941} height={1672} fetchPriority="high" className="h-full w-full object-cover" />
      </picture>
      <Container className="grid items-center gap-9 pb-10 pt-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-14 lg:pt-12">
        <div className="text-center lg:text-left">
          <p className="eyebrow">KERRI Coach</p>
          <h1 className="hero-display mt-4">회원이 알아보는<br /><span className="text-primary">좋은 강사의 차이</span></h1>
          <p className="lead mx-auto mt-5 max-w-md lg:mx-0">회원·일정·출석·결제 관리부터<br />AI 레슨 기록까지, 코칭에 필요한 일을 한곳에</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button onClick={() => scrollTo("install")} className="btn-base btn-primary h-auto whitespace-normal rounded-lg">14일 무료로 시작하기<ArrowRight /></Button>
            <Button variant="outline" onClick={() => scrollTo("features")} className="btn-base btn-ghost h-auto rounded-lg">기능 살펴보기</Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">iPhone · Android 지원</p>
          <div className="mt-5 flex justify-center lg:justify-start"><StoreBadges appStoreUrl={COACH_APP_URL} playStoreUrl={COACH_PLAY_URL} /></div>
        </div>
        <div className="relative mx-auto w-[78%] max-w-[280px] sm:max-w-[300px] lg:w-full">
          <ProductScreen src={appHome.url} alt="KERRI 코치앱 홈 — 전체 회원 현황과 오늘의 레슨, 남은 레슨 횟수" priority />
        </div>
      </Container>
    </section>
  );
}

export function ProductExperience() {
  const scenes = [
    { src: daily.url, label: "오늘의 레슨", body: "일정과 남은 횟수 확인" },
    { src: report.url, label: "AI 레슨 기록", body: "오늘의 코칭을 다시 볼 기록으로" },
    { src: payment.url, label: "결제 내역", body: "회원별 납부와 미납 현황 확인" },
  ];
  return <Section id="product" className="border-b border-border !py-10 lg:!py-14"><Container>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">실제 제품 경험</p><h2 className="mt-3 text-2xl font-bold sm:text-3xl">매일의 레슨 운영, KERRI 안에서</h2></div><Button variant="link" asChild className="h-auto px-0"><Link to="/demo">AI 레슨 기록 체험하기<ArrowRight /></Link></Button></div>
    <div className="mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
      {scenes.map((scene) => <figure key={scene.label} className="w-[82%] shrink-0 snap-center md:w-auto"><div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-card"><img src={scene.src} alt={`KERRI 실제 앱 ${scene.label} 화면 일부`} loading="lazy" width={884} height={1920} className="h-full w-full object-cover object-[center_30%]" /></div><figcaption className="mt-4"><h3 className="font-semibold">{scene.label}</h3><p className="mt-1 text-sm text-muted-foreground">{scene.body}</p></figcaption></figure>)}
    </div>
  </Container></Section>;
}

export function CompactProblems() {
  const problems = [
    ["레슨이 끝날 때마다", "기억에 의존해 피드백을 정리하고"],
    ["회원마다", "남은 횟수와 일정을 다시 확인하고"],
    ["지난 레슨 내용을 찾느라", "다음 수업 준비가 늦어집니다"],
  ];
  return <Section id="empathy"><Container><SectionHead eyebrow="코치의 하루" title={<>레슨 밖의 일은 줄이고<br /><span className="text-primary">코칭에 더 집중하세요</span></>} /><div className="mt-8 grid gap-6 md:grid-cols-3">{problems.map(([title, body], i) => <Reveal key={title} delay={i * 40} className="border-t border-border pt-5"><p className="text-sm text-primary">0{i + 1}</p><h3 className="mt-3 text-lg font-semibold">{title}</h3><p className="mt-2 text-base leading-relaxed text-muted-foreground">{body}</p></Reveal>)}</div></Container></Section>;
}

export function ProductWorkflow() {
  const steps = [
    { title: "레슨", body: "오늘의 일정과 회원 확인", src: daily.url },
    { title: "AI 레슨 기록", body: "코칭 내용을 정리하고 검토", src: report.url },
    { title: "회원에게 전달", body: "회원앱으로 오늘의 기록 공유" },
    { title: "성장 기록 누적", body: "이전 레슨과 달라진 점 확인" },
    { title: "다음 레슨 준비", body: "교정 포인트와 다음 목표 확인", src: plan.url },
  ];
  return <Section id="workflow" tone="cream"><Container><SectionHead eyebrow="KERRI가 작동하는 방식" title={<>레슨이 쌓일수록<br /><span className="text-primary">코칭은 더 선명해집니다</span></>} /><ol className="mt-9 grid gap-0 lg:grid-cols-5 lg:gap-6">{steps.map((step, i) => <li key={step.title} className="relative grid grid-cols-[2rem_1fr] gap-3 border-t border-border py-5 lg:block lg:py-6"><span className="text-sm font-semibold text-primary">0{i + 1}</span><div><h3 className="text-lg font-semibold lg:mt-3">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>{step.src && <div className="mt-4 aspect-[3/2] max-w-[280px] overflow-hidden rounded-md border border-border bg-card"><img src={step.src} alt={`${step.title} 실제 앱 화면 일부`} loading="lazy" width={884} height={1920} className="h-full w-full object-cover object-[center_38%]" /></div>}</div>{i < steps.length - 1 && <ArrowRight aria-hidden className="absolute -right-5 top-6 hidden h-4 w-4 text-primary lg:block" />}</li>)}</ol></Container></Section>;
}

export function ConnectedExperience() {
  const memberReport = MEMBER_SCREENS.report;
  return <Section id="coach-member"><Container>
    <SectionHead eyebrow="Coach → Member" title={<>코치의 관리가<br /><span className="text-primary">회원의 경험까지 이어집니다</span></>} body="코치가 검토한 레슨 기록을 회원에게 전달하고, 다음 연습과 레슨으로 이어가세요" />
    <div className="mt-10 grid items-center gap-7 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
      <Reveal className="mx-auto w-[80%] max-w-[290px]"><p className="mb-4 text-center text-sm font-semibold">KERRI Coach · AI 레슨 기록</p><ProductScreen src={report.url} alt="코치앱 AI 레슨 기록 — 오늘 레슨 요약, 이전 레슨 대비 변화, 오늘 잘한 점" /></Reveal>
      <div className="flex items-center justify-center gap-3 text-sm text-primary lg:flex-col lg:gap-4"><span>AI 정리</span><ArrowRight aria-hidden className="hidden lg:block" /><ArrowDown aria-hidden className="lg:hidden" /><span>회원에게 전달</span></div>
      <Reveal delay={80} className="mx-auto w-full max-w-[370px]">
        {memberReport.src ? <div className="mx-auto w-[80%] max-w-[290px]"><p className="mb-4 text-center text-sm font-semibold">KERRI Member · 레슨 브리핑</p><ProductScreen src={memberReport.src} alt={memberReport.alt} /></div> : <div className="border-t border-border pt-7 lg:border-t-0 lg:pt-0"><div className="flex items-center gap-3"><img src={memberIcon.url} width={52} height={52} alt="KERRI Member 앱 아이콘" loading="lazy" className="rounded-xl" /><h3 className="text-2xl font-bold">KERRI Member</h3></div><p className="mt-6 text-xl font-semibold leading-relaxed">오늘 배운 내용이<br />회원의 다음 연습까지</p><ul className="mt-5 space-y-4 text-base text-muted-foreground"><li className="border-b border-border pb-4">오늘의 요약과 교정 포인트</li><li className="border-b border-border pb-4">개인 맞춤 연습과 다음 레슨 목표</li><li>레슨 기록과 성장 과정</li></ul></div>}
        <Button variant="link" asChild className="mt-6 h-auto justify-start px-0"><Link to="/member">회원앱 자세히 보기<ArrowRight /></Link></Button>
        <div className="mt-5"><StoreBadges appStoreUrl={MEMBER_APP_URL} playStoreUrl={MEMBER_PLAY_URL} /></div>
      </Reveal>
    </div>
  </Container></Section>;
}

const FEATURES = [
  { id: "today", title: "오늘의 레슨", desc: "회원 현황과 오늘의 일정, 남은 레슨 횟수를 한눈에 확인하세요", shots: [{ src: appHome.url, label: "홈 대시보드" }] },
  { id: "report", title: "AI 레슨 기록", desc: "핵심 내용부터 교정 포인트와 개인 맞춤 연습까지, 검토한 기록을 회원에게 전달하세요", shots: [{ src: report.url, label: "오늘의 레슨 요약" }, { src: plan.url, label: "교정 포인트와 다음 레슨 목표" }] },
  { id: "schedule", title: "스케줄", desc: "일간 · 주간 · 월간 화면으로 레슨 일정을 관리하세요", shots: [{ src: daily.url, label: "일간" }, { src: weekly.url, label: "주간" }, { src: monthly.url, label: "월간" }] },
  { id: "members", title: "회원 관리", desc: "회원 현황과 회원별 남은 횟수를 확인하고 레슨 준비를 이어가세요", shots: [{ src: appHome.url, label: "회원 현황과 남은 레슨 횟수" }] },
  { id: "payment", title: "결제·레슨권", desc: "매출 요약과 회원별 납부 내역, 미납 현황을 한곳에서 확인하세요", shots: [{ src: payment.url, label: "결제 내역 관리" }] },
  { id: "notify", title: "알림", desc: "레슨 일정, 남은 횟수, 보강 신청과 회원 문의를 제때 받아보세요", shots: [{ src: notify.url, label: "레슨 알림" }] },
];

export function ProductFeatures() {
  const [active, setActive] = useState(0);
  const feature = FEATURES[active] ?? FEATURES[0];
  if (!feature) return null;
  const selectWithKeys = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % FEATURES.length;
    else if (e.key === "ArrowLeft") next = (index + FEATURES.length - 1) % FEATURES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = FEATURES.length - 1;
    else return;
    e.preventDefault(); setActive(next); document.getElementById(`feature-tab-${next}`)?.focus();
  };
  return <Section id="features" tone="cream"><Container><SectionHead eyebrow="케리 코치앱" title={<>매일 필요한 기능<br /><span className="text-primary">KERRI 하나로</span></>} />
    <div role="tablist" aria-label="코치앱 핵심 기능" className="mt-8 flex gap-2 overflow-x-auto border-b border-border pb-3">{FEATURES.map((item, i) => <Button key={item.id} id={`feature-tab-${i}`} role="tab" aria-selected={active === i} aria-controls="feature-panel" tabIndex={active === i ? 0 : -1} variant={active === i ? "default" : "ghost"} className="h-11 shrink-0 rounded-md px-4 shadow-none" onClick={() => setActive(i)} onKeyDown={(e) => selectWithKeys(e, i)}>{item.title}</Button>)}</div>
    <div id="feature-panel" role="tabpanel" aria-labelledby={`feature-tab-${active}`} tabIndex={0} className="mt-8 grid min-h-[650px] items-start gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
      <div className="lg:sticky lg:top-28"><p className="text-sm font-semibold text-primary">0{active + 1}</p><h3 className="mt-3 text-2xl font-bold">{feature.title}</h3><p className="mt-4 max-w-sm text-base leading-[1.7] text-muted-foreground">{feature.desc}</p>{feature.id === "report" && <Button variant="link" asChild className="mt-5 h-auto px-0"><Link to="/demo">직접 체험하기<ArrowRight /></Link></Button>}<Button variant="link" asChild className="mt-5 flex h-auto justify-start px-0"><Link to="/member">회원앱에서 이어지는 경험<ArrowRight /></Link></Button></div>
      <div className={`flex min-w-0 snap-x snap-mandatory gap-5 overflow-x-auto pb-3 ${feature.shots.length === 1 ? "justify-center" : ""}`}>
        {feature.shots.map((shot) => <figure key={shot.label} className="w-[80%] max-w-[280px] shrink-0 snap-center sm:w-[47%] sm:min-w-[230px]"><ProductScreen src={shot.src} alt={`KERRI 실제 앱 ${shot.label} 화면`} /><figcaption className="mt-3 text-center text-sm text-muted-foreground">{shot.label}</figcaption></figure>)}
      </div>
    </div>
  </Container></Section>;
}

export function CompactSurvey() {
  const results = [
    { value: "78%", text: "배운 내용을 잊어버린 경험이 있습니다" },
    { value: "90%", text: "레슨 내용을 말로만 전달받는다고 답했습니다" },
    { value: "96.6%", text: "체계적인 레슨 기록과 맞춤 관리가 있다면 현재 강사와 더 오래 함께하고 싶다고 답했습니다" },
  ];
  return <Section id="member-demand" className="border-y border-border !py-10 lg:!py-14"><Container><p className="eyebrow">회원 설문</p><h2 className="mt-3 text-2xl font-bold sm:text-3xl">회원도 다시 볼 레슨 기록을 원합니다</h2><div className="mt-7 grid gap-6 md:grid-cols-3">{results.map((result) => <div key={result.value} className="border-t border-border pt-5"><p className="text-4xl font-bold text-primary lg:text-5xl">{result.value}</p><p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">{result.text}</p></div>)}</div><p className="mt-6 text-xs leading-relaxed text-muted-foreground">조사 대상 · {surveySource.audience}{surveySource.respondentCount !== undefined && ` · 응답자 ${surveySource.respondentCount}명`}{surveySource.period && ` · ${surveySource.period}`}</p></Container></Section>;
}

export function CoachStories() {
  const stories = visibleStories(coachStories);
  if (stories.length === 0) return null;
  return <Section id="coach-stories"><Container><SectionHead eyebrow="코치들의 이야기" title="KERRI를 사용하는 코치들의 이야기" /><div className="mt-8 grid gap-8 md:grid-cols-3">{stories.map((story) => <figure key={story.id} className="border-t border-border pt-6"><blockquote className="text-lg leading-relaxed">“{story.quote}”</blockquote><figcaption className="mt-5 text-sm text-muted-foreground">{[story.coach, story.sport, story.region].filter(Boolean).join(" · ")}</figcaption></figure>)}</div></Container></Section>;
}

export function UpdateList({ all = false }: { all?: boolean }) {
  const updates = visibleUpdates(productUpdates, all ? undefined : 3);
  if (updates.length === 0) return all ? <p className="border-t border-border py-10 text-muted-foreground">등록된 업데이트가 없습니다</p> : null;
  return <div className="divide-y divide-border border-y border-border">{updates.map((update) => <article key={update.id} className="grid gap-3 py-6 sm:grid-cols-[160px_1fr] sm:gap-8"><div className="text-sm text-muted-foreground"><time dateTime={update.date}>{update.date.replaceAll("-", ".")}</time>{update.version && <p className="mt-2 text-primary">{update.version}</p>}</div><div><h3 className="text-lg font-semibold">{update.title}</h3><p className="mt-2 whitespace-pre-line text-base leading-relaxed text-muted-foreground">{update.description}</p></div></article>)}</div>;
}

export function RecentUpdates() {
  if (visibleUpdates(productUpdates, 3).length === 0) return null;
  return <Section id="updates"><Container><div className="flex flex-wrap items-end justify-between gap-4"><SectionHead eyebrow="KERRI Updates" title="KERRI는 계속 좋아지고 있습니다" /><Button variant="link" asChild className="h-auto px-0"><Link to="/updates">업데이트 모두 보기<ArrowRight /></Link></Button></div><div className="mt-8"><UpdateList /></div></Container></Section>;
}

export function TrialPricing() {
  const plans = [PRICING.free, PRICING.basic, PRICING.pro];
  return <Section id="trial"><Container><div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14"><div><SectionHead eyebrow="요금 및 무료 체험" title="부담 없이 직접 사용해보세요" body="회원 관리부터 AI 레슨 기록까지 직접 사용해보고 결정하세요" /><p className="mt-5 text-lg font-semibold text-primary">14일 무료 체험</p><Button onClick={() => scrollTo("install")} className="btn-base btn-primary mt-6 h-auto rounded-lg whitespace-normal">14일 무료로 시작하기<ArrowRight /></Button><p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground">Basic·Pro 대상 이용자에게 제공되며, 체험 조건과 유료 전환 동의는 앱 결제 화면에서 확인하세요</p></div><div className="self-center"><div className="divide-y divide-border border-y border-border">{plans.map((p) => <div key={p.name} className="grid grid-cols-[auto_1fr] gap-4 py-5"><p className="font-semibold">{p.name}</p><div className="text-right"><p className="text-xl font-bold">{p.monthly === 0 ? "무료" : <>{p.monthly.toLocaleString("ko-KR")}원<span className="ml-1 text-sm font-normal text-muted-foreground">/월</span></>}</p><p className="mt-2 text-sm text-muted-foreground">{p.features.find((f) => f.startsWith("AI 레슨 기록"))}</p></div></div>)}</div><p className="mt-3 text-xs text-muted-foreground">유료 플랜은 출시가 기준 · 적용 조건은 요금제에서 확인하세요</p><Button variant="link" asChild className="mt-4 h-auto px-0"><Link to="/pricing">요금제 자세히 보기<ArrowRight /></Link></Button></div></div></Container></Section>;
}
