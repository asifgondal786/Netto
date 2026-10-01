import { getGatewayDefaults as getGatewayDefaultsFromSource } from './gateways.js';

export const getGatewayDefaults = getGatewayDefaultsFromSource;

export function calculateNet(gateway, grossAmount) {
  const gross = Number(grossAmount ?? 0);
  const fee = gross * gateway.feeRate + gateway.fixedFee;
  const net = gross - fee;

  return {
    gross,
    fee: Number(fee.toFixed(4)),
    net: Number(net.toFixed(4))
  };
}

export function calculateChargeToHitNet(gateway, targetNet) {
  const netTarget = Number(targetNet ?? 0);
  const gross = (netTarget + gateway.fixedFee) / (1 - gateway.feeRate);
  const fee = gross - netTarget;

  return {
    gross: Number(gross.toFixed(4)),
    fee: Number(fee.toFixed(4)),
    net: Number(netTarget.toFixed(4))
  };
}

export function compareGateways(amount, gatewayList = getGatewayDefaults()) {
  return gatewayList
    .map((gateway) => ({
      ...gateway,
      ...calculateNet(gateway, amount)
    }))
    .sort((a, b) => b.net - a.net);
}
