import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import Logo from "@/components/Logo";
import { getDoctorsList } from "@/lib/actions/doctor.actions";
import { getPatient } from "@/lib/actions/patient.actions";
import { getUser } from "@/lib/actions/user.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);
  const doctors = await getDoctorsList();

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Logo></Logo>
          <RegisterForm user={user} doctors={doctors} />

          <p className="copyright py-12">© 2024 HealthSync</p>
        </div>
      </section>

      <Image
        src="/assets/images/register.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[790px] rounded-l-3xl"
      />
    </div>
  );
};

export default Register;
