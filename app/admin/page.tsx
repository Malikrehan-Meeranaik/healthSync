// app/admin/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { getDoctorsList } from "@/lib/actions/doctor.actions";
import { getAllUsers } from "@/lib/actions/user.actions";
import { getAllPatients } from "@/lib/actions/patient.actions";
import { AdminDashboard } from "@/components/AdminDashoard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing appointments and users",
};

interface SearchParamProps {
  searchParams: { [key: string]: string | undefined };
}

const AdminPage = async ({ searchParams }: SearchParamProps) => {
  const appointments = await getRecentAppointmentList();
  const doctors = await getDoctorsList();
  const users = await getAllUsers();
  const patients = await getAllPatients();
  const selectedView = searchParams?.view || "dashboard";

  const dashboardData = {
    appointments,
    doctors,
    users,
    patients,
    selectedView,
  };
  console.log(dashboardData)

  return (
    <AdminDashboard data={dashboardData} />
  );
};

export default AdminPage;