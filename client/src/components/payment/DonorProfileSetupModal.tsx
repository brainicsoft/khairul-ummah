"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDonorRegisterMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthData } from "@/redux/features/auth/authSlice";
import {
  clearPendingDonorProfile,
  type PendingDonorProfile,
} from "@/lib/pendingDonorProfile";

type FormValues = {
  password: string;
  confirmPassword: string;
};

type DonorProfileSetupModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donor: PendingDonorProfile;
};

export default function DonorProfileSetupModal({
  open,
  onOpenChange,
  donor,
}: DonorProfileSetupModalProps) {
  const dispatch = useAppDispatch();
  const [donorRegister, { isLoading }] = useDonorRegisterMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);

    try {
      const response: any = await donorRegister({
        name: donor.name,
        phone: donor.phone,
        email: donor.email || "",
        password: data.password,
      }).unwrap();

      if (response?.token) {
        localStorage.setItem("access_token", response.token);
        Cookies.set("auth_token", response.token, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
        dispatch(setAuthData(response));
      }

      clearPendingDonorProfile();
      reset();
      toast.success("প্রোফাইল তৈরি হয়েছে!");
      onOpenChange(false);
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || "প্রোফাইল তৈরি ব্যর্থ হয়েছে";
      setSubmitError(message);
      toast.error(message);
    }
  };

  const handleSkip = () => {
    clearPendingDonorProfile();
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>আপনার প্রোফাইল তৈরি করুন</DialogTitle>
          <DialogDescription>
            দান সফল হয়েছে! এই মোবাইল নম্বর দিয়ে একটি প্রোফাইল তৈরি করতে
            পাসওয়ার্ড সেট করুন। পরবর্তীতে এই নম্বর বা ইমেইল দিয়ে লগইন করতে
            পারবেন।
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/40 p-4 text-sm space-y-1">
          <p>
            <span className="font-semibold">নাম:</span> {donor.name}
          </p>
          <p>
            <span className="font-semibold">মোবাইল:</span> {donor.phone}
          </p>
          {donor.email ? (
            <p>
              <span className="font-semibold">ইমেইল:</span> {donor.email}
            </p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold">পাসওয়ার্ড</label>
            <input
              type="password"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="কমপক্ষে ৬ অক্ষর"
              {...register("password", {
                required: "পাসওয়ার্ড প্রয়োজন",
                minLength: {
                  value: 6,
                  message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে",
                },
              })}
            />
            {errors.password ? (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="আবার পাসওয়ার্ড লিখুন"
              {...register("confirmPassword", {
                required: "পাসওয়ার্ড নিশ্চিত করুন",
                validate: (value) =>
                  value === password || "পাসওয়ার্ড মিলছে না",
              })}
            />
            {errors.confirmPassword ? (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>

          {submitError ? (
            <p className="text-sm text-red-600">{submitError}</p>
          ) : null}

          <DialogFooter className="gap-2 sm:gap-2">
            <Button type="button" variant="outline" onClick={handleSkip}>
              পরে করব
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "তৈরি হচ্ছে..." : "প্রোফাইল তৈরি করুন"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
