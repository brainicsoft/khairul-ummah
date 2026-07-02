"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useGetAdminAutopaySubscriptionsQuery,
  useUpdateAdminAutopayStatusMutation,
} from "@/redux/features/autopay/autopayApi";
import { Button } from "@/components/ui/button";

const statusOptions = ["initiated", "activated", "failed", "deactive", "expired"];

const statusLabel: Record<string, string> = {
  initiated: "অপেক্ষমান",
  activated: "সক্রিয়",
  failed: "ব্যর্থ",
  deactive: "বাতিল",
  expired: "মেয়াদ শেষ",
};

const formatAmount = (amount?: number) =>
  `৳${(amount || 0).toLocaleString("bn-BD")}`;

const formatDate = (value?: string) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function AdminAutopayPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, refetch } = useGetAdminAutopaySubscriptionsQuery({
    page,
    limit: 20,
    status,
    searchTerm,
  });

  const [updateStatus, { isLoading: isUpdating }] = useUpdateAdminAutopayStatusMutation();

  const subscriptions = data?.data || [];
  const meta = data?.meta;

  const totalAmount = useMemo(
    () => subscriptions.reduce((sum, item) => sum + (item.amount || 0), 0),
    [subscriptions]
  );

  const handleStatusUpdate = async (id: string, nextStatus: string) => {
    try {
      await updateStatus({ id, status: nextStatus }).unwrap();
      toast.success("Subscription status updated");
      refetch();
    } catch (error: any) {
      toast.error(error?.message || "Status update failed");
    }
  };

  return (
    <main className="flex-1 space-y-6 p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">
            Autopay Subscriptions
          </h1>
          <p className="text-muted-foreground mt-1">
            Recurring subscriptions manage করুন, status update করুন, webhook update verify করুন।
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border p-4 dark:border-gray-700">
          <p className="text-sm text-muted-foreground">Current page subscriptions</p>
          <p className="text-2xl font-bold dark:text-white">{subscriptions.length}</p>
        </div>
        <div className="rounded-xl border p-4 dark:border-gray-700">
          <p className="text-sm text-muted-foreground">Page total amount</p>
          <p className="text-2xl font-bold text-primary">{formatAmount(totalAmount)}</p>
        </div>
        <div className="rounded-xl border p-4 dark:border-gray-700">
          <p className="text-sm text-muted-foreground">Total records</p>
          <p className="text-2xl font-bold dark:text-white">{meta?.total || 0}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          value={searchTerm}
          onChange={(e) => {
            setPage(1);
            setSearchTerm(e.target.value);
          }}
          placeholder="name / phone / subscription id"
          className="w-72 rounded-lg border px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="rounded-lg border px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <option value="">সব স্ট্যাটাস</option>
          {statusOptions.map((item) => (
            <option key={item} value={item}>
              {statusLabel[item] || item}
            </option>
          ))}
        </select>
        <Button variant="outline" onClick={() => refetch()}>
          Refresh
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-muted/50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Frequency</th>
              <th className="px-4 py-3">Subscription</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                  Loading subscriptions...
                </td>
              </tr>
            ) : subscriptions.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                  No subscription found.
                </td>
              </tr>
            ) : (
              subscriptions.map((item) => (
                <tr key={item._id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-3 font-medium dark:text-white">{item.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div>{item.phone}</div>
                    <div className="text-xs">{item.email || "-"}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-primary">
                    {formatAmount(item.amount)}
                  </td>
                  <td className="px-4 py-3">{item.frequency || "-"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {item.subscriptionId || item.subscriptionReference || "-"}
                  </td>
                  <td className="px-4 py-3">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                      {statusLabel[item.status] || item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      defaultValue={item.status}
                      disabled={isUpdating}
                      onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                      className="rounded-md border px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    >
                      {statusOptions.map((next) => (
                        <option key={next} value={next}>
                          {statusLabel[next] || next}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {meta?.page || page} / {meta?.totalPage || 1}
        </span>
        <Button
          variant="outline"
          disabled={(meta?.page || page) >= (meta?.totalPage || 1)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </main>
  );
}

