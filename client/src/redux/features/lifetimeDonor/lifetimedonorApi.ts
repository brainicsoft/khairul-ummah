// lifetimeDonorApi.ts

import { injectEndpoints } from "../../api/api";

export interface ILifetimeDonor {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  amount: number;
  occupation?: string;
  address?: string;
  message?: string;
  termsAccepted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface GetLifetimeDonorResponse {
  data: ILifetimeDonor[];
  meta: Meta;
}

export const {
  useGetLifetimeDonorsQuery,
  useGetSingleLifetimeDonorQuery,
  useCreateLifetimeDonorMutation,
  useUpdateLifetimeDonorMutation,
  useDeleteLifetimeDonorMutation,
  useLifetimeDonorRequestMutation,
  endpoints: LifetimeDonorEndpoints,
} = injectEndpoints({
  endpoints: ({ query, mutation }) => ({

    // ============================
    // GET ALL LIFETIME DONORS
    // ============================
    getLifetimeDonors: query<
      GetLifetimeDonorResponse,
      { page?: number; searchTerm?: string; limit?: string }
    >({
      query: ({ page, searchTerm, limit }) => {
        const params = new URLSearchParams({
          ...(page !== undefined ? { page: page.toString() } : {}),
          ...(limit ? { limit } : {}),
          ...(searchTerm ? { searchTerm } : {}),
        }).toString();

        return { url: `/lifetimeDonor?${params}` };
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),

    // ============================
    // GET SINGLE DONOR BY ID
    // ============================
    getSingleLifetimeDonor: query<ILifetimeDonor, { id: string }>({
      query: ({ id }) => ({
        url: `/lifetimeDonor/${id}`,
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // ============================
    // CREATE LIFETIME DONOR
    // ============================
    createLifetimeDonor: mutation<any, ILifetimeDonor>({
      query: (data) => ({
        url: "/lifetimeDonor/request",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // ============================
    // UPDATE LIFETIME DONOR
    // ============================
    updateLifetimeDonor: mutation<any, { id: string; data: ILifetimeDonor }>({
      query: ({ id, data }) => ({
        url: `/lifetimeDonor/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // ============================
    // DELETE LIFETIME DONOR
    // ============================
    deleteLifetimeDonor: mutation<any, string>({
      query: (id) => ({
        url: `/lifetimeDonor/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // ============================
    // REQUEST ENDPOINT (Frontend Form)
    // ============================
    lifetimeDonorRequest: mutation<object, any>({
      query: (data) => ({
        url: "/lifetimeDonor/request",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

  }),
});
