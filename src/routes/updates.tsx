import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Footer, Nav } from "@/components/landing/shared";
import { UpdateList } from "@/components/landing/HomeProduct";
import { productUpdates, visibleUpdates } from "@/lib/publication-content";

export const Route = createFileRoute("/updates")({
  staticData: { sitemap: visibleUpdates(productUpdates).length > 0 },
  head: () => ({
    meta: [
      { title: "제품 업데이트 | 케리 KERRI Updates" },
      { name: "description", content: "KERRI 코치앱과 회원앱의 공식 제품 업데이트 내역을 날짜와 버전별로 확인하세요." },
      { property: "og:title", content: "제품 업데이트 | 케리 KERRI Updates" },
      { property: "og:description", content: "KERRI의 공식 제품 업데이트 기록입니다." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(visibleUpdates(productUpdates).length === 0 ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: "https://kerri.co.kr/updates" }],
  }),
  component: UpdatesPage,
});

function UpdatesPage() {
  return <div className="home-refined min-h-screen bg-background text-foreground"><Nav /><main className="py-10 sm:py-16"><Container className="max-w-4xl"><Button variant="link" asChild className="px-0"><Link to="/"><ArrowLeft />KERRI 홈</Link></Button><p className="eyebrow mt-8">제품 업데이트</p><h1 className="mt-4 text-3xl font-bold sm:text-4xl">KERRI Updates</h1><div className="mt-10"><UpdateList all /></div></Container></main><Footer /></div>;
}