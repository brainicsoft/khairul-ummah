import { injectEndpoints } from "../../api/api";

export interface CreateAutopayPayload {
  name?: string;
  email?: string;
  phone: string;
  amount: number;
  frequency: string;
  paymentType?: string;
  payerType?: string;
  method: "bkash" | "sslcommerz";
  donorName?: string;
  metadata?: Record<string, any>;
}

export const {
  useCreateAutopayMutation,
  endpoints: autopayEndpoints,
} = injectEndpoints({
  endpoints: ({ mutation }) => ({
    createAutopay: mutation<any, CreateAutopayPayload>({
      query: (body) => ({
        url: "/autopay/bkash/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),
  }),
});

export default autopayEndpoints;
