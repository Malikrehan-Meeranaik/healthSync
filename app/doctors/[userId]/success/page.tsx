import Image from "next/image";
import Link from "next/link";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { getDoctor } from "@/lib/actions/doctor.actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const doctor = await getDoctor(userId);
  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
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
            Your <span className="text-secondaryColor">registration</span> has
            been successfully submitted!
          </h2>
          <p className="italic">
            Welcome to HealthSync: Simplifying Medical Appointments for Patients
            and Doctors.
          </p>
        </section>

        <section className="request-details">
          <p className="font-semibold">Your details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor.profilePhoto!}
              alt="doctor"
              width={200}
              height={200}
              className="size-24 rounded-full"
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
            <p> {formatDateTime(doctor?.$createdAt).dateTime}</p>
          </div>
          <p>
            {" "}
            <span className="font-semibold">Specialization:</span>{" "}
            {doctor?.specialization}
          </p>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link
            className="cursor-pointer"
            href={`/doctors/${userId}/dashboard`}
          >
            View Dashboard
          </Link>
        </Button>

        <p className="copyright">© 2024 HealthSync</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
