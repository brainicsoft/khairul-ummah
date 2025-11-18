/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { apiUrl } from "@/config/constants";
import Cookies from "js-cookie";
import { setAuthData, setLoading } from "../features/auth/authSlice";

// Define the base API
const baseQuery = fetchBaseQuery({
  baseUrl: `${apiUrl}`,
  credentials: "include" as const,
  prepareHeaders: (headers) => {
    // const accessToken =Cookie.get;
    const accessToken = Cookies.get("auth_token");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn = async (args, api, options) => {
  let result: any = await baseQuery(args, api, options);

  if (result.error) {
    if (result.error.status === 401 || result.error.status === 500) {
      try {
        const response = await fetch(`${apiUrl}/auth/refresh`, {
          method: "GET",
          credentials: "include" as const,
        });

        const data = await response.json();

        if (data?.token) {
          result = await baseQuery(args, api, options);
        }
      } catch (err) {
        console.error("Error during token refresh:", err);
      }
    }
  }

  return result;
};

export const {
  reducerPath,
  reducer,
  injectEndpoints,
  middleware: authMiddleware,
  endpoints,
  useRefreshQuery,
  useGetUserQuery,
  util,
} = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["info","fundingRound","company",'savelist'],
  endpoints: ({ query }) => ({
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
          dispatch(setAuthData({ }));
        } finally {
          dispatch(setLoading(false));
        }
      },
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    refresh: query<object, void>({
      query: () => ({
        url: "/auth/refresh",
        credentials: "include" as const,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setAuthData(data));
      },
      transformResponse: (response: any) => {
        return response.data;
      },
      transformErrorResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});