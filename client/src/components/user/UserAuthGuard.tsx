"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { apiUrl } from "@/config/constants";
import {
  clearAuthToken,
  DONOR_DEFAULT_REDIRECT,
  getAuthToken,
} from "@/lib/authToken";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export function UserAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    async function verifySession() {
      const token = getAuthToken();

      if (!token) {
        if (!cancelled) {
          setStatus("unauthenticated");
          const redirect = pathname || DONOR_DEFAULT_REDIRECT;
          router.replace(
            `/user?redirect=${encodeURIComponent(redirect)}`
          );
        }
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Invalid session");
        }

        if (!cancelled) {
          setStatus("authenticated");
        }
      } catch {
        clearAuthToken();
        if (!cancelled) {
          setStatus("unauthenticated");
          const redirect = pathname || DONOR_DEFAULT_REDIRECT;
          router.replace(
            `/user?redirect=${encodeURIComponent(redirect)}`
          );
        }
      }
    }

    verifySession();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (status !== "authenticated") {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 text-muted-foreground">
        <p>সেশন যাচাই হচ্ছে...</p>
        <p className="text-xs">পাসওয়ার্ড প্রয়োজন হলে লগইন পেজে নিয়ে যাওয়া হবে</p>
      </div>
    );
  }

  return <>{children}</>;
}
