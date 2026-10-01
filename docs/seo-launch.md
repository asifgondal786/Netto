# SEO launch checklist

The site includes crawlable HTML for the home page, processor/freelancer/transfer guides, and processor comparisons. Each guide links into the calculator and related pages. Query-string calculator states are for sharing and are not separate search landing pages.

## Implemented

- Absolute canonical and Open Graph URLs use the Netlify production hostname.
- The shared 1200x630 PNG fallback is at `assets/img/og-default.png` and is referenced by Open Graph and Twitter metadata on all ten sitemap pages.
- Bricolage Grotesque uses `font-display: swap` with a preloaded Latin WOFF2; IBM Plex Mono CSS is loaded asynchronously.
- `sitemap.xml` lists the home page, processor and comparison guides, plus the privacy page; `robots.txt` allows crawling and points to the sitemap.
- Netlify publishes the repository root and runs the test suite before deploys.
- Google Search Console ownership is verified using the homepage HTML tag. The expanded ten-URL sitemap was resubmitted and reports `Success` with ten discovered URLs.
- Bing Webmaster Tools imported the site and sitemap from Google Search Console. Its sitemap status is `Success` with no errors or warnings, but the discovered-URL count still shows the original four-page snapshot and may take time to sync.
- Plausible's manual script records path-only pageviews and custom input, mode, and share-copy events. Event payloads omit amounts and share URLs.

## Audit results

- Google's Rich Results Test detected one valid Software Apps item on the home page. Its only issue is the optional `aggregateRating`; Netto does not publish ratings or reviews, so none are fabricated. A Stripe guide test detected one valid Breadcrumb item. FAQ JSON-LD parses, but Google reports no eligible FAQ rich result for these pages.
- The latest PageSpeed Insights run scored 90 mobile, with LCP 2.9 s, TBT 0 ms, and CLS 0. Field data is unavailable. The overall target is met, but lab LCP remains above the 2.5 s good threshold.
- Google Search Console reports the ten-URL sitemap as successful with ten discovered pages. The current `site:` query still returns no results; wait for indexing and recheck later.
- Bing Webmaster Tools still shows four discovered URLs from its GSC import. Its sitemap status is successful with no errors or warnings; allow time for the imported count to refresh.

## Ongoing maintenance

1. Add `shimmering-crumble-b2abe8.netlify.app` to the Plausible account to view analytics. Without that account setup, the public script cannot populate a dashboard.
2. Recheck Bing's imported sitemap count after its next processing interval. If Google still shows no pages after 5-7 days, inspect `/`, `/stripe-fee-calculator.html`, and `/paypal-fee-calculator.html` in Search Console and request indexing.
3. Publish appropriate directory listings and community posts using the owner-reviewed copy in `distribution-kit.md`. These require owner accounts and should be shared only where relevant.
4. Review provider pricing sources before changing the calculator's static fee estimates.
5. Dynamic, per-result Open Graph images remain separate: the deployed fallback is static; generating result-specific PNGs needs a server-side image endpoint.

Keep fee descriptions accurate and review source rates against provider pricing pages before publishing rate-specific claims. The current calculator values are estimates, not live-verified quotes.