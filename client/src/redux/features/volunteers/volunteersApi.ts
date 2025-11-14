import { injectEndpoints } from "../../api/api";

export interface IVolunteer {
  _id?: string;
  slug: string;
  fullName: string;
  fatherName: string;
  NidNo: string;
  mobileNumber: string;
  email: string;
  avatar?: string;
  birthDate: string;
  gender: string;
  age: number;
  presentAddress: string;
  permanentAddress: string;
  currentProfession: string;
  organizationName: string;
  workAddress: string;
  educationQualification: string;
  interestReason: string;
  photo: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface GetAllVolunteersResponse {
  data: IVolunteer[];
  meta: Meta;
}

export const {
  useGetAllVolunteersQuery,
  useGetVolunteerBySlugQuery,
  useCreateVolunteerMutation,
  useUpdateVolunteerMutation,
  useDeleteVolunteerMutation,
  endpoints: VolunteerEndpoints
} = injectEndpoints({
  endpoints: ({ query, mutation }) => ({

    // GET ALL VOLUNTEERS
    getAllVolunteers: query<
      GetAllVolunteersResponse,
      { page?: number; searchTerm?: string }
    >({
      query: ({ page, searchTerm }) => {
        const params = new URLSearchParams({
          ...(page !== undefined ? { page: page.toString() } : {}),
          limit: "1",
          ...(searchTerm ? { searchTerm } : {}),
        }).toString();

        return {
          url: `/volunteer?${params}`, // ✅ fixed
        };
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),

    // GET SINGLE VOLUNTEER
    getVolunteerBySlug: query<IVolunteer, { slug: string }>({
      query: ({ slug }) => ({
        url: `/volunteer/${slug}`, // ✅ fixed
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // CREATE VOLUNTEER
    createVolunteer: mutation<any, Partial<IVolunteer>>({
      query: (data) => ({
        url: "/volunteer", // ✅ fixed
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // UPDATE VOLUNTEER
    updateVolunteer: mutation<any, { id: string; data: Partial<IVolunteer> }>(
      {
        query: ({ id, data }) => ({
          url: `/volunteer/${id}`, // ✅ fixed
          method: "PATCH",
          body: data,
        }),
        transformResponse: (response: any) => response,
        transformErrorResponse: (response: any) => response?.data,
      }
    ),

    // DELETE VOLUNTEER
    deleteVolunteer: mutation<any, string>({
      query: (id) => ({
        url: `/volunteer/${id}`, // ✅ fixed
        method: "DELETE",
      }),
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

  }),
});
