import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  MapPin, Clock, Award, ChevronDown, ChevronUp, Send,
  BookOpen, Briefcase, FileText, Trophy, Users, Layers,
  Flame, MessageCircle,
} from "lucide-react";
import { supabase, type CoachProfile, type LessonPackage } from "@/lib/supabase";
import { Nav, Footer, Container } from "@/components/landing/shared";

/* ── Server functions ─────────────────────────────────────── */

type JourneyStats = { members: number; lessons: number; reports: number };

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

    // journey stats — read from journey_snapshot; show if data exists regardless of show_coaching_journey flag
    let journeyStats: JourneyStats | null = null;
    if (profile.journey_snapshot) {
      const snap = profile.journey_snapshot;
      journeyStats = {
        members: snap.members_count ?? 0,
        lessons: snap.lessons_count ?? 0,
        reports: snap.reports_count ?? 0,
      };
    }

    return {
      profile: profile as CoachProfile,
      packages: (packages ?? []) as LessonPackage[],
      journeyStats,
    };
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

    const today = new Date().toISOString().slice(0, 10);
    const { error } = await supabase.from("lesson_requests").insert({
      coach_id: coachId,
      guest_name: guestName.trim(),
      guest_phone: guestPhone.trim(),
      package_id: packageId || null,
      message: message.trim() || null,
      source: "web",
      status: "pending",
      requested_date: today,
      start_time: "00:00:00",
      end_time: "00:00:00",
    });

    if (error) return { ok: false, error: "요청 중 오류가 발생했습니다." };

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "https://luhuiwyhewofjxnbzbdt.supabase.co";
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      await fetch(`${supabaseUrl}/functions/v1/send-push`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseAnonKey}`,
          "apikey": supabaseAnonKey,
        },
        body: JSON.stringify({
          recipient_type: "coach",
          recipient_id: coachId,
          title: "신규 상담 문의 요청",
          body: `${guestName.trim()} · ${timeStr} 접수`,
          data: { source: "web" },
        }),
      });
    } catch {}

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
    const desc = bioSnippet || `${name} 코치의 ${sport} 레슨 프로필입니다.`;
    const url = `https://kerri.co.kr/coach/${profile.public_slug}`;
    const avatar = profile.avatar_url ?? "";

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          name,
          description: desc,
          image: avatar,
          url,
          jobTitle: `${sport} 코치`,
          ...(profile.career_details ? { description: profile.career_details.slice(0, 200) } : {}),
        },
        {
          "@type": "LocalBusiness",
          name: `${name} 코치 레슨`,
          description: desc,
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
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
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
  const { profile, packages, journeyStats } = Route.useLoaderData();

  const hasBasicInfo = !!(
    profile.specialties?.length ||
    profile.coaching_style
  );

  const hasCareer = !!(
    profile.has_player_career ||
    profile.career_details ||
    profile.certifications ||
    profile.awards
  );

  const hasJourney =
    !!journeyStats &&
    (journeyStats.members > 0 || journeyStats.lessons > 0 || journeyStats.reports > 0);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />
      {/* pb-24 on mobile to clear sticky CTA */}
      <main className="flex-1 pt-[60px] sm:pt-16 pb-24 sm:pb-0">
        <CoachHero profile={profile} />
        <Container className="py-6 sm:py-8 space-y-6 sm:space-y-8 px-5">
          {profile.bio && <BioSection bio={profile.bio} />}
          {hasBasicInfo && <BasicInfoSection profile={profile} />}
          {hasJourney && <JourneySection stats={journeyStats!} />}
          {hasCareer && <CareerSection profile={profile} />}
          {packages.length > 0 && (
            <PackagesSection packages={packages} />
          )}
          <div id="request-form">
            <RequestForm
              coachId={profile.coach_id}
              coachName={profile.display_name}
              packages={packages}
            />
          </div>
        </Container>
      </main>
      <Footer />

      {/* Sticky CTA — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t border-border bg-background/95 backdrop-blur px-5 py-3 safe-area-inset-bottom">
        <a
          href="#request-form"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-clay px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-clay-dark transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          레슨 문의하기
        </a>
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */

function CoachHero({ profile }: { profile: CoachProfile }) {
  const { display_name, avatar_url, sport, region_city, region_district, center_name, coaching_years } = profile;
  const location = [region_city, region_district].filter(Boolean).join(" ");

  return (
    <section className="border-b border-border/50 bg-gradient-to-b from-[#FBF2EF] to-background">
      <Container className="py-7 sm:py-9 px-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          {/* text info */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-ink">{display_name} 코치</h1>
            {sport && <p className="mt-1.5 text-clay font-semibold text-base">{sport}</p>}
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-base text-muted-foreground">
              {location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  {location}
                </span>
              )}
              {center_name && (
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 flex-shrink-0" />
                  {center_name}
                </span>
              )}
              {coaching_years && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  경력 {coaching_years}년
                </span>
              )}
            </div>
          </div>
          {/* avatar — right side on desktop */}
          {avatar_url ? (
            <img
              src={avatar_url}
              alt={display_name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover ring-4 ring-white shadow-lg flex-shrink-0 self-center"
            />
          ) : (
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-clay/20 flex items-center justify-center flex-shrink-0 ring-4 ring-white shadow-lg self-center">
              <span className="text-4xl font-bold text-clay">{display_name.charAt(0)}</span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ── Section heading helper ───────────────────────────────── */

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h2 className="flex items-center gap-2 text-xl font-bold text-ink mb-4">
      <span className="text-clay">{icon}</span>
      {title}
    </h2>
  );
}

/* ── Bio ──────────────────────────────────────────────────── */

function BioSection({ bio }: { bio: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = bio.length > 200;
  const displayed = isLong && !expanded ? bio.slice(0, 200) + "…" : bio;

  return (
    <section>
      <SectionHeading icon={<BookOpen className="w-4 h-4" />} title="코치 소개" />
      <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
        <p className="text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">{displayed}</p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1 text-sm text-clay hover:text-clay-dark font-medium"
          >
            {expanded
              ? <><ChevronUp className="w-4 h-4" />접기</>
              : <><ChevronDown className="w-4 h-4" />더 보기</>}
          </button>
        )}
      </div>
    </section>
  );
}

/* ── Basic Info ───────────────────────────────────────────── */

function BasicInfoSection({ profile }: { profile: CoachProfile }) {
  const rows: { label: string; value: string }[] = [];

  if (profile.specialties?.length) {
    rows.push({ label: "전문 분야", value: profile.specialties.join(", ") });
  }
  if (profile.coaching_style) {
    rows.push({ label: "코칭 스타일", value: profile.coaching_style });
  }
  if (!rows.length) return null;

  return (
    <section>
      <SectionHeading icon={<Layers className="w-4 h-4" />} title="기본정보" />
      <div className="rounded-2xl border border-border bg-card shadow-[0_1px_6px_rgba(0,0,0,0.06)] overflow-hidden">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex gap-4 px-5 py-4 text-base ${i > 0 ? "border-t border-border/60" : ""}`}
          >
            <span className="w-28 flex-shrink-0 text-muted-foreground font-medium">{row.label}</span>
            <span className="text-foreground">{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Journey ──────────────────────────────────────────────── */

function JourneySection({ stats }: { stats: JourneyStats }) {
  const cells = [
    { label: "함께한 회원", value: `${stats.members}명` },
    { label: "진행한 레슨", value: `${stats.lessons.toLocaleString()}회` },
    { label: "남긴 레슨 기록", value: `${stats.reports}개` },
  ].filter((_, i) => [stats.members, stats.lessons, stats.reports][i] > 0);

  if (!cells.length) return null;

  return (
    <section>
      <SectionHeading icon={<Flame className="w-4 h-4" />} title="나의 코칭 여정" />
      <div className="grid grid-cols-3 gap-3">
        {cells.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-border bg-card p-4 text-center shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
          >
            <p className="text-2xl font-bold text-clay">{c.value}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Career & Certifications ──────────────────────────────── */

function CareerSection({ profile }: { profile: CoachProfile }) {
  if (!profile.has_player_career && !profile.career_details && !profile.certifications && !profile.awards) {
    return null;
  }

  return (
    <section>
      <SectionHeading icon={<Users className="w-4 h-4" />} title="경력·자격" />
      <div className="space-y-3">
        {profile.has_player_career && (
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-clay/10 text-clay flex-shrink-0">
              <Trophy className="w-4 h-4" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground font-medium">선수 경력</p>
              <p className="text-base font-semibold text-foreground mt-0.5">선수 출신 코치</p>
            </div>
          </div>
        )}
        {profile.career_details && (
          <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-clay/10 text-clay flex-shrink-0">
                <Briefcase className="w-3.5 h-3.5" />
              </span>
              <p className="text-sm text-muted-foreground font-medium">주요 경력</p>
            </div>
            <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">{profile.career_details}</p>
          </div>
        )}
        {profile.certifications && (
          <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-clay/10 text-clay flex-shrink-0">
                <FileText className="w-3.5 h-3.5" />
              </span>
              <p className="text-sm text-muted-foreground font-medium">자격증</p>
            </div>
            <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">{profile.certifications}</p>
          </div>
        )}
        {profile.awards && (
          <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-clay/10 text-clay flex-shrink-0">
                <Award className="w-3.5 h-3.5" />
              </span>
              <p className="text-sm text-muted-foreground font-medium">수상·대회</p>
            </div>
            <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">{profile.awards}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Packages ─────────────────────────────────────────────── */

function PackagesSection({ packages }: { packages: LessonPackage[] }) {
  return (
    <section>
      <SectionHeading icon={<Clock className="w-4 h-4" />} title="레슨권" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-2xl border border-border bg-card px-5 py-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: pkg.color }} />
              <span className="font-semibold text-sm text-foreground">{pkg.title}</span>
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground mb-2.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />{pkg.duration_minutes}분
              </span>
              <span>{pkg.total_credits === 1 ? "원타임" : `${pkg.total_credits}회`}</span>
            </div>
            <p className="text-base font-bold text-ink">{pkg.price.toLocaleString()}원</p>
            {pkg.notes && <p className="mt-1.5 text-xs text-muted-foreground leading-snug">{pkg.notes}</p>}
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
      data: { coachId, guestName: name, guestPhone: phoneClean, packageId: selectedPkg || null, message },
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
      <section className="rounded-2xl bg-[#FBF2EF] border border-clay/20 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-clay/15 flex items-center justify-center mx-auto mb-3">
          <Send className="w-5 h-5 text-clay" />
        </div>
        <h3 className="text-base font-bold text-ink">{coachName} 코치에게 전달됐어요</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">코치가 확인 후 연락드릴 거예요.</p>
      </section>
    );
  }

  return (
    <section>
      <SectionHeading icon={<MessageCircle className="w-4 h-4" />} title="레슨 문의하기" />
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-card border border-border p-5 sm:p-6 space-y-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">이름 *</label>
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
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">전화번호 *</label>
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
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">관심 레슨권 (선택)</label>
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
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">문의 내용 (선택)</label>
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
