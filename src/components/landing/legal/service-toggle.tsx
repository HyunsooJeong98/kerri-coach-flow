import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type LegalService = "coach" | "member";

/** URL search 값(`?service=`)을 코치용/멤버용 중 하나로 정리한다. */
export function readService(value: unknown): LegalService {
  return value === "member" ? "member" : "coach";
}

/**
 * KERRI POLICY 문구 아래, 문서 제목 위에 배치하는 코치용/멤버용 세그먼트 토글.
 * 각 문서 화면에서 직접 전환하므로 푸터 링크는 그대로 두 개만 유지한다.
 */
export function SegmentedToggle({ children }: { children: ReactNode }) {
  return (
    <div
      role="group"
      aria-label="문서 종류 선택"
      className="mt-6 inline-flex w-full gap-1 rounded-full border border-border/60 bg-muted/60 p-1 sm:w-auto"
    >
      {children}
    </div>
  );
}

/** 선택 항목은 테라코타 배경 + 흰 글자, 미선택 항목은 연한 배경 + 회색 글자. */
export function segmentClass(selected: boolean) {
  return cn(
    "flex-1 rounded-full px-6 py-2 text-center text-sm font-semibold transition-colors sm:flex-none sm:px-9",
    selected
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:text-foreground",
  );
}

/** 문서 전환 시 화면을 최상단으로 이동. */
export function scrollTopOnSwitch() {
  window.scrollTo({ top: 0 });
}

/** validateSearch 용: 값이 없으면 생략해 `/terms`, `/privacy`가 리다이렉트 없이 바로 열리게 한다. */
export function readOptionalService(value: unknown): LegalService | undefined {
  return value === "member" || value === "coach" ? value : undefined;
}
