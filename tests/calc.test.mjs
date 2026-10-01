import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateNet,
  calculateChargeToHitNet,
  compareGateways,
  getGatewayDefaults
} from '../assets/js/calc.js';

test('calculateNet applies rate and fixed fee correctly', () => {
  const result = calculateNet({ feeRate: 0.029, fixedFee: 0.3 }, 100);
  assert.equal(result.gross, 100);
  assert.equal(result.fee, 3.2);
  assert.equal(result.net, 96.8);
});

test('calculateChargeToHitNet solves for required charge', () => {
  const result = calculateChargeToHitNet({ feeRate: 0.029, fixedFee: 0.3 }, 80);
  assert.equal(result.gross, 82.6982);
  assert.equal(result.fee, 2.6982);
  assert.equal(result.net, 80);
});

test('compareGateways returns sorted net amounts across gateways', () => {
  const gateways = getGatewayDefaults();
  const rows = compareGateways(100, gateways);
  assert.equal(Array.isArray(rows), true);
  assert.equal(rows.length, gateways.length);
  assert.ok(rows[0].net >= rows[rows.length - 1].net);
});
