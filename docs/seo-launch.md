# SEO launch checklist

The site includes crawlable HTML for the home page, processor/freelancer/transfer guides, and processor comparisons. Each guide links into the calculator and related pages. Query-string calculator states are for sharing and are not separate search landing pages.

## Implemented

- Absolute canonical and Open Graph URLs use the Netlify production hostname.
- A 1200x630 static social image is linked through Open Graph and Twitter metadata on all ten pages.
- Bricolage Grotesque is preloaded with `font-display: swap`; IBM Plex Mono CSS remains asynchronous.
- `sitemap.xml` lists the home page, processor and comparison guides, plus the privacy page; `robots.txt` allows crawling and points to the sitemap.
- Netlify publishes the repository root and runs the test suite before deploys.
- Google Search Console ownership is verified using the homepage HTML tag. The expanded ten-URL sitemap was resubmitted and reports `Success` with ten discovered URLs.
- Bing Webmaster Tools imported the site and sitemap from Google Search Console. Its sitemap status is `Success` with no errors or warnings, but the discovered-URL count still shows the original four-page snapshot and may take time to sync.
- Plausible's manual script records path-only pageviews and custom input, mode, and share-copy events. Event payloads omit amounts and share URLs.

## Audit results

- Google's Rich Results Test detected one valid Software Apps item on the home page. Its only issue is the optional `aggregateRating`; Netto does not publish ratings or reviews, so none are fabricated. A Stripe guide test detected one valid Breadcrumb item. FAQ JSON-LD parses, but Google reports no eligible FAQ rich result for these pages.
- The latest PageSpeed Insights run scored 92 mobile, with LCP 2.4 s, TBT 0 ms, and CLS 0. No field data/INP is available yet.
- Google Search Console reports the ten-URL sitemap as successful with ten discovered pages. The current `site:` query still returns no results; wait for indexing and recheck later.
- Bing Webmaster Tools still shows four discovered URLs from its GSC import. Its sitemap status is successful with no errors or warnings; allow time for the imported count to refresh.

## Ongoing maintenance

1. Register `shimmering-crumble-b2abe8.netlify.app` in the Plausible account to view analytics. The site script and privacy-minimized events are deployed; dashboard data requires a Plausible account/site setup.
2. Recheck Bing's imported sitemap count; it still showed four URLs after the ten-URL Google sitemap resubmission.
3. After 5-7 days, if `site:shimmering-crumble-b2abe8.netlify.app` still returns no pages, inspect `/`, `/stripe-fee-calculator.html`, and `/paypal-fee-calculator.html` in Search Console and request indexing.
4. Publish appropriate directory listings and community posts using the owner-reviewed copy in `distribution-kit.md`. These require owner accounts and should be shared only where relevant.
5. Review provider pricing sources before changing the calculator's static fee estimates.
6. The static social card is implemented; dynamic, per-result PNG cards still need a server-side image endpoint.

Keep fee descriptions accurate and review source rates against provider pricing pages before publishing rate-specific claims. The current calculator values are estimates, not live-verified quotes.