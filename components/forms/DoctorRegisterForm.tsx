"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { SelectItem } from "../ui/select";
import { DoctorFormValidation } from "@/lib/validation";
import { DoctorFormDefaultValues } from "@/constants";
import { registerDoctor } from "@/lib/actions/doctor.actions";

export function DoctorRegisterForm({ user }: { user: User }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      ...DoctorFormDefaultValues,
      experience: 0, 
      consultationFees: 0, 
      userId: user?.$id || "",
    },
  });

  async function onSubmit(values: z.infer<typeof DoctorFormValidation>) {
    setIsLoading(true);

    let formData;
    if (values.profilePhoto && values.profilePhoto.length > 0) {
      const blobFile = new Blob([values.profilePhoto[0]], {
        type: values.profilePhoto[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.profilePhoto[0].name);
    }

    try {
      const doctor = {
        ...values,
        profilePhoto: values.profilePhoto ? formData : undefined,
      };
      console.log(doctor)
      // Add your doctor registration action here
      const newDoctor = await registerDoctor(doctor);

      if (doctor) {
        router.push("/dashboard"); // Redirect to appropriate page
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-8"
        >
          <section className="space-y-4">
            <h1 className="header">Doctor Registration</h1>
            <p className="text-dark-700">
              Please provide your professional details.
            </p>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="sub-header">Personal Information</h2>
            </div>
          </section>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="name"
              label="Full Name"
              placeholder="Dr. John Doe"
              iconSrc="/assets/icons/user.svg"
              iconAlt="user"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email"
              placeholder="doctor@hospital.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              name="phone"
              label="Phone Number"
              placeholder="0123456789"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="specialization"
              label="Specialization"
              placeholder="Cardiology"
            />
          </div>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="qualifications"
            label="Qualifications"
            placeholder="MBBS, MD, etc."
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="licenseNumber"
              label="Medical License Number"
              placeholder="ML123456"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="registrationNumber"
              label="Medical Registration Number"
              placeholder="MR123456"
            />
          </div>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="sub-header">Practice Details</h2>
            </div>
          </section>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="availableHours"
              label="Available Hours"
              placeholder="9:00 AM - 5:00 PM"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="workingDays"
              label="Working Days"
              placeholder="Monday - Friday"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="experience"
              label="Years of Experience"
              placeholder="10"
              type="number"
              min={0}
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="consultationFees"
              label="Consultation Fees"
              placeholder="100"
              min={0}
              type="number"
            />
          </div>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="languages"
            label="Languages Spoken"
            placeholder="English, Hindi"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="biography"
            label="Professional Biography"
            placeholder="Brief description of your professional experience and expertise"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="clinicAddress"
            label="Clinic Address"
            placeholder="123 Medical Center St."
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="status"
            label="Current Status"
            placeholder="Select your status"
          >
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="profilePhoto"
            label="Upload Profile Photo"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />

          <SubmitButton isLoading={isLoading}>Register as Doctor</SubmitButton>
        </form>
      </Form>
    </div>
  );
}

export default DoctorRegisterForm;
