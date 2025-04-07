import db from 'src/db';

/**
 *
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} phoneNumber
 * @param {string} password
 * @param {string} referralCode
 * @param {string} referrer
 * @param {import('@prisma/client').Status} status
 * @param {import('@prisma/client').Profile} profile
 */
export async function createUser(
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  referralCode,
  referrer,
  status,
  profile
) {
  return db.user.create({
    data: {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      referralCode,
      referrer: {
        connect: referrer,
      },
      status,
      profile,
    },
  });
}

/**
 *
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} phoneNumber
 * @param {string} password
 * @param {import('@prisma/client').Status} status
 * @param {import('@prisma/client').Profile} profile
 */
export async function createSubAdminUser(
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  status,
  profile
) {
  return db.user.create({
    data: {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      status,
      profile,
    },
  });
}

/**
 * Get user id by user referral code
 *
 * @param {string} referralCode
 * @param {import('@prisma/client').Profile} profile
 * @returns
 */
export async function getUserIdByReferCode(referralCode, profile) {
  return db.user.findFirst({
    where: {
      referralCode,
      profile,
    },
    select: {
      id: true,
    },
  });
}

/**
 *
 * @param {string} email
 *  @param {import('@prisma/client').Profile} profile
 * @returns
 */
export async function isUserRegisteredByEmail(email, profile) {
  return db.user.count({
    where: { email, profile },
  });
}

/**
 *
 * @param {string} phoneNumber
 * @param {import('@prisma/client').Profile} profile
 * @returns
 */
export async function isUserRegisteredByPhoneNumber(phoneNumber, profile) {
  return db.user.count({
    where: {
      phoneNumber,
      profile,
    },
  });
}

/**
 *
 * @param {string} email
 * @param {import('@prisma/client').Profile} profile
 * @param {string} password
 * @returns
 */
export async function getUserByCredential(email, profile, password) {
  return db.user.findFirst({
    where: {
      email,
      profile,
      password,
    },
  });
}

export async function updateUserProfile(
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  country,
  address,
  state,
  city,
  zipCode,
  bio
) {
  return db.user.update({
    where: { id },
    data: {
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
    },
  });
}

export async function getUserById(id) {
  return db.user.findUnique({
    where: { id },
  });
}

export async function isUserEmailVerified(id) {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      isVerified: true,
    },
  });
}
