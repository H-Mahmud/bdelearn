'use server';

import db from "src/db";

export default async function getVerificationStatus(userId) {
    const result = await db.user.findUnique({where: {id: userId}, select: {isVerified: true}})
    return result.isVerified;
}