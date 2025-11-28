"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import Cookies from "js-cookie";
import { setAuthData } from "@/redux/features/auth/authSlice";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function AdminLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    setMessage(null);
    setSuccess(false);

    try {
      const response: any = await loginUser(data).unwrap();

      if (response?.success) {
        // Save token
        if (response?.token) {
          localStorage.setItem("access_token", response.token);

          Cookies.set("auth_token", response.token, {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          // Store redux auth data
          dispatch(setAuthData(response));

          // Show success message
          setMessage("Login successful!");
          setSuccess(true);

          // Smooth redirect
          setTimeout(() => {
            router.push("/secure/admin");
          }, 700);
        } else {
          setMessage("Token not received!");
        }
      } else {
        setMessage("Login failed!");
      }
    } catch (error: any) {
      const errorMsg =
        error?.data?.message || error?.message || "Login failed!";
      setMessage(errorMsg);
      setSuccess(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background text-foreground transition-colors">
      <div className="w-full max-w-md rounded-2xl bg-card p-10 shadow-lg border border-border animate-fadeIn">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Khairul Ummah Foundation" height={200} />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        {/* Alert Message */}
        {message && (
          <Alert
            className={`mb-4 ${
              success
                ? "border-green-600 bg-green-50"
                : "border-red-600 bg-red-50"
            }`}
          >
            {success ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}

            <AlertTitle
              className={success ? "text-green-700" : "text-red-700"}
            >
              {success ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription
              className={success ? "text-green-600" : "text-red-600"}
            >
              {message}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none hover:ring-accent transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none hover:ring-accent transition"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2 text-muted-foreground">
              <input type="checkbox" className="accent-primary" />
              <span>Remember me</span>
            </label>
            <Link href="#" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full mt-2 bg-primary text-primary-foreground hover:scale-105 transition-transform"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Khairul Ummah Foundation &copy; 2025
        </p>
      </div>
    </div>
  );
}
