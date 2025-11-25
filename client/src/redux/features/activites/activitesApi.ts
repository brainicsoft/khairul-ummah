import { injectEndpoints } from "../../api/api";

export interface IActivity {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  content?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  slug: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface GetAllActivitiesResponse {
  data: IActivity[];
  meta: Meta;
}

export const {
  useGetAllActivitiesQuery,
  useGetActivityBySlugQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
  endpoints: ActivityEndpoints,
} = injectEndpoints({
  endpoints: ({ query, mutation }) => ({

    // GET ALL ACTIVITIES
    getAllActivities: query<GetAllActivitiesResponse, { page?: number; searchTerm?: string; limit?: string }>({
      query: ({ page, searchTerm, limit }) => {
        const params = new URLSearchParams({
          ...(page !== undefined ? { page: page.toString() } : {}),
          ...(limit ? { limit } : {}),
          ...(searchTerm ? { searchTerm } : {}),
        }).toString();

        return {
          url: `/activities?${params}`,
        };
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),

    // GET SINGLE ACTIVITY BY SLUG
    getActivityBySlug: query<IActivity, { slug: string }>({
      query: ({ slug }) => ({
        url: `/activities/${slug}`,
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // CREATE ACTIVITY
    createActivity: mutation<any, Partial<IActivity> | FormData>({
      query: (data) => ({
        url: "/activities/request",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // UPDATE ACTIVITY
    updateActivity: mutation<any, { id: string | undefined; data: object }>({
      query: ({ id, data }) => ({
        url: `/activities/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // DELETE ACTIVITY
    deleteActivity: mutation<any, string>({
      query: (id) => ({
        url: `/activities/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),
  }),
});
