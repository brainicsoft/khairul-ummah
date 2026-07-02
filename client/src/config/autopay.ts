/**
 * Autopay / Recurring donation flow map
 *
 * CREATE  → donor starts subscription
 * ACTIVATE → bKash callback after first payment
 * VIEW    → donor portal lists subscriptions + per-subscription charges
 * CANCEL  → demo cancel (DB only; bKash API not wired yet)
 */

export const AUTOPAY_FLOW = {
  create: {
    label: "Subscription তৈরি",
    page: "/donate/regular",
    api: "POST /api/v1/autopay/bkash/create",
    description:
      "দাতা ফর্ম পূরণ করলে MongoDB-তে Autopay রেকর্ড (status: initiated) তৈরি হয় এবং bKash redirect URL পাওয়া যায়।",
  },
  activate: {
    label: "Subscription সক্রিয়",
    callback: "GET /api/v1/autopay/bkash/callback",
    successPage: "/payment-status?type=recurring",
    description:
      "bKash থেকে callback এলে status activated/active হয় এবং প্রথম payment AutopayCharge হিসেবে সংরক্ষিত হয়।",
  },
  list: {
    label: "Subscription তালিকা",
    pages: ["/user/regular-donations", "/user/donations"],
    api: "GET /api/v1/user/my-donations",
  },
  detail: {
    label: "Subscription + payment history",
    pagePattern: "/user/subscriptions/:id",
    api: "GET /api/v1/user/subscriptions/:id",
    description: "একটি subscription-এর বিস্তারিত ও তার under-এ সব recurring charge দেখায়।",
  },
  cancelDemo: {
    label: "Demo বাতিল",
    api: "POST /api/v1/user/subscriptions/:id/cancel-demo",
    description:
      "Demo: শুধু আমাদের DB-তে status deactive করা হয়। Production-এ bKash cancel API যুক্ত হবে।",
  },
} as const;

export const AUTOPAY_STATUS_LABELS: Record<string, string> = {
  initiated: "অপেক্ষমান",
  pending: "অপেক্ষমান",
  activated: "সক্রিয়",
  active: "সক্রিয়",
  failed: "ব্যর্থ",
  expired: "মেয়াদ শেষ",
  deactive: "বাতিল",
};

export const isActiveAutopayStatus = (status?: string) => {
  const normalized = (status || "").toLowerCase();
  return normalized === "activated" || normalized === "active";
};
