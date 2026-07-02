"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gift, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAuthGuard } from "@/components/user/UserAuthGuard";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthData } from "@/redux/features/auth/authSlice";
import { clearAuthToken } from "@/lib/authToken";

const navLinks = [
  { href: "/user/profile", label: "আমার প্রোফাইল" },
  { href: "/user/donations", label: "আমার সব অনুদান" },
  { href: "/user/regular-donations", label: "নিয়মিত অনুদান" },
];

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const isLoginPage = pathname === "/user";

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // ignore
    }

    clearAuthToken();
    dispatch(setAuthData({ token: "", data: null }));
    router.push("/user");
  };

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto mb-6 max-w-5xl text-center">
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            ← হোমপেজে ফিরুন
          </Link>
        </div>
        {children}
      </div>
    );
  }

  return (
    <UserAuthGuard>
      <div className="bg-background">
        <div className="bg-linear-to-r from-primary via-primary to-primary/85 text-primary-foreground">
          <div className="mx-auto max-w-6xl px-4 pb-8 pt-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-primary-foreground/80">
                  Donor Portal
                </p>
                <h1 className="mt-4 text-3xl font-semibold leading-snug md:text-4xl">
                  আমার অনুদান ও সাবস্ক্রিপশন
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-primary-foreground/90">
                  আপনার সব এককালীন ও নিয়মিত অনুদান এক জায়গায় দেখুন।
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/donate/regular"
                  className="inline-flex items-center gap-2 rounded-2xl bg-secondary px-5 py-3 text-base font-semibold text-secondary-foreground shadow-lg transition hover:opacity-90"
                >
                  <Gift className="h-5 w-5" /> নিয়মিত অনুদান
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-2xl border border-primary-foreground/50 px-5 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
                >
                  <LogOut className="h-5 w-5" /> লগআউট
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl -mt-6 px-4 pb-12">
          <div className="rounded-3xl border border-primary/10 bg-card shadow-xl">
            <nav className="flex flex-wrap gap-2 border-b border-slate-100 px-4 py-4 text-sm font-semibold text-slate-600">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-2xl px-4 py-2 transition",
                    pathname === link.href
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-6 lg:p-8">{children}</div>
          </div>
        </div>
      </div>
    </UserAuthGuard>
  );
}
