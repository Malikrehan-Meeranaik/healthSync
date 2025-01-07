"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { AppointmentTypes } from "@/constants";
import { deleteAppointment } from "@/lib/actions/appointment.actions";
import { deleteDoctor } from "@/lib/actions/doctor.actions";
import { deletePatient } from "@/lib/actions/patient.actions";
import { deleteUser } from "@/lib/actions/user.actions";
import { formatDateTime } from "@/lib/utils";
import { Appointment, Doctor, Patient, User } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { ConfirmDialog } from "../ConfirmDialog";
import { StatusBadge } from "../StatusBadge";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-medium ">
          {appointment?.patients?.name || (
            <span className="text-red-400">Deleted Patient</span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "appointmentType",
    header: "Appointment Type",
    cell: ({ row }) => {
      const appointment = row.original;

      const appointmentType = AppointmentTypes.find(
        (item) => item.value === appointment.appointmentType
      );
      return (
        <p className="text-14-regular min-w-[100px]">{appointmentType?.name}</p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      const doctors = sessionStorage.getItem("doctors");

      const doctor = JSON.parse(doctors!)?.find(
        (doctor: Doctor) => doctor.userId === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.profilePhoto!}
            alt="doctor"
            width={120}
            height={120}
            className="size-8 rounded-full"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;
      const router = useRouter();

      const handleDelete = async () => {
        try {
          await deleteAppointment(appointment.$id);
          router.push(`/admin/?view=appointments`);
        } catch (error) {
          console.error("Error deleting appointments:", error);
        }
      };
      return (
        <div className="flex items-center gap-1">
          <AppointmentModal
            patientId={appointment?.patients?.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            patientId={appointment?.patients?.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
          <ConfirmDialog
            title="Confirm delete"
            description={`Are you sure you want to appointment? This action cannot be undone.`}
            onDelete={handleDelete}
            buttonText="Delete"
          />
        </div>
      );
    },
  },
];
export const doctorsColumns: ColumnDef<Doctor>[] = [
  {
    header: "#",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Doctor Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.original.profilePhoto || "/default-doctor.png"}
          alt="doctor"
          width={100}
          height={100}
          className="size-8 rounded-full"
        />
        <p className="whitespace-nowrap">Dr. {row.original.name}</p>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <p className="text-14-medium">{row.original.phone}</p>
      </div>
    ),
  },
  {
    accessorKey: "specialization",
    header: "Specialization",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.specialization}</p>
    ),
  },
  {
    accessorKey: "experience",
    header: "Experience",
    cell: ({ row }) => (
      <p className="text-14-regular">{row.original.experience} years</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        {/* <StatusBadge status={row.original.status} /> */}
        <p className="text-14-regular">{row.original.status} </p>
      </div>
    ),
  },
  {
    accessorKey: "consultationFees",
    header: "Consultation Fee",
    cell: ({ row }) => (
      <p className="text-14-regular">${row.original.consultationFees}</p>
    ),
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();

      const handleDelete = async () => {
        try {
          await deleteDoctor(user.$id);
          router.push(`/admin/?view=doctors`);
        } catch (error) {
          console.error("Error deleting doctor:", error);
        }
      };

      return (
        <div className="flex gap-1 pl-6">
          <ConfirmDialog
            title="Confirm delete"
            description={`Are you sure you want to doctor ${user.name}? This action cannot be undone.`}
            onDelete={handleDelete}
          />
        </div>
      );
    },
  },
];

export const usersColumns: ColumnDef<User>[] = [
  {
    header: "#",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <p className="text-14-medium">{row.original.name}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p className="text-14-regular">{row.original.email}</p>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <p className="text-14-medium">{row.original.phone}</p>
      </div>
    ),
  },
  {
    accessorKey: "joined",
    header: "Joined Date",
    cell: ({ row }) => (
      <p className="text-14-regular">
        {formatDateTime(row.original.registration).dateTime}
      </p>
    ),
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();

      const handleDelete = async () => {
        try {
          await deleteUser(user.$id);
          router.push(`/admin/?view=users`);
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };

      return (
        <div className="flex gap-1 pl-6">
          <ConfirmDialog
            title="Confirm delete"
            description={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
            onDelete={handleDelete}
          />
        </div>
      );
    },
  },
];

export const patientColumns: ColumnDef<Patient>[] = [
  {
    header: "#",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Patient Name",
    cell: ({ row }) => <p className="text-14-medium">{row.original.name}</p>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <p className="text-14-regular">{row.original.phone}</p>,
  },
  {
    accessorKey: "primaryPhysician",
    header: "Primary Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      const doctors = sessionStorage.getItem("doctors");

      const doctor = JSON.parse(doctors!)?.find(
        (doctor: Doctor) => doctor.userId === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.profilePhoto!}
            alt="doctor"
            width={120}
            height={120}
            className="size-8 rounded-full"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "birthDate",
    header: "Date of Birth",
    cell: ({ row }) => (
      <p className="text-14-regular">
        {formatDateTime(row.original.birthDate).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "insuranceProvider",
    header: "Insurance",
    cell: ({ row }) => (
      <p className="text-14-regular">{row.original.insuranceProvider}</p>
    ),
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();

      const handleDelete = async () => {
        try {
          await deletePatient(user.$id);
          router.push(`/admin/?view=patients`);
        } catch (error) {
          console.error("Error deleting patients:", error);
        }
      };

      return (
        <div className="flex gap-1 pl-6">
          <ConfirmDialog
            title="Confirm delete"
            description={`Are you sure you want to patient ${user.name}? This action cannot be undone.`}
            onDelete={handleDelete}
          />
        </div>
      );
    },
  },
];
