"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthData } from "@/redux/features/auth/authSlice";
import {
  DONOR_DEFAULT_REDIRECT,
  getAuthToken,
  isDonorProtectedPath,
  setAuthToken,
} from "@/lib/authToken";
import siginlogo from "@/assets/login.png";

type LoginFormValues = {
  email: string;
  password: string;
};

function DonorLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const redirectTo =
    searchParams.get("redirect") &&
    isDonorProtectedPath(searchParams.get("redirect")!)
      ? searchParams.get("redirect")!
      : DONOR_DEFAULT_REDIRECT;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.replace(redirectTo);
    }
  }, [router, redirectTo]);

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMessage(null);

    try {
      const response: any = await loginUser(data).unwrap();

      if (response?.token) {
        setAuthToken(response.token);
        dispatch(setAuthData(response));
        router.replace(redirectTo);
        return;
      }

      setErrorMessage("লগইন ব্যর্থ হয়েছে");
    } catch (error: any) {
      setErrorMessage(
        error?.data?.message || error?.message || "লগইন ব্যর্থ হয়েছে"
      );
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-primary/15 bg-card p-6 shadow-xl md:p-10">
        <div className="flex items-center gap-3 text-sm font-semibold text-primary">
          <ShieldCheck className="h-5 w-5" />
          নিরাপদ দাতা লগইন
        </div>
        <h1 className="mt-4 text-3xl font-bold text-foreground">
          পাসওয়ার্ড যাচাই করুন
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          `/user/donations` বা প্রোফাইল দেখতে আগে লগইন করতে হবে। মোবাইল নম্বর বা
          ইমেইল এবং পেমেন্টের পর সেট করা পাসওয়ার্ড দিন।
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              মোবাইল নম্বর বা ইমেইল
            </label>
            <input
              type="text"
              placeholder="017XXXXXXXX"
              className="w-full rounded-2xl border-2 border-border px-4 py-4 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              {...register("email", {
                required: "মোবাইল নম্বর বা ইমেইল প্রয়োজন",
              })}
            />
            {errors.email ? (
              <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border-2 border-border px-4 py-4 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              {...register("password", {
                required: "পাসওয়ার্ড প্রয়োজন",
                minLength: {
                  value: 6,
                  message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর",
                },
              })}
            />
            {errors.password ? (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          {errorMessage ? (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl py-5 text-base font-semibold"
          >
            {isLoading ? "যাচাই হচ্ছে..." : "লগইন করে প্রোফাইলে যান"}
          </Button>

          <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
            <Sparkles className="mb-2 h-5 w-5 text-amber-500" />
            লগইন সফল হলে আপনাকে{" "}
            {redirectTo === DONOR_DEFAULT_REDIRECT
              ? "অনুদানের তালিকায়"
              : "আপনার পেজে"}{" "}
            নিয়ে যাওয়া হবে।
          </div>
        </form>
      </div>

      <div className="rounded-3xl bg-linear-to-br from-primary via-primary to-primary/80 p-8 text-primary-foreground shadow-xl">
        <div className="rounded-3xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 text-sm backdrop-blur">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/85">
            Donor Portal
          </p>
          <h3 className="mt-3 text-2xl font-semibold">আপনার প্রোফাইল</h3>
          <p className="mt-2 text-primary-foreground/90">
            লগইনের পর প্রোফাইল, সব অনুদানের তালিকা এবং recurring subscription
            এক জায়গায় দেখতে পারবেন।
          </p>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <Image
            src={siginlogo}
            alt="Login Illustration"
            className="h-auto w-72 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default function DonorLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
          লোড হচ্ছে...
        </div>
      }
    >
      <DonorLoginForm />
    </Suspense>
  );
}
