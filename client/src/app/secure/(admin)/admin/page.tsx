"use client";

import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Package,
  Activity
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "blue"
  },
  {
    title: "Total Donations",
    value: "৳ 2,34,000",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    color: "green"
  },
  {
    title: "Active Projects",
    value: "24",
    change: "+2",
    trend: "up",
    icon: Package,
    color: "purple"
  },
  {
    title: "Growth Rate",
    value: "18.2%",
    change: "+2.4%",
    trend: "up",
    icon: TrendingUp,
    color: "orange"
  }
];

export default function AdminDashboard() {
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
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
          const trendColor = stat.trend === "up" ? "text-accent" : "text-destructive";
          const bgColor = `bg-${stat.color}-50`; // For light fallback
          return (
            <div 
              key={index} 
              className="bg-card p-6 rounded-xl border border-border shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-card-foreground/10`}>
                  <Icon className={`w-6 h-6 text-foreground`} />
                </div>
                <span className={`text-sm font-medium ${trendColor}`}>
                  {stat.change}
                </span>
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

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="flex items-center gap-4 p-3 hover:bg-card-foreground/10 rounded-lg"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">
                    New donation received
                  </p>
                  <p className="text-xs text-muted-foreground">
                    2 hours ago
                  </p>
                </div>
                <span className="text-sm font-medium text-accent">
                  ৳ 5,000
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 text-left border border-border rounded-lg hover:border-primary hover:bg-primary/10 transition-colors">
              <Users className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-card-foreground">Add User</p>
              <p className="text-sm text-muted-foreground">Create new user account</p>
            </button>
            <button className="p-4 text-left border border-border rounded-lg hover:border-accent hover:bg-accent/10 transition-colors">
              <DollarSign className="w-6 h-6 text-accent mb-2" />
              <p className="font-medium text-card-foreground">Record Donation</p>
              <p className="text-sm text-muted-foreground">Add new donation entry</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
