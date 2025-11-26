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

  // Direct credentials for sandbox
  const store_id = "brain6926ce1cd2eb3";
  const store_passwd = "brain6926ce1cd2eb3@ssl";

  // Sandbox URL
  const sslcommerzUrl = "https://sandbox.sslcommerz.com/gwprocess/v3/api.php";

  // v3 API expects URL-encoded body
  const params = new URLSearchParams({
    store_id,
    store_passwd,
    total_amount: amount.toString(),
    currency: "BDT",
    tran_id: `tran_${Date.now()}`,
    success_url: "http://localhost:3000/payment-success",
    fail_url: "http://localhost:3000/payment-fail",
    cancel_url: "http://localhost:3000/payment-cancel",
    cus_name: name,
    cus_email: email,
    cus_add1: "",
    cus_city: "",
    cus_postcode: "",
    cus_country: "Bangladesh",
    cus_phone: phone,
    shipping_method: "NO",
    product_name: donationType || "Donation",
    product_category: "Donation",
    product_profile: "general",
    value_a: donorMessage,
  });

  try {
    const response = await axios.post(sslcommerzUrl, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log("SSLCOMMERZ Full Response:", JSON.stringify(response.data, null, 2));

    if (response.data && response.data.GatewayPageURL) {
      console.log("Gateway URL:", response.data.GatewayPageURL);
      return response.data;
    } else {
      console.error("SSLCOMMERZ response missing GatewayPageURL", response.data);
      throw new Error("SSLCOMMERZ: Gateway URL not found in response");
    }
  } catch (error: any) {
    console.error("SSLCOMMERZ Payment Error:", error.response?.data || error.message);
    throw new Error("Failed to create SSLCOMMERZ payment");
  }
};
