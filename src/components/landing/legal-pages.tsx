import { TermsDocument } from "@/components/landing/terms-document";
import { PrivacyDocument } from "@/components/landing/privacy-document";

export type LegalApp = "coach" | "member";
export type LegalDoc = "terms" | "privacy";

const APP_LABEL: Record<LegalApp, string> = { coach: "코치앱", member: "멤버앱" };
const BADGE: Record<LegalApp, string> = { coach: "KERRI Coach", member: "KERRI Member" };
const DOC_LABEL: Record<LegalDoc, string> = { terms: "이용약관", privacy: "개인정보 처리방침" };
const DATES: Record<LegalDoc, { updated: string; effective: string }> = {
  terms: { updated: "2026년 9월 14일", effective: "2026년 9월 22일" },
  privacy: { updated: "2026년 9월 22일", effective: "2026년 9월 22일" },
};

export function legalHead(app: LegalApp, doc: LegalDoc) {
  const title = `KERRI ${APP_LABEL[app]} ${DOC_LABEL[doc]} | KERRI`;
  const description = `KERRI ${APP_LABEL[app]}(${BADGE[app]}) ${DOC_LABEL[doc]} 전문입니다. 시행일 ${DATES[doc].effective}.`;
  const url = `https://kerri.co.kr/legal/${app}/${doc}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function LegalPage({ app, doc }: { app: LegalApp; doc: LegalDoc }) {
  const header = (
    <>
      <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold tracking-wide text-primary">
        {BADGE[app]}
      </span>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground break-keep sm:text-4xl">
        KERRI {APP_LABEL[app]} {DOC_LABEL[doc]}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground break-keep">
        최종 업데이트 {DATES[doc].updated} · 시행일 {DATES[doc].effective}
      </p>
    </>
  );
  return doc === "terms" ? <TermsDocument header={header} /> : <PrivacyDocument header={header} />;
}
