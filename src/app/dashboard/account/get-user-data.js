'use server';

import { auth } from "src/auth";
import { getUserById } from "src/model/user";

export default async function getUserData() {
const session = await auth();
  if (!session.user) {
    return null;
  }

const user = await getUserById(session.user.id);
  if (!user) {
    return null;
  }

  const {firstName,
    lastName,
    email,
    phoneNumber,
    country,
    address,
    state,
    city,
    zipCode,
    bio, } = user;

  return {
    firstName,
      lastName,
      email,
      phoneNumber,
      country,
      address,
      state,
      city,
      zipCode,
      bio,
  };

}