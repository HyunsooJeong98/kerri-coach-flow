import memberReport from "@/assets/member-lesson-report.png.asset.json";
import memberGoals from "@/assets/member-lesson-goals.jpg.asset.json";

/**
 * 회원앱 실제 스크린샷 자리. src가 없으면 교체 가능한 placeholder를 보여준다.
 * 스크린샷은 기기 프레임 없이 들어온다고 가정하고, 웹에서 같은 프레임을 씌운다.
 */
export type MemberScreenKey =
  | "home"
  | "report"
  | "growth"
  | "schedule"
  | "message"
  | "profile"
  | "notifications";

export const MEMBER_SCREENS: Record<
  MemberScreenKey,
  { label: string; alt: string; src?: string }
> = {
  home: { label: "Member Home", alt: "KERRI Member 홈 화면" },
  report: { label: "AI Lesson Report", alt: "KERRI Member 레슨 기록 — 오늘 레슨 요약, 이전 레슨 대비 변화, 오늘 잘한 점", src: memberReport.url },
  growth: { label: "Growth Journey", alt: "KERRI Member 성장 기록 화면" },
  schedule: { label: "Weekly Schedule", alt: "KERRI Member 주간 레슨 일정 화면" },
  message: { label: "Coach Message", alt: "KERRI Member 코치 1:1 메시지 화면" },
  profile: { label: "Coach Profile", alt: "KERRI Member 코치 프로필 화면" },
  notifications: { label: "Notifications", alt: "KERRI Member 알림 화면" },
};

export function AppScreen({
  screen,
  priority = false,
  className = "",
}: {
  screen: MemberScreenKey;
  priority?: boolean;
  className?: string;
}) {
  const s = MEMBER_SCREENS[screen];
  return (
    <div
      className={`relative mx-auto w-full rounded-[2.4rem] bg-[var(--ink)] p-[3.2%] shadow-[var(--shadow-device)] ${className}`}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-[var(--cream)]">
        {s.src ? (
          <img
            src={s.src}
            alt={s.alt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div
            role="img"
            aria-label={`${s.alt} (이미지 준비 중)`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-[var(--clay)]/30 rounded-[2rem] text-center"
          >
            <span className="eyebrow">KERRI Member</span>
            <span className="text-sm font-semibold text-foreground/60">{s.label}</span>
            <span className="text-xs text-muted-foreground">앱 화면 준비 중</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function MemberReportDetail({ className = "" }: { className?: string }) {
  return <img src={memberGoals.url} alt="KERRI Member 레슨 기록 — 교정 포인트와 다음 레슨 목표" width={773} height={768} loading="lazy" decoding="async" className={`block h-auto w-full rounded-lg ${className}`} />;
}

/** 앱 화면 밖으로 확장된 작은 정보 칩 */
export function InfoChip({
  label,
  value,
  className = "",
}: {
  label: string;
  value?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border/70 bg-card/95 px-4 py-2.5 shadow-[var(--shadow-lift)] backdrop-blur ${className}`}
    >
      <p className="text-[0.7rem] font-semibold text-muted-foreground">{label}</p>
      {value && <p className="mt-0.5 text-[0.95rem] font-bold text-foreground">{value}</p>}
    </div>
  );
}
