import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { MapPin, Clock, Award, ChevronDown, ChevronUp, Send } from "lucide-react";
import { supabase, type CoachProfile, type LessonPackage } from "@/lib/supabase";
import { Nav, Footer, Container } from "@/components/landing/shared";

/* ── Server functions ─────────────────────────────────────── */

const fetchCoach = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { data: profile } = await supabase
      .from("public_coach_profiles")
      .select("*")
      .eq("public_slug", slug)
      .eq("is_public", true)
      .maybeSingle();

    if (!profile) return null;

    const { data: packages } = await supabase
      .from("lesson_packages")
      .select("id, title, price, total_credits, duration_minutes, color, notes")
      .eq("coach_id", profile.coach_id)
      .eq("is_active", true)
      .order("price");

    return { profile: profile as CoachProfile, packages: (packages ?? []) as LessonPackage[] };
  });

const submitRequest = createServerFn({ method: "POST" })
  .validator(
    (d: {
      coachId: string;
      guestName: string;
      guestPhone: string;
      packageId: string | null;
      message: string;
    }) => d
  )
  .handler(async ({ data }) => {
    const { coachId, guestName, guestPhone, packageId, message } = data;

    // Simple rate limit: block if same phone submitted in last 5 min
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recent } = await supabase
      .from("lesson_requests")
      .select("id")
      .eq("guest_phone", guestPhone)
      .eq("coach_id", coachId)
      .gte("created_at", fiveMinAgo)
      .limit(1);

    if (recent && recent.length > 0) {
      return { ok: false, error: "잠시 후 다시 시도해주세요." };
    }

    const { error } = await supabase.from("lesson_requests").insert({
      coach_id: coachId,
      guest_name: guestName.trim(),
      guest_phone: guestPhone.trim(),
      package_id: packageId || null,
      message: message.trim() || null,
      source: "web",
      status: "pending",
    });

    if (error) return { ok: false, error: "요청 중 오류가 발생했습니다." };
    return { ok: true, error: null };
  });

/* ── Route ────────────────────────────────────────────────── */

export const Route = createFileRoute("/coach/$slug")({
  loader: async ({ params }) => {
    const result = await fetchCoach({ data: params.slug });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { profile } = loaderData;
    const name = profile.display_name;
    const district = profile.region_district ?? "";
    const sport = profile.sport ?? "테니스";
    const bioSnippet = (profile.bio ?? "").slice(0, 120);
    const title = `${name} 코치 · ${district} ${sport} 레슨 | KERRI`;
    const desc = bioSnippet;
    const url = `https://kerri.co.kr/coach/${profile.public_slug}`;
    const avatar = profile.avatar_url ?? "";

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          name,
          description: bioSnippet,
          image: avatar,
          url,
          jobTitle: `${sport} 코치`,
        },
        {
          "@type": "LocalBusiness",
          name: `${name} 코치 레슨`,
          description: bioSnippet,
          image: avatar,
          url,
          address: {
            "@type": "PostalAddress",
            addressRegion: profile.region_city ?? "서울",
            addressLocality: district,
            addressCountry: "KR",
          },
        },
      ],
    };

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "profile" },
        { property: "og:image", content: avatar },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <p className="text-4xl">🎾</p>
      <h1 className="text-xl font-semibold text-foreground">코치 페이지를 찾을 수 없어요</h1>
      <p className="text-sm text-muted-foreground">링크가 변경됐거나 비공개 상태일 수 있어요.</p>
    </div>
  ),
  component: CoachPage,
});

/* ── Component ────────────────────────────────────────────── */

function CoachPage() {
  const { profile, packages } = Route.useLoaderData();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />
      <main className="flex-1 pt-16">
        <CoachHero profile={profile} />
        <Container className="py-12 space-y-12">
          {profile.bio && <BioSection bio={profile.bio} />}
          {packages.length > 0 && <PackagesSection packages={packages} />}
          <RequestForm coachId={profile.coach_id} coachName={profile.display_name} packages={packages} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */

function CoachHero({ profile }: { profile: CoachProfile }) {
  const { display_name, avatar_url, sport, region_city, region_district, center_name, coaching_years } = profile;
  const location = [region_city, region_district].filter(Boolean).join(" ");

  return (
    <section className="bg-gradient-to-b from-cream/60 to-background border-b border-border/50">
      <Container className="py-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {avatar_url ? (
            <img src={avatar_url} alt={display_name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white shadow-lg flex-shrink-0" />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-clay/20 flex items-center justify-center text-4xl flex-shrink-0 ring-4 ring-white shadow-lg">
              🎾
            </div>
          )}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-ink">{display_name} 코치</h1>
            {sport && <p className="mt-1 text-clay font-semibold">{sport}</p>}
            <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {location}
                </span>
              )}
              {center_name && (
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  {center_name}
                </span>
              )}
              {coaching_years && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  경력 {coaching_years}년
                </span>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Bio ──────────────────────────────────────────────────── */

function BioSection({ bio }: { bio: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = bio.length > 200;
  const displayed = isLong && !expanded ? bio.slice(0, 200) + "…" : bio;

  return (
    <section>
      <h2 className="text-lg font-bold text-ink mb-3">코치 소개</h2>
      <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{displayed}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center gap-1 text-sm text-clay hover:text-clay-dark font-medium"
        >
          {expanded ? <><ChevronUp className="w-4 h-4" />접기</> : <><ChevronDown className="w-4 h-4" />더 보기</>}
        </button>
      )}
    </section>
  );
}

/* ── Packages ─────────────────────────────────────────────── */

function PackagesSection({ packages }: { packages: LessonPackage[] }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-ink mb-4">레슨 패키지</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: pkg.color }} />
              <span className="font-semibold text-foreground">{pkg.title}</span>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>⏱ {pkg.duration_minutes}분</span>
              <span>🎾 {pkg.total_credits === 1 ? "원타임" : `${pkg.total_credits}회`}</span>
            </div>
            <p className="mt-3 text-lg font-bold text-ink">{pkg.price.toLocaleString()}원</p>
            {pkg.notes && <p className="mt-1 text-xs text-muted-foreground">{pkg.notes}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Request Form ─────────────────────────────────────────── */

function RequestForm({
  coachId,
  coachName,
  packages,
}: {
  coachId: string;
  coachName: string;
  packages: LessonPackage[];
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPkg, setSelectedPkg] = useState<string>("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const phoneClean = phone.replace(/[^0-9]/g, "");
    if (phoneClean.length < 10) {
      setError("올바른 전화번호를 입력해주세요.");
      return;
    }

    setSubmitting(true);
    setError("");

    const result = await submitRequest({
      data: {
        coachId,
        guestName: name,
        guestPhone: phoneClean,
        packageId: selectedPkg || null,
        message,
      },
    });

    setSubmitting(false);
    if (result.ok) {
      setDone(true);
    } else {
      setError(result.error ?? "오류가 발생했습니다.");
    }
  }

  if (done) {
    return (
      <section className="rounded-3xl bg-cream/50 border border-border/50 p-8 text-center">
        <p className="text-4xl mb-3">✅</p>
        <h3 className="text-lg font-bold text-ink">{coachName} 코치에게 전달됐어요</h3>
        <p className="mt-2 text-sm text-muted-foreground">코치가 확인 후 연락드릴 거예요.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-bold text-ink mb-4">레슨 문의하기</h2>
      <form onSubmit={handleSubmit} className="rounded-3xl bg-card border border-border p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">이름 *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-clay/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">전화번호 *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-1234-5678"
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-clay/40"
            />
          </div>
        </div>

        {packages.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">관심 패키지 (선택)</label>
            <select
              value={selectedPkg}
              onChange={(e) => setSelectedPkg(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-clay/40"
            >
              <option value="">선택 안 함</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.title} — {pkg.price.toLocaleString()}원
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">문의 내용 (선택)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="원하는 요일·시간대, 현재 실력, 목표 등을 남겨주세요."
            rows={4}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-clay/40"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !name.trim() || !phone.trim()}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-clay px-6 py-3 text-sm font-semibold text-white hover:bg-clay-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {submitting ? "전송 중…" : `${coachName} 코치에게 문의하기`}
        </button>

        <p className="text-center text-xs text-muted-foreground">
          제출 시 코치에게 알림이 전달돼요. 케리 앱에서 확인하고 연락드려요.
        </p>
      </form>
    </section>
  );
}
