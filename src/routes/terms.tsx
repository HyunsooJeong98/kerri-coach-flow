import { createFileRoute, redirect } from "@tanstack/react-router";

// Old shared URL kept working for links already registered in the apps.
export const Route = createFileRoute("/terms")({
  beforeLoad: () => {
    throw redirect({ to: "/legal/coach/terms", statusCode: 301 });
  },
});
