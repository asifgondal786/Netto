# Architecture

Netto is intentionally simple and dependency-free.

## Frontend

The browser app loads `index.html`, which renders controls and uses `assets/js/app.js` for state and UI logic. Pricing values are stored in `assets/js/gateways.js` and math lives in `assets/js/calc.js`.

## CLI

The `bin/netto.mjs` script reads the same pricing model and prints a net or target-charge result for a given gateway.

## Canary

The `scripts/verify-rates.mjs` script checks that gateway fee values are valid numeric entries. This acts as a lightweight rate canary for CI.
