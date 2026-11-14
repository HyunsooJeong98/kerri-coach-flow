import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";

const BASE_URL = "https://kerri.co.kr";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        // Public coach profiles: same filter as the profile page (is_public = true).
        const routeId = "/coach/$slug";
        if (isSitemapRouteIncluded(router.routesById[routeId])) {
          const { supabase } = await import("@/lib/supabase");
          const pageSize = 1000;
          for (let offset = 0; ; ) {
            const { data, error } = await supabase
              .from("public_coach_profiles")
              .select("id, public_slug")
              .eq("is_public", true)
              .not("public_slug", "is", null)
              .order("id")
              .range(offset, offset + pageSize - 1);
            if (error) throw error;
            if (!data || data.length === 0) break;
            for (const row of data) {
              if (!row.public_slug) continue;
              const location = router.buildLocation({
                to: "/coach/$slug",
                params: { slug: row.public_slug },
                search: () => ({}),
                hash: "",
              });
              const path = sitemapPathForLocation(router, location, routeId);
              if (path) entries.push({ path });
            }
            offset += data.length;
          }
        }

        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
