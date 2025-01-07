import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import Logo from "@/components/Logo";
import { getDoctorsList } from "@/lib/actions/doctor.actions";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  const doctors = await getDoctorsList();

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Logo></Logo>

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
            doctors={doctors}
          />

          <p className="copyright mt-10 py-12">© 2024 HealthSync</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
