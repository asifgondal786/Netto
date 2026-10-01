import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cliPath = fileURLToPath(new URL('../bin/netto.mjs', import.meta.url));

test('cli prints usage information', () => {
  const output = execFileSync(process.execPath, [cliPath, '--help'], { encoding: 'utf8' });
  assert.match(output, /Usage: netto/);
});

test('cli calculates net for stripe', () => {
  const output = execFileSync(process.execPath, [cliPath, '--gateway', 'stripe', '--amount', '100'], {
    encoding: 'utf8'
  });
  assert.match(output, /96\.8/);
});
