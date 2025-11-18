"use client"
import { useSearchParams, useRouter } from "next/navigation"
import clsx from "clsx"
import { CheckCircle, XCircle } from "lucide-react"

export default function PaymentStatusPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const paymentId = searchParams.get("paymentId")
  const trxID = searchParams.get("trxID")
  const amount = searchParams.get("amount")
  const status = searchParams.get("status") || "success"
  const message = searchParams.get("message") || ""

  const handleGoHome = () => router.push("/donate")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-12">
      <div
        className={clsx(
          "max-w-lg w-full rounded-2xl shadow-2xl p-10 text-center flex flex-col items-center gap-6 transform transition-all animate-fadeIn",
          status === "success"
            ? "bg-green-50 border-l-8 border-green-600"
            : "bg-red-50 border-l-8 border-red-600"
        )}
      >
        <div className="text-center flex flex-col items-center gap-4">
          {status === "success" ? (
            <CheckCircle className="w-16 h-16 text-green-600 animate-bounce" />
          ) : (
            <XCircle className="w-16 h-16 text-red-600 animate-bounce" />
          )}
          <h1
            className={clsx(
              "text-3xl font-extrabold",
              status === "success" ? "text-green-700" : "text-red-700"
            )}
          >
            {status === "success" ? "Payment Successful ✅" : "Payment Failed ❌"}
          </h1>
        </div>

        <p className="text-foreground/80 text-sm md:text-base max-w-sm">
          {status === "success"
            ? "ধন্যবাদ! আপনার দান সফল হয়েছে এবং আমাদের কার্যক্রমে গুরুত্বপূর্ণ অবদান রাখছে।"
            : message || "আপনার পেমেন্ট ব্যর্থ হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।"}
        </p>

        {status === "success" && (
          <div className="bg-white w-full rounded-xl shadow-inner p-6 text-left space-y-3 border border-border">
            <p>
              <span className="font-semibold">Payment ID:</span> {paymentId}
            </p>
            <p>
              <span className="font-semibold">Transaction ID:</span> {trxID}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> ৳{amount}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
          <button
            onClick={handleGoHome}
            className={clsx(
              "px-6 py-3 rounded-xl font-semibold text-white transition-transform transform hover:scale-105",
              status === "success" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
            )}
          >
            {status === "success" ? "ফিরে যান" : "Try Again"}
          </button>

          {status === "success" && (
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 rounded-xl font-semibold border border-border text-foreground hover:bg-foreground/5 transition"
            >
              হোমপেজ
            </button>
          )}
        </div>

        {/* Optional footer */}
        <p className="mt-6 text-xs text-foreground/50">
          © 2025 Khayrul Ummah Foundation. সমস্ত অধিকার সংরক্ষিত।
        </p>
      </div>
    </div>
  )
}
