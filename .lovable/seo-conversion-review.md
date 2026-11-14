# KERRI homepage SEO and conversion review — 2026-11-14

## Changes awaiting publishing
- Homepage title, description, Open Graph and Twitter copy now match the supplied text.
- Added one self-referencing canonical and og:url: https://kerri.co.kr/.
- Removed page-specific root metadata to prevent unrelated inherited copy. Preserved Naver verification and global social-card defaults. Corrected the document language to Korean.
- Removed invalid relative social-image tags; no replacement image was generated. Existing displayed hero assets remain unchanged.
- Kept the H1 text. Updated eyebrow, added the two sales lines and supplied supporting copy.
- Added the requested hero CTA and updated final/sticky CTA labels to “14일 무료로 시작하기”; all lead to the existing app-install section, not an actual trial activation.
- Added eligibility, paid conversion, automatic renewal and cancellation guidance based on existing pricing/terms. Actual store purchase eligibility, dates and consent flow were not independently verified.
- Clarified voice/memo-to-member-report and member review of past lessons/growth. Removed “재등록률을 높여보세요”; remaining-count and renewal-reminder copy remains.
- Kept sections in the same order, app imagery, app-store destinations and simulator URL. No new pages or backend changes.

## Technical verification
- Local rendered HTML: one H1, eight H2, 24 H3; one title/description/canonical and one each of the homepage social text tags; Naver verification preserved.
- All images have alt attributes; the decorative background retains empty alt.
- Main benefit text exists in server-rendered HTML, not only client JavaScript. Collapsed FAQ answers retain their existing interactive behavior.
- Browser checks at 360, 390, 440 and 1280px: no horizontal overflow, CTA reaches install section, both coach and member store links preserved, FAQ eligibility/cancellation answer opens, no top-level page errors.
- Existing simulator iframe source and sandbox permissions unchanged; its introductory screen rendered during the final browser check. Coach App Store opened at the expected existing destination after clicking the install badge. The simulator's AI-generation flow was not changed or exercised.
- Live sitemap: HTTP 200, application/xml, parsed sitemap.org urlset with 11 URLs. Live robots.txt allows crawling and points to https://kerri.co.kr/sitemap.xml. Neither file nor public-profile queries were changed.
- Fresh pre-edit SEO foundations review: HTTP/crawler/sitemap/SSR checks pass; relative social-image URL was the only reported metadata failure and those invalid tags were removed.

## Existing analytics and measurement readiness
- Existing Lovable analytics script is present on production and collector is configured. No duplicate analytics installation or custom instrumentation was added because this request asks to check feasibility.
- 2026-11-07 through 2026-11-14 analytics: 80 visits, 94 page views sitewide; homepage 17 page views; two Google-referred visits. No recorded referrer is classified as Direct and does not prove a visitor's acquisition channel.
- Existing page views and click autocapture are available; 23 homepage click records in the queried rolling seven-day window. No project-specific event types/catalog were present.
- Download, trial-intent and outbound-store click events can be added to the existing handlers without another SDK, but named conversion events were not added in this review. A trial CTA click or store departure is not installation/trial activation.
- Naver/Google/Instagram referrals can be separated when referrers are supplied; privacy/in-app browsers can omit them. Use campaign links with bounded utm_source=naver|google|instagram, utm_medium and utm_campaign for future campaign attribution; campaign-level capture would need explicit validation before claiming it works.
- App signup, actual trial activation and payment completion are not observable from this website's buttons; app instrumentation/attribution must be assessed separately. No app integration was made.
- North-star metric: monthly number of coaches who installed KERRI through the website. It is not covered by the current custom-event catalog; app/store attribution would be needed to measure completed installations, not merely clicks.

## Performance baseline, not a post-change field verdict
- Production homepage rolling seven-day p75, deduplicated per metric ID: LCP 2.931s (10 samples), INP 260ms (4), CLS 0.010 (5). LCP/INP need improvement under standard thresholds; sample size is too small for a broad claim.
- Mobile-only matching user agents joined by page_view_id: LCP 1.212s (5), FCP 0.901s (9), TTFB 0.275s (11); no mobile CLS/INP rows. Mobile Core Web Vitals cannot be declared fully passing.
- Responsive high-priority hero preloads (~85–90KB WebP) and lazy below-fold imagery remain. No performance redesign was made, preserving the requested scope.
- New production field results are unavailable until publishing and collecting subsequent visits.

## Release
Not published: review changes in the preview before publishing. Search metadata at kerri.co.kr remains the previously published version until Publish changes.