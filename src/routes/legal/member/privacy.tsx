import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/landing/legal-pages";

export const Route = createFileRoute("/legal/member/privacy")({
  head: () => legalHead("member", "privacy"),
  component: () => <LegalPage app="member" doc="privacy" />,
});
