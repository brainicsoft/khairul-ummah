"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DonatesTypesMenue } from "../DonatesTypesMenue";
import PayMetohdModal from "./PayMethohdModal";
import { useCreateBkashMutation } from "@/redux/features/payment/paymentApi";
import toast from "react-hot-toast";

export function DonationCTA() {
  const [bkashDonation, { isLoading }] = useCreateBkashMutation()
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "ssl" | "">("");

  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    donateType: "",
    amount: "",
    email: "",
  });

  const donationTypes = DonatesTypesMenue();

  // 🚫 STOP BACKGROUND SCROLL WHEN MODAL OPEN
  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  // ✅ Donate Button Click (Validation First, then Modal)
  const handleDonateClick = () => {
    if (!formValues.name || !formValues.phone || !formValues.donateType) {
      toast.error("Name, Phone এবং Donation Type প্রয়োজন!");
      return;
    }
    setShowModal(true);
  };

  // SUBMIT FUNCTION
  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }
    if (!formValues.amount || Number(formValues.amount) < 10) {
      toast.error("Please enter a valid amount!");
      return;
    }
    

    if (!formValues.name || !formValues.phone || !formValues.donateType) {
      toast.error("Name, Phone, and Donation Type are required!");
      return;
    }

    const mappedData = {
      name: formValues.name,
      email: formValues.email || "",
      phone: formValues.phone,
      amount: Number(formValues.amount) || 0,
      donationType: formValues.donateType,
    };

    try {
      if (paymentMethod === "bkash") {
        const response = await bkashDonation(mappedData).unwrap();
        window.location.href = response.data.url;
      } else {
        toast("SSLCommerz selected! Redirecting...");
        window.location.href = "/ssl-payment";
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary/20 rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
              আপনার অনুদান প্রদান করুন
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  নাম *
                </label>
                <input
                  type="text"
                  placeholder="আপনার নাম"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  ফোন নম্বর *
                </label>
                <input
                  type="text"
                  placeholder="ফোন নম্বর"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
                  onChange={(e) =>
                    setFormValues({ ...formValues, phone: e.target.value })
                  }
                />
              </div>

              {/* Donation Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  তহবিল *
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
                  onChange={(e) =>
                    setFormValues({ ...formValues, donateType: e.target.value })
                  }
                >
                  <option value="">Select Fund</option>
                  {donationTypes.map((type: any) => (
                    <option key={type.id} value={type.slug}>
                      {type.slug}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount (optional) */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  পরিমাণ (Optional)
                </label>
                <input
                  type="number"
                  placeholder="টাকার পরিমাণ (ঐচ্ছিক)"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
                  onChange={(e) =>
                    setFormValues({ ...formValues, amount: e.target.value })
                  }
                />
              </div>

              {/* Email (optional) */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  ইমেইল (Optional)
                </label>
                <input
                  type="email"
                  placeholder="ইমেইল (ঐচ্ছিক)"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
                  onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                />
              </div>

              {/* Donate Button */}
              <div className="flex items-end">
                <button
                  onClick={handleDonateClick}
                  className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:bg-primary/90 cursor-pointer"
                >
                  দান করুন
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-foreground/80">
              খাইরুল উম্মাহ ফাউন্ডেশনে দান করুন এবং সমাজের উন্নয়নে অবদান রাখুন।
            </p>
          </div>
        </div>
      </section>

      {/* Payment Method Modal */}
      <PayMetohdModal
        showModal={showModal}
        setShowModal={setShowModal}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handlePayment={handlePayment}
      />
    </>
  );
}
