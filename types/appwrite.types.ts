import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
  patients: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  appointmentType:AppointmentType;
  cancellationReason: string | null;
}
export interface User extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  status: "verified" | "unverified";
  lastActivity: Date;
  joined: Date;
}

export interface Doctor extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  qualifications: string;
  licenseNumber: string;
  registrationNumber: string;
  availableHours: string;
  experience: number;
  workingDays: string;
  profilePhoto?: string;
  biography: string;
  languages?: string;
  consultationFees: number;
  status: string;
  clinicAddress: string;
}