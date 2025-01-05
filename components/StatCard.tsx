import clsx from "clsx";
import Image from "next/image";
import {
  Users,
  Calendar,
  UserRound,
  HeartPulse,
  Hourglass,
  TriangleAlert
} from "lucide-react";

// StatCard Component
type StatCardProps = {
  type: "appointments" | "pending" | "cancelled" | "doctors" | "users" | "patients";
  count: number;
  label: string;
};

export const StatCard = ({ count = 0, label, type }: StatCardProps) => {
  const getIconConfig = () => {
    switch (type) {
      case "appointments":
        return { icon: Calendar, color: "#4CAF50", bgColor: "bg-green-50",  };
      case "pending":
        return { icon: Hourglass, color: "#FF9800", bgColor: "bg-orange-50" };
      case "cancelled":
        return { icon: TriangleAlert, color: "#F44336", bgColor: "bg-red-50" };
      case "doctors":
        return { icon: HeartPulse, color: "#2196F3", bgColor: "bg-blue-50" };
      case "patients":
        return { icon: UserRound, color: "#9C27B0", bgColor: "bg-purple-50" };
      case "users":
        return { icon: Users, color: "#607D8B", bgColor: "bg-gray-50" };
      default:
        return { icon: Calendar, color: "#4CAF50", bgColor: "bg-green-50" };
    }
  };

  const { icon: Icon, color, bgColor } = getIconConfig();

  
  return (
    <div
    className="stat-card bg-appointments"
    >
      <div className="flex items-center gap-4">
    <Icon  color={color} size={35}  />
   
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-18-regular">{label}</p>
    </div>
  );
};