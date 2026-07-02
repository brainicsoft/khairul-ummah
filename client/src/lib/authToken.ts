import Cookies from "js-cookie";
import {
  AUTH_COOKIE,
  AUTH_STORAGE_KEY,
} from "./auth/constants";

export {
  AUTH_COOKIE,
  AUTH_STORAGE_KEY,
  DONOR_DEFAULT_REDIRECT,
  DONOR_PROTECTED_PATHS,
  isDonorProtectedPath,
} from "./auth/constants";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(AUTH_COOKIE) || localStorage.getItem(AUTH_STORAGE_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(AUTH_STORAGE_KEY, token);
  Cookies.set(AUTH_COOKIE, token, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  Cookies.remove(AUTH_COOKIE);
}
