

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import SSRLoadMoreData from "@/components/SSRLoadMoreData"
import { apiUrl } from "@/config/constants"

interface blogPosts {
  _id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

interface GalleryPageProps {
  searchParams?: Promise<{ limit?: string }>;
}
export default function BlogPage({ searchParams }: GalleryPageProps) {
  return (

    <SSRLoadMoreData<blogPosts>
    apiUrl={`${apiUrl}/blog`}
    searchParams={searchParams}
    defaultLimit={8}
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
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post._id} className="overflow-hidden hover:shadow-sm transition-shadow duration-300">
  
              {/* Post Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
  
              <CardHeader>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.date}
                  </span>
                </div>
  
                <CardTitle className="text-lg font-semibold">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {post.author}
                </CardDescription>
              </CardHeader>
  
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
  
                <Link href={`/blog/${post.slug}`}>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    সম্পূর্ণ পড়ুন
                  </Button>
                </Link>
              </CardContent>
  
            </Card>
          ))}
        </div>
      );
    }}
  </SSRLoadMoreData>
  
  )
}

{/* <div className="grid md:grid-cols-3 gap-8">
{blogPosts.map((post) => (
  <Card key={post.id} className="overflow-hidden hover:shadow-sm transition-shadow duration-300">

    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      <Image
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>

    <CardHeader>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{post.category}</span>
        <span className="text-xs text-muted-foreground">{post.date}</span>
      </div>
      <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
      <CardDescription className="text-sm text-muted-foreground">{post.author}</CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
      <Link href={`/blog/${post.id}`}>
        <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-colors duration-300">
          সম্পূর্ণ পড়ুন
        </Button>
      </Link>
    </CardContent>
  </Card>
))}
</div> */}