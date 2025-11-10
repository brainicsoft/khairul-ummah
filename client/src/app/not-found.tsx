'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import notfoundimg from '../assets/404.svg'
import { FaHome } from "react-icons/fa";

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="container mx-auto min-h-[calc(100vh-92px)] flex flex-col items-center justify-center">
            <Image className="md:w-[60%]" src={notfoundimg} alt="404" width={400} height={400} />
            <div className="mt-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]  mb-5">
                    <div className="flex flex-col space-y-2 text-center">
                        {/* <h1 className="text-4xl font-semibold tracking-tight">404</h1> */}
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-2">
                            Page Not Found</h2>
                        <p className="text-sm text-muted-foreground">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
                    </div>
                    <div onClick={() => router.back()} className="flex flex-col justify-center items-center space-y-2 text-center cursor-pointer">
                        <FaHome className="text-3xl text-primary hover:text-primary/80 cursor-pointer" />
                        <p>Go back home</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

