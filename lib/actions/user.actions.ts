"use server";

import { ID, Query, InputFile } from "node-appwrite";

import {
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId)

    return parseStringify(user)
  } catch (error) {
    console.log(error)
  }
}

// Get all users with pagination and search
export const getAllUsers = async ({ searchQuery = "", page = 1, limit = 10 }: GetUsersParams = {}) => {
    try {
      let queries: any[] = [
        Query.limit(limit),
        Query.offset((page - 1) * limit),
      ];
  
      // Add search query if provided
      if (searchQuery) {
        queries = [
          ...queries,
          Query.search("name", searchQuery),
        ];
      }
  
      const usersList = await users.list(queries);
  
      return {
        users: parseStringify(usersList.users),
        total: usersList.total,
        currentPage: page,
        totalPages: Math.ceil(usersList.total / limit)
      };
    } catch (error) {
      console.error("An error occurred while fetching users:", error);
      throw error;
    }
  };
  
  // Delete user
  export const deleteUser = async (userId: string) => {
    try {
      const response = await users.delete(userId);
      return parseStringify(response);
    } catch (error) {
      console.error("An error occurred while deleting the user:", error);
      throw error;
    }
  };
  