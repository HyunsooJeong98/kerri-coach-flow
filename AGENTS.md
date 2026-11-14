<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Legal document pages reuse `PolicyLayout` and its typography primitives so the terms and privacy pages retain the same presentation without duplicating layout styles.
- Privacy policy content lives in a verbatim browser-safe content module; link formatting must not alter the legal text.

- Sitemap is served by src/routes/sitemap[.]xml.ts; every route must declare staticData.sitemap, and coach profiles are included only when is_public is true (same filter as the profile page).
- Keep page-specific SEO metadata and canonical links in leaf route heads; root owns only shared defaults to prevent inherited page identity and duplicate canonicals.
