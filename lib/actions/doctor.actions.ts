"use server";

import { ID, Query, InputFile } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  DOCTORS_COLLECTION_ID,
  PROJECT_ID,
  storage,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const registerDoctor = async ({ profilePhoto, clinicPhoto, ...doctor }: DoctorRegisterParams) => {
  try {
    let file;
    let clinic;
    if (profilePhoto) {
      const inputFile =
        profilePhoto &&
        InputFile.fromBlob(
          profilePhoto?.get("blobFile") as Blob,
          profilePhoto?.get("fileName") as string
        )
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }
    if (clinicPhoto) {
      const inputFile =
        clinicPhoto &&
        InputFile.fromBlob(
          clinicPhoto?.get("blobFile") as Blob,
          clinicPhoto?.get("fileName") as string
        )
      clinic = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      DOCTORS_COLLECTION_ID!,
      ID.unique(),
      {
        profilePhoto: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        clinicPhoto: clinic?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${clinic.$id}/view??project=${PROJECT_ID}`
          : null,
        ...doctor,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error)
  }
}

export const getDoctor = async (userId: string) => {
  try {
    const doctors = await databases.listDocuments(
      DATABASE_ID!,
      DOCTORS_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(doctors.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the doctor details:",
      error
    );
  }
};
export const getDoctorsList = async () => {
  try {
    const doctors = await databases.listDocuments(
      DATABASE_ID!,
      DOCTORS_COLLECTION_ID!,
    );

    return parseStringify(doctors.documents);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the doctors details:",
      error
    );
  }
};
export const deleteDoctor = async (doctorId: string) => {
  try {
    // Delete the doctor document
    const deletedDoctor = await databases.deleteDocument(
      DATABASE_ID!,
      DOCTORS_COLLECTION_ID!,
      doctorId
    );

    return parseStringify(deletedDoctor);
  } catch (error) {
    console.error(
      "An error occurred while deleting the doctor:",
      error
    );
    throw error;
  }
};

export const updateDoctorStatus = async (doctorId: string, status: string) => {
  try {
    const updatedDoctor = await databases.updateDocument(
      DATABASE_ID!,
      DOCTORS_COLLECTION_ID!,
      doctorId,
      {
        status
      }
    );

    return parseStringify(updatedDoctor);
  } catch (error) {
    console.error(
      "An error occurred while updating the doctor status:",
      error
    );
    throw error;
  }
};