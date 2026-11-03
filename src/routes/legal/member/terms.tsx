import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/landing/legal-pages";

export const Route = createFileRoute("/legal/member/terms")({
  head: () => legalHead("member", "terms"),
  component: () => <LegalPage app="member" doc="terms" />,
});
