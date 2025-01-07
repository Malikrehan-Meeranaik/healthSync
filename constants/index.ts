export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const DoctorFormDefaultValues = {
  userId: "",
  name: "",
  email: "",
  phone: "",
  specialization: "",
  qualifications: "",
  licenseNumber: "",
  registrationNumber: "",
  availableHours: "",
  experience: 0,
  workingDays: "",
  profilePhoto: "",
  biography: "",
  languages: "",
  consultationFees: 0,
  status: "Active" as Status,
  clinicAddress: "",
  clinicPhoto: "",
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "National Identity Card (Aadhaar)",
  "Passport",
  "Student ID Card",
  "Voter ID Card",
];

export const AppointmentTypes = [
  {
    value: "homeVisit",
    name: "Home Visit",
  },
  {
    value: "clinicVisit",
    name: "Clinic Visit",
  },
];
export const Status = ["Active", "InActive", "OnLeave"];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
