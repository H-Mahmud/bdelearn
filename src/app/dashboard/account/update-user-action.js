'use server';


import { auth } from "src/auth";
import { updateUserProfile } from "src/model/user";





export default async function updateUserAction(values) {

    const session = await auth();
    if(!session.user) {
        return {field: 'root', message: "User not authenticated!"};
    }
        try {
            const {id} = session.user;
            const {firstName,
                lastName,
                email,
                phoneNumber,
                country,
                address,
                state,
                city,
                zipCode,
                bio} = values;
        
            const user = await updateUserProfile(
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
            );
            
            return user;
        } catch (error) {
            if (error instanceof Error) {
                return {field: 'root', message: error.message};
            }
            console.log(error);
            return {field: 'root', message: "Update user failed! Server error!"};
        }
}
