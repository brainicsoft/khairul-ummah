"use client";

import { useEffect, useState } from "react";
import { DonatesTypesMenue, type DonationFundOption } from "../DonatesTypesMenue";
import PayMetohdModal from "./PayMethohdModal";
import { useCreateBkashMutation } from "@/redux/features/payment/paymentApi";
import toast from "react-hot-toast";
import { Phone } from "lucide-react";
import { siteContact } from "@/config/site";

const QUICK_AMOUNTS = [500, 1000, 2000, 5000];

type DonationFormProps = {
  variant?: "floating" | "section";
  className?: string;
};

export function DonationForm({ variant = "floating", className = "" }: DonationFormProps) {
  const isSection = variant === "section";
  const [bkashDonation, { isLoading }] = useCreateBkashMutation();
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "sslcommerz" | "">("");
  const [donationTypes, setDonationTypes] = useState<DonationFundOption[]>([]);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    donateType: "",
    amount: "",
    email: "",
  });

  useEffect(() => {
    DonatesTypesMenue().then(setDonationTypes);
  }, []);

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleDonateClick = () => {
    if (!formValues.name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন");
      return;
    }
    if (!formValues.phone.trim()) {
      toast.error("অনুগ্রহ করে মোবাইল নম্বর লিখুন");
      return;
    }
    if (!formValues.donateType) {
      toast.error("অনুগ্রহ করে তহবিল বেছে নিন");
      return;
    }
    if (!formValues.amount || Number(formValues.amount) < 10) {
      toast.error("কমপক্ষে ১০ টাকা লিখুন");
      return;
    }
    setShowModal(true);
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("পেমেন্ট পদ্ধতি বেছে নিন");
      return;
    }

    try {
      const response = await bkashDonation({
        name: formValues.name,
        email: formValues.email || "",
        phone: formValues.phone,
        amount: Number(formValues.amount),
        donationType: formValues.donateType,
        method: paymentMethod,
      }).unwrap();
      window.location.href = response.data.url;
    } catch {
      toast.error("পেমেন্ট শুরু করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  const inputClass = isSection
    ? "w-full rounded-xl bg-muted/40 px-4 py-3 text-base ring-1 ring-border/80 transition placeholder:text-muted-foreground focus:bg-white focus:ring-2 focus:ring-primary/30 focus:outline-none"
    : "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  const formCard = (
    <div
      id={isSection ? "donate-full" : "donate"}
      className={
        isSection
          ? `scroll-mt-28 overflow-hidden rounded-3xl border border-primary/10 bg-white ${className}`
          : `scroll-mt-28 overflow-hidden rounded-2xl border-4 border-brand-light bg-white text-foreground shadow-2xl ${className}`
      }
    >
      {isSection ? (
        <div className="border-b border-border/60 px-6 py-8 md:px-10 md:py-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            অনুদান
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
            আপনার অনুদান প্রদান করুন
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            নিচের তথ্য পূরণ করে নিরাপদে পেমেন্ট সম্পন্ন করুন
          </p>
        </div>
      ) : (
        <div className="bg-primary px-4 py-3 text-center text-primary-foreground md:px-5 md:py-4">
          <h2 className="text-lg font-bold md:text-xl">দ্রুত দান করুন</h2>
          <p className="text-xs opacity-90 md:text-sm">এখান থেকেই পেমেন্ট করুন</p>
        </div>
      )}

      <div
        className={
          isSection
            ? "space-y-6 p-6 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-5 md:p-10"
            : "space-y-3 p-4 md:space-y-4 md:p-5"
        }
      >
        <div className={isSection ? "md:col-span-2" : ""}>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            তহবিল <span className="text-red-500">*</span>
          </label>
          <select
            className={inputClass}
            value={formValues.donateType}
            onChange={(e) =>
              setFormValues({ ...formValues, donateType: e.target.value })
            }
          >
            <option value="">তহবিল বেছে নিন...</option>
            {donationTypes.map((type) => (
              <option key={type._id} value={type.slug}>
                {type.title}
              </option>
            ))}
          </select>
        </div>

        <div className={isSection ? "md:col-span-2" : ""}>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            পরিমাণ (টাকা) <span className="text-red-500">*</span>
          </label>
          <div className="mb-3 flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() =>
                  setFormValues({ ...formValues, amount: String(amt) })
                }
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  formValues.amount === String(amt)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-primary ring-1 ring-border/80 hover:bg-primary/10"
                }`}
              >
                ৳{amt}
              </button>
            ))}
          </div>
          <input
            type="number"
            min={10}
            placeholder="অন্য পরিমাণ লিখুন"
            className={inputClass}
            value={formValues.amount}
            onChange={(e) =>
              setFormValues({ ...formValues, amount: e.target.value })
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            নাম <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="আপনার নাম"
            className={inputClass}
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            মোবাইল <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="০১৭XXXXXXXX"
            className={inputClass}
            value={formValues.phone}
            onChange={(e) =>
              setFormValues({ ...formValues, phone: e.target.value })
            }
          />
        </div>

        <div className={isSection ? "md:col-span-2" : ""}>
          <label className="mb-2 block text-sm font-semibold text-muted-foreground">
            ইমেইল (ঐচ্ছিক)
          </label>
          <input
            type="email"
            placeholder="ইমেইল"
            className={inputClass}
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
        </div>

        <div className={isSection ? "md:col-span-2" : ""}>
          <button
            type="button"
            onClick={handleDonateClick}
            disabled={isLoading}
            className={
              isSection
                ? "flex min-h-[54px] w-full items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground transition hover:bg-accent disabled:opacity-60"
                : "flex min-h-[48px] w-full items-center justify-center rounded-xl bg-secondary text-base font-bold text-secondary-foreground hover:bg-secondary/90 disabled:opacity-60"
            }
          >
            {isLoading ? "অপেক্ষা করুন..." : "পেমেন্ট করুন"}
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0 text-primary" />
            সাহায্য:{" "}
            <a
              href={`tel:${siteContact.phone}`}
              className="font-semibold text-primary hover:underline"
            >
              {siteContact.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  if (variant === "section") {
    return (
      <>
        <section className="scroll-mt-28 border-t border-border/60 bg-muted/20 py-14 md:py-20">
          <div className="container mx-auto max-w-4xl px-4">{formCard}</div>
        </section>
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

  return (
    <>
      {formCard}
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
