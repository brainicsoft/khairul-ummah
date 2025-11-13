import { injectEndpoints } from "@/redux/api/api";

export const {
    useVolunteerRequestMutation
} = injectEndpoints({
    endpoints: ({ mutation, query }) => ({

        volunteerRequest: mutation<object, any>({
            query: (data) => ({
                url: "/volunteer/request",
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response?.data,
        })
    }),
})