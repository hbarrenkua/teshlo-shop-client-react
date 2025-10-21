import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check-auth.action'
import { registerAction } from '../actions/register.action'


type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
    //Properties
    user: User | null,
    token: String | null,
    authStatus: AuthStatus,


    //Getters
    isAdmin: () => boolean;

    //Actions
    login: (email: string, password: string) => Promise<boolean>;

    logout: () => void;

    register: (fullName: string, email: string, password: string) => Promise<boolean>;

    checkAuthStatus: () => Promise<boolean>

}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',


    isAdmin: () => {

        const roles = get().user?.roles || [] as string[];

        return roles.includes('admin')


        // return !!get().user?.roles.includes('admin')
    },


    login: async (email: string, password: string) => {
        console.log({ email, password })

        try {
            const data = await loginAction(email, password)
            localStorage.setItem('token', data.token)
            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true;
        } catch (error) {
            localStorage.removeItem('token')
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false;
        }


    },

    register: async (fullName: string, email: string, password: string) => {
        console.log({ fullName, email, password })

        try {


            const data = await registerAction(fullName, email, password)
            localStorage.setItem('token', data.token)
            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true;
        } catch (error) {
            localStorage.removeItem('token')
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false;
        }


    },

    logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, authStatus: 'not-authenticated' })

    },

    checkAuthStatus: async () => {
        try {

            const { user, token } = await checkAuthAction();
            set({
                user,
                token,
                authStatus: 'authenticated'
            })

            return true
        } catch (error) {
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false

        }


    }



}))

