"use client" 
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Calendar,
  UserRound,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const sidebarItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      key: "dashboard",
    },
    {
      title: "Doctors",
      icon: HeartPulse,
      key: "doctors",
    },
    {
      title: "Appointments",
      icon: Calendar,
      key: "appointments",
    },
    {
      title: "Users",
      icon: Users,
      key: "users",
    },
    {
      title: "Patients",
      icon: UserRound,
      key: "patients",
    },
  ];
  
  interface SidebarProps {
    selectedKey: string;
    onViewChange: (key: string) => void;
  }
  

  export function Sidebar({ selectedKey, onViewChange }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn("relative")}>
      <div
        className={cn(
          "flex flex-col gap-4 py-4 h-screen",
          isCollapsed ? "w-16" : "w-64",
          "transition-all duration-300 ease-in-out",
          "border-r"
        )}
      >
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            {!isCollapsed && <h2 className="text-lg font-semibold">Admin</h2>}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </div>
        </div>
        <Separator />
        <div className="space-y-1 px-3 ">
        {sidebarItems.map((item) => (
        <Button
          key={item.key}
          variant={item.key === selectedKey ? "default" : "ghost"}
          className="w-full flex items-center justify-start gap-2 mb-1"
          onClick={() => onViewChange(item.key)}
        >
          <item.icon className="h-4 w-4" />
          {!isCollapsed && <span>{item.title}</span>}
        </Button>
      ))}
        </div>
      </div>
    </div>
  );
}