import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Chapter({ children }: { children: string }) {
  return (
    <h2 className="mt-14 border-b border-border/60 pb-3 text-xl font-extrabold tracking-tight text-foreground break-keep sm:text-2xl">
      {children}
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 space-y-3.5 text-[0.95rem] leading-[1.85] text-foreground/80 break-keep sm:text-base">
      {children}
    </div>
  );
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function PolicyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 lg:px-8">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-foreground"
            style={{ letterSpacing: "-0.04em" }}
          >
            KERRI
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
          >
            홈으로
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 sm:py-20 lg:px-8">
        {children}
      </main>
    </div>
  );
}
