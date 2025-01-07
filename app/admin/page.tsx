// app/admin/page.tsx
import { Metadata } from "next";

import { AdminDashboard } from "@/components/AdminDashoard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { getDoctorsList } from "@/lib/actions/doctor.actions";
import { getAllPatients } from "@/lib/actions/patient.actions";
import { getAllUsers } from "@/lib/actions/user.actions";

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

  return <AdminDashboard data={dashboardData} />;
};

export default AdminPage;
