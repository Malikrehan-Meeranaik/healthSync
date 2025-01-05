/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type AppointmentType = "Home Visit" | "Clinic Visit";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}
declare interface GetUsersParams {
  searchQuery?: string;
  page?: number;
  limit?: number;
}


declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
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

declare interface DoctorRegisterParams extends CreateUserParams {
  userId: string;
  specialization: string;
  qualifications: string;
  licenseNumber: string;
  registrationNumber: string;
  availableHours: string;
  experience: number;
  workingDays: string;
  profilePhoto?: FormData;
  biography: string;
  languages: string;
  consultationFees: number;
  status: 'Active' | 'InActive' | 'OnLeave';
  clinicAddress: string;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
  appointmentType:AppointmentType
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  timeZone: string;
  appointment: Appointment;
  type: string;
  appointmentType:AppointmentType
};
