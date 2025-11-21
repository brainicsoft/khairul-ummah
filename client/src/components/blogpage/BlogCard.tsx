import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function BlogCard( {post}) {
    return (
        <div>
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
        </div>
    )
}