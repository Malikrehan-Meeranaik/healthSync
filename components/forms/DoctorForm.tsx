import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";

const DoctorForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);

      if (user) router.push(`/doctors/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-6"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header">Hey Doctor 👋🏼</h1>
            <p className="text-dark-700">
              Let's schedule your first appointment
            </p>
          </section>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="assets/icons/user.svg"
            iconAlt="user"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            placeholder="johndoe@mastery.pro"
            iconSrc="assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="phone"
            label="Phone Number"
            placeholder="0123456789"
          />
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default DoctorForm;
