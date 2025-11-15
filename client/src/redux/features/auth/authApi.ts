/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectEndpoints } from "@/redux/api/api";
import { setAuthData, setLoading } from "./authSlice";

export const {
  useLoginUserMutation,
  useRefreshQuery,
  useGetUserQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useCreateUserMutation,
  useVerifyOtpMutation,
  useExportRoundsCsvMutation,
  endpoints: authEndpoints,
} = injectEndpoints({
  // Define your endpoints here
  overrideExisting: true,
  endpoints: ({ mutation, query }) => ({
    getUser: query<object, void>({
      query: () => ({
        url: "/user/me",
        credentials: "include" as const,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        dispatch(setLoading(true));

        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthData({ data }));
        } catch (error: any) {
          dispatch(setLoading(false));
          console.error(error);
        } finally {
          dispatch(setLoading(false));
        }
      },
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    loginUser: mutation<object, any>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["fundingRound"],
      transformResponse: (response: any) => response, // directly return response
      transformErrorResponse: (response: any) => response?.data, // adjust for data if error
    }),

    forgetPassword: mutation<object, any>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response, // directly return response
      transformErrorResponse: (response: any) => response?.data, // adjust for data if error
    }),

    createUser: mutation<object, any>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const { data = {} }: any = await queryFulfilled;
        dispatch(
          setAuthData({
            token: data.token || "",
            data: data,
          })
        );
      },
      transformResponse: (response: any) => response, // directly return response
      transformErrorResponse: (response: any) => response?.data, // adjust for data if error
    }),

    resetPassword: mutation<object, { token: string; data: object }>({
      query: ({ token, data }) => ({
        url: `/auth/reset-password?token=${token}`,
        method: "PATCH",
        body: data, // The updated transaction data
      }),
      transformResponse: (response: any) => {
        return response;
      },
      transformErrorResponse: (response: any) => {
        return response?.data;
      },
    }),

    changePassword: mutation<object, { data: object }>({
      query: ({ data }) => ({
        url: `/auth/change-password`,
        method: "PATCH",
        body: data, // The updated transaction data
      }),
      transformResponse: (response: any) => {
        return response;
      },
      transformErrorResponse: (response: any) => {
        return response?.data;
      },
    }),

    verifyOtp: mutation<object, any>({
      
      query: (data ) => {
    
        return {
          url: `/auth/activate`,
          method: "POST",
          body: data, // Ensure correct payload
        };
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    logout: mutation<object, void>({
      query: () => ({
        url: `/auth/logout`,
        method: "GET",
        credentials: "include" as const,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const { data = {} } = await queryFulfilled;
        localStorage.removeItem("access_token");
        dispatch(
          setAuthData({
            token: "",
            data: data,
          })
        );
      },
      invalidatesTags: ["fundingRound"],
      transformResponse: (response: any) => {
        return response;
      },
      transformErrorResponse: (response: any) => {
        return response;
      },
    }),

    exportRoundsCsv: mutation<any, FormData>({
      query: (data) => ({
        url: "/subscriptions/export",
        method: "PATCH",
        body: data,
        // Don't set Content-Type header, browser will set it with boundary for FormData
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

  }),
});