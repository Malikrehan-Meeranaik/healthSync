"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { AppointmentTypes, Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment, Doctor, Patient, User } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
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
      return <p className="text-14-medium ">{appointment.patients.name}</p>;
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
        <p className="text-14-regular min-w-[100px]">
          {appointmentType?.name}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
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

      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={appointment.patients.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            patientId={appointment.patients.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
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
  }
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <p className="text-14-medium">{row.original.status}</p>
        {/* <StatusBadge status={row.original.status} /> */}
      </div>
    ),
  },
  {
    accessorKey: "joined",
    header: "Joined Date",
    cell: ({ row }) => (
      <p className="text-14-regular">
        {formatDateTime(row.original.joined).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => (
      <p className="text-14-regular">
        {formatDateTime(row.original.lastActivity).dateTime}
      </p>
    ),
  }
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
    cell: ({ row }) => (
      <p className="text-14-regular">Dr. {row.original.primaryPhysician}</p>
    ),
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
  }
];