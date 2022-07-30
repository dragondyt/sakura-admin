import {Router} from "vue-router";
import {useUserStore, useUserStoreWidthOut} from "@/store/modules/user";
const allowList = ['login', 'icons', 'error', 'error-404']; // no redirect whitelist
const loginRoutePath = '/login';
const defaultRoutePath = '/dashboard';
const LOGIN_PATH = PageEnum.BASE_LOGIN;
const whitePathList = [LOGIN_PATH]; // no redirect whitelist
import { PageEnum } from '@/enums/pageEnum';
import {ACCESS_TOKEN} from "@/store/mutation-types";
import { storage } from '@/utils/storage';
export function createRouterGuards(router: Router) {
    const userStore = useUserStoreWidthOut();
    router.beforeEach(async (to, from, next) => {
        if (from.path === LOGIN_PATH && to.name === 'errorPage') {
            next(PageEnum.BASE_HOME);
            return;
        }
        // Whitelist can be directly entered
        if (whitePathList.includes(to.path as PageEnum)) {
            next();
            return;
        }
        const token = storage.get(ACCESS_TOKEN);
        if (!token) {
            // You can access without permissions. You need to set the routing meta.ignoreAuth to true
            if (to.meta.ignoreAuth) {
                next();
                return;
            }
            // redirect login page
            const redirectData: { path: string; replace: boolean; query?: Record<string, any> } = {
                path: LOGIN_PATH,
                replace: true,
            };
            if (to.path) {
                redirectData.query = {
                    ...redirectData.query,
                    redirect: to.path,
                };
            }
            next(redirectData);
            return;
        }

    })
    router.onError((error) => {
        console.log(error, '路由错误');
    });
}