import { injectEndpoints } from "../../api/api";

export interface IBlog {
    _id: string;
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    category: string;
    image: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface Meta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

interface GetAllBlogsResponse {
    data: IBlog[];
    meta: Meta;
}

export const {
    useGetAllBlogsQuery,
    useGetBlogBySlugQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useBlogRequestMutation,
    useDeleteBlogMutation,
    endpoints: BlogEndpoints,
} = injectEndpoints({
    endpoints: ({ query, mutation }) => ({

        // GET ALL BLOGS
        getAllBlogs: query<GetAllBlogsResponse, { page?: number; searchTerm?: string; limit?: string }>({
            query: ({ page, searchTerm, limit }) => {
                const params = new URLSearchParams({
                    ...(page !== undefined ? { page: page.toString() } : {}),
                    ...(limit ? { limit } : {}),
                    ...(searchTerm ? { searchTerm } : {}),
                }).toString();

                return {
                    url: `/blog?${params}`,
                };
            },
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response,
        }),

        // GET SINGLE BLOG BY SLUG
        getBlogBySlug: query<IBlog, { slug: string }>({
            query: ({ slug }) => ({
                url: `/blog/${slug}`,
            }),
            transformResponse: (response: any) => response?.data,
            transformErrorResponse: (response: any) => response?.data,
        }),

        // CREATE BLOG
        createBlog: mutation<any, Partial<IBlog>>({
            query: (data) => ({
                url: "/blog/request",
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),

        // UPDATE BLOG
        updateBlog: mutation<any, { id: string | undefined; data: object }>({
            query: ({ id, data }) => ({
                url: `/blog/${id}`,
                method: "PATCH",
                body: data,
            }),
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),


        // DELETE BLOG
        deleteBlog: mutation<any, string>({
            query: (id) => ({
                url: `/blog/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response?.data,
            transformErrorResponse: (response: any) => response?.data,
        }),
        // request
        blogRequest: mutation<object, any>({
            query: (data) => ({
                url: "/blog/request",
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),

    }),
});
