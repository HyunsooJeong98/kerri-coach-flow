import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/landing/legal-pages";

export const Route = createFileRoute("/legal/coach/terms")({
  head: () => legalHead("coach", "terms"),
  component: () => <LegalPage app="coach" doc="terms" />,
});
