import axios from "axios";
import cron from "node-cron";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { baseUrl, bkashKey, bkashSecret, bkashUrl, bkashRecurringUrl } from "../../config";
import { CustomError } from "../../errors/CustomError";
import { generateBkashAutopayHeaders } from "./recurring/recurring.bkash.utils";

// Token storage (like private variables)
let idToken: string | null = null;
let refreshToken: string | null = null;

/**
 * Generate new bKash ID Token
 */
export const generateIdToken = async (): Promise<string |null> => {
    try {
        const traceToken = crypto.randomBytes(16).toString("hex");
        console.log(moment().toISOString(), "Generating bKash ID Token...", traceToken);

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




// Merchant refund
export const refundBkashPayment = async (payload: any) => {
    const urlPath = "/api/subscription/payment/refund";
    const headers:any = generateBkashAutopayHeaders("POST", urlPath, payload, bkashKey, bkashSecret, bkashRecurringUrl);

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


