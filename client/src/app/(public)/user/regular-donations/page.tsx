"use client";

import Link from "next/link";
import { CalendarClock, RefreshCcw } from "lucide-react";
import { useGetMyDonationsQuery } from "@/redux/features/user/userApi";

const getErrorMessage = (error: unknown) => {
  if (!error || typeof error !== "object") return null;
  const err = error as { message?: string; data?: { message?: string } };
  return err.data?.message || err.message || null;
};

const isActiveRecurring = (status?: string) => {
  const normalized = (status || "").toLowerCase();
  return normalized === "activated" || normalized === "active";
};

const formatAmount = (amount: number) => `৳${amount.toLocaleString("bn-BD")}`;

const formatDate = (value?: string) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const frequencyLabels: Record<string, string> = {
  DAILY: "দৈনিক",
  WEEKLY: "সাপ্তাহিক",
  CALENDAR_MONTH: "মাসিক",
};

const statusLabels: Record<string, string> = {
  activated: "সক্রিয়",
  active: "সক্রিয়",
  initiated: "অপেক্ষমান",
  pending: "অপেক্ষমান",
  failed: "ব্যর্থ",
  expired: "মেয়াদ শেষ",
  deactive: "বন্ধ",
};

function SubscriptionCard({
  plan,
  highlight,
}: {
  plan: {
    _id: string;
    amount?: number;
    frequency?: string;
    status: string;
    subscriptionId?: string;
    subscriptionReference?: string;
    createdAt: string;
    nextPaymentDate?: string;
  };
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm ${
        highlight
          ? "border-green-300 bg-green-50/60"
          : "border-primary/10 bg-card"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">
          {frequencyLabels[plan.frequency || ""] || "নিয়মিত অনুদান"}
        </h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isActiveRecurring(plan.status)
              ? "bg-green-100 text-green-700"
              : "bg-primary/10 text-primary"
          }`}
        >
          {statusLabels[plan.status.toLowerCase()] || plan.status}
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-primary">
        {formatAmount(plan.amount || 0)}
      </p>
      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4" />
          শুরু: {formatDate(plan.createdAt)}
        </p>
        <p>Subscription ID: {plan.subscriptionId || plan.subscriptionReference || "-"}</p>
        {plan.nextPaymentDate ? (
          <p>পরবর্তী debit: {formatDate(plan.nextPaymentDate)}</p>
        ) : null}
      </div>
      <Link
        href={`/user/subscriptions/${plan._id}`}
        className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
      >
        বিস্তারিত ও payment history →
      </Link>
    </div>
  );
}

export default function UserRegularDonationsPage() {
  const { data, isLoading, isError, error, refetch } = useGetMyDonationsQuery();

  const active = data?.activeRecurringSubscriptions ?? [];
  const allRecurring = data?.recurringSubscriptions ?? [];
  const inactive = allRecurring.filter((item) => !isActiveRecurring(item.status));

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
          নিয়মিত অনুদান
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          আপনার সক্রিয় ও পূর্বের bKash recurring subscription এখানে দেখুন।
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">লোড হচ্ছে...</p>
      ) : isError ? (
        <div>
          <p className="text-sm text-red-600">ডেটা লোড করা যায়নি</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {getErrorMessage(error) || "আবার লগইন করে চেষ্টা করুন।"}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-2 text-sm font-semibold text-primary hover:underline"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <RefreshCcw className="mb-2 h-6 w-6 text-green-700" />
              <p className="text-xs uppercase tracking-[0.3em] text-green-700">
                সক্রিয় subscription
              </p>
              <p className="mt-2 text-2xl font-bold text-green-800">
                {active.length} টি
              </p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-card p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                মোট recurring
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {allRecurring.length} টি
              </p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-card p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                সক্রিয় recurring amount
              </p>
              <p className="mt-2 text-2xl font-bold text-primary">
                {formatAmount(data?.summary?.totalActiveRecurringAmount ?? 0)}
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              সক্রিয় নিয়মিত অনুদান
            </h2>
            {active.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-green-200 bg-green-50/40 p-8 text-center">
                <p className="text-muted-foreground">কোনো সক্রিয় recurring নেই।</p>
                <Link
                  href="/donate/regular"
                  className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  নিয়মিত অনুদান শুরু করুন
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {active.map((plan) => (
                  <SubscriptionCard key={plan._id} plan={plan} highlight />
                ))}
              </div>
            )}
          </div>

          {inactive.length > 0 ? (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                অন্যান্য subscription
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {inactive.map((plan) => (
                  <SubscriptionCard key={plan._id} plan={plan} />
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
