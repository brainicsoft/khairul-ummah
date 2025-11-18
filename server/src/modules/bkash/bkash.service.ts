import axios from "axios";
import cron from "node-cron";
import crypto from "crypto";
import moment from "moment";
import { baseUrl, bkashKey, bkashSecret, bkashUrl } from "../../config";

// Token storage (like private variables)
let idToken: string | null = null;
let refreshToken: string | null = null;

/**
 * Generate new bKash ID Token
 */
export const generateIdToken = async (): Promise<string> => {
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
        console.error("bKash grant token error:", error.response?.data || error);
        throw new Error("Failed to generate bKash ID Token");
    }
};

/**
 * Refresh bKash token
 */
export const refreshBkashToken = async (): Promise<string> => {
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
        throw new Error("Failed to refresh bKash token");
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




export const generateBkashAutopayHeaders = (method: string, urlPath: string, body: any, appKey: string, appSecret: string, bkashUrl: string) => {
  const crypto = require("crypto");
  const host = new URL(bkashUrl).host;
  const date = new Date().toISOString().replace(/\.\d{3}Z$/, "Z"); // GMT
  const bodyString = JSON.stringify(body);

  const canonicalHeaders = `content-type:application/json\nhost:${host}\nx-amz-date:${date}\n`;
  const signedHeaders = "content-type;host;x-amz-date";

  const stringToSign = `${method}\n${urlPath}\n${date}\n${canonicalHeaders}\n${signedHeaders}\n${bodyString}`;
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

