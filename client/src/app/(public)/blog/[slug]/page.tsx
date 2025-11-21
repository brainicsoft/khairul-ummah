"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { apiUrl } from "@/config/constants";
import type { IblogPosts } from "@/@types/BlogPostProps";
import BlogDetails from "@/components/blogpage/BlogDetails";
interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const [slug, setSlug] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<IblogPosts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Infinite Scroll States
  const [relatedPosts, setRelatedPosts] = useState<IblogPosts[]>([]);
  const [relatedLimit, setRelatedLimit] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  // Decode slug from params
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      const decodedSlug = decodeURIComponent(resolvedParams.slug);
      setSlug(decodedSlug);
    };
    unwrapParams();
  }, [params]);
  // Fetch Main Blog Post
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/blog/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");
        const data = await response.json();
        setSelectedPost(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchBlogPost();
  }, [slug]);
  // Fetch Related Posts
  const fetchRelatedPosts = async () => {
    if (!slug || !selectedPost) return;
    try {
      setLoadingMore(true);
      const res = await fetch(`${apiUrl}/blog?page=1&limit=${relatedLimit}`);
      const data = await res.json();
      const filtered = data.data.filter(
        (p: IblogPosts) => p._id !== selectedPost._id
      );

      setRelatedPosts(filtered);
    } catch (err) {
      console.error("Error fetching related posts:", err);
    } finally {
      setLoadingMore(false);
    }
  };
  // Load related posts on limit change
  useEffect(() => {
    if (selectedPost) fetchRelatedPosts();
  }, [relatedLimit, selectedPost]);
  // Infinite Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300;

      if (isBottom && !loadingMore) {
        setRelatedLimit((prev) => prev + 10);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore]);
  if (loading) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          Loading...
        </div>
      </main>
    );
  }
  if (error || !selectedPost) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 md:px-6 text-center text-destructive">
          {error || "Blog post not found"}
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Side: Blog Detail */}
          <BlogDetails selectedPost={selectedPost} />
          {/* Right Side: Related Blogs */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-primary">অন্যান্য ব্লগ</h2>
            <p className="text-muted-foreground mb-4 lg:mb-8">
              আমাদের সাথে যুক্ত হতে পারেন এবং সমাজের উন্নয়নে অংশ নিন।
            </p>
            <div className="space-y-3">
              {relatedPosts.map((post) => (
                <div
                  key={post._id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-secondary p-2 rounded transition"
                  onClick={() => {
                    setSelectedPost(post);
                    window.history.pushState({}, "", `/blog/${post.slug}`);
                  }}
                >
                  <div className="relative aspect-square w-[100px] h-[80px] overflow-hidden rounded">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </div>
              ))}
              {/* {loadingMore && (
                <p className="text-center text-muted-foreground py-3">
                  আরও লোড হচ্ছে...
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
