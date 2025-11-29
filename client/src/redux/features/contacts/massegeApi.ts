// messageApi.ts
import { injectEndpoints } from "../../api/api";

export interface IMessage {
  _id?: string;
  email: string;
  name?: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface GetAllMessageResponse {
  data: IMessage[];
  meta: Meta;
}

interface SingleMessageResponse {
  status: number;
  success: boolean;
  message: string;
  data: IMessage;
}

export const {
  useGetAllMessagesQuery,
  useCreateMessageMutation,
  useDeleteMessageMutation,
  endpoints: MessageEndpoints,
} = injectEndpoints({
  endpoints: ({ query, mutation }) => ({

    // ==============================
    // GET ALL MESSAGES
    // ==============================
    getAllMessages: query<GetAllMessageResponse, { page?: number; searchTerm?: string; limit?: string }>({
      query: ({ page, searchTerm, limit }) => {
        const params = new URLSearchParams({
          ...(page !== undefined ? { page: page.toString() } : {}),
          ...(limit ? { limit } : {}),
          ...(searchTerm ? { searchTerm } : {}),
        }).toString();

        return {
          url: `/massege?${params}`,
        };
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),

    // ==============================
    // CREATE MESSAGE
    // ==============================
    createMessage: mutation<SingleMessageResponse, Partial<IMessage>>({
      query: (data) => ({
        url: "/massege/request",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // ==============================
    // DELETE MESSAGE
    // ==============================
    deleteMessage: mutation<any, string>({
      query: (id) => ({
        url: `/massege/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

  }),
});
