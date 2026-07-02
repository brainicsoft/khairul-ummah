import { AutopayCharge } from './autopayCharge.model';

type RecordChargePayload = {
  autopayId: string;
  subscriptionId: string;
  amount?: number;
  trxID?: string;
  chargeType?: 'first_payment' | 'recurring' | 'manual';
  gatewayResponse?: unknown;
};

export const recordAutopayCharge = async (payload: RecordChargePayload) => {
  if (!payload.autopayId || !payload.subscriptionId || !payload.amount) {
    return null;
  }

  const existing = await AutopayCharge.findOne({
    autopayId: payload.autopayId,
    trxID: payload.trxID || payload.subscriptionId,
    chargeType: payload.chargeType || 'recurring',
  });

  if (existing) {
    return existing;
  }

  return AutopayCharge.create({
    autopayId: payload.autopayId,
    subscriptionId: payload.subscriptionId,
    amount: payload.amount,
    trxID: payload.trxID || payload.subscriptionId,
    status: 'success',
    chargeType: payload.chargeType || 'recurring',
    gatewayResponse: payload.gatewayResponse,
    chargedAt: new Date(),
  });
};

export const getAutopayCharges = async (autopayId: string) => {
  return AutopayCharge.find({ autopayId }).sort({ chargedAt: -1 }).lean();
};
