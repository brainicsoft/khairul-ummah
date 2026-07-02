import { injectEndpoints } from "../../api/api"

export type RecurringFrequency =
  | "DAILY"
  | "WEEKLY"
  | "FIFTEEN_DAYS"
  | "THIRTY_DAYS"
  | "NINETY_DAYS"
  | "ONE_EIGHTY_DAYS"
  | "CALENDAR_MONTH"
  | "CALENDAR_YEAR"

export interface CreateRecurringBkashPayload {
  name: string
  phone: string
  email?: string
  amount: number
  frequency: RecurringFrequency
  donorName?: string
}

interface CreateRecurringBkashResponse {
  data?: {
    url?: string
    bkash?: {
      redirectURL?: string
      redirectUrl?: string
    }
  }
}

export interface AdminAutopaySubscription {
  _id: string
  name: string
  phone: string
  email?: string
  amount?: number
  frequency?: string
  status: string
  subscriptionId?: string
  subscriptionReference?: string
  createdAt: string
  updatedAt: string
}

type AdminListResponse = {
  data: AdminAutopaySubscription[]
  meta?: { page: number; limit: number; total: number; totalPage: number }
}

export const {
  useCreateRecurringBkashMutation,
  useGetAdminAutopaySubscriptionsQuery,
  useGetAdminAutopaySubscriptionDetailQuery,
  useUpdateAdminAutopayStatusMutation,
  endpoints: autopayEndpoints,
} = injectEndpoints({
  endpoints: ({ mutation, query }) => ({
    createRecurringBkash: mutation<CreateRecurringBkashResponse, CreateRecurringBkashPayload>({
      query: (body) => ({
        url: "/autopay/bkash/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: CreateRecurringBkashResponse) => response,
      transformErrorResponse: (response: { data?: { message?: string } }) => response?.data,
    }),
    getAdminAutopaySubscriptions: query<
      AdminListResponse,
      { page?: number; limit?: number; status?: string; searchTerm?: string }
    >({
      query: ({ page = 1, limit = 20, status = "", searchTerm = "" } = {}) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          ...(status ? { status } : {}),
          ...(searchTerm ? { searchTerm } : {}),
        }).toString()
        return { url: `/autopay/admin/subscriptions?${params}` }
      },
      transformResponse: (response: any) => ({
        data: response?.data || [],
        meta: response?.meta,
      }),
      transformErrorResponse: (response: { data?: { message?: string } }) => response?.data,
    }),
    getAdminAutopaySubscriptionDetail: query<any, string>({
      query: (id) => ({
        url: `/autopay/admin/subscriptions/${id}`,
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: { data?: { message?: string } }) => response?.data,
    }),
    updateAdminAutopayStatus: mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/autopay/admin/subscriptions/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: { data?: { message?: string } }) => response?.data,
    }),
  }),
})
