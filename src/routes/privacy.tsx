import { Fragment, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PolicyLayout, Chapter, Body, P } from "@/components/landing/PolicyLayout";
import { privacyTitle, privacyEffectiveDate, privacyVersion, privacySections } from "@/components/landing/privacy-content";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "개인정보 처리방침 | KERRI" },
      { name: "description", content: "KERRI 개인정보 처리방침 v1.0 — 개인정보 수집, 이용, 보유기간 및 이용자의 권리를 안내합니다." },
      { property: "og:title", content: "개인정보 처리방침 | KERRI" },
      { property: "og:description", content: "KERRI의 개인정보 처리방침과 개인정보 보호책임자 안내입니다." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://kerri.co.kr/privacy" }],
  }),
  component: Privacy,
});

function LinkedText({ text }: { text: string }) {
  return text.split(/(hyunsoo@kerri\.co\.kr|www\.pipc\.go\.kr)/g).map((part, index) => {
    const email = part === "hyunsoo@kerri.co.kr";
    if (!email && part !== "www.pipc.go.kr") return <Fragment key={index}>{part}</Fragment>;
    return (
      <a key={index} href={email ? `mailto:${part}` : "https://www.pipc.go.kr"}
        target={email ? undefined : "_blank"} rel={email ? undefined : "noopener noreferrer"}
        className="font-medium text-primary underline underline-offset-4">
        {part}
      </a>
    );
  });
}

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  const content: ReactNode[] = [];
  let index = 0;
  while (index < paragraphs.length) {
    const text = paragraphs[index];
    if (text.startsWith("• ")) {
      const items: string[] = [];
      while (index < paragraphs.length && paragraphs[index].startsWith("• ")) {
        items.push(paragraphs[index]);
        index += 1;
      }
      content.push(<ul key={index} className="list-none space-y-2 pl-5">
        {items.map((item) => <li key={item} className="-indent-5"><LinkedText text={item} /></li>)}
      </ul>);
    } else {
      content.push(<P key={index}><LinkedText text={text} /></P>);
      index += 1;
    }
  }
  return content;
}

function Privacy() {
  return (
    <PolicyLayout>
      <p className="text-sm font-semibold text-primary">KERRI POLICY</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground break-keep sm:text-4xl">{privacyTitle}</h1>
      <p className="mt-3 text-sm text-muted-foreground break-keep">{privacyEffectiveDate}</p>
      {privacySections.map((section) => (
        <Fragment key={section.title}>
          <Chapter>{section.title}</Chapter>
          <Body><Paragraphs paragraphs={section.paragraphs} /></Body>
        </Fragment>
      ))}
      <p className="mt-8 text-sm text-muted-foreground">{privacyVersion}</p>
    </PolicyLayout>
  );
}