import { Link } from "@tanstack/react-router";
import { RoundedQR } from "@/components/landing/RoundedQR";
import appleStoreBadge from "@/assets/apple-store-badge.svg.asset.json";
import googlePlayBadge from "@/assets/google-play-badge.png.asset.json";
import coachAppIcon from "@/assets/coach-app-icon.png.asset.json";
import memberAppIcon from "@/assets/member-app-icon.png.asset.json";
import { Reveal } from "@/components/landing/shared";

export const COACH_APP_URL = "https://apps.apple.com/kr/app/kerri/id6783224934";
export const COACH_PLAY_URL = "https://play.google.com/store/apps/details?id=com.tenniscoach.app";
export const MEMBER_APP_URL = "https://apps.apple.com/kr/app/kerri-member/id6783235236";
export const MEMBER_PLAY_URL = "https://play.google.com/store/apps/details?id=com.kerri.memberapp";

export function StoreBadges({
  appStoreUrl,
  playStoreUrl,
}: {
  appStoreUrl: string;
  playStoreUrl: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="App Store에서 다운로드"
        className="inline-block h-12 w-auto overflow-hidden rounded-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      >
        <img
          src={appleStoreBadge.url}
          alt="App Store에서 다운로드"
          width={156}
          height={48}
          loading="lazy"
          className="h-12 w-auto object-contain"
        />
      </a>
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Google Play에서 다운로드"
        className="inline-block h-12 w-auto overflow-hidden rounded-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      >
        <img
          src={googlePlayBadge.url}
          alt="Google Play에서 다운로드"
          width={124}
          height={48}
          loading="lazy"
          className="h-12 w-auto object-contain"
        />
      </a>
    </div>
  );
}

export function QR({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} App Store QR 코드`}
      className="hidden h-24 w-24 place-items-center overflow-hidden rounded-2xl border border-border/70 bg-white p-2 shadow-[var(--shadow-soft)] md:grid"
    >
      <RoundedQR value={url} size={80} />
    </a>
  );
}

export function AppIcon({ src, name, en }: { src: string; name: string; en: string }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={src}
        alt={`${name} 앱 아이콘`}
        width={56}
        height={56}
        loading="lazy"
        className="h-14 w-14 shrink-0 rounded-[1rem]"
      />
      <div className="min-w-0">
        <h3 className="truncate text-[clamp(1.25rem,1.05rem+0.9vw,1.65rem)] font-extrabold leading-[1.25] tracking-tight">
          {name}
        </h3>
        <p className="mt-1 truncate text-[0.7rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          {en}
        </p>
      </div>
    </div>
  );
}

export function DownloadCards({ pulse = false }: { pulse?: boolean }) {
  return (
    <div className="mt-12 grid gap-6 sm:mt-16 md:mt-20 md:grid-cols-2">
      <Reveal>
        <div
          className={`relative surface h-full rounded-[1.85rem] p-[clamp(1.25rem,4.8vw,3rem)] transition-all duration-500 ${
            pulse
              ? "!border-primary ring-4 ring-primary/20 -translate-y-1.5 shadow-[0_36px_70px_-30px_rgba(192,117,90,0.5)] animate-[installPulse_1.1s_ease-in-out_2]"
              : ""
          }`}
        >
          <div className="eyebrow absolute right-4 top-4 rounded-md bg-[var(--clay)]/10 px-2 py-1">추천</div>
          <AppIcon src={coachAppIcon.url} name="케리 코치앱" en="KERRI COACH" />
          <p className="body-1 mt-6 max-w-[30ch] break-keep text-muted-foreground">
            회원·일정·횟수·납부 관리부터 AI 레슨 기록까지. 체계적인 회원 케어를 시작하세요.
          </p>
          <div className="mt-10 flex items-end justify-between gap-6">
            <StoreBadges appStoreUrl={COACH_APP_URL} playStoreUrl={COACH_PLAY_URL} />
            <QR url={COACH_APP_URL} label="코치앱" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={110}>
        <div className="surface h-full rounded-[1.85rem] p-[clamp(1.25rem,4.8vw,3rem)]">
          <div className="flex flex-col items-start gap-2 min-[380px]:flex-row min-[380px]:items-start min-[380px]:justify-between min-[380px]:gap-3">
            <div className="min-w-0">
              <AppIcon src={memberAppIcon.url} name="케리 회원앱" en="KERRI MEMBER" />
            </div>
            <Link
              to="/member"
              className="group inline-flex shrink-0 items-center gap-1 self-start text-[0.85rem] font-semibold text-primary transition-colors duration-200 hover:text-primary/80 hover:underline underline-offset-4"
            >
              회원앱 자세히 보기
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          <p className="body-1 mt-6 max-w-[30ch] break-keep text-muted-foreground">
            레슨 기록 · 성장 기록 · 일정 · 남은 횟수. 회원도 자신의 레슨을 기록으로 관리하세요.
          </p>
          <div className="mt-10 flex items-end justify-between gap-6">
            <StoreBadges appStoreUrl={MEMBER_APP_URL} playStoreUrl={MEMBER_PLAY_URL} />
            <QR url={MEMBER_APP_URL} label="회원앱" />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
