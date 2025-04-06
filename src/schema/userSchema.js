import { z as zod } from 'zod';
/**
 * @type {import('@prisma/client').Profile[]}
 */
export const PROFILES = ['ADMIN', 'CONTROLLER', 'COUNSELOR', 'STUDENT', 'TRAINER'];
/**
 * @type {import('@prisma/client').Profile}
 */
export const SUPER_ADMIN_PROFILE = 'SUPER_ADMIN';
export const SUB_ADMIN_PROFILES = PROFILES.filter((profile) => profile !== 'STUDENT');


const GeneralSignUpFields = {
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phoneNumber: zod
    .string()
    .min(1, { message: 'Whatsapp Number is required!' })
    .min(10, { message: 'Whatsapp number must be at least 10 digits long' })
    .max(15, { message: 'Whatsapp number must be no more than 15 digits long' })
    .regex(/^\+?[0-9]+$/, {
      message: "Whatsapp number must contain only numbers and an optional '+' at the start",
    }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),

}

export const SignUpSchema = zod.object({
  ...GeneralSignUpFields,
  profile: zod.enum(PROFILES, {
    errorMap: () => ({ message: 'Please select a valid profile from the available options.' }),
  }),
  referralCode: zod
  .string()
  .min(1, { message: 'Referral Code is required!' })
  .regex(/^\d{8}$/, {
    message: 'Referral code must be exactly 8 digits and contain only numbers',
  }),
});


export const subAdminSignUpSchema = zod.object({
  ...GeneralSignUpFields,
  profile: zod.enum(SUB_ADMIN_PROFILES, {
    errorMap: () => ({ message: 'Please select a valid profile from the available options.' }),
  }),
})

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  profile: zod.enum(PROFILES, {
    errorMap: () => ({ message: 'Please select a valid profile from the available options.' }),
  }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});


export const ForgotPasswordSchema = zod.object({
  profile: zod.enum(PROFILES, {
    errorMap: () => ({ message: 'Please select a valid profile from the available options.' }),
  }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});