"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Home, 
  ArrowLeft, 
  Shield,
  AlertTriangle,
  Settings,
  Users
} from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="relative inline-flex">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
              <AlertTriangle className="w-12 h-12 text-blue-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Admin Resource Not Found
            </h2>
            <p className="text-gray-600 max-w-sm mx-auto">
              The page or resource you&apos;re looking for doesn&apos;t exist in the admin panel, 
              or you don&apos;t have permission to access it.
            </p>
          </div>
        </div>

      

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Link href="/secure/admin">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Home className="w-4 h-4" />
              Return to Dashboard
            </Button>
          </Link>
        </div>

        {/* Technical Info for Admin */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-sm text-blue-700 mb-2 justify-center">
            <Settings className="w-4 h-4" />
            <span className="font-medium">Admin Information</span>
          </div>
          <p className="text-xs text-blue-600">
            Check the URL for typos or contact the system administrator if you believe this is an error.
          </p>
        </div>
      </div>
    </div>
  );
}
