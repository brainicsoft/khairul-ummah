import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button"
import { apiUrl } from "@/config/constants";

let items: any[] = [];

try {
  const res = await fetch(`${apiUrl}/blog?page=1&limit=3`, { cache: "no-store" });
  if (res.ok) {
    const json = await res.json();
    items = json?.data || [];
  }
} catch (error) {
  console.error("Blog fetch failed:", error);
  items = []; // server off → empty array
}

export function BlogSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">সাম্প্রতিক খবর</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            খাইরুল উম্মাহ ফাউন্ডেশনের সর্বশেষ কার্যক্রম এবং আপডেট সম্পর্কে জানুন
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {items.map((post:any) => (
            <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Post Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image width={400} height={300} src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>

              <CardHeader>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.author}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline" className="w-full hover:bg-primary">
                    সম্পূর্ণ পড়ুন
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              সকল ব্লগ পড়ুন
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
