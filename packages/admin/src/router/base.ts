// 404 on a page
import {RouteRecordRaw} from "vue-router";
export const Layout = () => import('@/layout/index.vue');
export const ErrorPage = () => import('@/views/exception/404.vue');
export const ErrorPageRoute: RouteRecordRaw = {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: Layout,
    meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
    },
    children: [
        {
            path: '/:path(.*)*',
            name: 'ErrorPageSon',
            component: ErrorPage,
            meta: {
                title: 'ErrorPage',
                hideBreadcrumb: true,
            },
        },
    ],
};
export const RedirectRoute: RouteRecordRaw = {
    path: '/redirect',
    name: "Redirect",
    component: Layout,
    meta: {
        title: "Redirect",
        hideBreadcrumb: true,
    },
    children: [
        {
            path: '/redirect/:path(.*)',
            name: "Redirect",
            component: () => import('@/views/redirect/index.vue'),
        },
    ],
};
