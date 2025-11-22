import Image from "next/image";

export default function RelatedBlog({ relatedPosts, setSelectedPost }: { relatedPosts: any, setSelectedPost: any }) {
    return (
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
        </div>)
}