import { Link, useSearch } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export type LegalService = "coach" | "member";

const SERVICES: { value: LegalService; label: string }[] = [
  { value: "coach", label: "코치용" },
  { value: "member", label: "멤버용" },
];

/** URL search 값(`?service=`)을 코치용/멤버용 중 하나로规范化한다. */
export function readService(value: unknown): LegalService {
  return value === "member" ? "member" : "coach";
}

/**
 * KERRI POLICY 문구 아래, 문서 제목 위에 배치하는 코치용/멤버용 세그먼트 토글.
 * 선택 항목은 테라코타 배경 + 흰 글자, 미선택 항목은 연한 배경 + 회색 글자.
 */
export function ServiceToggle({ to }: { to: "/terms" | "/privacy" }) {
  const { service } = useSearch({ from: to });

  return (
    <div
      role="group"
      aria-label="문서 종류 선택"
      className="mt-6 inline-flex w-full gap-1 rounded-full border border-border/60 bg-muted/60 p-1 sm:w-auto"
    >
      {SERVICES.map((item) => {
        const selected = item.value === service;
        return (
          <Link
            key={item.value}
            to={to}
            search={{ service: item.value }}
            aria-pressed={selected}
            onClick={() => window.scrollTo({ top: 0 })}
            className={cn(
              "flex-1 rounded-full px-6 py-2 text-center text-sm font-semibold transition-colors sm:flex-none sm:px-9",
              selected
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
