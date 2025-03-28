'use server';

import { SignUpSchema } from "src/schema/userSchema";

export default async function userSignUp(formData) {
    const {success} = SignUpSchema.safeParse(formData)
    if(!success) {
    throw new Error('validation error')
    } else {
        console.log('succss')
    }
}