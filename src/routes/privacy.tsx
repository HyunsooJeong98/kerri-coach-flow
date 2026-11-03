import { Fragment, type ReactNode } from "react";
import { Link, createFileRoute, useSearch } from "@tanstack/react-router";
import { PolicyLayout, Chapter, Body, P } from "@/components/landing/PolicyLayout";
import {
  SegmentedToggle,
  segmentClass,
  scrollTopOnSwitch,
  readService,
  type LegalService,
} from "@/components/landing/legal/service-toggle";
import {
  privacyTitle,
  privacyEffectiveDate,
  privacyVersion,
  privacySections,
} from "@/components/landing/privacy-content";
import {
  memberPrivacyTitle,
  memberPrivacyEffectiveDate,
  memberPrivacyIntro,
  memberPrivacySections,
} from "@/components/landing/legal/member-privacy-content";

type PrivacyDoc = {
  h1: string;
  effective: string;
  intro?: string;
  sections: { title: string; blocks: string[] }[];
  footer?: string;
  seo: { title: string; description: string };
};

/* ── Documents ─────────────────────────────────────────────── */

const PRIVACY_DOCS: Record<LegalService, PrivacyDoc> = {
  coach: {
    h1: privacyTitle,
    effective: privacyEffectiveDate,
    sections: privacySections.map((section) => ({
      title: section.title,
      blocks: section.paragraphs,
    })),
    footer: privacyVersion,
    seo: {
      title: "개인정보 처리방침 | KERRI",
      description:
        "KERRI 개인정보 처리방침 v1.0 — 개인정보 수집, 이용, 보유기간 및 이용자의 권리를 안내합니다.",
    },
  },
  member: {
    h1: memberPrivacyTitle,
    effective: memberPrivacyEffectiveDate,
    intro: memberPrivacyIntro,
    sections: memberPrivacySections,
    seo: {
      title: "멤버앱 개인정보 처리방침 | KERRI",
      description:
        "케리 멤버 앱 개인정보 처리방침 — 처리 목적, 항목, 보유 기간, 위탁 및 국외 이전을 안내합니다.",
    },
  },
};

/* ── Route ─────────────────────────────────────────────────── */

export const Route = createFileRoute("/privacy")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: readService(search.service),
  }),
  head: ({ match }) => {
    const doc = PRIVACY_DOCS[readService(match.search.service)];
    return {
      meta: [
        { title: doc.seo.title },
        { name: "description", content: doc.seo.description },
        { property: "og:title", content: doc.seo.title },
        { property: "og:description", content: doc.seo.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: "https://kerri.co.kr/privacy" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "https://kerri.co.kr/privacy" }],
    };
  },
  component: Privacy,
});

function LinkedText({ text }: { text: string }) {
  return text
    .split(/(hyunsoo@kerri\.co\.kr|www\.pipc\.go\.kr)/g)
    .map((part, index) => {
      const email = part === "hyunsoo@kerri.co.kr";
      if (!email && part !== "www.pipc.go.kr")
        return <Fragment key={index}>{part}</Fragment>;
      return (
        <a
          key={index}
          href={email ? `mailto:${part}` : "https://www.pipc.go.kr"}
          target={email ? undefined : "_blank"}
          rel={email ? undefined : "noopener noreferrer"}
          className="font-medium text-primary underline underline-offset-4"
        >
          {part}
        </a>
      );
    });
}

function Blocks({ blocks }: { blocks: string[] }) {
  const content: ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    const text = blocks[index];

    if (text.startsWith("• ")) {
      const items: string[] = [];
      while (index < blocks.length && blocks[index].startsWith("• ")) {
        items.push(blocks[index]);
        index += 1;
      }
      content.push(
        <ul key={index} className="list-none space-y-2 pl-5">
          {items.map((item) => (
            <li key={item} className="-indent-5">
              <LinkedText text={item} />
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    content.push(
      <P key={index}>
        <span className="whitespace-pre-line">
          <LinkedText text={text} />
        </span>
      </P>,
    );
    index += 1;
  }

  return content;
}

function Privacy() {
  const { service } = useSearch({ from: "/privacy" });
  const doc = PRIVACY_DOCS[readService(service)];

  return (
    <PolicyLayout>
      <p className="text-sm font-semibold text-primary">KERRI POLICY</p>

      <SegmentedToggle>
        <Link
          to="/privacy"
          search={{ service: "coach" }}
          aria-pressed={service === "coach"}
          onClick={scrollTopOnSwitch}
          className={segmentClass(service === "coach")}
        >
          코치용
        </Link>
        <Link
          to="/privacy"
          search={{ service: "member" }}
          aria-pressed={service === "member"}
          onClick={scrollTopOnSwitch}
          className={segmentClass(service === "member")}
        >
          멤버용
        </Link>
      </SegmentedToggle>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground break-keep sm:text-4xl">
        {doc.h1}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground break-keep">{doc.effective}</p>

      {doc.intro ? (
        <p className="mt-6 text-[0.95rem] leading-[1.85] text-foreground/80 break-keep sm:text-base">
          {doc.intro}
        </p>
      ) : null}

      {doc.sections.map((section) => (
        <Fragment key={section.title}>
          <Chapter>{section.title}</Chapter>
          <Body>
            <Blocks blocks={section.blocks} />
          </Body>
        </Fragment>
      ))}

      {doc.footer ? <p className="mt-8 text-sm text-muted-foreground">{doc.footer}</p> : null}
    </PolicyLayout>
  );
}
