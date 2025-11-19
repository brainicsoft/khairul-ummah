// // app/gallery/page.tsx
// import Image from "next/image";
// import Link from "next/link";
// import { apiUrl } from "@/config/constants";
// interface ImageItem {
//   _id: string;
//   image: string;
//   alt?: string;
// }
// interface GalleryPageProps {
//   searchParams?: Promise<{ limit?: string }>;
// }
// export default async function GalleryPage({ searchParams }: GalleryPageProps) {
//   const params = await searchParams; // unwrap Promise
//   const page = 1; // all time page 1
//   const currentLimit = parseInt(params?.limit || "1"); // default 1
//   const nextLimit = currentLimit + 1;
//   let images: ImageItem[] = [];
//   let totalCount = 0;
//   try {
//     const res = await fetch(`${apiUrl}/gallery?page=${page}&limit=${currentLimit}`, {
//       cache: "no-store",
//     });
//     const json = await res.json();

//     images = json?.data || [];
//     totalCount = json?.meta?.total || 0; //from meta total images
//   } catch (err) {
//     console.error("Failed to fetch images:", err);
//   }
//   return (
//     <div className="px-4 py-8 container mx-auto">
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {images.map((item, idx) => (
//           <div
//             key={item._id || idx}
//             className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer group"
//           >
//             <Image
//               src={item.image}
//               alt={item.alt || `Gallery ${idx + 1}`}
//               fill
//               className="object-cover group-hover:scale-110 transition duration-300"
//             />
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-between items-center">
//         <p className="mt-4 text-center text-sm text-gray-500">
//           Showing {images.length} of {totalCount} images
//         </p>
//         {/* Load More button */}
//         <div>
//           {images.length < totalCount && (
//             <div className="mt-8 flex justify-center">
//               <Link
//                 href={`?limit=${nextLimit}`} // relative URL → same page handle করবে
//                 className="px-2 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
//               >
//                 Load More
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import Image from "next/image";
import SSRLoadMoreData from "@/components/SSRLoadMoreData";
import { apiUrl } from "@/config/constants";

interface ImageItem {
  _id: string;
  image: string;
  alt?: string;
}

interface GalleryPageProps {
  searchParams?: Promise<{ limit?: string }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  return (
    <SSRLoadMoreData<ImageItem>
      apiUrl={`${apiUrl}/gallery`}
      searchParams={searchParams}
      defaultLimit={8}
    >
      {(images) => {
        if (!images || images.length === 0) {
          return (
            <div className="text-center py-10 text-gray-500">
              No data available
            </div>
          );
        }

        return (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((item, idx) => (
              <div
                key={item._id || idx}
                className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer group"
              >
                <Image
                  src={item.image}
                  alt={item.alt || `Gallery ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
            ))}
          </div>
        );
      }}
    </SSRLoadMoreData>
  );
}


