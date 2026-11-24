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
        className="inline-block h-12 w-auto overflow-hidden rounded-lg transition-opacity hover:opacity-80"
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
        className="inline-block h-12 w-auto overflow-hidden rounded-lg transition-opacity hover:opacity-80"
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
      className="hidden h-24 w-24 place-items-center overflow-hidden rounded-lg border border-border/70 bg-card p-2 md:grid"
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
        <h3 className="text-xl font-bold leading-[1.25]">
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
    <div className="mt-8 grid gap-6 lg:mt-10 md:grid-cols-2">
      <Reveal>
        <div
          className={`relative h-full rounded-lg border border-border bg-card p-6 lg:p-8 ${
            pulse
              ? "!border-primary ring-2 ring-primary/20"
              : ""
          }`}
        >
          <AppIcon src={coachAppIcon.url} name="케리 코치앱" en="KERRI COACH" />
          <p className="body-1 mt-6 max-w-[30ch] break-keep text-muted-foreground">
            회원·일정·횟수·납부 관리부터 AI 레슨 기록까지. 체계적인 회원 케어를 시작하세요.
          </p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <StoreBadges appStoreUrl={COACH_APP_URL} playStoreUrl={COACH_PLAY_URL} />
            <QR url={COACH_APP_URL} label="코치앱" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={110}>
        <div className="h-full rounded-lg border border-border bg-card p-6 lg:p-8">
          <div className="flex flex-col items-start gap-3 xl:flex-row xl:justify-between">
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
            레슨 기록과 일정, 남은 횟수를 직접 확인하세요. 회원도 자신의 레슨 과정을 함께 살펴볼 수 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <StoreBadges appStoreUrl={MEMBER_APP_URL} playStoreUrl={MEMBER_PLAY_URL} />
            <QR url={MEMBER_APP_URL} label="회원앱" />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
