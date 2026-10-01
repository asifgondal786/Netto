# SEO launch checklist

The site includes crawlable HTML for the home page and dedicated Stripe, PayPal, and Etsy guides. The processor guides link to one another and into the interactive calculator. Query-string calculator states are for sharing and are not separate search landing pages.

## Before production launch

The production hostname has not been configured in this repository. Once it is known:

1. Add an absolute canonical URL to the home page and each processor guide. Point calculator query-string variants to the canonical home page.
2. Publish an XML sitemap containing the production URLs for `index.html`, `stripe-fee-calculator.html`, `paypal-fee-calculator.html`, and `etsy-fee-calculator.html`.
3. Add the absolute sitemap URL to `robots.txt` and verify that every sitemap URL returns HTTP 200 over HTTPS.
4. Configure one preferred HTTPS hostname and redirect alternate hostnames and duplicate slash variants to it.
5. Verify the domain in Google Search Console and Bing Webmaster Tools, submit the sitemap, and inspect the landing page URLs.
6. Monitor indexing and search performance. Discovery and indexing are controlled by search engines and cannot be guaranteed by markup alone.

Keep fee descriptions accurate and review source rates against provider pricing pages before publishing rate-specific claims. The current calculator values are estimates, not live-verified quotes.