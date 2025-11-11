'use client'
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Navigation, Zap } from "lucide-react";
import { useState } from "react";

export default function NotFound() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-92px)] flex items-center justify-center">
                    <div className="max-w-lg w-full text-center space-y-8">
                        
                        {/* Floating Animation */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className={`w-40 h-40 mx-auto bg-white rounded-3xl shadow-2xl border-2 border-red-200 flex items-center justify-center transition-all duration-500 ${
                                isHovered ? 'rotate-12 scale-110' : 'animate-float'
                            }`}>
                                <div className="text-6xl font-bold text-red-500">
                                    404
                                </div>
                            </div>
                            
                            {/* Floating particles */}
                            <div className="absolute top-0 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                            <div className="absolute top-4 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                            <div className="absolute bottom-8 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold text-gray-900">
                                Page Not Found
                            </h1>
                            <p className="text-gray-600 text-lg">
                                The page you&apos;re looking for has vanished into the digital void.
                            </p>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => router.back()}
                                variant="outline"
                                className="flex items-center gap-2 group hover:scale-105 transition-transform"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Go Back
                            </Button>
                            
                            <Button
                                onClick={() => router.push('/')}
                                className="flex items-center gap-2 group bg-primary hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-transform"
                            >
                                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Go Home
                            </Button>
                            
                            <Button
                                onClick={() => window.location.reload()}
                                variant="outline"
                                className="flex items-center gap-2 group hover:scale-105 transition-transform"
                            >
                                <Zap className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                                Reload
                            </Button>
                        </div>

                        {/* Fun Message */}
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <Navigation className="w-4 h-4 animate-pulse" />
                                <span className="text-sm">
                                    Pro tip: Check the URL or use the navigation above
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}