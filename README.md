# Netto

Netto is a zero-dependency payment fee calculator for sellers. It shows how much remains after processor fees and calculates the charge needed to hit a target net amount.

## Features

- Stripe, PayPal, Square, Shopify Payments, Etsy, eBay, Gumroad, and Custom gateways
- Estimate net from a sale amount
- Solve for the charge needed to hit a target net
- Compare two gateways side by side
- Cross-gateway ledger for quick comparison
- Shareable URL state
- Light and dark themes with system preference and saved choice
- Search-friendly Stripe, PayPal, and Etsy calculator guides
- CLI and rate canary support

## Run locally

```bash
cd netto
python -m http.server 8000
```

Open the browser to:

```text
http://localhost:8000/
```

## CLI

```bash
node bin/netto.mjs --gateway stripe --amount 100
```

## Tests

```bash
node --test
```

## No build step

The site works directly in a browser without a bundler or build pipeline.
