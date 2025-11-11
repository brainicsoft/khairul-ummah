"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // shadcn button
import logo from "@/assets/logo/logo.png"
import Image from "next/image";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // simulate login API
    setTimeout(() => {
      setLoading(false);
      alert("Login successful!");
    }, 1500);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background text-foreground transition-colors">
      <div className="w-full max-w-md rounded-2xl bg-card p-10 shadow-lg border border-border animate-fadeIn">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src={logo} // place your logo in /public
            alt="Khairul Ummah Foundation"
            height={200}
            className=" h-auto"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none hover:ring-accent transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none hover:ring-accent transition"
            />
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
            className="w-full mt-2 bg-primary  text-primary-foreground hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Optional Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Khairul Ummah Foundation &copy; 2025
        </p>
      </div>
    </div>
  );
}
