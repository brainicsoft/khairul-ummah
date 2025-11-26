import axios from "axios";
import Payment from "../payment/payment.model";

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

// 1️⃣ Payment Initiate + Save transaction
export const createSslcommerzPayment = async (payload: PaymentPayload): Promise<SslcommerzResponse> => {
  const { name, email, phone, amount, donationType = "Donation", donorMessage = "" } = payload;

  const transactionId = `tran_${Date.now()}`;

  // Create a transaction record first
  const transaction = await Payment.create({
    transactionId,
    name,
    email,
    phone,
    amount,
    donationType,
    status: "pending",
  });

  const store_id = "brain6926ce1cd2eb3";
  const store_passwd = "brain6926ce1cd2eb3@ssl";
  const sslcommerzUrl = "https://sandbox.sslcommerz.com/gwprocess/v3/api.php";

  const params = new URLSearchParams({
    store_id,
    store_passwd,
    total_amount: amount.toString(),
    currency: "BDT",
    tran_id: transactionId,
    success_url: `http://localhost:3000/api/payment-success?tran_id=${transactionId}`,
    fail_url: `http://localhost:3000/api/payment-fail?tran_id=${transactionId}`,
    cancel_url: `http://localhost:3000/api/payment-cancel?tran_id=${transactionId}`,
    cus_name: name,
    cus_email: email,
    cus_add1: "",
    cus_city: "",
    cus_postcode: "",
    cus_country: "Bangladesh",
    cus_phone: phone,
    shipping_method: "NO",
    product_name: donationType,
    product_category: "Donation",
    product_profile: "general",
    value_a: donorMessage,
  });

  try {
    const response = await axios.post<SslcommerzResponse>(sslcommerzUrl, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.data || !response.data.GatewayPageURL) {
      throw new Error("SSLCOMMERZ: Gateway URL not found in response");
    }

    return response.data;
  } catch (error: any) {
    console.error("SSLCOMMERZ Payment Error:", error.response?.data || error.message);
    throw new Error("Failed to create SSLCOMMERZ payment");
  }
};

// 2️⃣ Payment Validate + Update DB
export const validateSslcommerzPayment = async (tran_id: string, val_id: string) => {
  if (!tran_id || !val_id) {
    throw new Error("Missing tran_id or val_id for validation");
  }

  const store_id = "brain6926ce1cd2eb3";
  const store_passwd = "brain6926ce1cd2eb3@ssl";
  const validationUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${store_id}&store_passwd=${store_passwd}&v=1&format=json`;

  try {
    const response = await axios.get(validationUrl);
    console.log("SSLCommerz Validation Response:", response.data);

    // Update transaction in DB
    const status = response.data.status === "VALID" ? "success" : "failed";
    console.log("status", status);
    await Payment.updateOne(
      { transactionId: tran_id },
      { status, paymentGatewayData: response.data },
      { runValidators: true }
    );

    return status;
  } catch (error: any) {
    console.error("Payment Validation Error:", error.response?.data || error.message);
    throw new Error(`Payment validation failed: ${error.message}`);
  }
};
