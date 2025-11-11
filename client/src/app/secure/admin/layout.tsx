"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Users", href: "/admin/users", icon: "👥" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside
        className={`flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-center h-20 border-b border-sidebar-border">
          <img
            src="/khairul-ummah-logo.png"
            alt="Khairul Ummah"
            className={`h-12 ${sidebarOpen ? "block" : "hidden"}`}
          />
          <span className={`${sidebarOpen ? "block" : "hidden"} font-bold`}>
            Admin
          </span>
        </div>
        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 py-3 px-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md mx-2 my-1"
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full"
          >
            {sidebarOpen ? "Collapse" : "Expand"}
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-background">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <Button variant="ghost" size="sm">
            Logout
          </Button>
        </header>
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          {children}
        </div>
      </main>
    </div>
  );
}
