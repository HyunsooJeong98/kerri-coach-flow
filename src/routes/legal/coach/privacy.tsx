import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/landing/legal-pages";

export const Route = createFileRoute("/legal/coach/privacy")({
  head: () => legalHead("coach", "privacy"),
  component: () => <LegalPage app="coach" doc="privacy" />,
});
