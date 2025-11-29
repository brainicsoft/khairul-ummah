// contactApi.ts
import { injectEndpoints } from "../../api/api";

export interface IContact {
  _id?: string;
  email: string;
  name: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface ContactResponse {
  status: number;
  success: boolean;
  message: string;
  data: IContact | IContact[];
}

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  endpoints: ContactEndpoints
} = injectEndpoints({
  endpoints: ({ query, mutation }) => ({

    // ============================
    // GET ALL CONTACTS
    // ============================
    getContacts: query<ContactResponse, void>({
      query: () => ({
        url: "/contact",
      }),
      transformResponse: (response: ContactResponse) => response,
    }),

    // ============================
    // CREATE A CONTACT
    // ============================
    createContact: mutation<ContactResponse, IContact>({
      query: (payload) => ({
        url: "/contact/request",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ContactResponse) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // ============================
    // DELETE A CONTACT
    // ============================
    deleteContact: mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

  }),
});
