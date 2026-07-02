"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Ban, CalendarClock, RefreshCcw } from "lucide-react";
import {
  useCancelSubscriptionDemoMutation,
  useGetSubscriptionDetailQuery,
} from "@/redux/features/user/userApi";
import {
  AUTOPAY_FLOW,
  AUTOPAY_STATUS_LABELS,
  isActiveAutopayStatus,
} from "@/config/autopay";

const formatAmount = (amount: number) => `৳${amount.toLocaleString("bn-BD")}`;

const formatDate = (value?: string) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const frequencyLabels: Record<string, string> = {
  DAILY: "দৈনিক",
  WEEKLY: "সাপ্তাহিক",
  CALENDAR_MONTH: "মাসিক",
};

const chargeTypeLabels: Record<string, string> = {
  first_payment: "প্রথম পেমেন্ট (activation)",
  recurring: "নিয়মিত কিস্তি",
  manual: "ম্যানুয়াল",
};

export default function SubscriptionDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const subscriptionId = params.id;
  const [cancelMessage, setCancelMessage] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } =
    useGetSubscriptionDetailQuery(subscriptionId);
  const [cancelDemo, { isLoading: isCancelling }] =
    useCancelSubscriptionDemoMutation();

  const subscription = data?.subscription;
  const payments = data?.payments ?? [];
  const isActive = data?.summary?.isActive ?? false;

  const handleDemoCancel = async () => {
    const confirmed = window.confirm(
      "Demo: এই subscription আমাদের database-এ deactive হবে। bKash-এ actual cancel হবে না। চালিয়ে যাবেন?"
    );

    if (!confirmed) return;

    try {
      const result = await cancelDemo(subscriptionId).unwrap();
      setCancelMessage(result.message || "Subscription demo বাতিল হয়েছে");
      refetch();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      setCancelMessage(
        err?.data?.message || err?.message || "বাতিল ব্যর্থ হয়েছে"
      );
    }
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">লোড হচ্ছে...</p>;
  }

  if (isError || !subscription) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600">Subscription খুঁজে পাওয়া যায়নি</p>
        <Link
          href="/user/regular-donations"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> নিয়মিত অনুদানে ফিরুন
        </Link>
      </div>
    );
  }

  const statusKey = (subscription.status || "").toLowerCase();

  return (
    <section className="space-y-8">
      <div>
        <Link
          href="/user/regular-donations"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> নিয়মিত অনুদানে ফিরুন
        </Link>
        <h1 className="mt-4 text-3xl font-semibold text-foreground">
          Subscription বিস্তারিত
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {AUTOPAY_FLOW.detail.description}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-primary/15 bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Recurring Subscription
              </p>
              <h2 className="mt-2 text-2xl font-bold text-primary">
                {formatAmount(subscription.amount || 0)}
                <span className="ml-2 text-base font-medium text-muted-foreground">
                  / {frequencyLabels[subscription.frequency || ""] || "—"}
                </span>
              </h2>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {AUTOPAY_STATUS_LABELS[statusKey] || subscription.status}
            </span>
          </div>

          <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              শুরু: {formatDate(subscription.createdAt)}
            </p>
            <p>
              Subscription ID:{" "}
              <span className="font-mono text-foreground">
                {subscription.subscriptionId ||
                  subscription.subscriptionReference ||
                  "-"}
              </span>
            </p>
            <p>ফোন: {subscription.phone}</p>
            {subscription.nextPaymentDate ? (
              <p>পরবর্তী debit: {formatDate(subscription.nextPaymentDate)}</p>
            ) : null}
          </div>

          {isActive ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">
                Demo Cancel
              </p>
              <p className="mt-1 text-xs text-amber-800">
                {AUTOPAY_FLOW.cancelDemo.description}
              </p>
              <button
                type="button"
                onClick={handleDemoCancel}
                disabled={isCancelling}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
              >
                <Ban className="h-4 w-4" />
                {isCancelling ? "বাতিল হচ্ছে..." : "Demo: Subscription বাতিল"}
              </button>
            </div>
          ) : null}

          {cancelMessage ? (
            <p className="mt-4 rounded-xl bg-muted px-4 py-3 text-sm text-foreground">
              {cancelMessage}
            </p>
          ) : null}
        </div>

        <div className="rounded-3xl border border-primary/15 bg-linear-to-br from-primary/5 to-background p-6">
          <RefreshCcw className="mb-3 h-6 w-6 text-primary" />
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Payment Summary
          </p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {formatAmount(data?.summary?.totalPaid ?? 0)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            মোট {data?.summary?.paymentCount ?? 0} টি payment এই subscription-এর
            under-এ
          </p>
          <div className="mt-6 space-y-2 text-xs text-muted-foreground">
            <p>
              <strong>তৈরি:</strong> {AUTOPAY_FLOW.create.page}
            </p>
            <p>
              <strong>সক্রিয়:</strong> {AUTOPAY_FLOW.activate.callback}
            </p>
            <p>
              <strong>বাতিল (demo):</strong> {AUTOPAY_FLOW.cancelDemo.api}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-primary/15 bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">
          Subscription-এর payment history
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          প্রতিটি recurring charge / activation payment এখানে দেখানো হয়।
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-primary/5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">তারিখ</th>
                <th className="px-4 py-3">পরিমাণ</th>
                <th className="px-4 py-3">ধরন</th>
                <th className="px-4 py-3">স্ট্যাটাস</th>
                <th className="px-4 py-3">Trx ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    এখনও কোনো payment record নেই। Subscription activate হলে
                    প্রথম payment এখানে দেখাবে।
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-t border-border text-foreground"
                  >
                    <td className="px-4 py-4">
                      {formatDate(payment.chargedAt || payment.createdAt)}
                    </td>
                    <td className="px-4 py-4 font-semibold text-primary">
                      {formatAmount(payment.amount)}
                    </td>
                    <td className="px-4 py-4">
                      {chargeTypeLabels[payment.chargeType || ""] ||
                        payment.chargeType ||
                        "—"}
                    </td>
                    <td className="px-4 py-4">{payment.status}</td>
                    <td className="px-4 py-4 font-mono text-xs text-muted-foreground">
                      {payment.trxID || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!isActiveAutopayStatus(subscription.status) ? (
          <button
            type="button"
            onClick={() => router.push("/donate/regular")}
            className="mt-6 text-sm font-semibold text-primary hover:underline"
          >
            নতুন recurring subscription শুরু করুন →
          </button>
        ) : null}
      </div>
    </section>
  );
}
