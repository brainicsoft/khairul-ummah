import axios from "axios";

interface PaymentPayload {
  name: string;
  email: string;
  phone: string;
  amount: number;
  donationType?: string;
  donorMessage?: string;
  method?: string;
}

interface SslcommerzResponse {
  GatewayPageURL: string;
  [key: string]: any;
}

export const createSslcommerzPayment = async (payload: PaymentPayload): Promise<SslcommerzResponse> => {
  const { name, email, phone, amount, donationType = "", donorMessage = "" } = payload;

  // SSLCOMMERZ API credentials
  const store_id = process.env.SSLC_STORE_ID!;
  const store_passwd = process.env.SSLC_STORE_PASSWORD!;
  const isSandbox = true; // set false for production

  const sslcommerzUrl = isSandbox
    ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
    : "https://securepay.sslcommerz.com/gwprocess/v4/api.php";

  // Payload for SSLCOMMERZ
  const data = {
    store_id,
    store_passwd,
    total_amount: amount,
    currency: "BDT",
    tran_id: `tran_${Date.now()}`, // unique transaction ID
    success_url: `${process.env.FRONTEND_URL}/payment-success`,
    fail_url: `${process.env.FRONTEND_URL}/payment-fail`,
    cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    cus_name: name,
    cus_email: email,
    cus_add1: "", // optional
    cus_city: "", // optional
    cus_postcode: "", // optional
    cus_country: "Bangladesh",
    cus_phone: phone,
    shipping_method: "NO",
    product_name: donationType || "Donation",
    product_category: "Donation",
    product_profile: "general",
    value_a: donorMessage,
  };

  try {
    const response = await axios.post(sslcommerzUrl, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.GatewayPageURL) {
      return response.data;
    } else {
      throw new Error("SSLCOMMERZ: Gateway URL not found in response");
    }
  } catch (error: any) {
    console.error("SSLCOMMERZ Payment Error:", error.message);
    throw new Error("Failed to create SSLCOMMERZ payment");
  }
};
