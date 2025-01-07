"use client";
import {
  Users,
  Calendar,
  UserRound,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const BASE_SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    key: "dashboard",
  },
  {
    title: "Appointments",
    icon: Calendar,
    key: "appointments",
  },
  {
    title: "Patients",
    icon: UserRound,
    key: "patients",
  },
];

const ADMIN_ITEMS = [
  {
    title: "Doctors",
    icon: HeartPulse,
    key: "doctors",
  },
  {
    title: "Users",
    icon: Users,
    key: "users",
  },
];

interface SidebarProps {
  selectedKey: string;
  onViewChange: (key: string) => void;
  userId?: string;
}

export function Sidebar({ selectedKey, onViewChange, userId }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = userId
    ? BASE_SIDEBAR_ITEMS
    : [...BASE_SIDEBAR_ITEMS, ...ADMIN_ITEMS];
  return (
    <div className={cn("relative")}>
      <div
        className={cn(
          "flex flex-col gap-4 py-4 h-screen",
          isCollapsed ? "w-18" : "w-64",
          "transition-all duration-300 ease-in-out",
          "border-r"
        )}
      >
        <div className="px-3 py-2">
          <div
            className={cn(
              "flex items-center",
              isCollapsed ? "justify-center" : "justify-between"
            )}
          >
            {!isCollapsed && (
              <h2 className="text-lg font-semibold">
                {userId ? "Doctor" : "Admin"}
              </h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="size-8 border border-white"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </Button>
          </div>
        </div>
        <Separator />
        <div className="space-y-1 px-3 ">
          {sidebarItems.map((item) => (
            <Button
              key={item.key}
              variant={item.key === selectedKey ? "default" : "ghost"}
              className="mb-1 flex w-full items-center justify-start gap-2"
              onClick={() => onViewChange(item.key)}
            >
              <item.icon className="size-4" />
              {!isCollapsed && <span>{item.title}</span>}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
