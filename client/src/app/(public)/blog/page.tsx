import SSRLoadMoreData from "@/components/SSRLoadMoreData"
import { apiUrl } from "@/config/constants"
import BlogCTA from "@/components/blogpage/BlogCTA"
import { IblogPosts } from "@/@types/BlogPostProps"
import BlogHeader from "@/components/blogpage/BlogHeader"
import BlogCard from "@/components/blogpage/BlogCard"
interface GalleryPageProps {
  searchParams?: Promise<{ limit?: string }>;
}
export default function BlogPage({ searchParams }: GalleryPageProps) {
  return (
    <>
      <SSRLoadMoreData<IblogPosts>
        apiUrl={`${apiUrl}/blog`}
        searchParams={searchParams}
        defaultLimit={12}
      >
        {(blogPosts) => {
          if (!blogPosts || blogPosts.length === 0) {
            return (
              <div className="text-center py-10 text-gray-500">
                No data available
              </div>
            );
          }
          return (
            <>
              {/* Page Header */}
              <BlogHeader />
              <div className="grid md:grid-cols-3 gap-8">
                {blogPosts.map((post) => (

                  <BlogCard post={post} />
                ))}
              </div>
            </>
          );
        }}
      </SSRLoadMoreData>
      {/* Extra Info Section */}
      <BlogCTA />
    </>
  )
}
