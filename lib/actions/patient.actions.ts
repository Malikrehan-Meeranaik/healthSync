"use server";

import { ID, Query, InputFile } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENTS_COLLECTION_ID,
  PROJECT_ID,
  storage,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// Types
interface RegisterUserParams {
  identificationDocument?: FormData;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup?: string;
  [key: string]: any;
}

interface GetPatientsParams {
  searchQuery?: string;
  page?: number;
  limit?: number;
}

// Register new patient
export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = identificationDocument && InputFile.fromBlob(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENTS_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while registering the patient:", error);
    throw error;
  }
};

// Get single patient
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENTS_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error("An error occurred while retrieving the patient details:", error);
    throw error;
  }
};

// Get all patients with pagination and search
export const getAllPatients = async ({ searchQuery = "", page = 1, limit = 10 }: GetPatientsParams = {}) => {
  try {
    let queries: any[] = [
      Query.limit(limit),
      Query.offset((page - 1) * limit),
    ];

    if (searchQuery) {
      queries = [
        ...queries,
        Query.search("name", searchQuery),
      ];
    }

    const patientsList = await databases.listDocuments(
      DATABASE_ID!,
      PATIENTS_COLLECTION_ID!,
      queries
    );

    return {
      patients: parseStringify(patientsList.documents),
      total: patientsList.total,
      currentPage: page,
      totalPages: Math.ceil(patientsList.total / limit)
    };
  } catch (error) {
    console.error("An error occurred while fetching patients:", error);
    throw error;
  }
};

// Delete patient
export const deletePatient = async (patientId: string) => {
  try {
    // Get patient document to check for identification document
    const patient = await databases.getDocument(
      DATABASE_ID!,
      PATIENTS_COLLECTION_ID!,
      patientId
    );

    // Delete patient document
    const response = await databases.deleteDocument(
      DATABASE_ID!,
      PATIENTS_COLLECTION_ID!,
      patientId
    );

    return parseStringify(response);
  } catch (error) {
    console.error("An error occurred while deleting the patient:", error);
    throw error;
  }
};

// Update patient
// export const updatePatient = async (
//   patientId: string,
//   { identificationDocument, ...updateData }: Partial<RegisterUserParams>
// ) => {
//   try {
//     let file;
//     // Get existing patient data
//     const existingPatient = await databases.getDocument(
//       DATABASE_ID!,
//       PATIENTS_COLLECTION_ID!,
//       patientId
//     );

//     // Handle new identification document if provided
//     if (identificationDocument) {
//       // Delete old document if it exists
//       if (existingPatient.identificationDocumentId) {
//         await storage.deleteFile(
//           BUCKET_ID!,
//           existingPatient.identificationDocumentId
//         );
//       }

//       // Upload new document
//       const inputFile = InputFile.fromBlob(
//         identificationDocument?.get("blobFile") as Blob,
//         identificationDocument?.get("fileName") as string
//       );

//       file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
//     }

//     // Update patient document
//     const updatedPatient = await databases.updateDocument(
//       DATABASE_ID!,
//       PATIENTS_COLLECTION_ID!,
//       patientId,
//       {
//         ...updateData,
//         ...(file && {
//           identificationDocumentId: file.$id,
//           identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
//         })
//       }
//     );

//     return parseStringify(updatedPatient);
//   } catch (error) {
//     console.error("An error occurred while updating the patient:", error);
//     throw error;
//   }
// };

// Get patient medical history
export const getPatientMedicalHistory = async (patientId: string) => {
  try {
    const patient = await databases.getDocument(
      DATABASE_ID!,
      PATIENTS_COLLECTION_ID!,
      patientId
    );

    // You can add queries here to fetch related medical records, appointments, etc.
    // This is just a basic example
    return parseStringify({
      ...patient,
      // Add additional medical history data here
    });
  } catch (error) {
    console.error("An error occurred while fetching patient medical history:", error);
    throw error;
  }
};