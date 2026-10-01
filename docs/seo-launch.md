# SEO launch checklist

The site includes crawlable HTML for the home page, processor/freelancer/transfer guides, and processor comparisons. Each guide links into the calculator and related pages. Query-string calculator states are for sharing and are not separate search landing pages.

## Implemented

- Absolute canonical and Open Graph URLs use the Netlify production hostname.
- `sitemap.xml` lists the home page, processor and comparison guides, plus the privacy page; `robots.txt` allows crawling and points to the sitemap.
- Netlify publishes the repository root and runs the test suite before deploys.
- Google Search Console ownership is verified using the homepage HTML tag. The original four-page sitemap was accepted; the expanded ten-URL sitemap must be submitted again after deployment.
- Bing Webmaster Tools imported the verified site and original sitemap from Google Search Console. Resubmit the expanded sitemap after deployment; Bing reports can take up to 48 hours to update.
- Plausible's manual script records path-only pageviews and custom input, mode, and share-copy events. Event payloads omit amounts and share URLs.

## Audit results

- Google's Rich Results Test detected one valid Software Apps item on the home page. Its only issue is the optional `aggregateRating`; Netto does not publish ratings or reviews, so none are fabricated. FAQ structured data is also present on pages with visible FAQ content.
- PageSpeed Insights reported a 90 mobile performance score, LCP 2.9 s, TBT 0 ms, and CLS 0. No field data was available yet. Font preconnects are in place; repeat the test after deployment to measure their effect.
- A `site:` search returned no results at the time of testing. Newly submitted pages may need time before they appear in search.
- PageSpeed Insights reported a 90 mobile performance score, LCP 2.9 s, TBT 0 ms, and CLS 0 on the prior version. The new preconnects and expanded pages need a fresh production measurement.

## Ongoing maintenance

1. Add `shimmering-crumble-b2abe8.netlify.app` to the Plausible account to view analytics. Without that account setup, the public script cannot populate a dashboard.
2. Resubmit the expanded sitemap in Google Search Console and Bing Webmaster Tools after deployment; monitor processing and URL indexing.
3. Publish appropriate directory listings and community posts using the owner-reviewed copy in `distribution-kit.md`. These require owner accounts and should be shared only where relevant.
4. Review provider pricing sources before changing the calculator's static fee estimates.
5. Dynamic PNG Open Graph generation remains separate: it needs a server-side image endpoint, which is outside the current no-build static setup.

Keep fee descriptions accurate and review source rates against provider pricing pages before publishing rate-specific claims. The current calculator values are estimates, not live-verified quotes.