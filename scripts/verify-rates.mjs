#!/usr/bin/env node
import gateways from '../assets/js/gateways.js';

const invalid = gateways.filter((gateway) => {
  return typeof gateway.feeRate !== 'number' || typeof gateway.fixedFee !== 'number' || gateway.feeRate < 0 || gateway.fixedFee < 0;
});

if (invalid.length > 0) {
  console.error('Invalid gateway data detected:', invalid);
  process.exit(1);
}

console.log(`Verified ${gateways.length} gateway entries.`);
