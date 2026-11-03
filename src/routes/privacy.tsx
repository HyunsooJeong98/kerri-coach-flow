import { createFileRoute, redirect } from "@tanstack/react-router";

// Old shared URL kept working for links already registered in the apps.
export const Route = createFileRoute("/privacy")({
  beforeLoad: () => {
    throw redirect({ to: "/legal/coach/privacy", statusCode: 301 });
  },
});
