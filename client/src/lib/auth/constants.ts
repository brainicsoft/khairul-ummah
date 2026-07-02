export const AUTH_COOKIE = "auth_token";
export const AUTH_STORAGE_KEY = "access_token";
export const DONOR_DEFAULT_REDIRECT = "/user/donations";

export const DONOR_PROTECTED_PATHS = [
  "/user/donations",
  "/user/regular-donations",
  "/user/subscriptions",
  "/user/profile",
  "/user/donation-dashboard",
] as const;

export function isDonorProtectedPath(pathname: string) {
  return DONOR_PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}
