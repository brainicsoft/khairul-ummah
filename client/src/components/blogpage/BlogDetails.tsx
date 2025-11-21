import Image from "next/image";
import { Button } from "../ui/button";

export default function BlogDetails({ selectedPost }: { selectedPost: any }) {
  return (
    <div className="md:col-span-2 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              {selectedPost.title}
            </h1>

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
              <p className="text-primary font-bold mb-2">
                চলুন একসাথে পরিবর্তন আনি
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                দান করুন
              </Button>
            </div>
          </div>
  )
}
