"use client";
import { useGetAllActivitiesQuery } from "@/redux/features/activites/activitesApi";
import { useGetAllBlogsQuery } from "@/redux/features/blogs/blogApi";
import { useGetAllCommiteesQuery } from "@/redux/features/commitee/commiteeApi";
import { useGetAllDonationProjectsQuery } from "@/redux/features/donationProjects/donationProjectApi";
import { useGetAllVolunteersQuery } from "@/redux/features/volunteers/volunteersApi";
import {
  Users,
  DollarSign,
  TrendingUp,
  Package,
  Activity,
  BookOpen
} from "lucide-react";


export default function AdminDashboard() {
  const { data: volunteers, error, isLoading, refetch } = useGetAllVolunteersQuery({})
  const { data: donateType } = useGetAllDonationProjectsQuery({})
  const { data: activites } = useGetAllActivitiesQuery({})
  const { data: blogs } = useGetAllBlogsQuery({})
  const { data: advisors } = useGetAllCommiteesQuery({
    roleType: 'উপদেষ্টা',
  });
  const { data: Commitee } = useGetAllCommiteesQuery({
    roleType: 'পরিচালক',
  });
  console.log("total volunteers", volunteers?.meta?.total)
  console.log("total donateType", donateType?.meta?.total)
  console.log("total activites", activites?.meta?.total)
  console.log("total blogs", blogs?.meta?.total)
  console.log("total advisor", advisors?.meta?.total)
  console.log("total Commitee", Commitee?.meta?.total)


  //  Prepare dynamic stats
  const stats = [
    {
      title: "Total Payment",
      value: 0,
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Total Volunteers",
      value: volunteers?.meta?.total || 0,
      trend: "up",
      icon: Users,
    },
    {
      title: "Total Donation Projects",
      value: donateType?.meta?.total || 0,
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Total Activities",
      value: activites?.meta?.total || 0,
      trend: "up",
      icon: Activity,
    },
    {
      title: "Total Blog Posts",
      value: blogs?.meta?.total || 0,
      trend: "up",
      icon: BookOpen,
    },
    {
      title: "Total advisors",
      value: advisors?.meta?.total || 0,
      trend: "up",
      icon: Users,
    },
    {
      title: "Total committees",
      value: Commitee?.meta?.total || 0,
      trend: "up",
      icon: Users,
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome back, Admin
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your foundation today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border border-border shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-card-foreground/10`}>
                  <Icon className={`w-6 h-6 text-foreground`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
