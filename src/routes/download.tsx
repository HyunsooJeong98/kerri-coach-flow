import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Container, Footer, Nav, Reveal, Section, SectionHead } from "@/components/landing/shared";
import { DownloadCards } from "@/components/landing/download";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "앱 다운로드 | 케리 KERRI 코치앱·회원앱" },
      {
        name: "description",
        content:
          "케리 코치앱과 회원앱을 App Store와 Google Play에서 다운로드하세요. 회원 관리, 일정, 결제, AI 레슨 기록을 하나의 앱으로 시작할 수 있습니다.",
      },
      { property: "og:title", content: "앱 다운로드 | 케리 KERRI" },
      {
        property: "og:description",
        content: "코치앱과 회원앱을 지금 설치하고 케리를 무료로 시작해 보세요.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "앱 다운로드 | 케리 KERRI" },
      {
        name: "twitter:description",
        content: "코치앱과 회원앱을 지금 설치하고 케리를 무료로 시작해 보세요.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kerri.co.kr/download" }],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  // 모바일 브라우저의 스크롤 위치 복원을 막고 항상 최상단에서 시작
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Section id="download" tone="cream" className="!pt-20 sm:!pt-24 lg:!pt-28">
          <Container>
            <Reveal>
              <h1 className="eyebrow">다운로드</h1>
            </Reveal>
            <SectionHead
              title={
                <>
                  코치와 회원,
                  <br />
                  모두를 위한 플랫폼
                </>
              }
              body="지금 앱을 설치하고 케리를 무료로 시작해 보세요."
            />
            <DownloadCards />
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
