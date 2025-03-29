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
 */
export async function createUser(
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  referralCode,
  referrer,
  status
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
    },
  });
}

/**
 * Get user id by user referral code
 *
 * @param {string} referralCode
 * @returns
 */
export async function getUserIdByReferCode(referralCode) {
  return db.user.findFirst({
    where: {
      referralCode,
    },
    select: {
      id: true,
    },
  });
}

/**
 *
 * @param {string} email
 * @returns
 */
export async function isUserRegisteredByEmail(email) {
  return db.user.count({
    where: { email },
  });
}

/**
 *
 * @param {string} phoneNumber
 * @returns
 */
export async function isUserRegisteredByPhoneNumber(phoneNumber) {
  return db.user.count({
    where: {
      phoneNumber,
    },
  });
}
