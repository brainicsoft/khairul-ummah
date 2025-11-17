// galleryApi.ts
import { injectEndpoints } from "../../api/api";

export interface IGallery {
    _id: string;
    image: string;
    alt: string;
    title?: string;
    purpose?: string;
    date?: string;
    // status?: number;
}

interface GalleryResponse {
    status: number;
    success: boolean;
    message: string;
    data: IGallery[];
}

export const {
    useGetGalleryQuery,
    useCreateGalleryMutation,
    useUpdateGalleryMutation,
    useDeleteGalleryMutation,
    endpoints: GalleryEndpoints
} = injectEndpoints({
    endpoints: ({ query, mutation }) => ({

        // GET ALL GALLERY IMAGES
        getGallery: query<GalleryResponse, void>({
            query: () => ({ url: '/gallery' }),
            // just return the full response
            transformResponse: (response: GalleryResponse) => response,
        }),

        // CREATE GALLERY IMAGE
        createGallery: mutation<GalleryResponse, FormData>({
            query: (formData) => ({
                url: '/gallery/request',
                method: 'POST',
                body: formData, // use FormData to handle image upload
            }),
            transformResponse: (response: GalleryResponse) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),

        // UPDATE GALLERY IMAGE
        updateGallery: mutation<GalleryResponse, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `/gallery/${id}`,
                method: 'PATCH',
                body: data,
            }),
            transformResponse: (response: GalleryResponse) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),

        // DELETE GALLERY IMAGE
        deleteGallery: mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/gallery/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),

    }),
});
