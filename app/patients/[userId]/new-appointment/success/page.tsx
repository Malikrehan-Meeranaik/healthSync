import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { getDoctorsList } from "@/lib/actions/doctor.actions";
import { formatDateTime } from "@/lib/utils";
import { Doctor } from "@/types/appwrite.types";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  setTimeout(() => {
    redirect(`/doctors/${userId}/dashboard`);
  }, 5000);

  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const doctors = await getDoctorsList();

  const doctor = doctors.find(
    (doctor: Doctor) => doctor.userId === appointment.primaryPhysician
  );

  return (
    <div className=" flex h-screen max-h-screen px-[5%] ">
      <div className="success-img ">
        <Link href="/">
          <Logo></Logo>
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your{" "}
            <span className="text-secondaryColor">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor.profilePhoto!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 HealthSync</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
