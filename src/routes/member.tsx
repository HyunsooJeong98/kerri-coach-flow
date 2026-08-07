import { createFileRoute } from "@tanstack/react-router";
import {
  ClipboardList,
  History,
  Dumbbell,
  CalendarDays,
  Ticket,
  BellRing,
  TrendingUp,
} from "lucide-react";
import {
  Container,
  Footer,
  Nav,
  Reveal,
  Section,
  SectionHead,
} from "@/components/landing/shared";

export const Route = createFileRoute("/member")({
  head: () => ({
    meta: [
      { title: "회원앱 | 케리 KERRI 회원 레슨 기록 앱" },
      {
        name: "description",
        content:
          "케리 회원앱 안내. 회원은 오늘의 레슨 기록과 지난 히스토리, AI 개인 연습 플랜, 다음 일정과 남은 횟수를 확인하며 꾸준히 운동을 이어갑니다.",
      },
      { property: "og:title", content: "회원앱 | 케리 KERRI" },
      {
        property: "og:description",
        content: "레슨 기록과 개인 연습 플랜으로 회원의 성장을 눈에 보이게 만드는 케리 회원앱.",
      },
      { property: "og:url", content: "https://kerri.co.kr/member" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "회원앱 | 케리 KERRI" },
      {
        name: "twitter:description",
        content: "레슨 기록과 개인 연습 플랜으로 회원의 성장을 눈에 보이게 만드는 케리 회원앱.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kerri.co.kr/member" }],
  }),
  component: MemberPage,
});

const MEMBER_APP_URL = "https://apps.apple.com/kr/app/kerri-member/id6783235236";
const MEMBER_PLAY_URL = "https://play.google.com/store/apps/details?id=com.kerri.memberapp";

function MemberPage() {
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
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Section id="member" className="!pt-16 sm:!pt-24 lg:!pt-32">
          <Container>
            <SectionHead
              eyebrow="회원앱"
              title={
                <>
                  회원도 함께 사용할 때,
                  <br />
                  <span className="text-primary">KERRI의 가치</span>가 커집니다.
                </>
              }
              body="레슨이 끝난 뒤에도 회원이 계속 운동할 수 있도록 돕고, 코치는 회원별 성장 과정을 체계적으로 관리할 수 있습니다."
            />

            <Reveal delay={120}>
              <div className="mt-16 rounded-[1.75rem] border border-border/60 bg-[var(--cream)] p-7 sm:p-9">
                <p className="text-[0.95rem] font-semibold text-foreground/70">
                  회원은 KERRI Member 앱에서 언제든 확인할 수 있습니다.
                </p>
                <ul className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
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

        <Section tone="cream" className="!py-20 sm:!py-24 lg:!py-28">
          <Container>
            <SectionHead center title="회원앱 설치하기" />
            <Reveal delay={90}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <a
                  href={MEMBER_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[0.95rem] bg-[var(--ink)] px-5 py-3.5 text-[0.85rem] font-semibold text-[var(--cream)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="opacity-60">App Store에서</span>
                  <span className="font-bold">다운로드</span>
                </a>
                <a
                  href={MEMBER_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[0.95rem] bg-[var(--ink)] px-5 py-3.5 text-[0.85rem] font-semibold text-[var(--cream)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="opacity-60">Google Play에서</span>
                  <span className="font-bold">다운로드</span>
                </a>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
