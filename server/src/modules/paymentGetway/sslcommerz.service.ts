import axios from "axios"
import Payment from "../payment/payment.model"

const STORE_ID = "brain6926ce1cd2eb3"
const STORE_PASSWORD = "brain6926ce1cd2eb3@ssl"
const SSL_API_URL = "https://sandbox.sslcommerz.com/gwprocess/v3/api.php"
const SSL_VALIDATION_URL = "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"

interface PaymentPayload {
  name: string
  email: string
  phone: string
  amount: number
  donationType?: string
  donorMessage?: string
}

interface SslcommerzResponse {
  status: string
  GatewayPageURL?: string
  redirectGatewayURL?: string
  [key: string]: any
}

export const createSslcommerzPayment = async (payload: PaymentPayload): Promise<{ GatewayPageURL: string }> => {
  const { name, email, phone, amount, donationType = "Donation", donorMessage = "" } = payload

  // Generate unique transaction ID
  const tran_id = `tran_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  console.log("[v0] Creating SSLCommerz payment with tran_id:", tran_id)

  // Prepare SSL request parameters
  const params = new URLSearchParams({
    store_id: STORE_ID,
    store_passwd: STORE_PASSWORD,
    total_amount: amount.toString(),
    currency: "BDT",
    tran_id: tran_id,
    success_url: "http://localhost:8080/api/v1/payment/sslcommerz/success",
    fail_url: "http://localhost:8080/api/v1/payment/sslcommerz/fail",
    cancel_url: "http://localhost:8080/api/v1/payment/sslcommerz/cancel",
    ipn_url: "http://localhost:8080/api/v1/payment/sslcommerz/ipn",
    
    cus_name: name,
    cus_email: email,
    cus_phone: phone,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    shipping_method: "NO",
    product_name: donationType,
    product_category: "Donation",
    product_profile: "general",
    value_a: donorMessage || "No message",
  })

  try {
    console.log("[v0] Sending request to SSL API")
    const response = await axios.post<SslcommerzResponse>(SSL_API_URL, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })

    console.log("[v0] SSL Response:", response.data)

    if (!response.data.GatewayPageURL) {
      throw new Error("SSLCOMMERZ: GatewayPageURL not found in response")
    }

    // Save payment to database with tran_id
    const payment = await Payment.create({
      name,
      email,
      phone,
      amount,
      donationType,
      donorMessage,
      paymentId: tran_id, // Store transaction ID as paymentId
      status: "pending",
      method: "sslcommerz",
    })

    console.log("[v0] Payment saved to DB:", payment)

    return {
      GatewayPageURL: response.data.GatewayPageURL,
    }
  } catch (error: any) {
    console.error("[v0] SSLCommerz Payment Error:", error.response?.data || error.message)
    throw new Error(`Failed to create SSLCommerz payment: ${error.message}`)
  }
}

export const validateSslcommerzPayment = async (data: any): Promise<{ success: boolean; message: string }> => {
  const { tran_id, val_id, status, amount } = data

  console.log("[v0] Validating payment - tran_id:", tran_id, "val_id:", val_id, "status:", status)

  if (!tran_id || !val_id) {
    console.error("[v0] Missing tran_id or val_id")
    return { success: false, message: "Missing tran_id or val_id" }
  }

  try {
    // Call SSLCommerz validation API
    const validationUrl = `${SSL_VALIDATION_URL}?val_id=${val_id}&store_id=${STORE_ID}&store_passwd=${STORE_PASSWORD}&v=1&format=json`

    console.log("[v0] Calling validation URL")
    const response = await axios.get(validationUrl)

    console.log("[v0] Validation response:", response.data)

    // Update payment status based on validation
    if (response.data.status === "VALID") {
      await Payment.findOneAndUpdate(
        { paymentId: tran_id },
        {
          status: "success",
          trxID: val_id,
          amount: response.data.amount,
          sslResponse: response.data,
        },
        { new: true },
      )

      console.log("[v0] Payment marked as SUCCESS")
      return { success: true, message: "Payment validated successfully" }
    } else {
      await Payment.findOneAndUpdate(
        { paymentId: tran_id },
        {
          status: "failed",
          sslResponse: response.data,
        },
        { new: true },
      )

      console.log("[v0] Payment marked as FAILED - Status:", response.data.status)
      return { success: false, message: `Payment validation failed: ${response.data.status}` }
    }
  } catch (error: any) {
    console.error("[v0] Validation error:", error.response?.data || error.message)

    // Mark as failed if validation fails
    await Payment.findOneAndUpdate({ paymentId: tran_id }, { status: "failed" }, { new: true })

    return { success: false, message: `Validation error: ${error.message}` }
  }
}

export const handleSslSuccess = async (tran_id: string): Promise<any> => {
  console.log("[v0] SSL Success - tran_id:", tran_id)

  const payment = await Payment.findOne({ paymentId: tran_id })
console.log("payment", payment);
  if (!payment) {
    return { success: false, message: "Payment record not found" }
  }

  return {
    success: true,
    payment: {
      id: payment._id,
      amount: payment.amount,
      status: payment.status,
      transactionId: payment.paymentId,
      paymentId: payment.paymentId,
    },
  }
}

export const handleSslFail = async (tran_id: string): Promise<any> => {
  console.log("[v0] SSL Fail - tran_id:", tran_id)

  await Payment.findOneAndUpdate({ paymentId: tran_id }, { status: "failed" }, { new: true })

  return { success: false, message: "Payment failed" }
}

export const handleSslCancel = async (tran_id: string): Promise<any> => {
  console.log("[v0] SSL Cancel - tran_id:", tran_id)

  await Payment.findOneAndUpdate({ paymentId: tran_id }, { status: "failed" }, { new: true })

  return { success: false, message: "Payment cancelled by user" }
}
