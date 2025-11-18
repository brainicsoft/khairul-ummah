import {  } from '@/redux/features/gallery/galleryApi';
// galleryApi.ts
import { injectEndpoints } from "../../api/api";


export const {
    useCreateBkashMutation,
    endpoints: paymentInpoints
} = injectEndpoints({
    endpoints: ({ query, mutation }) => ({

        // CREATE GALLERY IMAGE
        createBkash: mutation<any, any>({
            query: (formData) => ({
                url: '/payment/create',
                method: 'POST',
                body: formData, // use FormData to handle image upload
            }),
            transformResponse: (response: any) => response,
            transformErrorResponse: (response: any) => response?.data,
        }),

    }),
});
