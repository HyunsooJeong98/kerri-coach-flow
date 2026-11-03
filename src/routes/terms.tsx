import { type ReactNode } from "react";
import { Link, createFileRoute, useSearch } from "@tanstack/react-router";
import { PolicyLayout } from "@/components/landing/PolicyLayout";
import {
  SegmentedToggle,
  segmentClass,
  scrollTopOnSwitch,
  readService,
  type LegalService,
} from "@/components/landing/legal/service-toggle";
import { CoachTermsBody } from "@/components/landing/legal/coach-terms-body";
import { MemberTermsBody } from "@/components/landing/legal/member-terms-body";

type TermsDoc = {
  h1: string;
  intro?: string;
  meta: { label: string; value: string }[];
  lead?: string;
  body: ReactNode;
  seo: { title: string; description: string };
};

/* ── Documents ─────────────────────────────────────────────── */

const TERMS_DOCS: Record<LegalService, TermsDoc> = {
  coach: {
    h1: "KERRI 서비스 이용약관",
    intro: "코치의 운영과 회원의 레슨 기록을 연결하는 스포츠 운영 플랫폼",
    meta: [
      { label: "문서 상태", value: "출시용 최종본" },
      { label: "운영자", value: "케리(KERRI) / 대표 정현수" },
      { label: "버전", value: "v1.2" },
      { label: "공고일", value: "2026년 9월 14일" },
      { label: "시행일", value: "2026년 9월 22일" },
    ],
    lead: "본 약관은 KERRI 코치·KERRI 멤버·웹사이트 및 이에 부수되는 서비스에 적용됩니다.",
    body: <CoachTermsBody />,
    seo: {
      title: "서비스 이용약관 | KERRI",
      description: "KERRI 서비스 이용약관 v1.2 전문을 안내합니다.",
    },
  },
  member: {
    h1: "KERRI Member 서비스 이용약관",
    meta: [{ label: "시행일", value: "2026년 11월 3일" }],
    body: <MemberTermsBody />,
    seo: {
      title: "멤버앱 이용약관 | KERRI",
      description: "KERRI Member 서비스 이용약관 전문을 안내합니다.",
    },
  },
};

/* ── Route ─────────────────────────────────────────────────── */

export const Route = createFileRoute("/terms")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: readService(search.service),
  }),
  head: ({ match }) => {
    const doc = TERMS_DOCS[readService(match.search.service)];
    return {
      meta: [
        { title: doc.seo.title },
        { name: "description", content: doc.seo.description },
        { property: "og:title", content: doc.seo.title },
        { property: "og:description", content: doc.seo.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: "https://kerri.co.kr/terms" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "https://kerri.co.kr/terms" }],
    };
  },
  component: Terms,
});

function Terms() {
  const { service } = useSearch({ from: "/terms" });
  const doc = TERMS_DOCS[readService(service)];

  return (
    <PolicyLayout>
      <p className="text-sm font-semibold text-primary">KERRI POLICY</p>

      <SegmentedToggle>
        <Link
          to="/terms"
          search={{ service: "coach" }}
          aria-pressed={service === "coach"}
          onClick={scrollTopOnSwitch}
          className={segmentClass(service === "coach")}
        >
          코치용
        </Link>
        <Link
          to="/terms"
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
      {doc.intro ? (
        <p className="mt-3 text-sm text-muted-foreground break-keep">{doc.intro}</p>
      ) : null}

      <dl className="mt-8 grid gap-2 rounded-2xl border border-border/60 bg-card p-6 text-[0.9rem] leading-relaxed text-foreground/80 sm:grid-cols-2">
        {doc.meta.map((row) => (
          <div key={row.label}>
            <dt className="inline text-muted-foreground">{row.label} · </dt>
            <dd className="inline">{row.value}</dd>
          </div>
        ))}
      </dl>

      {doc.lead ? (
        <p className="mt-6 text-[0.95rem] leading-[1.85] text-foreground/80 break-keep sm:text-base">
          {doc.lead}
        </p>
      ) : null}

      {doc.body}
    </PolicyLayout>
  );
}
