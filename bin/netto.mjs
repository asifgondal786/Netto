#!/usr/bin/env node
import { getGatewayDefaults, calculateNet, calculateChargeToHitNet } from '../assets/js/calc.js';

function printHelp() {
  console.log(`Usage: netto [options]

Options:
  --gateway <id>          Gateway id (stripe, paypal, square, shopify, etsy, ebay, gumroad, custom)
  --amount <value>        Sale amount to evaluate
  --target-net <value>    Target net to achieve
  --help                  Show this help text
`);
}

function parseArgs(argv) {
  const values = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === '--help') {
      values.help = true;
      continue;
    }

    if (arg === '--gateway') {
      values.gateway = next;
      i += 1;
      continue;
    }

    if (arg === '--amount') {
      values.amount = Number(next);
      i += 1;
      continue;
    }

    if (arg === '--target-net') {
      values.targetNet = Number(next);
      i += 1;
      continue;
    }
  }

  return values;
}

const args = parseArgs(process.argv.slice(2));

if (args.help || Object.keys(args).length === 0) {
  printHelp();
  process.exit(args.help ? 0 : 0);
}

const gateways = getGatewayDefaults();
const gateway = gateways.find((item) => item.id === (args.gateway || 'stripe')) || gateways[0];
const amount = Number(args.amount ?? 100);
const targetNet = Number(args.targetNet ?? 0);

if (Number.isFinite(targetNet) && targetNet > 0) {
  const result = calculateChargeToHitNet(gateway, targetNet);
  console.log(`Gateway: ${gateway.name}`);
  console.log(`Target net: $${result.net.toFixed(2)}`);
  console.log(`Required charge: $${result.gross.toFixed(2)}`);
  console.log(`Fee: $${result.fee.toFixed(2)}`);
  process.exit(0);
}

const result = calculateNet(gateway, amount);
console.log(`Gateway: ${gateway.name}`);
console.log(`Gross sale: $${result.gross.toFixed(2)}`);
console.log(`Processing fee: $${result.fee.toFixed(2)}`);
console.log(`Net payout: $${result.net.toFixed(2)}`);
