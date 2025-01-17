"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Logo from "@/components/Logo";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import {
  columns,
  patientColumns,
  usersColumns,
  doctorsColumns,
} from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { cn } from "@/lib/utils";

interface AdminDashboardProps {
  data: {
    appointments: any;
    doctors: any;
    users: any;
    patients: any;
    selectedView?: string;
  };
}

export function AdminDashboard({ data }: AdminDashboardProps) {
  const { appointments, doctors, users, patients } = data;
  const [selectedView, setSelectedView] = useState<string>(
    data.selectedView || "dashboard"
  );
  sessionStorage.setItem("doctors", JSON.stringify(doctors));
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
            <StatCard type="doctors" count={doctors.length} label="Doctors" />
            <StatCard type="patients" count={patients.total} label="Patients" />
            <StatCard type="users" count={users.total} label="Users" />
          </div>
        );
      case "doctors":
        return <DataTable columns={doctorsColumns} data={doctors} />;
      case "appointments":
        return <DataTable columns={columns} data={appointments.documents} />;
      case "patients":
        return <DataTable columns={patientColumns} data={patients.patients} />;
      case "users":
        return <DataTable columns={usersColumns} data={users.users} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex h-screen">
      <Sidebar selectedKey={selectedView} onViewChange={handleViewChange} />
      <div className="mx-auto flex w-full flex-col space-y-14">
        <header className="admin-header">
          <Link href="/" className="cursor-pointer">
            <Logo />
          </Link>
          <p className="text-16-semibold">Admin Dashboard</p>
        </header>

        <main className="admin-main relative">
          <section
            className={cn(
              "flex w-full items-center",
              selectedView === "dashboard"
                ? "justify-around"
                : "justify-between"
            )}
          >
            <div className="space-y-4">
              <h1 className="header">Welcome Admin 👋🏼</h1>
              <p className="text-dark-700">
                Start the day with managing appointments, patients, doctors and
                users
              </p>
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
}
