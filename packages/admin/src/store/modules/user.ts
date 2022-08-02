import {defineStore} from "pinia";
import {store} from '@/store';
import {getUserInfo, login} from "@/api/v1/user";
import {ACCESS_TOKEN, CURRENT_USER} from "@/store/mutation-types";
import {createStorage} from "@/utils/storage";

const Storage = createStorage({storage: localStorage});

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
    state: (): IUserState => ({
        token: Storage.get(ACCESS_TOKEN, ''),
        username: '',
        welcome: '',
        avatar: '',
        permissions: [],
        info: Storage.get(CURRENT_USER, {}),
    }),
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setAvatar(avatar: string) {
            this.avatar = avatar;
        },
        setPermissions(permissions: any[]) {
            this.permissions = permissions;
        },
        setUserInfo(info: any) {
            this.info = info;
        },
        // 登录
        async login(userInfo: {}) {
            try {
                const response = await login(userInfo);
                return Promise.resolve(response);
            } catch (e) {
                return Promise.reject(e);
            }
        },
        async GetInfo() {
            const that = this;
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then((res) => {
                        console.log(res)
                        const result = res;
                        if (result.permissions && result.permissions.length) {
                            const permissionsList = result.permissions;
                            that.setPermissions(permissionsList);
                            that.setUserInfo(result);
                        } else {
                            reject(new Error('getInfo: permissionsList must be a non-null array !'));
                        }
                        that.setAvatar(result.avatar);
                        resolve(res);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
    }
})
// Need to be used outside the setup
export function useUserStoreWidthOut() {
    return useUserStore(store);
}
