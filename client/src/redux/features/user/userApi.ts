import { injectEndpoints } from "@/redux/api/api";

export type MyDonationPayment = {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  amount: number;
  paymentId?: string;
  status: string;
  donationType: string;
  method?: string;
  trxID?: string;
  donorMessage?: string;
  createdAt: string;
  updatedAt: string;
};

export type MyRecurringSubscription = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  amount?: number;
  frequency?: string;
  status: string;
  subscriptionId?: string;
  subscriptionReference?: string;
  nextPaymentDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type MyDonationsResponse = {
  user: {
    name: string;
    phone?: string;
    email: string;
    profileCompleted?: boolean;
  };
  summary: {
    totalOneTime: number;
    oneTimeCount: number;
    recurringCount: number;
    activeRecurringCount: number;
    totalActiveRecurringAmount?: number;
  };
  oneTimePayments: MyDonationPayment[];
  recurringSubscriptions: MyRecurringSubscription[];
  activeRecurringSubscriptions: MyRecurringSubscription[];
};

export type SubscriptionCharge = {
  _id: string;
  autopayId: string;
  subscriptionId: string;
  amount: number;
  trxID?: string;
  status: string;
  chargeType?: string;
  chargedAt?: string;
  createdAt: string;
};

export type SubscriptionDetailResponse = {
  subscription: MyRecurringSubscription;
  payments: SubscriptionCharge[];
  summary: {
    totalPaid: number;
    paymentCount: number;
    isActive: boolean;
  };
};

export const {
  useGetMyDonationsQuery,
  useUpdateMyProfileMutation,
  useGetSubscriptionDetailQuery,
  useCancelSubscriptionDemoMutation,
} = injectEndpoints({
  overrideExisting: true,
  endpoints: ({ query, mutation }) => ({
    getMyDonations: query<MyDonationsResponse, void>({
      query: () => ({
        url: "/user/my-donations",
      }),
      providesTags: ["MyDonations"],
      transformResponse: (response: {
        success?: boolean;
        data?: MyDonationsResponse;
      }) => {
        if (response?.data?.summary) return response.data;
        if ((response as unknown as MyDonationsResponse)?.summary) {
          return response as unknown as MyDonationsResponse;
        }
        throw new Error("Invalid donations response");
      },
      transformErrorResponse: (response: {
        status?: number;
        data?: { message?: string };
      }) => response?.data ?? { message: "Request failed" },
    }),

    updateMyProfile: mutation<
      unknown,
      { name?: string; email?: string }
    >({
      query: (body) => ({
        url: "/user/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["MyDonations"],
      transformResponse: (response: { data?: unknown }) => response?.data,
      transformErrorResponse: (response: { data?: unknown }) => response?.data,
    }),

    getSubscriptionDetail: query<SubscriptionDetailResponse, string>({
      query: (id) => ({
        url: `/user/subscriptions/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "MyDonations", id }],
      transformResponse: (response: {
        data?: SubscriptionDetailResponse;
      }) => {
        if (response?.data?.subscription) return response.data;
        throw new Error("Invalid subscription response");
      },
      transformErrorResponse: (response: {
        data?: { message?: string };
      }) => response?.data ?? { message: "Request failed" },
    }),

    cancelSubscriptionDemo: mutation<
      { message?: string; demo?: boolean },
      string
    >({
      query: (id) => ({
        url: `/user/subscriptions/${id}/cancel-demo`,
        method: "POST",
      }),
      invalidatesTags: ["MyDonations"],
      transformResponse: (response: {
        success?: boolean;
        message?: string;
        data?: { message?: string; demo?: boolean };
      }) => ({
        message:
          response?.data?.message ||
          response?.message ||
          "Subscription cancelled (demo)",
        demo: response?.data?.demo,
      }),
      transformErrorResponse: (response: {
        data?: { message?: string };
      }) => response?.data ?? { message: "Request failed" },
    }),
  }),
});
