import { CustomError } from "../../../errors/CustomError";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

   export const validateAbsoluteUrl = (value: string, fieldName: string) => {
        try {
            const parsed = new URL(value);
            if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
                throw new Error(`${fieldName} must be https`);
            }
        } catch {
            throw new CustomError(400, `${fieldName} must be a valid absolute URL`);
        }
    };

export const generateBkashAutopayHeaders = (method: string, urlPath: string, body: any, appKey: string, appSecret: string, bkashUrl: string) => {
  const crypto = require("crypto");
  const host = new URL(bkashUrl).host;
  const date = new Date().toISOString().replace(/\.\d{3}Z$/, "Z"); // GMT
  const bodyString = JSON.stringify(body);

  const canonicalHeaders = `content-type:application/json\nhost:${host}\nx-amz-date:${date}\n`;
  const signedHeaders = "content-type;host;x-amz-date";

  const stringToSign = `${method}\n${urlPath}\n${date}\n${canonicalHeaders}\n${signedHeaders}\n${bodyString}`;
    try {
        console.debug('[generateBkashAutopayHeaders] host, urlPath, stringToSign preview:', { host, urlPath, stringToSign: String(stringToSign).slice(0, 300) });
    } catch (e) {}
  const signature = crypto.createHmac("sha256", appSecret).update(stringToSign).digest("base64");

  const authorization = `BKASH1-HMAC-SHA256 Credential=${appKey}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  const timeStamp = new Date().toISOString();
  const headers: any = {
    Authorization: authorization,
    "x-api-key": appKey,
    "Content-Type": "application/json",
    Accept: "application/json",
    version: process.env.BKASH_API_VERSION || "v1.0",
    channelId: process.env.BKASH_CHANNEL_ID || "WEB",
    timeStamp,
  };

  return headers;
};

export const buildBkashAutopayRequestData = (payload: any, baseUrl: string) => {
  const {
    amount,
    amountQueryUrl,
    frequency = "CALENDAR_MONTH",
    startDate,
    expiryDate,
    payer,
    payerType = "CUSTOMER",
    firstPaymentIncludedInCycle = true,
    maxCapRequired = false,
    serviceId,
    merchantShortCode,
  } = payload;

  if (!amount || amount <= 0) {
    throw new CustomError(400, "Invalid amount for autopay subscription");
  }

  const resolvedRedirectUrl = `${baseUrl.replace(/\/$/, "")}/api/v1/payment/verify`;
  const resolvedAmountQueryUrl =
    typeof amountQueryUrl === "string" && amountQueryUrl.trim()
      ? amountQueryUrl.trim()
      : resolvedRedirectUrl;

  validateAbsoluteUrl(resolvedRedirectUrl, "redirectUrl");
  validateAbsoluteUrl(resolvedAmountQueryUrl, "amountQueryUrl");

  const subscriptionRequestId = `KUF-SB${uuidv4().replace(/-/g, "").slice(0, 12)}`;
  const resolvedStartDate = startDate || moment().format("YYYY-MM-DD");
  const resolvedExpiryDate = expiryDate || moment().add(1, "year").format("YYYY-MM-DD");
  const resolvedMerchantShortCode =
    merchantShortCode || process.env.BKASH_MERCHANT_SHORTCODE || "";

  const body: any = {
    subscriptionRequestId,
    serviceId: serviceId || Number(process.env.BKASH_SERVICE_ID) || 1,
    amountQueryUrl: resolvedAmountQueryUrl,
    subscriptionReference: `sub_${uuidv4().slice(-8)}`,
    paymentType: "FLEXIBLE",
    subscriptionType: "WITH_PAYMENT",
    amount,
    firstPaymentAmount: amount,
    maxCapRequired,
    frequency,
    startDate: resolvedStartDate,
    expiryDate: resolvedExpiryDate,
    merchantShortCode: resolvedMerchantShortCode,
    redirectUrl: resolvedRedirectUrl,
    payerType,
    payer: null,
    currency: "BDT",
    firstPaymentIncludedInCycle,
  };

  return {
    requestBody: body,
    recordData: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      amount,
      frequency,
      paymentType: body.paymentType,
      payerType,
      serviceId: body.serviceId,
      merchantShortCode: resolvedMerchantShortCode,
      status: "initiated",
      isActive: true,
      deductionFailureCount: 0,
      metadata: {
        bkash: {
          subscriptionRequestId,
          redirectURL: resolvedRedirectUrl,
          expirationTime: moment(resolvedExpiryDate).endOf("day").toISOString(),
        },
      },
      subscriptionId: subscriptionRequestId,
      subscriptionReference: body.subscriptionReference,
      startDate: resolvedStartDate,
      endDate: resolvedExpiryDate,
      gatewayResponse: null,
    },
  };
};