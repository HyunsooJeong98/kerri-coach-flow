import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicy,
  head: () => ({
    meta: [
      { title: "유료서비스·구독·환불정책 | 케리 KERRI" },
      {
        name: "description",
        content:
          "KERRI 유료서비스·구독·환불정책 전문. 월간·연간 자동 갱신 구독, 출시가 혜택, AI 레슨 기록 충전권, 14일 무료 체험, 청약철회 및 마켓별 환불 신청 절차를 안내합니다.",
      },
      { property: "og:title", content: "유료서비스·구독·환불정책 | 케리 KERRI" },
      {
        property: "og:description",
        content:
          "KERRI 구독 결제·자동 갱신·청약철회·환불 절차를 담은 유료서비스·구독·환불정책 전문입니다.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

/* ── Building blocks ───────────────────────────────────────── */

function Chapter({ children }: { children: string }) {
  return (
    <h2 className="mt-14 border-b border-border/60 pb-3 text-xl font-extrabold tracking-tight text-foreground break-keep sm:text-2xl">
      {children}
    </h2>
  );
}

function Article({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h3 className="text-base font-bold text-foreground break-keep sm:text-lg">{title}</h3>
      <div className="mt-3 space-y-3.5 text-[0.95rem] leading-[1.85] text-foreground/80 break-keep sm:text-base">
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

const MAIL = "hyunsoo@kerri.co.kr";

function Mail() {
  return (
    <a href={`mailto:${MAIL}`} className="font-medium text-primary underline underline-offset-4">
      {MAIL}
    </a>
  );
}

/* ── Page ──────────────────────────────────────────────────── */

function RefundPolicy() {
  const priceRows = [
    ["Free", "AI 3개", "무료", "무료", "없음", "없음"],
    ["Basic", "AI 10개", "9,900원", "19,000원", "113,000원", "217,000원"],
    ["Pro", "AI 50개", "19,000원", "39,000원", "217,000원", "445,000원"],
  ];

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
        <p className="text-sm font-semibold text-primary">KERRI POLICY</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground break-keep sm:text-4xl">
          유료서비스·구독·환불정책
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">앱 내 월간·연간 자동 갱신 구독</p>

        <dl className="mt-8 grid gap-2 rounded-2xl border border-border/60 bg-card p-6 text-[0.9rem] leading-relaxed text-foreground/80 sm:grid-cols-2">
          <div>
            <dt className="inline text-muted-foreground">운영자 · </dt>
            <dd className="inline">케리(KERRI) · 대표 정현수</dd>
          </div>
          <div>
            <dt className="inline text-muted-foreground">사업자등록번호 · </dt>
            <dd className="inline">214-20-87491</dd>
          </div>
          <div>
            <dt className="inline text-muted-foreground">고객문의 · </dt>
            <dd className="inline">
              <Mail />
            </dd>
          </div>
          <div>
            <dt className="inline text-muted-foreground">정책 버전 · </dt>
            <dd className="inline">v1.0</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="inline text-muted-foreground">공고일/시행일 · </dt>
            <dd className="inline">2026년 8월 16일 / 2026년 8월 23일</dd>
          </div>
        </dl>

        <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/5 p-6 text-[0.95rem] leading-[1.8] text-foreground/85 break-keep">
          <div className="font-bold text-foreground">핵심 안내</div>
          <p className="mt-2">
            구독은 Apple App Store 또는 Google Play에서 결제되고 취소 전까지 자동 갱신됩니다. 앱
            삭제나 KERRI 계정 삭제만으로 스토어 구독이 취소되지는 않습니다.
          </p>
        </div>

        <Chapter>제1장 총칙</Chapter>

        <Article title="제1조 (목적)">
          <P>
            이 정책은 케리(이하 ‘회사’)가 KERRI 코치앱, 회원앱 및 관련 웹사이트에서 제공하는
            월간·연간 구독과 AI 레슨 기록 충전권 등 유료서비스의 결제, 이용기간, 자동 갱신, 변경,
            해지, 청약철회 및 환불에 관한 사항을 정합니다.
          </P>
        </Article>

        <Article title="제2조 (적용 범위와 우선순위)">
          <P>① 이 정책은 KERRI 유료서비스를 구매하거나 이용하는 모든 이용자에게 적용됩니다.</P>
          <P>
            ② 유료서비스는 Apple App Store 또는 Google Play(이하 ‘마켓’)의 앱 내 결제를 통해
            판매됩니다. 결제 승인, 결제수단 관리, 영수증 발급 및 마켓을 통한 환불 처리에는 해당
            마켓의 약관과 정책이 함께 적용됩니다.
          </P>
          <P>
            ③ 이 정책, 마켓 정책 및 관련 법령의 내용이 서로 다른 경우에는 이용자에게 강행적으로
            적용되는 관련 법령을 우선하며, 그 다음으로 해당 거래를 처리한 마켓 정책을 적용합니다.
          </P>
          <P>
            ④ 이 정책에 정하지 않은 사항은 KERRI 서비스 이용약관, 개인정보 처리방침 및 관련 법령에
            따릅니다.
          </P>
        </Article>

        <Article title="제3조 (용어의 정의)">
          <P>
            ① ‘구독’이란 일정한 이용기간 동안 유료 기능을 이용하고, 이용자가 갱신을 취소하지 않으면
            같은 주기로 이용기간과 결제가 반복되는 상품을 말합니다.
          </P>
          <P>② ‘월간 구독’은 매월, ‘연간 구독’은 매년 자동 갱신되는 상품을 말합니다.</P>
          <P>
            ③ ‘결제일’은 마켓에서 최초 결제가 승인된 날 또는 다음 갱신 결제가 승인된 날을 말합니다.
          </P>
          <P>
            ④ ‘AI 레슨 기록 이용 개수’는 음성 또는 입력 내용을 바탕으로 하나의 AI 레슨 기록을 정상
            생성하는 데 사용되는 월별 제공량을 말합니다.
          </P>
          <P>
            ⑤ ‘출시가 혜택’은 최초 유료 가입자 중 선착순 100명에게 최초 유료 결제일부터 12개월 동안
            적용하는 한정 가격 혜택을 말합니다.
          </P>
          <P>
            ⑥ ‘AI 레슨 기록 충전권’은 Basic 또는 Pro 구독 이용자가 월 기본 제공량 외에 AI 레슨
            기록을 추가로 생성하기 위하여 별도로 구매하는 1회성 소모성 상품을 말합니다.
          </P>
        </Article>

        <Chapter>제2장 상품, 가격 및 이용량</Chapter>

        <Article title="제4조 (요금제와 판매가격)">
          <P>
            ① KERRI의 국내 판매가격은 아래와 같으며 모두 부가가치세(VAT)가 포함된 최종 결제금액입니다.
          </P>
          <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[36rem] border-collapse text-[0.9rem]">
              <thead>
                <tr className="border-b border-border">
                  {["플랜", "월 제공량", "월간 출시가", "월간 정가", "연간 출시가", "연간 정가"].map(
                    (h) => (
                      <th key={h} className="px-3 py-3 text-left font-bold text-foreground">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {priceRows.map((row) => (
                  <tr key={row[0]} className="border-b border-border/50">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-3 py-3 ${i === 0 ? "font-semibold text-foreground" : "text-foreground/80"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            ② AI 레슨 기록 10회 충전권의 판매가격은 4,900원(VAT 포함)입니다. 충전권은 1회 결제
            상품으로 자동 갱신 또는 자동 재결제되지 않으며, Basic 또는 Pro 구독이 활성화된 이용자만
            구매·사용할 수 있습니다.
          </P>
          <P>
            ③ 연간 구독 가격은 같은 플랜의 월간 가격을 12회 결제하는 금액보다 약 5% 낮게
            책정됩니다.
          </P>
          <P>
            ④ 실제 구매 화면에는 결제 전에 상품명, 결제금액, 제공 내용, 이용기간 및 자동 갱신 여부를
            표시합니다. 마켓의 가격구간·세금·통화 처리 등에 따라 웹사이트의 안내가격과 실제
            결제금액에 차이가 있는 경우에는 마켓 구매 화면에 표시된 최종 결제금액을 기준으로 하며,
            회사는 확인된 표시 오류를 신속히 바로잡습니다.
          </P>
        </Article>

        <Article title="제5조 (출시가 혜택)">
          <P>
            ① 출시가 혜택은 Basic 또는 Pro를 처음 유료 결제한 이용자 중 결제 승인 순서 기준 선착순
            100명에게 적용됩니다. 회사는 실제 결제 승인 전에는 선착순 포함을 보장하지 않습니다.
          </P>
          <P>
            ② 혜택기간은 최초 유료 결제일부터 12개월입니다. 월간 구독은 혜택기간 중 도래하는 월별
            갱신에, 연간 구독은 최초 연간 결제에 출시가가 적용됩니다.
          </P>
          <P>
            ③ 혜택기간이 끝난 뒤 다음 갱신부터 정가가 적용됩니다. 정기결제 대금이 인상되거나
            할인·무료 혜택 종료 후 더 높은 금액 또는 유료 정기결제로 전환되는 경우, 회사와 마켓은
            관련 법령이 정한 기간과 방법에 따라 적용 시점, 변경 전후 가격, 결제방법 및 해지 방법을
            안내하고 필요한 소비자 동의를 받습니다. 법령 또는 마켓 정책상 동의가 필요한데 동의가
            이루어지지 않은 경우 해당 변경가격으로 갱신되지 않을 수 있습니다.
          </P>
          <P>
            ④ 혜택기간 중 Basic과 Pro 사이에서 플랜을 변경하면 남은 혜택기간 동안 변경한 플랜의
            출시가를 적용합니다. 변경 시점과 차액 정산 방식은 결제 전 마켓 화면에 표시되는 내용에
            따릅니다.
          </P>
          <P>
            ⑤ 이용자가 구독을 취소하여 이용기간이 만료되거나 결제가 정상적으로 갱신되지 않아 구독이
            종료되면 출시가 혜택도 종료됩니다. 이후 재구독 시 선착순 혜택을 다시 받을 수 없습니다.
            다만 회사 또는 마켓의 명백한 오류로 결제가 중단된 경우 확인 후 남은 혜택을 복구할 수
            있습니다.
          </P>
        </Article>

        <Article title="제6조 (AI 레슨 기록 제공량 및 충전권 운영)">
          <P>
            ① Free, Basic 및 Pro 플랜의 AI 레슨 기록 기본 제공량은 각각 매월 3개, 10개 및 50개입니다.
          </P>
          <P>
            ② 월간·연간 구독의 AI 레슨 기록 기본 제공량은 현재 이용주기 시작일을 기준으로 매월
            초기화됩니다. 정확한 초기화 시점은 마켓 거래정보와 KERRI 앱에 표시된 이용주기 정보를
            기준으로 합니다.
          </P>
          <P>
            ③ 월 기본 제공량 중 사용하지 않은 개수는 다음 달로 이월되지 않으며 현금, 포인트 또는
            다른 상품으로 전환할 수 없습니다.
          </P>
          <P>
            ④ Free 플랜에서는 충전권을 구매하거나 사용할 수 없습니다. 충전권은 Basic 또는 Pro 구독이
            활성화된 이용자만 구매·사용할 수 있으며, AI 레슨 기록 생성 시 월 기본 제공량을 먼저
            차감한 후 충전 개수를 차감합니다.
          </P>
          <P>
            ⑤ 충전 개수는 월별 초기화 대상이 아니며 별도의 유효기간을 정하여 구매 화면에 고지한
            경우를 제외하고 소진할 때까지 계정에 보관됩니다. 미사용 충전 개수는 임의로 현금, 포인트
            또는 다른 상품으로 전환할 수 없으며, 청약철회·환불은 제13조에 따릅니다.
          </P>
          <P>
            ⑥ Basic 또는 Pro 구독이 종료되면 남은 충전 개수는 계정에 보관되지만 사용할 수 없습니다.
            같은 계정으로 Basic 또는 Pro를 다시 구독하면 남은 충전 개수를 이어서 사용할 수 있습니다.
            다만 계정을 삭제하면 관련 법령상 보관이 필요한 거래기록을 제외한 잔여 충전 정보가
            삭제되어 복구되지 않을 수 있습니다.
          </P>
          <P>
            ⑦ 회사 시스템 오류로 AI 레슨 기록 생성이 정상 완료되지 않은 경우에는 기본 제공량 또는
            충전 개수를 차감하지 않습니다. 오류로 잘못 차감된 사실이 확인되면 해당 개수를 복구합니다.
          </P>
          <P>
            ⑧ 회사는 향후 신규 판매되는 요금제의 제공량 또는 충전 상품의 구성·가격을 변경할 수
            있습니다. 이미 결제된 이용기간의 기본 제공량과 이미 구매한 충전 개수는 이용자에게
            불리하게 소급하여 줄이지 않으며, 다음 갱신 또는 신규 구매부터 적용되는 중요한 변경은
            관련 법령 및 마켓 정책에 따라 사전에 안내합니다.
          </P>
        </Article>

        <Chapter>제3장 결제, 갱신 및 변경</Chapter>

        <Article title="제7조 (계약 성립과 서비스 개시)">
          <P>
            ① 이용자가 구매 화면에서 상품과 금액을 확인하고 결제를 승인하여 마켓의 결제 완료 통지가
            회사에 전달되면 유료서비스 이용계약이 성립합니다.
          </P>
          <P>
            ② 유료 기능은 결제 검증이 완료되는 즉시 제공하는 것을 원칙으로 합니다. 통신 지연이나
            마켓 검증 지연이 발생한 경우 회사는 결제 내역을 확인하여 이용권한을 복구합니다.
          </P>
          <P>
            ③ 결제 완료 후 이용자는 마켓이 발급한 영수증 또는 구독·구매 관리 화면에서 구매내역을
            확인할 수 있습니다. 구독 상품의 경우 다음 갱신일과 금액은 마켓 구독 관리 화면의 표시를
            기준으로 합니다.
          </P>
        </Article>

        <Article title="제8조 (14일 무료 체험 및 유료 전환)">
          <P>
            ① 회사는 자격 요건을 충족하는 이용자에게 Basic 또는 Pro 플랜의 14일 무료 체험을 제공할 수
            있습니다. 무료 체험의 제공 대상, 제공 횟수, 이용 가능 기능 및 기타 조건은 구매 화면에
            표시되는 내용에 따릅니다.
          </P>
          <P>
            ② 무료 체험 신청 전 구매 화면에는 무료 체험 기간, 체험 종료 후 적용되는 플랜, 결제금액,
            결제주기, 유료 전환 시점과 방법 및 취소 방법을 명확하게 표시합니다.
          </P>
          <P>
            ③ 대한민국 이용자의 무료 체험이 유료 구독으로 전환되는 경우 관련 법령 및 해당 마켓 정책에
            따라 유료 전환에 필요한 추가 동의를 받습니다. 14일 무료 체험처럼 전체 체험기간이 30일
            이내인 경우에는 마켓이 정한 절차에 따라 체험 시작 후 동의 절차가 진행될 수 있습니다.
          </P>
          <P>
            ④ 필요한 유료 전환 동의가 완료된 경우 무료 체험 종료 후 이용자가 선택한 Basic 또는 Pro
            유료 구독으로 전환되어 해당 요금이 청구됩니다. 필요한 동의를 하지 않은 경우에는 유료
            요금이 청구되지 않으며 무료 체험 또는 구독은 해당 마켓 정책에 따라 종료 또는 취소됩니다.
          </P>
          <P>
            ⑤ 이용자는 무료 체험 종료 및 유료 전환 전에 Apple App Store 또는 Google Play의 구독 관리
            화면에서 구독을 취소할 수 있습니다. 앱 삭제 또는 KERRI 계정 삭제만으로 구독이 취소되는
            것은 아닙니다.
          </P>
          <P>
            ⑥ 무료 체험의 중복 제공 여부와 재이용 가능 여부는 마켓의 자격 판정 및 회사가 구매 화면에
            표시한 조건에 따릅니다.
          </P>
        </Article>

        <Article title="제9조 (자동 갱신과 결제 실패)">
          <P>
            ① 월간 구독은 매월, 연간 구독은 매년 자동 갱신됩니다. 이용자가 다음 갱신 전에 마켓에서
            구독을 취소하지 않으면 등록된 결제수단으로 다음 이용기간의 요금이 청구됩니다. 다만 가격
            인상 또는 무료·할인 혜택 종료에 따른 유료·상향 전환 등 관련 법령상 별도 동의가 필요한
            경우에는 해당 동의 절차가 우선 적용됩니다.
          </P>
          <P>
            ② 실제 청구 시점, 결제 재시도, 유예기간 및 갱신일 계산은 마켓 정책과 이용자의 마켓 계정
            설정에 따릅니다.
          </P>
          <P>
            ③ 결제수단 오류, 잔액 부족 또는 마켓 승인 거절로 결제가 완료되지 않으면 유료 기능이 일시
            제한되거나 구독이 종료될 수 있습니다. 결제가 복구되면 마켓이 확인한 이용기간에 따라
            이용권한이 복원됩니다.
          </P>
        </Article>

        <Article title="제10조 (플랜 변경)">
          <P>
            ① 이용자는 마켓 구독 관리 화면 또는 앱에서 제공되는 절차를 통해 플랜을 변경할 수 있습니다.
          </P>
          <P>
            ② 업그레이드·다운그레이드의 적용 시점, 일할 계산, 차액 청구 또는 크레딧 제공 여부는 마켓
            정책 및 변경 확인 화면에 표시된 내용에 따릅니다.
          </P>
          <P>
            ③ 플랜 변경으로 월 제공량이 달라지는 경우 앱에 표시되는 변경 적용일과 잔여 제공량을
            따릅니다. 회사는 결제 확인 화면에서 이를 알기 쉽게 안내합니다.
          </P>
        </Article>

        <Article title="제11조 (가격 또는 유료서비스 내용의 변경)">
          <P>
            ① 회사는 운영비용, 기능, 시장상황 또는 법령·마켓 정책의 변경 등을 고려하여 신규
            판매가격이나 유료서비스 구성을 변경할 수 있습니다.
          </P>
          <P>
            ② 이미 결제된 이용기간에는 원칙적으로 결제 당시의 조건을 적용합니다. 정기결제 대금의 인상
            또는 무료에서 유료 정기결제로의 전환 등 이용자에게 불리한 중요 변경은 관련 법령과 마켓
            정책이 정한 기간·방법에 따라 사전에 안내하며, 법령상 동의가 필요한 사항은 변경 적용 전에
            이용자의 동의를 받습니다.
          </P>
          <P>
            ③ 이용자가 가격 인상 또는 유료 전환에 필요한 동의를 하지 않거나 변경에 동의하지 않는
            경우에는 마켓 정책 및 관련 법령에 따라 기존 조건이 유지되거나 구독이 갱신되지 않고 종료될
            수 있습니다. 이용자는 갱신 전에 마켓 구독 관리 화면에서 구독을 취소할 수 있습니다.
          </P>
        </Article>

        <Chapter>제4장 취소, 청약철회 및 환불</Chapter>

        <Article title="제12조 (구독 취소)">
          <P>
            ① 이용자는 언제든지 Apple App Store 또는 Google Play의 구독 관리 화면에서 자동 갱신을
            취소할 수 있습니다.
          </P>
          <P>
            ② 구독 취소는 원칙적으로 다음 갱신을 중단하는 조치입니다. 환불이 별도로 승인되지 않는 한
            이미 결제된 이용기간의 종료일까지 유료 기능을 이용할 수 있습니다.
          </P>
          <P>
            ③ 앱을 삭제하거나 KERRI 계정을 삭제하는 것만으로는 마켓 구독이 취소되지 않습니다. 계정
            삭제 전에 반드시 마켓에서 구독 취소 여부를 확인해야 합니다.
          </P>
          <P>
            ④ 회사는 고객문의가 접수되면 취소 경로를 안내할 수 있으나 이용자의 Apple 또는 Google
            계정에 대신 접속하거나 마켓 구독을 임의로 취소할 수 없습니다.
          </P>
        </Article>

        <Article title="제13조 (청약철회와 환불의 원칙)">
          <P>
            ① 이용자는 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관련 법령에 따라 계약내용에
            관한 서면을 받은 날부터 7일 이내에 청약철회 등을 할 수 있습니다. 다만, 서면을 받은 때보다
            서비스 또는 디지털콘텐츠의 공급이 늦게 시작된 경우에는 공급받거나 공급이 시작된 날부터
            7일을 기준으로 하며, 그 밖의 예외는 관련 법령에 따릅니다.
          </P>
          <P>
            ② 서비스 또는 디지털콘텐츠가 표시·광고 또는 계약 내용과 다르게 제공된 경우에는 관련
            법령에 따라 공급받은 날부터 3개월 이내이면서 그 사실을 안 날 또는 알 수 있었던 날부터
            30일 이내에 청약철회 등을 할 수 있습니다.
          </P>
          <P>
            ③ 디지털콘텐츠 또는 용역의 제공이 개시된 경우에는 관련 법령이 정한 범위에서 청약철회가
            제한될 수 있습니다. 회사는 청약철회 제한을 적용하려는 경우 결제 전에 그 제한 사실을
            이용자가 쉽게 알 수 있도록 명확하게 표시하고, 시험 사용 상품 제공 등 관련 법령에서
            요구하는 조치를 합니다. 이러한 법정 조치가 갖추어지지 않은 경우에는 관련 법령에 따른
            청약철회권이 제한되지 않습니다.
          </P>
          <P>
            ④ 10회 충전권처럼 가분적으로 제공되는 디지털콘텐츠 또는 용역은 일부 제공이 시작되었더라도
            아직 제공이 시작되지 않은 부분에 대해서는 관련 법령에 따른 청약철회가 가능합니다. 이미
            정상적으로 제공이 완료된 부분은 관련 법령이 허용하는 범위에서 환불금액 산정에 반영할 수
            있습니다.
          </P>
          <P>
            ⑤ 중복 결제, 결제 완료 후 이용권한이 제공되지 않은 경우 또는 회사의 귀책사유로 정상 이용이
            어려운 경우 이용자는 회사에 사실 확인과 복구 또는 관련 법령에 따른 환불을 요청할 수
            있습니다.
          </P>
          <P>
            ⑥ 적법한 청약철회가 이루어진 경우 회사가 직접 환급할 의무를 부담하는 금액은 관련 법령이
            정한 기준일로부터 3영업일 이내에 환급합니다. Apple App Store 또는 Google Play가
            결제·환불을 처리하는 거래는 해당 마켓의 절차를 따르되, 회사는 법령상 필요한 청구
            취소·환급 요청 및 이용권한 조정을 지체 없이 처리합니다.
          </P>
          <P>
            ⑦ 이 정책의 어떠한 내용도 소비자에게 관련 법령상 보장되는 청약철회, 계약 해제·해지, 환불
            또는 손해배상 등의 권리를 제한하지 않습니다.
          </P>
        </Article>

        <Article title="제14조 (마켓별 환불 신청)">
          <P>
            ① Apple App Store 결제: reportaproblem.apple.com에서 Apple 계정으로 로그인한 후 ‘환불
            요청’을 선택하여 신청합니다. 환불 가능 여부와 처리 결과는 Apple이 심사합니다.
          </P>
          <P>
            ② Google Play 결제: Google Play 주문내역 또는 Google Play 고객센터의 환불 절차를 통해
            신청합니다. 결제 시점과 사유에 따라 Google 또는 회사가 요청을 확인할 수 있습니다.
          </P>
          <P>
            ③ 환불 접수처가 불분명하거나 서비스 이용권한 복구가 필요한 경우 KERRI 고객문의(
            <Mail />
            )로 마켓 종류, 주문번호, 결제일 및 문제 내용을 보내 주세요. 카드번호, 계정 비밀번호 등
            결제 인증정보는 보내면 안 됩니다.
          </P>
        </Article>

        <Article title="제15조 (서비스 장애와 회사의 조치)">
          <P>
            ① 회사의 귀책사유로 유료서비스를 정상 이용하지 못한 경우 회사는 장애의 범위와 기간을
            확인하여 이용 개수 복구, 이용기간 연장, 대체 제공 또는 관련 법령에 따른 환불 등 합리적인
            조치를 합니다.
          </P>
          <P>
            ② 마켓, 통신망, 이용자 기기 또는 제3자 서비스의 장애처럼 회사가 직접 통제하기 어려운
            사유가 발생한 경우에도 회사는 가능한 범위에서 원인 확인과 복구를 지원합니다.
          </P>
          <P>
            ③ 이용자는 오류 화면, 발생 시각, 마켓 주문번호 등 확인에 필요한 정보를 제공할 수 있습니다.
            회사는 문제 해결에 필요하지 않은 결제 인증정보를 요구하지 않습니다.
          </P>
        </Article>

        <Chapter>제5장 기타</Chapter>

        <Article title="제16조 (계정 삭제와 유료 데이터)">
          <P>
            ① 이용자가 KERRI 계정을 삭제하면 관련 법령과 개인정보 처리방침에 따라 계정 및 서비스
            데이터가 삭제되거나 분리 보관됩니다. 삭제된 데이터는 복구되지 않을 수 있습니다.
          </P>
          <P>
            ② 계정 삭제와 마켓 구독 취소는 별개의 절차입니다. 계정을 삭제해도 마켓 구독이 계속되어
            다음 결제가 발생할 수 있으므로, 이용자는 계정 삭제 전에 마켓 구독을 별도로 취소해야
            합니다.
          </P>
          <P>
            ③ 환불 처리 중 계정을 삭제하면 주문과 이용내역 확인이 어려워질 수 있습니다. 환불 또는
            분쟁이 진행 중인 경우 처리 완료 후 계정을 삭제하는 것이 좋습니다.
          </P>
          <P>
            ④ 계정 삭제가 완료되면 관련 법령상 보관이 필요한 거래기록을 제외한 잔여 충전 정보가
            삭제되어 서비스에서 복구되지 않을 수 있습니다. 회사는 삭제 확정 전에 잔여 충전 개수와 구독
            별도 취소 필요성을 확인할 수 있도록 안내합니다. 계정 삭제 여부와 관계없이 이미 성립한
            청약철회·환불 등 이용자의 법정 권리는 관련 법령에 따릅니다.
          </P>
        </Article>

        <Article title="제17조 (통지)">
          <P>
            ① 회사는 결제, 갱신, 가격 또는 중요 정책 변경과 관련된 사항을 앱 공지, 푸시 알림, 이메일
            또는 마켓이 제공하는 방식으로 알릴 수 있습니다. 가격 인상 또는 무료에서 유료 정기결제로의
            전환 등 관련 법령상 별도 동의·고지가 필요한 사항은 법령과 마켓 정책이 정한 방식과 기간에
            따릅니다.
          </P>
          <P>
            ② 이용자는 정확한 이메일과 알림 설정을 유지하고 마켓 구독 관리 화면에서 다음 갱신일과
            가격을 확인해야 합니다.
          </P>
        </Article>

        <Article title="제18조 (문의와 분쟁 해결)">
          <P>
            ① 유료서비스 이용, 이용권한 복구 및 KERRI 기능 관련 문의는 <Mail />로 접수할 수 있습니다.
            마켓이 처리하는 결제 승인·환불은 해당 마켓 고객센터 이용이 필요할 수 있습니다.
          </P>
          <P>
            ② 회사와 이용자는 분쟁이 발생한 경우 상호 협의하여 해결하도록 노력합니다. 이용자는 한국
            소비자원 소비자상담센터(국번 없이 1372) 등 관계기관의 절차를 이용할 수 있습니다.
          </P>
          <P>
            ③ 이 정책은 대한민국 법령에 따라 해석됩니다. 관할법원은 관련 법령이 정하는 바에 따릅니다.
          </P>
        </Article>

        <Chapter>부칙</Chapter>
        <div className="mt-6 space-y-3.5 text-[0.95rem] leading-[1.85] text-foreground/80 break-keep sm:text-base">
          <P>1. 이 정책은 2026년 8월 23일부터 시행합니다.</P>
          <P>2. 최초 공고일은 2026년 8월 16일입니다.</P>
        </div>

        <div className="mt-14 rounded-2xl border border-border/60 bg-card p-6 text-[0.9rem] leading-relaxed text-foreground/75">
          계정 및 데이터 삭제 절차는{" "}
          <Link to="/account-deletion" className="font-medium text-primary underline underline-offset-4">
            계정 및 데이터 삭제 요청
          </Link>{" "}
          페이지에서 확인할 수 있습니다.
        </div>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto max-w-3xl px-5 text-xs text-muted-foreground lg:px-8">
          © {new Date().getFullYear()} KERRI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
