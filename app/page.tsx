"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import DoctorForm from "@/components/forms/DoctorForm";
import PatientForm from "@/components/forms/PatientForm";
import Logo from "@/components/Logo";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = () => {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");

  const toggleUserType = () => {
    setUserType((prev) => (prev === "patient" ? "doctor" : "patient"));
  };

  return (
    <div className="relative flex h-screen max-h-screen overflow-hidden">
      {/* Background Image Section */}
      <div className="fixed z-10 hidden h-full w-1/2 md:block">
        <Image
          src="/assets/images/onBoarding.jpg"
          height={1000}
          width={1000}
          alt="Patient"
          className="side-img max-w-full rounded-r-3xl"
        />
      </div>

      {isAdmin && <PasskeyModal />}

      {/* Form Sections Container */}
      <div className="relative z-0 flex w-full">
        {/* Patient Form Section */}
        <section
          className={`
            remove-scrollbar container absolute right-0 my-auto w-full transition-transform
            duration-500 ease-in-out md:w-1/2
            ${userType === "patient" ? "translate-x-full " : "translate-x-0"}
          `}
        >
          <div className="sub-container max-w-[496px]">
            <Logo></Logo>

            <PatientForm />

            <div className="text-14-regular mt-10 flex justify-between">
              <Link href="/?admin=true" className="text-secondaryColor">
                Admin 🡲
              </Link>
              <p
                className="text-secondaryColor cursor-pointer"
                onClick={toggleUserType}
              >
                Sign-In as Doctor 🡲
              </p>
            </div>
            <div className="text-14-regular mt-4 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">
                © 2024 HealthSync
              </p>
            </div>
          </div>
        </section>

        {/* Doctor Form Section */}
        <section
          className={`
            remove-scrollbar container absolute right-0 my-auto w-full transition-transform
            duration-500 ease-in-out md:w-1/2
            ${userType === "doctor" ? "translate-x-0" : "translate-x-full "}
          `}
        >
          <div className="sub-container max-w-[496px]">
            <Logo></Logo>

            <DoctorForm />

            <div className="text-14-regular mt-10 flex justify-between">
              <Link href="/?admin=true" className="text-secondaryColor">
                Admin 🡲
              </Link>
              <p
                className="text-secondaryColor cursor-pointer"
                onClick={toggleUserType}
              >
                Sign-In as Patient 🡲
              </p>
            </div>
            <div className="text-14-regular mt-4 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">
                © 2024 HealthSync
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
