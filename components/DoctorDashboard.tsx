"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Logo from "@/components/Logo";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { columns, patientColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { cn } from "@/lib/utils";

import DoctorStatus from "./DoctorStatus";

interface DoctorDashboardProps {
  data: {
    appointments: any;
    patients: any;
    selectedView?: string;
    userId?: string;
    doctors: any;
    doctor: any;
  };
}

const DoctorDashboard = ({ data }: DoctorDashboardProps) => {
  const { appointments, patients } = data;
  const [selectedView, setSelectedView] = useState<string>(
    data.selectedView || "dashboard"
  );
  sessionStorage.setItem("doctors", JSON.stringify(data.doctors));
  const handleViewChange = (key: string) => {
    setSelectedView(key);
  };

  const getDynamicContent = () => {
    switch (selectedView) {
      case "dashboard":
        return (
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              type="appointments"
              count={appointments.scheduledCount}
              label="Scheduled appointments"
            />
            <StatCard
              type="pending"
              count={appointments.pendingCount}
              label="Pending appointments"
            />
            <StatCard
              type="cancelled"
              count={appointments.cancelledCount}
              label="Cancelled appointments"
            />
          </div>
        );
      case "appointments":
        return <DataTable columns={columns} data={appointments.documents} />;
      case "patients":
        return <DataTable columns={patientColumns} data={patients.patients} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex h-screen">
      <Sidebar
        selectedKey={selectedView}
        onViewChange={handleViewChange}
        userId={data.userId}
      />
      <div className="mx-auto flex w-full flex-col space-y-14">
        <header className="admin-header">
          <Link href="/" className="cursor-pointer">
            <Logo />
          </Link>
          <p className="text-16-semibold">Doctor Dashboard</p>
        </header>

        <main className="admin-main">
          <section
            className={cn(
              "flex w-full items-center",
              selectedView === "dashboard"
                ? "justify-around"
                : "justify-between"
            )}
          >
            <div className="space-y-4">
              <h1 className="header">Welcome Doctor 👋🏼</h1>
              <p className="text-dark-700">
                Start the day with managing appointments, and patients
              </p>

              {/* add status change dropdown below */}
              <DoctorStatus
                initialStatus={data.doctor.status}
                userId={data.doctor.$id}
              />
            </div>
            {selectedView === "dashboard" ? (
              <Image
                src="/assets/images/admin.jpg"
                alt="dashboard background"
                width={550}
                height={400}
                quality={100}
                className="rounded-2xl"
                priority
              />
            ) : (
              ""
            )}
          </section>

          <div>{getDynamicContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
