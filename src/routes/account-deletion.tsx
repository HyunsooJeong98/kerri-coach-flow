import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account-deletion")({
  component: AccountDeletion,
  head: () => ({
    meta: [
      { title: "계정 및 데이터 삭제 요청 | 케리 KERRI" },
      {
        name: "description",
        content:
          "KERRI 앱(com.kerri.tenniscoach) 계정 및 데이터 삭제 요청 방법, 삭제되는 데이터와 법적 의무로 보관되는 데이터, 처리 기간 안내입니다.",
      },
      { property: "og:title", content: "계정 및 데이터 삭제 요청 | 케리 KERRI" },
      {
        property: "og:description",
        content:
          "KERRI 앱 계정 삭제 요청 방법과 삭제·보관 데이터, 처리 기간을 안내합니다.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md">
      <h2 className="text-lg sm:text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function AccountDeletion() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border/60">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-foreground"
            style={{ letterSpacing: "-0.04em" }}
          >
            KERRI
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            홈으로
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 lg:px-8 py-14 sm:py-20">
        <p className="text-sm font-semibold text-primary">KERRI</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          계정 및 데이터 삭제 요청
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          KERRI 앱 (com.kerri.tenniscoach)
        </p>

        <div className="mt-10 space-y-5">
          <Card title="삭제 요청 방법">
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-foreground">앱 내</div>
                <p className="mt-1">앱 실행 → 내 정보 → 계정 삭제</p>
              </div>
              <div>
                <div className="font-semibold text-foreground">이메일</div>
                <p className="mt-1">
                  <a
                    href="mailto:hyunsoo@kerri.co.kr?subject=%5B%EA%B3%84%EC%A0%95%20%EC%82%AD%EC%A0%9C%20%EC%9A%94%EC%B2%AD%5D%20%EA%B0%80%EC%9E%85%20%EC%9D%B4%EB%A9%94%EC%9D%BC%20%EC%A3%BC%EC%86%8C"
                    className="font-medium text-primary hover:underline"
                  >
                    hyunsoo@kerri.co.kr
                  </a>
                  로 가입 이메일과 함께 요청
                </p>
                <p className="mt-2 rounded-lg bg-muted px-4 py-3 text-sm text-foreground/70">
                  제목: [계정 삭제 요청] 가입 이메일 주소
                </p>
              </div>
            </div>
          </Card>

          <Card title="삭제되는 데이터">
            <Bullets
              items={[
                "계정 정보 (이름, 이메일, 연락처)",
                "회원권 및 레슨 패키지 정보",
                "레슨 일정 및 출석 기록",
                "코치와의 메시지 내역",
                "성장 리포트 및 활동 데이터",
              ]}
            />
          </Card>

          <Card title="보관되는 데이터">
            <div className="font-semibold text-foreground">법적 의무</div>
            <p className="mt-2">
              결제·거래 기록 — 전자상거래 등에서의 소비자 보호에 관한 법률에 따라 5년간 보관
            </p>
          </Card>

          <Card title="처리 기간">
            <p>
              요청 접수 후 영업일 기준 7일 이내 처리되며, 완료 시 이메일로 안내드립니다.
            </p>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} KERRI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
