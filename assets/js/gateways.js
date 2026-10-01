export const GATEWAYS = [
  { id: 'stripe', name: 'Stripe', feeRate: 0.029, fixedFee: 0.3, parts: [['Card processing', 2.9, 0.3]], intl: 1.5, conv: 1 },
  { id: 'paypal', name: 'PayPal', feeRate: 0.0349, fixedFee: 0.49, parts: [['Checkout', 3.49, 0.49]], intl: 1.5 },
  { id: 'square', name: 'Square', feeRate: 0.029, fixedFee: 0.3, parts: [['Online payment', 2.9, 0.3]] },
  { id: 'shopify', name: 'Shopify Payments', feeRate: 0.029, fixedFee: 0.3, parts: [['Online card rate', 2.9, 0.3]] },
  { id: 'etsy', name: 'Etsy', feeRate: 0.065, fixedFee: 0.2, parts: [['Transaction fee', 6.5, 0], ['Payment processing', 3, 0.25], ['Listing fee', 0, 0.2]] },
  { id: 'ebay', name: 'eBay', feeRate: 0.136, fixedFee: 0.4, parts: [['Final value fee', 13.6, 0.4]] },
  { id: 'gumroad', name: 'Gumroad', feeRate: 0.1, fixedFee: 0.5, parts: [['Direct sale fee', 10, 0.5]] },
  { id: 'custom', name: 'Custom', feeRate: 0.029, fixedFee: 0.3, parts: [['Your rate', 2.9, 0.3]], intl: 0, conv: 0 }
];

export function getGatewayDefaults() {
  return GATEWAYS.map((gateway) => ({
    ...gateway,
    parts: gateway.parts.map((part) => [...part])
  }));
}

export function getGatewayById(id) {
  return getGatewayDefaults().find((gateway) => gateway.id === id) || getGatewayDefaults()[0];
}

export default GATEWAYS;
