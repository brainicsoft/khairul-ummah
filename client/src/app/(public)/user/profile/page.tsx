"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UserCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetUserQuery } from "@/redux/api/api";
import { useUpdateMyProfileMutation } from "@/redux/features/user/userApi";

type ProfileFormValues = {
  name: string;
  email: string;
};

export default function UserProfilePage() {
  const { data: user, isLoading, isError, refetch } = useGetUserQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateMyProfileMutation();
  const [isEditing, setIsEditing] = useState(false);

  const profile = user as {
    name?: string;
    email?: string;
    phone?: string;
    username?: string;
    profileCompleted?: boolean;
  } | undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>();

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        email: profile.email?.includes("@donor.kuf.org.bd")
          ? ""
          : profile.email || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile({
        name: data.name,
        ...(data.email ? { email: data.email } : {}),
      }).unwrap();
      toast.success("প্রোফাইল আপডেট হয়েছে");
      setIsEditing(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "আপডেট ব্যর্থ হয়েছে");
    }
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">প্রোফাইল লোড হচ্ছে...</p>;
  }

  if (isError || !profile) {
    return (
      <p className="text-sm text-red-600">
        প্রোফাইল লোড করা যায়নি। আবার লগইন করুন।
      </p>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <UserCircle className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-semibold text-foreground">আমার প্রোফাইল</h1>
            <p className="text-sm text-muted-foreground">
              আপনার একাউন্টের তথ্য দেখুন ও সম্পাদনা করুন
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "বাতিল" : "এডিট করুন"}
        </Button>
      </div>

      {!profile.profileCompleted ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          আপনার প্রোফাইল সম্পূর্ণ নয়। পেমেন্ট success page থেকে পাসওয়ার্ড set
          করুন অথবা এখান থেকে তথ্য আপডেট করুন।
        </div>
      ) : null}

      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 rounded-2xl border border-primary/10 bg-card p-6 md:grid-cols-2"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">নাম</label>
            <input
              className="w-full rounded-xl border border-border px-4 py-3 text-sm"
              {...register("name", { required: "নাম প্রয়োজন" })}
            />
            {errors.name ? (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            ) : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">মোবাইল</label>
            <input
              className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm"
              value={profile.phone || ""}
              disabled
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">ইমেইল</label>
            <input
              type="email"
              placeholder="name@email.com"
              className="w-full rounded-xl border border-border px-4 py-3 text-sm"
              {...register("email")}
            />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "সেভ হচ্ছে..." : "সেভ করুন"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-primary/10 bg-card p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">নাম</p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              {profile.name || "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-card p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">মোবাইল</p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              {profile.phone || "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-card p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">ইমেইল</p>
            <p className="mt-2 text-lg font-semibold text-foreground break-all">
              {profile.email?.includes("@donor.kuf.org.bd")
                ? "সেট করা হয়নি"
                : profile.email || "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-card p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">ইউজারনেম</p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              {profile.username || "-"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
