import { injectEndpoints } from "../../api/api";

export interface IDonationProject {
  _id: string;
  slug: string;
  title: string;
  desc: string;
  image?: string;
  color?: string;
  category?: string;
  benefits?: string[];
  status: string;
  videoUrl?: string;
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface GetAllDonationProjectsResponse {
  data: IDonationProject[];
  meta: Meta;
}

export const {
  useGetAllDonationProjectsQuery,
  useGetDonationProjectBySlugQuery,
  useCreateDonationProjectMutation,
  useUpdateDonationProjectMutation,
  useDeleteDonationProjectMutation,
  useDonationRequestMutation,
  endpoints: DonationProjectEndpoints,
} = injectEndpoints({
  endpoints: ({ query, mutation }) => ({

    // GET ALL DONATION PROJECTS
    getAllDonationProjects: query<
      GetAllDonationProjectsResponse,
      { page?: number; searchTerm?: string; limit?: string }
    >({
      query: ({ page, searchTerm, limit }) => {
        const params = new URLSearchParams({
          ...(page !== undefined ? { page: page.toString() } : {}),
          ...(limit ? { limit } : {}),
          ...(searchTerm ? { searchTerm } : {}),
        }).toString();

        return {
          url: `/donation?${params}`,
        };
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),

    // GET SINGLE DONATION PROJECT BY SLUG
    getDonationProjectBySlug: query<IDonationProject, { slug: string }>({
      query: ({ slug }) => ({
        url: `/donation/${slug}`,
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // CREATE DONATION PROJECT
    createDonationProject: mutation<any, Partial<IDonationProject>>({
      query: (data) => ({
        url: "/donation",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // UPDATE DONATION PROJECT
    updateDonationProject: mutation<any, { id: string; data: object }>({
      query: ({ id, data }) => ({
        url: `/donation/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // DELETE DONATION PROJECT
    deleteDonationProject: mutation<any, string>({
      query: (id) => ({
        url: `/donation/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // DONATION REQUEST
    donationRequest: mutation<object, any>({
      query: (data) => ({
        url: "/donation/request",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

  }),
});
