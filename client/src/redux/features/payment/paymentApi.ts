import { } from '@/redux/features/gallery/galleryApi';
// galleryApi.ts
import { injectEndpoints } from "../../api/api";
export interface IPaymentRecord {
    _id?: string;
    name: string;
    email?: string;
    phone: string;
    amount: number;
    paymentId: string;
    status: "success" | "failed" | "pending";
    donationType: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

interface Meta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

interface GetAllPaymentRecordsResponse {
    data: IPaymentRecord[];
    meta: Meta;
}
export interface CreatePaymentPayload {
    name: string;
    email?: string;
    phone: string;
    amount: number;
    donationType?: string;
    donorMessage?: string;
    method: "bkash" | "sslcommerz"; // required now
}

export const {
    useCreateBkashMutation,
    useCreatePaymentMutation,
    useGetAllPaymentRecordsQuery,
    useUpdatePaymentRecordMutation,
    useDeletePaymentRecordMutation,
    useGetPaymentSummaryQuery,
    endpoints: paymentInpoints
} = injectEndpoints({
    endpoints: ({ query, mutation }) => ({

        // CREATE GALLERY IMAGE
        createBkash: mutation<any, any>({
            query: (formData) => ({
                url: '/payment/create',
                method: 'POST',
                body: formData, // use FormData to handle image upload
            }),
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),

        // CREATE PAYMENT (SSLCommerz)
        createPayment: mutation<any, CreatePaymentPayload>({
            query: (formData) => ({
                url: '/payment/create',
                method: 'POST',
                body: formData,
            }),
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),
        // GET ALL PAYMENT RECORDS (with optional pagination and filtering)
        getAllPaymentRecords: query<GetAllPaymentRecordsResponse, { page?: number; limit?: string; status?: string; donationType?: string }>({
            query: ({ page, limit, status, donationType }) => {
                const params = new URLSearchParams({
                    ...(page !== undefined ? { page: page.toString() } : {}),
                    ...(limit ? { limit } : {}),
                    ...(status ? { status } : {}),
                    ...(donationType ? { donationType } : {}),
                }).toString();

                return { url: `/payment?${params}` };
            },
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response,
        }),

        // UPDATE PAYMENT RECORD
        updatePaymentRecord: mutation<any, { id: string | undefined; data: Partial<IPaymentRecord> }>({
            query: ({ id, data }) => ({
                url: `/payment/${id}`,
                method: "PATCH",
                body: data,
            }),
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),

        // DELETE PAYMENT RECORD
        deletePaymentRecord: mutation<any, string>({
            query: (id) => ({
                url: `/payment/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response?.data,
            transformErrorResponse: (response: any) => response?.data,
        }),
        // GET PAYMENT SUMMARY
        getPaymentSummary: query<any, void>({
            query: () => ({
                url: "/payment/summary",
                method: "GET",
            }),
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),


    }),
});
