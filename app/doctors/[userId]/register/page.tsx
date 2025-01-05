import Image from "next/image";
import { redirect } from "next/navigation";

import Logo from "@/components/Logo";
import {  getUser } from "@/lib/actions/user.actions";
import DoctorRegisterForm from "@/components/forms/DoctorRegisterForm";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  // const doctor = await getDoctor(userId);

  // if (doctor) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <Image
        src="/assets/images/register.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[790px] rounded-r-3xl"
      />
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Logo></Logo>
          <DoctorRegisterForm user={user} />

          <p className="copyright py-12">© 2024 HealthSync</p>
        </div>
      </section>

    </div>
  );
};

export default Register;
