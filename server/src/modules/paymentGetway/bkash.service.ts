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

const autoApiKey = 'Pu5waoPF09NjMMAuAyC_obSLq1J_0xqe';
const serviceId = 100001;
const shortCode = '01823074813';

export const createBkashSubscription = async (payload: any) => {
    const {
        amount,
        frequency = "DAILY",
        startDate,
        expiryDate,
        payer,
        payerType = "CUSTOMER",
        firstPaymentIncludedInCycle = true,
        maxCapRequired = false,
    } = payload;

    if (!amount || amount <= 0) {
        throw new CustomError(400, "Invalid amount");
    }

    const subscriptionRequestId = `KUF-SB${uuidv4().replace(/-/g, '').slice(0, 12)}`;

    const body = {
        subscriptionRequestId,
        subscriptionReference: `KUF_REF_${uuidv4().slice(-6)}`,

        amount,
        firstPaymentAmount: null,
        amountQueryUrl: null,

        currency: "BDT",
        frequency,
        startDate: startDate || moment().format("YYYY-MM-DD"),
        expiryDate: expiryDate || moment().add(1, "year").format("YYYY-MM-DD"),

        subscriptionType: "BASIC",
        paymentType: "FIXED",

        maxCapRequired,
        maxCapAmount: null,

        // ✅ USING YOUR DATA HERE
        serviceId: serviceId,
        merchantShortCode: shortCode,

        payer: payer || null,
        payerType,

        redirectUrl: `https://38c8-103-58-74-192.ngrok-free.app/api/v1/bkash/webhook?subscriptionRequestId=${subscriptionRequestId}`,

        firstPaymentIncludedInCycle,

        extraParams: null,
    };
    // https://38c8-103-58-74-192.ngrok-free.app/api/v1/bkash/webhook?reference=8DYBKURX&status=SUCCEEDED

    const url = `${bkashRecurringUrl.replace(/\/$/, '')}/api/subscription`;
    const pathToSign = new URL(url).pathname;

    const headers: any = generateBkashAutopayHeaders(
        "POST",
        pathToSign,
        body,
        bkashKey,
        bkashSecret,
        bkashRecurringUrl
    );

    headers.version = "v1.0";
    headers.channelId = "Merchant WEB";
    headers.timeStamp = new Date().toISOString();

    // ✅ IMPORTANT: use your api key
    headers["x-api-key"] = autoApiKey;

    try {
        const response = await axios.post(url, body, { headers });

        if (!response?.data?.redirectURL) {
            throw new CustomError(500, "Invalid bKash response");
        }

        return {
            subscriptionRequestId: response.data.subscriptionRequestId,
            redirectURL: response.data.redirectURL,
            expirationTime: response.data.expirationTime,
        };

    } catch (error: any) {
        const resp = error.response;

        console.error("bKash Error:", resp?.data || error.message);

        throw new CustomError(
            502,
            `bKash subscription failed: ${
                resp?.data?.message || error.message
            }`
        );
    }
};

//  subscription validationByWebHook

export const validateBkashSubscription = async (subscriptionRequestId: string) => {
    try {
        const url = `${bkashRecurringUrl.replace(/\/$/, '')}/api/subscriptions/request-id/${subscriptionRequestId}`;
        const pathToSign = new URL(url).pathname;

        const headers: any = generateBkashAutopayHeaders(
            "GET",
            pathToSign,
            {},
            bkashKey,
            bkashSecret,
            bkashRecurringUrl
        );

        headers.version = "v1.0";
        headers.channelId = "Merchant WEB";
        headers.timeStamp = new Date().toISOString();
        headers["x-api-key"] = autoApiKey;

        const response = await axios.get(url, { headers });

        return response.data;
    } catch (error: any) {
        const resp = error.response;

        console.error("bKash Validation Error:", resp?.data || error.message);

        throw new CustomError(
            502,
            `bKash subscription validation failed: ${
                resp?.data?.message || error.message
            }`
        );
    }
}

// Query bKash using the subscription request-id. Merchants should call this after
// redirecting to the success callback to verify the subscription status.
export const findBkashByRequestId = async (subscriptionRequestId: string) => {
    try {
        const url = `${bkashRecurringUrl.replace(/\/$/, '')}/api/subscriptions/request-id/${subscriptionRequestId}`;
        const pathToSign = new URL(url).pathname;

        const headers: any = generateBkashAutopayHeaders(
            "GET",
            pathToSign,
            {},
            bkashKey,
            bkashSecret,
            bkashRecurringUrl
        );

        headers.version = "v1.0";
        headers.channelId = "Merchant WEB";
        headers.timeStamp = new Date().toISOString();
        headers["x-api-key"] = autoApiKey;

        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error: any) {
        const resp = error.response;
        console.error("bKash findByRequestId Error:", resp?.data || error.message);
        throw new CustomError(
            502,
            `bKash find by request-id failed: ${resp?.data?.message || error.message}`
        );
    }
}
