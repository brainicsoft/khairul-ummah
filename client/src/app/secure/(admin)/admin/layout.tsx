"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  BarChart3, 
  DollarSign,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Shield,
  Package,
  Moon,
  Sun
} from "lucide-react";
import logo from '@/assets/logo/logo-round.jpg';
import Image from "next/image";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "volunteer Management", href: "/secure/admin/volunteer", icon: Users },
  { name: "Donations", href: "/admin/donations", icon: DollarSign },
  { name: "Projects", href: "/admin/projects", icon: Package },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // default dark
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Dynamic colors
  const bgSidebar = darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200";
  const bgHeader = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const bgContent = darkMode ? "bg-gray-900" : "bg-gray-50";
  const bgCard = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const hoverBg = darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100";
  const activeBg = darkMode ? "bg-blue-900/50 text-blue-300 border border-blue-800/50" : "bg-blue-50 text-blue-700 border border-blue-100";

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""} ${bgContent}`}>
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-20"} ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${bgSidebar}`}>
        {/* Sidebar Header */}
        <div className={`flex items-center justify-between h-16 px-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
            <div className="relative w-8 h-8">
              <Image src={logo} alt="Khairul Ummah" fill className="rounded-full object-cover" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className={`font-semibold text-sm ${textPrimary}`}>খাইরুল উম্মাহ</span>
                <span className={`text-xs ${textSecondary}`}>Admin Panel</span>
              </div>
            )}
          </div>

          <button onClick={closeMobileSidebar} className="lg:hidden p-1 rounded-lg hover:bg-gray-800 text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileSidebar}
                className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 group ${isActive ? activeBg : `text-gray-400 ${hoverBg} hover:primary`}`}
              >
                <div className={`flex items-center justify-center min-w-6 ${isActive ? "text-blue-400" : "text-black dark:text-gray-200 group-hover:text-gray-300"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {sidebarOpen && <span className="font-medium text-sm text-gray-700 dark:text-gray-300 truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 space-y-3">
          {/* Dark Mode Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="w-full flex items-center gap-2 justify-center text-gray-400 hover:text-white hover:bg-gray-800">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {sidebarOpen && <span className="text-xs">{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </Button>

          {/* Toggle Sidebar */}
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="hidden lg:flex w-full items-center gap-2 justify-center text-gray-400 hover:text-white hover:bg-gray-800">
            {sidebarOpen ? (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs">Collapse</span>
              </>
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>

          {/* User & Logout */}
          <div className={`flex items-center gap-3 p-2 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"} ${!sidebarOpen && "justify-center"}`}>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${textPrimary}`}>Admin User</p>
                <p className={`text-xs truncate ${textSecondary}`}>admin@khairul-ummah.org</p>
              </div>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-900/20">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-w-0 overflow-hidden ${bgContent}`}>
        {/* Top Header */}
        <header className={`h-16 ${bgHeader} border-b flex items-center justify-between px-6`}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setMobileSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-700">
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className={`text-xl font-semibold ${textPrimary}`}>
              {menuItems.find(item => item.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-900 dark:text-white hidden md:block">
              Last login: Today, 10:30 AM
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-gray-400 hover:text-white hover:bg-gray-700">
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <div className="w-8 h-8 bg-green-900/30 rounded-full flex items-center justify-center border border-green-800/50">
                <span className="text-xs font-medium text-green-400">AU</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto dark:bg-[#1A2328] py-6">
          <div className="lg:container mx-auto">
            <div className={`${bgCard} rounded-xl shadow-lg overflow-hidden border`}>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
