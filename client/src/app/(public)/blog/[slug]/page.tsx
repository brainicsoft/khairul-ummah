"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { apiUrl } from "@/config/constants"
import type { IblogPosts } from "@/@types/BlogPostProps"
interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}
export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const [slug, setSlug] = useState<string | null>(null)
  console.log(slug)
  const [selectedPost, setSelectedPost] = useState<IblogPosts | null>(null)
  const [allPosts, setAllPosts] = useState<IblogPosts[]>([])
  console.log(allPosts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params
      const decodedSlug = decodeURIComponent(resolvedParams.slug)
      setSlug(decodedSlug)
      console.log("[v0] Decoded slug:", decodedSlug)
    }
    unwrapParams()
  }, [params])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiUrl}/blog/${slug}`)
        if (!response.ok) throw new Error("Failed to fetch blog post")
        const data = await response.json()
        console.log("[v0] Fetched post:", data)
        setSelectedPost(data.data)

        // Also fetch all posts for related blogs
        const allResponse = await fetch(`${apiUrl}/blog?page=1&limit=100`)
        if (allResponse.ok) {
          const allData = await allResponse.json()
          setAllPosts(allData.data)
        }
      } catch (err) {
        console.log("[v0] Error:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchBlogPosts()
    }
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-muted-foreground">Loading...</div>
        </div>
      </main>
    )
  }

  if (error || !selectedPost) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-destructive">{error || "Blog post not found"}</div>
        </div>
      </main>
    )
  }

  const relatedPosts = allPosts?.filter((post) => post._id !== selectedPost._id).slice(0, 5)

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Side: Blog Detail */}
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">{selectedPost.title}</h1>
            <div className="text-sm text-muted-foreground">
              {selectedPost.date} | {selectedPost.author} | {selectedPost.category}
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={selectedPost.image || "/placeholder.svg"}
                alt={selectedPost.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="prose prose-invert max-w-none text-foreground">
              <p className="whitespace-pre-wrap">{selectedPost.description}</p>
            </div>
            <div>
              <p className="text-primary font-bold mb-2">চলুন একসাথে পরিবর্তন আনি</p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">দান করুন</Button>
            </div>
          </div>

          {/* Right Side: Related Blogs */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-primary">অন্যান্য ব্লগ</h2>
            <p className="text-muted-foreground mb-4 lg:mb-8">আমাদের সাথে যুক্ত হতে পারেন এবং সমাজের উন্নয়নে অংশ নিন।</p>
            <div className="space-y-3">
              {relatedPosts.map((post) => (
                <div
                  key={post._id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-secondary p-2 rounded transition"
                  onClick={() => {
                    setSelectedPost(post)
                    window.history.pushState({}, "", `/blog/${post.slug}`)
                  }}
                >
                  <div className="relative aspect-square w-[100px] h-[80px] overflow-hidden rounded flex-shrink-0">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
