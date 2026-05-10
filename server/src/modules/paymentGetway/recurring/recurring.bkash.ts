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


export const findBkashByRequestId = async (requestId: any) => {

  const urlPath = `/api/subscriptions/request-id/${requestId}`;
  const requestUrl = `${bkashRecurringUrl.replace(/\/$/, '')}${urlPath}`;
  const pathToSign = new URL(requestUrl).pathname; // ensures signed path matches actual request path

  const headers: any = generateBkashAutopayHeaders(
    'GET',
    pathToSign,
    {},
    bkashKey,
    bkashSecret,
    bkashRecurringUrl,
  );
 

  try {
    const response = await axios.get(requestUrl, { headers });
    console.log('[getBkashSubscriptionById] response status:', response.status);
    console.log('[getBkashSubscriptionById] response data:', response.data);
    if (!response.data)
      throw new CustomError(500, 'Empty response from bKash subscription API');

    return response.data;
  } catch (error: any) {
    const resp = error.response;
    console.error(
      '[getBkashSubscriptionById] bKash subscription fetch error message:',
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
      `bKash subscription fetch failed: ${respSummary}`,
    );
  }
};


export const getBkashSubscriptionById  = async (id: any) => {

  const urlPath = `/api/subscriptions/${id}`;
  const requestUrl = `${bkashRecurringUrl.replace(/\/$/, '')}${urlPath}`;
  const pathToSign = new URL(requestUrl).pathname; // ensures signed path matches actual request path

  const headers: any = generateBkashAutopayHeaders(
    'GET',
    pathToSign,
    {},
    bkashKey,
    bkashSecret,
    bkashRecurringUrl,
  );
 

  try {
    const response = await axios.get(requestUrl, { headers });
    console.log('[findBkashSubscriptionById] response status:', response.status);
    console.log('[findBkashSubscriptionById] response data:', response.data);
    if (!response.data)
      throw new CustomError(500, 'Empty response from bKash subscription API');

    return response.data;
  } catch (error: any) {
    const resp = error.response;
    console.error(
      '[findBkashSubscriptionById] bKash subscription fetch error message:',
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
      `bKash subscription fetch failed: ${respSummary}`,
    );
  }
};

export const findPaymentsBySubscriptionId  = async (subscriptionId: any) => {
  const urlPath = `/api/subscription/payment/bySubscriptionId/${subscriptionId}`;
  const requestUrl = `${bkashRecurringUrl.replace(/\/$/, '')}${urlPath}`;
  const pathToSign = new URL(requestUrl).pathname; // ensures signed path matches actual request path

  const headers: any = generateBkashAutopayHeaders(
    'GET',
    pathToSign,
    {},
    bkashKey,
    bkashSecret,
    bkashRecurringUrl,
  );  

  try {
    const response = await axios.get(requestUrl, { headers });
    console.log('[findPaymentsBySubscriptionId] response status:', response.status);
    console.log('[findPaymentsBySubscriptionId] response data:', response.data);
    if (!response.data)
      throw new CustomError(500, 'Empty response from bKash subscription payments API');

    return response.data;
  } catch (error: any) {
    const resp = error.response;
    console.error(
      '[findPaymentsBySubscriptionId] bKash subscription payments fetch error message:',
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
      `bKash subscription payments fetch failed: ${respSummary}`,
    );
  }
};

export const getBkashPaymentById  = async (id: any) => {
  const urlPath = `/api/subscription/payment/${id}`;
  const requestUrl = `${bkashRecurringUrl.replace(/\/$/, '')}${urlPath}`;
  const pathToSign = new URL(requestUrl).pathname; // ensures signed path matches actual request path

  const headers: any = generateBkashAutopayHeaders(
    'GET',
    pathToSign,
    {},
    bkashKey,
    bkashSecret,
    bkashRecurringUrl,
  );

  try {
    const response = await axios.get(requestUrl, { headers });
    console.log('[getBkashPaymentById] response status:', response.status);
    console.log('[getBkashPaymentById] response data:', response.data);
    if (!response.data)
      throw new CustomError(500, 'Empty response from bKash payment API');

    return response.data;
  } catch (error: any) {
    const resp = error.response;
    console.error(
      '[getBkashPaymentById] bKash payment fetch error message:',
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
      `bKash payment fetch failed: ${respSummary}`,
    );
  }
};


export const getBkashSchedule  = async (frequency: any, startDate: any, expiryDate: any) => {
  const urlPath = `/api/subscription/payment/schedule?frequency=${encodeURIComponent(frequency)}&startDate=${encodeURIComponent(startDate)}&expiryDate=${encodeURIComponent(expiryDate)}`;
  const requestUrl = `${bkashRecurringUrl.replace(/\/$/, '')}${urlPath}`;
  const pathToSign = new URL(requestUrl).pathname + new URL(requestUrl).search; // ensures signed path matches actual request path

  const headers: any = generateBkashAutopayHeaders(
    'GET',
    pathToSign,
    {},
    bkashKey,
    bkashSecret,
    bkashRecurringUrl,
  );

  try {
    const response = await axios.get(requestUrl, { headers });
    console.log('[getBkashSchedule] response status:', response.status);
    console.log('[getBkashSchedule] response data:', response.data);
    if (!response.data)
      throw new CustomError(500, 'Empty response from bKash schedule API');

    return response.data;
  } catch (error: any) {
    const resp = error.response;
    console.error(
      '[getBkashSchedule] bKash schedule fetch error message:',
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
      `bKash schedule fetch failed: ${respSummary}`,
    );
  }
}


export const cancelBkashSubscription = async (id: any, reason: string) => {
  const urlPath = `/api/subscriptions/${id}?reason=${encodeURIComponent(reason)}`;
  const requestUrl = `${bkashRecurringUrl.replace(/\/$/, '')}${urlPath}`;
  const pathToSign = new URL(requestUrl).pathname + new URL(requestUrl).search; // ensures signed path matches actual request path

  const headers: any = generateBkashAutopayHeaders(
    'DELETE',
    pathToSign,
    {},
    bkashKey,
    bkashSecret,
    bkashRecurringUrl,
  );

  try {
    const response = await axios.delete(requestUrl, { headers });
    console.log('[cancelBkashSubscription] response status:', response.status);
    console.log('[cancelBkashSubscription] response data:', response.data);
    if (!response.data)
      throw new CustomError(500, 'Empty response from bKash subscription cancel API');

    return response.data;
  } catch (error: any) {
    const resp = error.response;
    console.error(
      '[cancelBkashSubscription] bKash subscription cancel error message:',
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
      `bKash subscription cancel failed: ${respSummary}`,
    );
  }
}

export const refundBkashPayment = async (payload: any) => {
  const urlPath = `/api/subscription/payment/refund`;
  const requestUrl = `${bkashRecurringUrl.replace(/\/$/, '')}${urlPath}`;
  const pathToSign = new URL(requestUrl).pathname; // ensures signed path matches actual request path

  const headers: any = generateBkashAutopayHeaders(
    'POST',
    pathToSign,
    payload,
    bkashKey,
    bkashSecret,
    bkashRecurringUrl,
  );

  try {
    const response = await axios.post(requestUrl, payload, { headers });
    console.log('[refundBkashPayment] response status:', response.status);
    console.log('[refundBkashPayment] response data:', response.data);
    if (!response.data)
      throw new CustomError(500, 'Empty response from bKash payment refund API');

    return response.data;
  } catch (error: any) {
    const resp = error.response;
    console.error(
      '[refundBkashPayment] bKash payment refund error message:',
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
      `bKash payment refund failed: ${respSummary}`,
    );
  }
}