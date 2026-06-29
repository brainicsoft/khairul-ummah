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

export const {
  useCreateRecurringBkashMutation,
  endpoints: autopayEndpoints,
} = injectEndpoints({
  endpoints: ({ mutation }) => ({
    createRecurringBkash: mutation<CreateRecurringBkashResponse, CreateRecurringBkashPayload>({
      query: (body) => ({
        url: "/autopay/bkash/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: CreateRecurringBkashResponse) => response,
      transformErrorResponse: (response: { data?: { message?: string } }) => response?.data,
    }),
  }),
})
