import {defineStore} from "pinia";
import { store } from '@/store';
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
})
// Need to be used outside the setup
export function useUserStoreWidthOut() {
    return useUserStore(store);
}
