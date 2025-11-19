

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
    <>
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
            <>
              {/* Page Header */}
              <div className="mb-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">সাম্প্রতিক খবর</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  খাইরুল উম্মাহ ফাউন্ডেশনের সকল কার্যক্রম, প্রকল্প এবং খবর সম্পর্কে বিস্তারিত জানুন। প্রতিটি ব্লগ পোস্টে আমরা আমাদের কাজের প্রভাব, গল্প এবং দাতাদের অবদান তুলে ধরি।
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                 <Card
                 key={post._id}
                 className="overflow-hidden hover:shadow-sm transition-shadow duration-300 flex flex-col gap-0"
               >
               
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
                     <span className="text-xs text-muted-foreground">{post.date}</span>
                   </div>
               
                   <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                   <CardDescription className="text-sm text-muted-foreground">
                     Author: {post.author}
                   </CardDescription>
                 </CardHeader>
               
                 {/* Content + Button; push button to bottom */}
                 <CardContent className="flex flex-col flex-grow">
               
                   {/* Description */}
                   <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                     {post.description}
                   </p>
               
                   {/* Push button always to bottom */}
                   <div className="mt-auto">
                     <Link href={`/blog/${post.slug}`}>
                       <Button
                         variant="outline"
                         className="w-full hover:bg-primary hover:text-white transition-colors duration-300"
                       >
                         সম্পূর্ণ পড়ুন
                       </Button>
                     </Link>
                   </div>
               
                 </CardContent>
               
               </Card>
               
                ))}
              </div>

            </>
          );

        }}
      </SSRLoadMoreData>
      {/* Extra Info Section */}
      <div className="container mx-auto px-4 md:px-6 my-6">
        <div className="mt-16 bg-primary/5 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">আপনি আমাদের সাথে যুক্ত হতে পারেন</h2>
          <p className="text-muted-foreground mb-4">
            আপনার সহায়তা আমাদের কার্যক্রমকে আরও বিস্তৃত এবং টেকসই করতে সাহায্য করে। আজই আমাদের সাথে যুক্ত হোন এবং সমাজের উন্নয়নে অংশ নিন।
          </p>
          <Link href="/donate">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              দান করুন
            </Button>
          </Link>
        </div>
      </div>
    </>

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