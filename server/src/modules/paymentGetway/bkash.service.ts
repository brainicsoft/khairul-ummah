import axios from "axios";
import cron from "node-cron";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { baseUrl, bkashKey, bkashSecret, bkashUrl, bkashRecurringUrl } from "../../config";
import { CustomError } from "../../errors/CustomError";

// Token storage (like private variables)
let idToken: string | null = null;
let refreshToken: string | null = null;

/**
 * Generate new bKash ID Token
 */
export const generateIdToken = async (): Promise<string |null> => {
    try {
        console.log(moment().toISOString(), "Generating bKash ID Token...");

        const { data } = await axios.post(
            `${process.env.BKASH_API_URL}/checkout/token/grant`,
            {
                app_key: bkashKey,
                app_secret: bkashSecret,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    username: process.env.BKASH_USER,
                    password: process.env.BKASH_PASS,
                },
            }
        );

        console.log("bKash:", data?.statusMessage);

        idToken = data.id_token;
        refreshToken = data.refresh_token;

        return idToken!;
    } catch (error: any) {
        console.error("bKash grant token error:", error || error);
        // throw new Error("Failed to generate bKash ID Token");
        return null;
    }
};

/**
 * Refresh bKash token
 */
export const refreshBkashToken = async (): Promise<string | null> => {
    try {
        console.log(moment().toISOString(), "Refreshing bKash Token...");

        const { data } = await axios.post(
            `${bkashUrl}/checkout/token/refresh`,
            {
                app_key: bkashKey,
                app_secret: bkashSecret,
                refresh_token: refreshToken,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    username: process.env.BKASH_USER,
                    password: process.env.BKASH_PASS,
                },
            }
        );

        console.log("bKash:", data?.statusMessage);

        idToken = data.id_token;
        refreshToken = data.refresh_token;

        return idToken!;
    } catch (error: any) {
        console.error("bKash refresh token error:", error.response?.data || error);
        // throw new Error("Failed to refresh bKash token");
        // ❗IMPORTANT: Throw করবেন না, safe fallback return দিন:
        return null;  
    }
};

/**
 * Getter for token
 */
export const getBkashIdToken = () => idToken;

/**
 * Initialize token + cron
 */
export const initBkash = async () => {
    await generateIdToken();

    // Auto refresh every 30 minutes
    cron.schedule("*/30 * * * *", () => {
        refreshBkashToken();
    });

    console.log("bKash service initialized");
};


// bkash payment creation

export const createBkashPayment = async (payload: any) => {
     const { name, email, phone, amount, donationType, donorMessage,method='bkash' } = payload;
  const bkashResponse = await axios.post(
    `${bkashUrl}/checkout/create`,
    {
      mode: "0011",
      payerReference: phone || "donor",
      callbackURL: `${baseUrl}/api/v1/payment/verify`,
      amount,
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: "Inv" + uuidv4().slice(-5),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: getBkashIdToken(),
        "x-app-key": bkashKey,
      },
    }
  );
  const data = bkashResponse.data;
  if (!data.bkashURL) throw new CustomError(data.statusCode || 500, data.errorMessage || 'internal server error ')
    return data
}



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

  return {
    Authorization: authorization,
    "X-Amz-Date": date,
    "x-app-key": appKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

/**
 * Create subscription (autopay) in bKash gateway
 */
export const createBkashSubscription = async (payload: any) => {
    const {
        amount,
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

    if (!amount || amount <= 0) throw new CustomError(400, "Invalid amount for autopay subscription");

    const subscriptionRequestId = `sr_${uuidv4()}`;
    const body: any = {
        subscriptionRequestId,
        serviceId: serviceId || Number(process.env.BKASH_SERVICE_ID) || 1,
        subscriptionReference: `sub_${uuidv4().slice(-8)}`,
        paymentType: "FLEXIBLE",
        subscriptionType: "WITH_PAYMENT",
        amount,
        firstPaymentAmount: amount,
        maxCapRequired,
        frequency,
        startDate: startDate || moment().format("YYYY-MM-DD"),
        expiryDate: expiryDate || moment().add(1, "year").format("YYYY-MM-DD"),
        merchantShortCode: merchantShortCode || process.env.BKASH_MERCHANT_SHORTCODE || "",
        redirectUrl: `${baseUrl}/api/v1/payment/bkash/autopay/verify`,
        payerType,
        payer: payer || "",
        currency: "BDT",
        firstPaymentIncludedInCycle,
    };

    const urlPath = `/api/subscription`;
    const requestUrl = `${bkashRecurringUrl.replace(/\/$/, '')}${urlPath}`;
    const pathToSign = new URL(requestUrl).pathname; // ensures signed path matches actual request path

    const headers = generateBkashAutopayHeaders("POST", pathToSign, body, bkashKey, bkashSecret, bkashRecurringUrl);
    headers.version = process.env.BKASH_API_VERSION || "v1.0";
    headers.channelId = process.env.BKASH_CHANNEL_ID || "Merchant WEB";
    headers.timeStamp = new Date().toISOString();
    // Add x-api-key for gateway compatibility, keep x-app-key as well
    if (headers['x-app-key']) headers['x-api-key'] = headers['x-app-key'];
    // mask authorization for logs
    const safeHeaders = { ...headers, Authorization: headers.Authorization ? `${String(headers.Authorization).slice(0, 20)}...[masked]` : undefined };

    console.log("[createBkashSubscription] calling bKash subscription API:", {
        url: requestUrl,
        headers: safeHeaders,
        body: { ...body, merchantShortCode: body.merchantShortCode ? '***' : undefined },
    });

    try {
        const response = await axios.post(requestUrl, body, { headers });
        console.log("[createBkashSubscription] response status:", response.status);
        console.log("[createBkashSubscription] response data:", response.data);
        if (!response.data) throw new CustomError(500, "Empty response from bKash subscription API");

        return response.data;
    } catch (error: any) {
        const resp = error.response;
        console.error("[createBkashSubscription] bKash subscription create error message:", error.message);

        const errorDetails: any = {
            message: error.message,
            stack: error.stack,
            config: error.config ? { url: error.config.url, method: error.config.method, headers: error.config.headers } : undefined,
        };

        if (resp) {
            errorDetails.response = {
                status: resp.status,
                statusText: resp.statusText,
                headers: resp.headers,
                // resp.data might be empty; include as-is (could be string or object)
                data: resp.data,
            };

            console.error("[createBkashSubscription] response status:", resp.status, resp.statusText);
            console.error("[createBkashSubscription] response headers:", resp.headers);
            console.error("[createBkashSubscription] response data:", resp.data);
        }

        // Log a compact JSON of errorDetails for easier copy/paste debugging
        try {
            console.error("[createBkashSubscription] error details:", JSON.stringify(errorDetails, null, 2));
        } catch (e) {
            console.error("[createBkashSubscription] error details (inspect manually):", errorDetails);
        }

        const respSummary = resp ? `${resp.status} ${resp.statusText} ${typeof resp.data === 'string' ? resp.data.slice(0, 500) : JSON.stringify(resp.data || {}).slice(0,500)}` : error.message;
        throw new CustomError(502, `bKash subscription create failed: ${respSummary}`);
    }
};

// Extend subscription
export const extendBkashSubscription = async (payload: any) => {
    const urlPath = "/api/subscription";
    const headers = generateBkashAutopayHeaders("PUT", urlPath, payload, bkashKey, bkashSecret, bkashRecurringUrl);
    headers.version = process.env.BKASH_API_VERSION || "1.0";
    headers.channelId = process.env.BKASH_CHANNEL_ID || "WEB";
    headers.timeStamp = new Date().toISOString();

    try {
        const { data } = await axios.put(`${bkashRecurringUrl}${urlPath}`, payload, { headers });
        return data;
    } catch (error: any) {
        console.error("[extendBkashSubscription] error:", error.response?.data || error.message || error);
        throw new CustomError(502, error.response?.data?.message || error.message || "bKash subscription extend failed");
    }
};

// Merchant refund
export const refundBkashPayment = async (payload: any) => {
    const urlPath = "/api/subscription/payment/refund";
    const headers = generateBkashAutopayHeaders("POST", urlPath, payload, bkashKey, bkashSecret, bkashRecurringUrl);
    headers.version = process.env.BKASH_API_VERSION || "1.0";
    headers.channelId = process.env.BKASH_CHANNEL_ID || "WEB";
    headers.timeStamp = new Date().toISOString();

    try {
        const { data } = await axios.post(`${bkashRecurringUrl}${urlPath}`, payload, { headers });
        return data;
    } catch (error: any) {
        console.error("[refundBkashPayment] error:", error.response?.data || error.message || error);
        throw new CustomError(502, error.response?.data?.message || error.message || "bKash refund failed");
    }
};

// List subscriptions
export const listBkashSubscriptions = async (page: number, size: number, headersExtra: any = {}) => {
    const urlPath = `/api/subscriptions/${page}/${size}`;
    const headers = generateBkashAutopayHeaders("GET", urlPath, {}, bkashKey, bkashSecret, bkashRecurringUrl);
    Object.assign(headers, headersExtra);
    try {
        const { data } = await axios.get(`${bkashRecurringUrl}${urlPath}`, { headers });
        return data;
    } catch (error: any) {
        console.error("[listBkashSubscriptions] error:", error.response?.data || error.message || error);
        throw new CustomError(502, error.response?.data?.message || error.message || "bKash list subscriptions failed");
    }
};

// Get subscription by id
export const getBkashSubscriptionById = async (id: number) => {
    const urlPath = `/api/subscriptions/${id}`;
    const headers = generateBkashAutopayHeaders("GET", urlPath, {}, bkashKey, bkashSecret, bkashRecurringUrl);
    headers.version = process.env.BKASH_API_VERSION || "1.0";
    headers.channelId = process.env.BKASH_CHANNEL_ID || "WEB";
    headers.timeStamp = new Date().toISOString();
    try {
        const { data } = await axios.get(`${bkashRecurringUrl}${urlPath}`, { headers });
        return data;
    } catch (error: any) {
        console.error("[getBkashSubscriptionById] error:", error.response?.data || error.message || error);
        throw new CustomError(502, error.response?.data?.message || error.message || "bKash get subscription failed");
    }
};

// Cancel subscription
export const cancelBkashSubscription = async (id: number, reason: string) => {
    const urlPath = `/api/subscriptions/${id}`;
    const headers = generateBkashAutopayHeaders("DELETE", urlPath, {}, bkashKey, bkashSecret, bkashRecurringUrl);
    headers.version = process.env.BKASH_API_VERSION || "1.0";
    headers.channelId = process.env.BKASH_CHANNEL_ID || "WEB";
    headers.timeStamp = new Date().toISOString();
    try {
        const { data } = await axios.delete(`${bkashRecurringUrl}${urlPath}?reason=${encodeURIComponent(reason)}`, { headers });
        return data;
    } catch (error: any) {
        console.error("[cancelBkashSubscription] error:", error.response?.data || error.message || error);
        throw new CustomError(502, error.response?.data?.message || error.message || "bKash cancel subscription failed");
    }
};

// Find by request id
export const findBkashByRequestId = async (requestId: string) => {
    const urlPath = `/api/subscriptions/request-id/${requestId}`;
    const headers = generateBkashAutopayHeaders("GET", urlPath, {}, bkashKey, bkashSecret, bkashRecurringUrl);
    headers.version = process.env.BKASH_API_VERSION || "1.0";
    headers.channelId = process.env.BKASH_CHANNEL_ID || "WEB";
    headers.timeStamp = new Date().toISOString();
    try {
        const { data } = await axios.get(`${bkashRecurringUrl}${urlPath}`, { headers });
        return data;
    } catch (error: any) {
        console.error("[findBkashByRequestId] error:", error.response?.data || error.message || error);
        throw new CustomError(502, error.response?.data?.message || error.message || "bKash find by request id failed");
    }
};

// Get schedule
export const getBkashSchedule = async (frequency: string, startDate: string, expiryDate: string) => {
    const urlPath = "/api/subscription/payment/schedule";
    const params = { frequency, startDate, expiryDate };
    const headers = generateBkashAutopayHeaders("GET", urlPath, params, bkashKey, bkashSecret, bkashRecurringUrl);
    headers.version = process.env.BKASH_API_VERSION || "1.0";
    headers.channelId = process.env.BKASH_CHANNEL_ID || "WEB";
    headers.timeStamp = new Date().toISOString();
    try {
        const { data } = await axios.get(`${bkashRecurringUrl}${urlPath}`, { params, headers });
        return data;
    } catch (error: any) {
        console.error("[getBkashSchedule] error:", error.response?.data || error.message || error);
        throw new CustomError(502, error.response?.data?.message || error.message || "bKash schedule failed");
    }
};

// Get payment by id
export const getBkashPaymentById = async (id: number) => {
    const urlPath = `/api/subscription/payment/${id}`;
    const headers = generateBkashAutopayHeaders("GET", urlPath, {}, bkashKey, bkashSecret, bkashRecurringUrl);
    headers.version = process.env.BKASH_API_VERSION || "1.0";
    headers.channelId = process.env.BKASH_CHANNEL_ID || "WEB";
    headers.timeStamp = new Date().toISOString();
    try {
        const { data } = await axios.get(`${bkashRecurringUrl}${urlPath}`, { headers });
        return data;
    } catch (error: any) {
        console.error("[getBkashPaymentById] error:", error.response?.data || error.message || error);
        throw new CustomError(502, error.response?.data?.message || error.message || "bKash get payment failed");
    }
};

// Find payments by subscription id
export const findPaymentsBySubscriptionId = async (subscriptionId: number) => {
    const urlPath = `/api/subscription/payment/bySubscriptionId/${subscriptionId}`;
    const headers = generateBkashAutopayHeaders("GET", urlPath, {}, bkashKey, bkashSecret, bkashRecurringUrl);
    headers.version = process.env.BKASH_API_VERSION || "1.0";
    headers.channelId = process.env.BKASH_CHANNEL_ID || "WEB";
    headers.timeStamp = new Date().toISOString();
    try {
        const { data } = await axios.get(`${bkashRecurringUrl}${urlPath}`, { headers });
        return data;
    } catch (error: any) {
        console.error("[findPaymentsBySubscriptionId] error:", error.response?.data || error.message || error);
        throw new CustomError(502, error.response?.data?.message || error.message || "bKash find payments failed");
    }
};

