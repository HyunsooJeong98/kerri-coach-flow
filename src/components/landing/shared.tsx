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

export function scrollTo(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) {
    window.dispatchEvent(new CustomEvent("kerri:focus", { detail: id }));
    return;
  }

  const gap = window.innerWidth < 640 ? 8 : 12;
  const targetTop = () =>
    Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - headerOffset() - gap));

  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo({ top: targetTop(), behavior: "smooth" });
  }

  let last = -1;
  let idle = 0;
  let corrected = false;
  const tick = () => {
    const y = Math.round(window.scrollY);
    if (y === last) idle += 1;
    else {
      idle = 0;
      last = y;
    }
    if (idle > 3) {
      if (!corrected && id !== "top") {
        corrected = true;
        const want = targetTop();
        if (Math.abs(want - y) > 2) {
          window.scrollTo({ top: want, behavior: "smooth" });
          idle = 0;
          last = -1;
          requestAnimationFrame(tick);
          return;
        }
      }
      window.dispatchEvent(new CustomEvent("kerri:focus", { detail: id }));
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
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
  return <div className={`mx-auto w-full max-w-6xl px-6 lg:px-10 ${className}`}>{children}</div>;
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
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className={`display-2 ${eyebrow ? "mt-6" : ""}`}>{title}</h2>
      {body && <p className="lead mt-8">{body}</p>}
    </Reveal>
  );
}

/* ── Nav ───────────────────────────────────────────────────── */

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const goSection = useSectionNav();
  const items = [
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

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
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

        <nav className="hidden md:flex items-center gap-10 text-[0.95rem] font-medium text-foreground/70">
          {items.map((i) =>
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
            무료로 시작하기
          </button>
        </nav>

        <button
          className="md:hidden -mr-2 p-2 text-foreground transition-opacity duration-200 hover:opacity-70"
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
        className={`md:hidden overflow-hidden border-t transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "max-h-[28rem] opacity-100 translate-y-0 border-border/60"
            : "max-h-0 opacity-0 -translate-y-1 border-transparent"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="bg-background/95 backdrop-blur-xl">
          <Container className="flex flex-col gap-1 py-6">
            {items.map((i) =>
              i.isLink ? (
                <Link
                  key={i.label}
                  to={i.to!}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/50 py-4 text-left text-[1.05rem] font-medium text-foreground/85 transition-colors duration-200 hover:text-foreground"
                >
                  {i.label}
                </Link>
              ) : (
                <button
                  key={i.label}
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => goSection(i.id!), 60);
                  }}
                  className="border-b border-border/50 py-4 text-left text-[1.05rem] font-medium text-foreground/85 transition-colors duration-200 hover:text-foreground"
                >
                  {i.label}
                </button>
              )
            )}
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => goSection("install"), 60);
              }}
              className="btn-base btn-primary mt-6 w-full"
            >
              무료로 시작하기
            </button>
          </Container>
        </div>
      </div>
    </header>
  );
}

/* ── Footer ────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background py-8 sm:py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1 text-[0.85rem] text-foreground/75">
          <div><span className="text-muted-foreground">회사명</span> · 케리</div>
          <div><span className="text-muted-foreground">대표자</span> · 정현수</div>
          <div><span className="text-muted-foreground">사업자등록번호</span> · 214-20-87491</div>
          <div>
            <span className="text-muted-foreground">연락처</span> ·{" "}
            <a
              href="mailto:hyunsoo@kerri.co.kr"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              hyunsoo@kerri.co.kr
            </a>
          </div>
        </div>
        <div className="text-[0.85rem]">
          <div className="font-medium text-foreground">정책</div>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-muted-foreground">
            <li><a href="#" className="transition-colors hover:text-primary">이용약관</a></li>
            <li><a href="#" className="transition-colors hover:text-primary">개인정보처리방침</a></li>
            <li><a href="#" className="transition-colors hover:text-primary">환불정책</a></li>
            <li><Link to="/pricing" className="transition-colors hover:text-primary">요금제</Link></li>
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
