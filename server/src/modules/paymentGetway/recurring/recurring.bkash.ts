import axios from 'axios';
import { CustomError } from '../../../errors/CustomError';
import {
  generateBkashAutopayHeaders,
  buildBkashAutopayRequestData,
} from './recurring.bkash.utils';
import {
  baseUrl,
  bkashKey,
  bkashRecurringUrl,
  bkashSecret,
} from '../../../config';

export const createBkashSubscription = async (payload: any) => {
  const { requestBody: body } = buildBkashAutopayRequestData(payload, baseUrl);

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
  // mask authorization for logs
  const safeHeaders = {
    ...headers,
    Authorization: headers.Authorization
      ? `${String(headers.Authorization).slice(0, 20)}...[masked]`
      : undefined,
  };

  console.log('[createBkashSubscription] calling bKash subscription API:', {
    url: requestUrl,
    headers: safeHeaders,
    body: {
      ...body,
      merchantShortCode: body.merchantShortCode ? '***' : undefined,
    },
  });

  try {
    const response = await axios.post(requestUrl, body, { headers });
    console.log('[createBkashSubscription] response status:', response.status);
    console.log('[createBkashSubscription] response data:', response.data);
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
