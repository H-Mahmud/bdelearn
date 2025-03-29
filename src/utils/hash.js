import { customAlphabet } from 'nanoid';

export const newReferralCode = customAlphabet('0123456789', 8);

export function saltAndHashPassword(password) {
  return password;
}
