import {defineStore} from "pinia";
import { store } from '@/store';
import {login} from "@/api/v1/user";
export interface IUserState {
    token: string;
    username: string;
    welcome: string;
    avatar: string;
    permissions: any[];
    info: any;
}
export const useUserStore = defineStore({
    id: 'app-user',
    actions: {
        // 登录
        async login(userInfo: {}) {
            try {
                console.log("login")
                const response = await login(userInfo);
                return Promise.resolve(response);
            }catch (e) {
                return Promise.reject(e);
            }
        }
    }
})
// Need to be used outside the setup
export function useUserStoreWidthOut() {
    return useUserStore(store);
}
