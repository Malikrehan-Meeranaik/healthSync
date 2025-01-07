import DoctorDashboard from "@/components/DoctorDashboard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { getDoctor, getDoctorsList } from "@/lib/actions/doctor.actions";
import { getAllPatients } from "@/lib/actions/patient.actions";

const DoctorDashboardServer = async ({
  params: { userId },
}: SearchParamProps) => {
  const appointments = await getRecentAppointmentList(userId);
  const patients = await getAllPatients({ primaryPhysician: userId });
  const doctors = await getDoctorsList();
  const doctor = await getDoctor(userId);
  const selectedView = "dashboard";

  const dashboardData = {
    appointments,
    patients,
    selectedView,
    userId,
    doctors,
    doctor,
  };

  return <DoctorDashboard data={dashboardData} />;
};

export default DoctorDashboardServer;
