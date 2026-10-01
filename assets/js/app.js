import { GATEWAYS, getGatewayById } from './gateways.js';
import { calculateNet, calculateChargeToHitNet, compareGateways } from './calc.js';

const S = {
  route: 'stripe',
  a: 'stripe',
  b: 'paypal',
  mode: 'forward',
  amount: 100,
  cogs: 0,
  orders: 100,
  intl: false,
  conv: false,
  cpct: 2.9,
  cflat: 0.3,
  printed: false
};

const els = {
  tabs: document.querySelector('#tabs'),
  gatewaySelect: document.querySelector('#gatewaySelect'),
  amountInput: document.querySelector('#amountInput'),
  cogsInput: document.querySelector('#cogsInput'),
  ordersInput: document.querySelector('#ordersInput'),
  percentInput: document.querySelector('#percentInput'),
  flatInput: document.querySelector('#flatInput'),
  intlInput: document.querySelector('#intlInput'),
  convInput: document.querySelector('#convInput'),
  customPanel: document.querySelector('#customPanel'),
  out: document.querySelector('#out'),
  ledger: document.querySelector('#ledger'),
  ledgerHint: document.querySelector('#ledgerHint'),
};

const money = (n) => {
  const value = Number(n || 0);
  const sign = value < 0 ? '−' : '';
  return `${sign}$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const fp = (n) => Number(n.toFixed(2));

function parts(g) {
  const ps = g.id === 'custom'
    ? [['Your rate', S.cpct, S.cflat]]
    : g.parts.map((part) => part.slice());

  if (S.intl && g.intl) ps.push(['International card', g.intl, 0]);
  if (S.conv && g.conv) ps.push(['Currency conversion', g.conv, 0]);

  return ps;
}

function calc(g, amount = S.amount, mode = S.mode) {
  const ps = parts(g);
  const pct = ps.reduce((sum, part) => sum + part[1], 0) / 100;
  const flat = ps.reduce((sum, part) => sum + part[2], 0);
  const price = mode === 'forward' ? amount : (pct < 1 ? (amount + flat) / (1 - pct) : 0);
  const lines = ps.map((part) => ({
    label: part[0],
    pct: part[1],
    flat: part[2],
    amt: price * part[1] / 100 + part[2]
  }));
  const fee = lines.reduce((sum, line) => sum + line.amt, 0);

  return { g, pct, flat, price, lines, fee, net: price - fee, eff: price ? (fee / price) * 100 : 0 };
}

function ln(label, value, cls = '') {
  return `<div class="ln ${cls}"><span>${label}</span><i></i><b>${value}</b></div>`;
}

function receipt(c, animate = false) {
  const rev = S.mode === 'reverse';
  let html = `<div class="receipt${animate ? ' print' : ''}"><div class="rh">${c.g.name}</div><div class="rs">${rev ? 'price to charge' : 'fee receipt'}</div>`;
  html += ln(rev ? 'Charge customer' : 'Sale', money(c.price), 'strong');
  c.lines.forEach((line) => {
    const tag = line.pct ? ` (${fp(line.pct)}%)` : '';
    html += ln(`${line.label}${tag}`, '−' + money(line.amt), 'sub');
  });
  html += '<hr>' + ln('You keep', money(c.net), 'big');
  html += `<div class="eff">Fees take ${fp(c.eff)}% of this sale</div>`;
  if (S.cogs > 0) html += ln('COGS', money(S.cogs), 'neg');
  if (S.orders > 0) html += ln('Orders / month', String(S.orders), 'pos');
  return html + '</div>';
}

function cross(a, b) {
  const dp = a.pct - b.pct;
  if (Math.abs(dp) < 1e-9) return null;
  const x = (b.flat - a.flat) / dp;
  return x > 0 ? x : null;
}

function verdict(a, b) {
  const d = a.fee - b.fee;
  let statement = '';
  let small = '';
  if (Math.abs(d) < 0.005) {
    statement = 'They are effectively tied on this sale.';
    small = 'The difference is within rounding noise.';
  } else {
    statement = `${d < 0 ? a.g.name : b.g.name} costs ${money(Math.abs(d))} less ${S.mode === 'forward' ? 'on this sale' : 'to net this amount'}.`;
  }

  const x = cross(a, b);
  if (x) {
    const low = a.fee < b.fee ? a : b;
    const high = a.fee < b.fee ? b : a;
    small = `Crossover at ${money(x)} per sale. Below it ${low.g.name} is cheaper; above it ${high.g.name} wins.`;
  }

  return `<div class="verdict">${statement}<small>${small}</small></div>`;
}

function renderOut() {
  const gateway = getGatewayById(S.route === 'compare' ? S.a : S.route);
  const result = calc(gateway, Number(els.amountInput.value || 0), S.mode);
  const animate = !S.printed;
  S.printed = true;

  if (S.route === 'compare') {
    const a = calc(getGatewayById(S.a), Number(els.amountInput.value || 0), S.mode);
    const b = calc(getGatewayById(S.b), Number(els.amountInput.value || 0), S.mode);
    els.out.innerHTML = `${verdict(a, b)}<div class="pair">${receipt(a, animate)}${receipt(b, animate)}</div>`;
  } else {
    els.out.innerHTML = receipt(result, animate);
  }
}

function renderLedger() {
  const rows = compareGateways(Number(els.amountInput.value || 0), GATEWAYS);
  const best = rows[0];
  const current = getGatewayById(S.route === 'compare' ? S.a : S.route);

  els.ledgerHint.textContent = `Best net at this sale size: ${best.name} with ${money(best.net)}`;
  els.ledger.innerHTML = rows
    .map((row) => {
      const width = (row.net / rows[0].net) * 100;
      const cls = row.name === best.name ? 'best' : row.name === current.name ? 'cur' : '';
      return `
        <div class="row ${cls}">
          <span class="nm">${row.name}</span>
          <span class="bar"><s style="width:${Math.max(width, 12)}%"></s></span>
          <b>${money(row.fee)}</b>
          <em>${money(row.net)}</em>
        </div>
      `;
    })
    .join('');
}

function renderTabs() {
  const tabs = [
    ...GATEWAYS.filter((gateway) => gateway.id !== 'custom').map((gateway) => ({ id: gateway.id, label: gateway.name })),
    { id: 'compare', label: 'Compare gateways' }
  ];

  els.tabs.innerHTML = tabs
    .map((tab) => `<a href="?route=${tab.id}" aria-current="${S.route === tab.id ? 'page' : 'false'}" data-route="${tab.id}">${tab.label}</a>`)
    .join('');

  els.tabs.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      S.route = link.dataset.route;
      render();
    });
  });
}

function renderCustom() {
  els.customPanel.classList.toggle('hide', S.route !== 'custom' && !(S.route === 'stripe' && els.gatewaySelect.value === 'custom'));
}

function updateUrl() {
  const params = new URLSearchParams();
  params.set('route', S.route);
  params.set('gateway', els.gatewaySelect.value);
  params.set('amount', String(els.amountInput.value || 100));
  params.set('cogs', String(els.cogsInput.value || 0));
  params.set('orders', String(els.ordersInput.value || 100));
  params.set('cpct', String(els.percentInput.value || 2.9));
  params.set('cflat', String(els.flatInput.value || 0.3));
  params.set('intl', String(els.intlInput.checked));
  params.set('conv', String(els.convInput.checked));
  if (S.route === 'compare') {
    params.set('a', S.a);
    params.set('b', S.b);
  }
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}

function syncFromUrl() {
  const params = new URLSearchParams(window.location.search);
  S.route = params.get('route') || S.route;
  S.mode = params.get('mode') || S.mode;
  S.amount = Number(params.get('amount') || S.amount);
  S.cogs = Number(params.get('cogs') || S.cogs);
  S.orders = Number(params.get('orders') || S.orders);
  S.cpct = Number(params.get('cpct') || S.cpct);
  S.cflat = Number(params.get('cflat') || S.cflat);
  S.intl = params.get('intl') === 'true';
  S.conv = params.get('conv') === 'true';
  S.a = params.get('a') || S.a;
  S.b = params.get('b') || S.b;
}

function setGatewaySelectOptions() {
  const options = GATEWAYS.map((gateway) => `<option value="${gateway.id}">${gateway.name}</option>`).join('');
  els.gatewaySelect.innerHTML = options;
  els.gatewaySelect.value = S.route === 'compare' ? 'stripe' : S.route;
}

function render() {
  setGatewaySelectOptions();
  renderTabs();
  renderCustom();
  els.amountInput.value = String(S.amount);
  els.cogsInput.value = String(S.cogs);
  els.ordersInput.value = String(S.orders);
  els.percentInput.value = String(S.cpct);
  els.flatInput.value = String(S.cflat);
  els.intlInput.checked = S.intl;
  els.convInput.checked = S.conv;
  document.querySelectorAll('input[name="mode"]').forEach((input) => {
    input.checked = input.value === S.mode;
  });
  renderOut();
  renderLedger();
  updateUrl();
}

function bind() {
  els.gatewaySelect.addEventListener('change', (event) => {
    S.route = event.target.value;
    render();
  });

  els.amountInput.addEventListener('input', (event) => {
    S.amount = Number(event.target.value || 0);
    render();
  });

  els.cogsInput.addEventListener('input', (event) => {
    S.cogs = Number(event.target.value || 0);
    render();
  });

  els.ordersInput.addEventListener('input', (event) => {
    S.orders = Number(event.target.value || 0);
    render();
  });

  els.percentInput.addEventListener('input', (event) => {
    S.cpct = Number(event.target.value || 0);
    render();
  });

  els.flatInput.addEventListener('input', (event) => {
    S.cflat = Number(event.target.value || 0);
    render();
  });

  els.intlInput.addEventListener('change', () => {
    S.intl = els.intlInput.checked;
    render();
  });

  els.convInput.addEventListener('change', () => {
    S.conv = els.convInput.checked;
    render();
  });

  document.querySelectorAll('input[name="mode"]').forEach((input) => {
    input.addEventListener('change', () => {
      S.mode = input.value;
      render();
    });
  });
}

function init() {
  syncFromUrl();
  bind();
  render();
}

init();
