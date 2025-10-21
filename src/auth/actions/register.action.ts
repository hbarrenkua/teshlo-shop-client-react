import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response";



export const registerAction = async (fullName: string, email: string, password: string): Promise<AuthResponse> => {

    try {
        console.log('estamos en la accion', fullName, email, password)
        const { data } = await tesloApi.post<AuthResponse>('/auth/register',
            {
                fullName,
                email,
                password
            }
        )

        console.log(data)
        return data;
    } catch (error) {

        console.log(error)
        throw error;
    }

}