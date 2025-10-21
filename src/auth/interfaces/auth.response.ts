import type { User } from "@/interfaces/user.interface";


//Login, Register, Checkstatus
export interface AuthResponse {
    user: User;
    token: string;
}

