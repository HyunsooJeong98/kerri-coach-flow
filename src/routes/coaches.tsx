import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { MapPin, Clock } from "lucide-react";
import { supabase, type CoachProfile } from "@/lib/supabase";
import { Nav, Footer, Container } from "@/components/landing/shared";

/* ── Server function ──────────────────────────────────────── */

const fetchCoaches = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabase
    .from("public_coach_profiles")
    .select("id, coach_id, display_name, avatar_url, sport, region_city, region_district, center_name, bio, coaching_years, public_slug")
    .eq("is_public", true)
    .order("display_name");

  return (data ?? []) as CoachProfile[];
});

/* ── Route ────────────────────────────────────────────────── */

export const Route = createFileRoute("/coaches")({
  loader: () => fetchCoaches(),
  head: () => ({
    meta: [
      { title: "코치 찾기 | 케리 KERRI 테니스 코치" },
      {
        name: "description",
        content: "케리에 등록된 개인 레슨 코치를 찾아보세요. 지역별 테니스 코치 프로필과 레슨 패키지를 확인하고 바로 문의할 수 있어요.",
      },
      { property: "og:title", content: "코치 찾기 | 케리 KERRI" },
      {
        property: "og:description",
        content: "케리에 등록된 개인 레슨 코치를 찾아보세요.",
      },
      { property: "og:url", content: "https://kerri.co.kr/coaches" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://kerri.co.kr/coaches" }],
  }),
  component: CoachesPage,
});

/* ── Component ────────────────────────────────────────────── */

function CoachesPage() {
  const coaches = Route.useLoaderData();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />
      <main className="flex-1 pt-16">
        <section className="bg-gradient-to-b from-cream/60 to-background border-b border-border/50">
          <Container className="py-12 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-ink">코치 찾기</h1>
            <p className="mt-2 text-sm text-muted-foreground">케리에 등록된 개인 레슨 코치를 만나보세요.</p>
          </Container>
        </section>

        <Container className="py-12">
          {coaches.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground text-sm">
              등록된 코치가 없어요.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.map((coach) => (
                <CoachCard key={coach.id} coach={coach} />
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}

function CoachCard({ coach }: { coach: CoachProfile }) {
  const { display_name, avatar_url, sport, region_city, region_district, coaching_years, bio, public_slug } = coach;
  const location = [region_city, region_district].filter(Boolean).join(" ");

  return (
    <Link
      to="/coach/$slug"
      params={{ slug: public_slug }}
      className="group block rounded-3xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-clay/40 transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        {avatar_url ? (
          <img src={avatar_url} alt={display_name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow flex-shrink-0" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-clay/20 flex items-center justify-center text-2xl flex-shrink-0">
            🎾
          </div>
        )}
        <div>
          <p className="font-bold text-ink group-hover:text-clay transition-colors">{display_name} 코치</p>
          {sport && <p className="text-xs text-clay font-medium">{sport}</p>}
        </div>
      </div>
      <div className="flex gap-3 text-xs text-muted-foreground mb-3">
        {location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />{location}
          </span>
        )}
        {coaching_years && (
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />경력 {coaching_years}년
          </span>
        )}
      </div>
      {bio && (
        <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed">{bio}</p>
      )}
    </Link>
  );
}
