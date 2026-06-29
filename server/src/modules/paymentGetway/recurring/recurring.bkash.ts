import axios from 'axios';
import { CustomError } from '../../../errors/CustomError';
import {
  generateBkashAutopayHeaders,
  buildBkashAutopayRequestData,
} from './recurring.bkash.utils';
import {
  bkashKey,
  bkashRecurringUrl,
  bkashSecret,
} from '../../../config';

export const createBkashSubscription = async (
  payload: any,
  requestBody?: Record<string, unknown>,
) => {
  const body =
    requestBody || buildBkashAutopayRequestData(payload).requestBody;

  const urlPath = `/api/subscription`;
  const requestUrl = `${bkashRecurringUrl.replace(/\/$/, '')}${urlPath}`;
  const pathToSign = new URL(requestUrl).pathname; // ensures signed path matches actual request path

  const headers: any = generateBkashAutopayHeaders(
    'POST',
    pathToSign,
    body,
    bkashKey,
    bkashSecret,
    bkashRecurringUrl,
  );

  try {
    const response = await axios.post(requestUrl, body, { headers });
    if (!response.data)
      throw new CustomError(500, 'Empty response from bKash subscription API');

    return response.data;
  } catch (error: any) {
    const resp = error.response;
    console.error(
      '[createBkashSubscription] bKash subscription create error message:',
      error.message,
    );

    const errorDetails: any = {
      message: error.message,
      stack: error.stack,
      config: error.config
        ? {
            url: error.config.url,
            method: error.config.method,
            headers: error.config.headers,
          }
        : undefined,
    };

    if (resp) {
      errorDetails.response = {
        status: resp.status,
        statusText: resp.statusText,
        headers: resp.headers,
        data: resp.data,
      };
    }

    const respSummary = resp
      ? `${resp.status} ${resp.statusText} ${typeof resp.data === 'string' ? resp.data.slice(0, 500) : JSON.stringify(resp.data || {}).slice(0, 500)}`
      : error.message;
    throw new CustomError(
      502,
      `bKash subscription create failed: ${respSummary}`,
    );
  }
};

//  get recurrring payment from bkash

export const getBkashSubscriptionFromBkashById = async (id: string) => {
  const urlPath = `/api/subscriptions/request-id/${id}`;
  const headers: any = generateBkashAutopayHeaders(
    'GET',
    urlPath,
    {},
    bkashKey,
    bkashSecret,
    bkashRecurringUrl,
  );
  const fullurl =`${bkashRecurringUrl}${urlPath}`;
  console.log(fullurl)
  try {
    const data  = await axios.get(fullurl, {
      headers,
    });
    console.log(data)
    return data;
  } catch (error: any) {
    throw new CustomError(
      502,
      error.response?.data?.message || error.message || 'bKash fetch failed',
    );
  }
};
