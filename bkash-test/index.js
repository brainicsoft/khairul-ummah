(/*
 Demo script: Create Subscription (test)

 Run: node index.js

 - By default posts to `https://httpbin.org/post` so you can see the request/response.
 - Set `BKASH_ENDPOINT` to a real bKash sandbox/endpoint to actually call bKash.
 - Set `BKASH_API_KEY` to provide an API key header.
*/

const DEFAULT_ENDPOINT = process.env.BKASH_ENDPOINT || 'https://httpbin.org/post';

function buildHeaders() {
	return {
		version: 'v1.0',
		channelId: '1', // 1: Customer APP, 2: Merchant WEB
		timeStamp: new Date().toISOString(),
		'x-api-key': process.env.BKASH_API_KEY || 'demo-api-key',
		'Content-Type': 'application/json',
	};
}

function buildRequestBody() {
	const now = Date.now();
	return {
		subscriptionRequestId: `subreq-${now}`,
		serviceId: 1,
		redirectURL: 'https://merchant.example.com/consent',
		paymentType: 'FIXED',
		subscriptionType: 'BASIC',
		amount: 35.0,
		// firstPaymentAmount omitted for BASIC
		currency: 'BDT',
		firstPaymentIncludedInCycle: false,
		maxCapAmount: 5000.0,
		frequency: 'WEEKLY',
		startDate: '2026-03-10',
		expiryDate: '2027-03-10',
		merchantShortCode: 'Idlc',
		payerType: 'CUSTOMER',
		payer: '01870725511',
		subscriptionReference: `merchant-ref-${now}`,
		extraParams: { note: 'demo subscription' },
	};
}

async function createSubscription(endpoint = DEFAULT_ENDPOINT) {
	const headers = buildHeaders();
	const body = buildRequestBody();

	console.log('Posting subscription request to:', endpoint);
	console.log('Request headers:', headers);
	console.log('Request body:', JSON.stringify(body, null, 2));

	// Use global fetch when available (Node 18+). If not available, try to require node-fetch.
	let fetchFn = global.fetch;
	if (!fetchFn) {
		try {
			// eslint-disable-next-line node/no-extraneous-require
			fetchFn = require('node-fetch');
		} catch (err) {
			console.error('Fetch is not available. Use Node 18+ or install node-fetch.');
			throw err;
		}
	}

	const res = await fetchFn(endpoint, {
		method: 'POST',
		headers,
		body: JSON.stringify(body),
	});

	const text = await res.text();
	console.log('Response status:', res.status);
	try {
		const json = JSON.parse(text);
		console.log('Response JSON:', JSON.stringify(json, null, 2));
	} catch (e) {
		console.log('Response text:', text);
	}
}

// Run when executed directly
if (require.main === module) {
	createSubscription().catch((err) => {
		console.error('Error creating subscription:', err && err.message ? err.message : err);
		process.exitCode = 1;
	});
}

