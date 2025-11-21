import Link from "next/link"
import { Button } from "../ui/button"

const BlogCTA = () => {
    return (
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
    )
}
export default BlogCTA