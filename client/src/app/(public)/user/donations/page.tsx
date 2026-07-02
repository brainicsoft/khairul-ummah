"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TrendingUp, RefreshCcw } from "lucide-react";
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

const methodLabels: Record<string, string> = {
  bkash: "বিকাশ",
  sslcommerz: "SSLCommerz",
};

const frequencyLabels: Record<string, string> = {
  DAILY: "দৈনিক",
  WEEKLY: "সাপ্তাহিক",
  CALENDAR_MONTH: "মাসিক",
};

const recurringStatusLabels: Record<string, string> = {
  activated: "সক্রিয়",
  active: "সক্রিয়",
  initiated: "অপেক্ষমান",
  pending: "অপেক্ষমান",
  failed: "ব্যর্থ",
  expired: "মেয়াদ শেষ",
  deactive: "বন্ধ",
};

type TabKey = "all" | "one-time" | "recurring";

export default function UserDonationsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const { data, isLoading, isError, error, refetch } = useGetMyDonationsQuery();

  const summary = data?.summary;
  const oneTimePayments = data?.oneTimePayments ?? [];
  const recurringSubscriptions = data?.recurringSubscriptions ?? [];
  const activeRecurring = data?.activeRecurringSubscriptions ?? recurringSubscriptions.filter(
    (item) => isActiveRecurring(item.status)
  );

  const tabs = useMemo(
    () => [
      { key: "all" as const, label: "সব অনুদান" },
      { key: "one-time" as const, label: "এককালীন" },
      { key: "recurring" as const, label: "নিয়মিত" },
    ],
    []
  );

  return (
      <section className="space-y-8">
        <div className="rounded-3xl border border-primary/15 bg-linear-to-br from-primary/10 via-background to-background p-8 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            My Donations
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            আমার সব অনুদান
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {data?.user?.name ? `${data.user.name}, ` : ""}
            আপনার এককালীন ও নিয়মিত সব অনুদান এখানে দেখুন।
          </p>

          {isLoading ? (
            <p className="mt-6 text-sm text-muted-foreground">লোড হচ্ছে...</p>
          ) : isError ? (
            <div className="mt-6 space-y-3">
              <p className="text-sm text-red-600">
                অনুদানের তালিকা লোড করা যায়নি।
              </p>
              <p className="text-xs text-muted-foreground">
                {getErrorMessage(error) || "আবার লগইন করে চেষ্টা করুন।"}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="text-sm font-semibold text-primary hover:underline"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-primary/10 bg-card p-5">
                <TrendingUp className="mb-2 h-6 w-6 text-primary" />
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  মোট এককালীন
                </p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {formatAmount(summary?.totalOneTime ?? 0)}
                </p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-card p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  এককালীন দান
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {summary?.oneTimeCount ?? 0} টি
                </p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-card p-5">
                <RefreshCcw className="mb-2 h-6 w-6 text-primary" />
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  নিয়মিত সাবস্ক্রিপশন
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {summary?.recurringCount ?? 0} টি
                </p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-card p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  সক্রিয় recurring
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {summary?.activeRecurringCount ?? 0} টি
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-primary/15 bg-card p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {(activeTab === "all" || activeTab === "one-time") && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-foreground">
                এককালীন অনুদান
              </h2>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-primary/5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">তারিখ</th>
                      <th className="px-4 py-3">পরিমাণ</th>
                      <th className="px-4 py-3">মেথড</th>
                      <th className="px-4 py-3">তহবিল</th>
                      <th className="px-4 py-3">ট্রানজেকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oneTimePayments.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-8 text-center text-muted-foreground"
                        >
                          এখনও কোনো এককালীন অনুদান নেই।{" "}
                          <Link href="/donate" className="text-primary hover:underline">
                            দান করুন
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      oneTimePayments.map((donation) => (
                        <tr
                          key={donation._id}
                          className="border-t border-border text-foreground"
                        >
                          <td className="px-4 py-4">
                            {formatDate(donation.createdAt)}
                          </td>
                          <td className="px-4 py-4 font-semibold text-primary">
                            {formatAmount(donation.amount)}
                          </td>
                          <td className="px-4 py-4">
                            {methodLabels[donation.method || ""] ||
                              donation.method ||
                              "-"}
                          </td>
                          <td className="px-4 py-4">{donation.donationType}</td>
                          <td className="px-4 py-4 text-xs text-muted-foreground">
                            {donation.trxID || donation.paymentId || "-"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "recurring") && (
            <div className="mt-8">
              {activeRecurring.length > 0 ? (
                <div className="mb-6 rounded-2xl border border-green-200 bg-green-50/50 p-4">
                  <p className="text-sm font-semibold text-green-800">
                    {activeRecurring.length} টি সক্রিয় recurring subscription চলছে
                  </p>
                </div>
              ) : null}
              <h2 className="text-xl font-semibold text-foreground">
                নিয়মিত অনুদান (Recurring)
              </h2>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-primary/5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">তারিখ</th>
                      <th className="px-4 py-3">পরিমাণ</th>
                      <th className="px-4 py-3">ফ্রিকোয়েন্সি</th>
                      <th className="px-4 py-3">স্ট্যাটাস</th>
                      <th className="px-4 py-3">Subscription ID</th>
                      <th className="px-4 py-3">বিস্তারিত</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recurringSubscriptions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-muted-foreground"
                        >
                          কোনো recurring subscription নেই।{" "}
                          <Link
                            href="/donate/regular"
                            className="text-primary hover:underline"
                          >
                            নিয়মিত অনুদান শুরু করুন
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      recurringSubscriptions.map((item) => (
                        <tr
                          key={item._id}
                          className="border-t border-border text-foreground"
                        >
                          <td className="px-4 py-4">
                            {formatDate(item.createdAt)}
                          </td>
                          <td className="px-4 py-4 font-semibold text-primary">
                            {formatAmount(item.amount || 0)}
                          </td>
                          <td className="px-4 py-4">
                            {frequencyLabels[item.frequency || ""] ||
                              item.frequency ||
                              "-"}
                          </td>
                          <td className="px-4 py-4">
                            {recurringStatusLabels[item.status] || item.status}
                          </td>
                          <td className="px-4 py-4 text-xs text-muted-foreground">
                            {item.subscriptionId ||
                              item.subscriptionReference ||
                              "-"}
                          </td>
                          <td className="px-4 py-4">
                            <Link
                              href={`/user/subscriptions/${item._id}`}
                              className="text-primary hover:underline"
                            >
                              দেখুন
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
  );
}
