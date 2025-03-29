import { z as zod } from 'zod';
/**
 * @type {import('@prisma/client').Profile[]}
 */
const validProfile = ['SUPER_ADMIN', 'ADMIN', 'CONTROLLER', 'COUNSELOR', 'STUDENT', 'TRAINER'];

export const SignUpSchema = zod.object({
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
  profile: zod.enum(validProfile, {
    errorMap: () => ({ message: 'Invalid profile' }),
  }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
  referralCode: zod
    .string()
    .min(1, { message: 'Referral Code is required!' })
    .regex(/^\d{8}$/, {
      message: 'Referral code must be exactly 8 digits and contain only numbers',
    }),
});

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  profile: zod.enum(validProfile, {
    errorMap: () => ({ message: 'Invalid profile' }),
  }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});
