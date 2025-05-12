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

export async function getUserCountByStatus() {
  const userCount = await db.user.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  });

  return userCount.reduce((acc, { status, _count }) => {
    acc[status] = _count.id;
    return acc;
  }, {});
}

export async function getSubAdminList() {
  const users = await db.user.findMany({
    where: {
      profile: {
        not: 'STUDENT',
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      referralCode: true,
      status: true,
      profile: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return users.map((user) => ({
    ...user,
    name: `${user.firstName} ${user.lastName}`,
    createdAt: user.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  }));
}
