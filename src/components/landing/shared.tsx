import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import kerriLogo from "@/assets/kerri-logo.jpg.asset.json";

/** 고정 헤더의 실제 높이(모바일 메뉴 확장분 제외)를 계산 */
export function headerOffset() {
  const header = document.querySelector("header");
  if (!(header instanceof HTMLElement)) return 64;
  const bar = header.firstElementChild;
  if (bar instanceof HTMLElement) {
    const style = window.getComputedStyle(header);
    const borderBottom = parseFloat(style.borderBottomWidth) || 0;
    return Math.round(bar.offsetHeight + borderBottom);
  }
  return Math.round(header.offsetHeight);
}

/**
 * 섹션으로 한 번만 부드럽게 이동한다.
 * 위치 보정은 CSS scroll-margin-top(styles.css)에서 처리하므로
 * 여기서 추가 스크롤/보정을 실행하지 않는다.
 */
export function scrollTo(id: string) {
  if (typeof window === "undefined") return;

  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(id);
  window.dispatchEvent(new CustomEvent("kerri:focus", { detail: id }));
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** 현재 페이지가 홈이 아니면 홈으로 이동한 뒤 해당 섹션으로 스크롤 */
export function useSectionNav() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (id: string) => {
    if (pathname === "/") {
      scrollTo(id);
      return;
    }
    void Promise.resolve(navigate({ to: "/" })).then(() => {
      setTimeout(() => scrollTo(id), 160);
    });
  };
}

/* ── Scroll reveal ─────────────────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "header";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Comp>
  );
}

/* ── Shell primitives ──────────────────────────────────────── */

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-[clamp(1.125rem,4.5vw,2.5rem)] ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  tone = "plain",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "plain" | "cream";
}) {
  return (
    <section
      id={id}
      className={`relative py-28 sm:py-32 lg:py-40 ${
        tone === "cream" ? "cream-band noise" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
  center = false,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className={`display-2 break-keep ${center ? "mx-auto" : ""} max-w-[22ch] ${eyebrow ? "mt-5" : ""}`}>
        {title}
      </h2>
      {body && (
        <p className={`lead mt-6 break-keep ${center ? "mx-auto" : ""} max-w-[38ch]`}>{body}</p>
      )}
    </Reveal>
  );
}

/* ── Nav ───────────────────────────────────────────────────── */

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const goSection = useSectionNav();
  const mobileItems = [
    { label: "서비스 소개", id: "empathy" },
    { label: "코치앱", id: "features" },
    { label: "회원앱", to: "/member", isLink: true },
    { label: "요금제", to: "/pricing", isLink: true },
    { label: "FAQ", id: "faq" },
  ];
  const desktopItems = [
    { label: "코치앱", id: "features" },
    { label: "회원앱", to: "/member", isLink: true },
    { label: "요금제", to: "/pricing", isLink: true },
    { label: "FAQ", id: "faq" },
    { label: "계정 삭제", to: "/account-deletion", isLink: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const selectSection = (id: string) => {
    setOpen(false);
    goSection(id);
  };

  return (
    <header
      className={`sticky top-0 z-[60] transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          to="/"
          onClick={() => scrollTo("top")}
          className="flex min-w-0 items-center gap-2 text-[1.15rem] font-extrabold leading-none text-foreground sm:text-[1.35rem] sm:gap-2.5"
          style={{ letterSpacing: "-0.05em" }}
        >
          <img
            src={kerriLogo.url}
            alt="KERRI 로고"
            className="h-7 w-7 shrink-0 rounded-lg object-contain sm:h-8 sm:w-8"
          />
          <span className="truncate">KERRI</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-[0.95rem] font-medium text-foreground/70">
          {desktopItems.map((i) =>
            i.isLink ? (
              <Link
                key={i.label}
                to={i.to!}
                className="transition-colors duration-200 hover:text-foreground"
              >
                {i.label}
              </Link>
            ) : (
              <button
                key={i.label}
                onClick={() => goSection(i.id!)}
                className="transition-colors duration-200 hover:text-foreground"
              >
                {i.label}
              </button>
            )
          )}
          <button
            onClick={() => goSection("install")}
            className="btn-base btn-primary !min-h-[3rem] !px-6 !text-[0.95rem] !rounded-[0.95rem]"
          >
            케리 코치앱 설치하기
          </button>
        </nav>

        <button
          className="-mr-2 flex min-h-12 min-w-12 items-center justify-center text-foreground transition-opacity duration-200 hover:opacity-70 lg:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </>
            )}
          </svg>
        </button>
      </Container>

      <div
        className={`fixed inset-0 z-50 flex min-h-[100dvh] flex-col overflow-y-auto bg-background transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <Container className="flex min-h-[100dvh] flex-col py-0">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Link
              to="/"
              onClick={() => {
                setOpen(false);
                scrollTo("top");
              }}
              className="flex min-w-0 items-center gap-2 text-[1.15rem] font-extrabold leading-none text-foreground sm:gap-2.5 sm:text-[1.35rem]"
              style={{ letterSpacing: "-0.05em" }}
            >
              <img
                src={kerriLogo.url}
                alt="KERRI 로고"
                className="h-7 w-7 shrink-0 rounded-lg object-contain sm:h-8 sm:w-8"
              />
              <span className="truncate">KERRI</span>
            </Link>
            <button
              type="button"
              aria-label="메뉴 닫기"
              onClick={() => setOpen(false)}
              className="-mr-2 flex min-h-12 min-w-12 items-center justify-center text-foreground/70 transition-colors duration-200 hover:text-foreground"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col px-1 pb-6 pt-[clamp(0.75rem,3vh,1.5rem)] sm:px-2">
            <div className="flex flex-col">
            {mobileItems.map((i) =>
              i.isLink ? (
                <Link
                  key={i.label}
                  to={i.to!}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center py-1.5 text-left text-[1.12rem] font-medium text-[#3E2B22] transition-opacity duration-200 hover:opacity-60 sm:text-[1.2rem]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {i.label}
                </Link>
              ) : (
                <button
                  key={i.label}
                  onClick={() => selectSection(i.id!)}
                  className="flex min-h-11 items-center py-1.5 text-left text-[1.12rem] font-medium text-[#3E2B22] transition-opacity duration-200 hover:opacity-60 sm:text-[1.2rem]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {i.label}
                </button>
              )
            )}
            </div>

            <button
              onClick={() => selectSection("install")}
              className="mt-auto mx-1.5 flex min-h-[58px] w-[calc(100%-0.75rem)] items-center justify-center rounded-[16px] bg-primary py-3.5 text-[1rem] font-semibold text-primary-foreground transition-colors duration-200 hover:bg-[var(--clay-dark)] sm:mx-3 sm:w-[calc(100%-1.5rem)]"
            >
              케리 코치앱 설치하기
            </button>
          </nav>
        </Container>
      </div>
    </header>
  );
}

/* ── Footer ────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background py-8 sm:py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1.5 break-keep text-[0.85rem] leading-[1.6] text-foreground/75">
          <div><span className="text-muted-foreground">회사명</span> · 케리</div>
          <div><span className="text-muted-foreground">대표자</span> · 정현수</div>
          <div><span className="text-muted-foreground">사업자등록번호</span> · 214-20-87491</div>
          <div><span className="text-muted-foreground">통신판매업 신고번호</span> · 제2026-서울양천-1007호</div>
          <div>
            <span className="text-muted-foreground">고객문의</span> ·{" "}
            <a
              href="mailto:hyunsoo@kerri.co.kr"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              hyunsoo@kerri.co.kr
            </a>
          </div>
        </div>
        <div className="break-keep text-[0.85rem]">
          <div className="font-medium text-foreground">정책</div>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-muted-foreground">
            <li><Link to="/terms" className="transition-colors hover:text-primary">이용약관</Link></li>
            <li><a href="#" className="transition-colors hover:text-primary">개인정보처리방침</a></li>
            <li><Link to="/refund-policy" className="transition-colors hover:text-primary">유료서비스·구독·환불정책</Link></li>
            <li><Link to="/account-deletion" className="transition-colors hover:text-primary">계정 및 데이터 삭제 요청</Link></li>
          </ul>
        </div>
      </Container>
      <Container className="mt-6 border-t border-border/30 pt-4 text-[0.7rem] tracking-wide text-muted-foreground">
        © {new Date().getFullYear()} KERRI (케리). All rights reserved.
      </Container>
    </footer>
  );
}
