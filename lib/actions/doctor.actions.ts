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
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const registerDoctor = async ({profilePhoto,...doctor}:DoctorRegisterParams)=>{
    try {
        let file;
        console.log(doctor)
        if (profilePhoto) {
          const inputFile =
          profilePhoto &&
            InputFile.fromBlob(
                profilePhoto?.get("blobFile") as Blob,
                profilePhoto?.get("fileName") as string
            )
          file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        }
        console.log({
            profilePhoto: file?.$id
              ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
              : null,
            ...doctor,
          })
        // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
        const newPatient = await databases.createDocument(
          DATABASE_ID!,
          DOCTORS_COLLECTION_ID!,
          ID.unique(),
          {
            profilePhoto: file?.$id
              ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
              : null,
            ...doctor,
          }
        );
    
        return parseStringify(newPatient);
      } catch (error) {
        console.log(error)
      }
}
