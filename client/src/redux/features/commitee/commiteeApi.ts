// commiteeApi.ts
import { injectEndpoints } from "../../api/api";

export interface ICommitee {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  roleType: string;
  occupation: string;
  title: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface GetAllCommiteesResponse {
  data: ICommitee[];
  meta: Meta;
}

export const {
  useGetAllCommiteesQuery,
  useGetCommiteeByIdQuery,
  useCreateCommiteeMutation,
  useUpdateCommiteeMutation,
  useDeleteCommiteeMutation,
  endpoints: CommiteeEndpoints,
} = injectEndpoints({
  endpoints: ({ query, mutation }) => ({

    // GET ALL COMMITTEES
    // getAllCommitees: query<GetAllCommiteesResponse, { page?: number; searchTerm?: string; limit?: string }>({
    //   query: ({ page, searchTerm, limit }) => {
    //     const params = new URLSearchParams({
    //       ...(page !== undefined ? { page: page.toString() } : {}),
    //       ...(limit ? { limit } : {}),
    //       ...(searchTerm ? { searchTerm } : {}),
    //     }).toString();

    //     return { url: `/commitee?${params}` };
    //   },
    //   transformResponse: (response: any) => response,
    //   transformErrorResponse: (response: any) => response,
    // }),


    getAllCommitees: query<GetAllCommiteesResponse, { page?: number; limit?: string; roleType?: string }>({
      query: ({ page, limit, roleType }) => {
        const params = new URLSearchParams({
          ...(page !== undefined ? { page: page.toString() } : {}),
          ...(limit ? { limit } : {}),
          ...(roleType ? { roleType } : {}),
        }).toString();

        return { url: `/commitee?${params}` };
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),

    // GET SINGLE COMMITTEE BY ID
    getCommiteeById: query<ICommitee, { id: string }>({
      query: ({ id }) => ({
        url: `/commitee/${id}`,
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // CREATE COMMITTEE (Supports FormData + JSON)
    createCommitee: mutation<any, Partial<ICommitee> | FormData>({
      query: (data) => ({
        url: "/commitee/request",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // UPDATE COMMITTEE (Supports FormData + JSON)
    updateCommitee: mutation<any, { id: string | undefined; data: Partial<ICommitee> | FormData }>({
      query: ({ id, data }) => ({
        url: `/commitee/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // DELETE COMMITTEE
    deleteCommitee: mutation<any, string>({
      query: (id) => ({
        url: `/commitee/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

  }),
});
