import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Footer, Nav } from "@/components/landing/shared";
import { SimulatorFrame } from "@/components/landing/SimulatorFrame";

export const Route = createFileRoute("/demo")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "AI 레슨 기록 체험 | 케리 KERRI" },
      { name: "description", content: "KERRI AI 레슨 기록 시뮬레이터에서 코칭 내용이 레슨 기록으로 정리되는 과정을 체험하세요." },
      { property: "og:title", content: "AI 레슨 기록 체험 | 케리 KERRI" },
      { property: "og:description", content: "KERRI의 AI 레슨 기록을 직접 체험하세요." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://kerri.co.kr/demo" }],
  }),
  component: DemoPage,
});

function DemoPage() {
  return <div className="home-refined min-h-screen bg-background text-foreground"><Nav /><main className="bg-cream pb-12 pt-6 sm:pb-16"><Container><Button variant="link" asChild className="px-0"><Link to="/"><ArrowLeft />KERRI 홈</Link></Button><div className="mt-3 text-center"><p className="eyebrow">KERRI Demo</p><h1 className="mt-3 text-3xl font-bold">AI 레슨 기록</h1></div><div id="try-ai" className="relative mx-auto mt-6 aspect-[390/844] w-full max-w-[390px] overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"><SimulatorFrame /></div></Container></main><Footer /></div>;
}