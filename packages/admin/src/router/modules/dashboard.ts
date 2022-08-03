import {Layout} from "@/router/base";
import {RouteRecordRaw} from "vue-router";
import { DashboardOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        redirect: '/dashboard/console',
        component: Layout,
        meta: {
            title: 'Dashboard',
            icon: renderIcon(DashboardOutlined),
            permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
            sort: 0,
        },
        children: [{
            path: 'console',
            name: 'dashboard_console',
            component: () => import('@/views/dashboard/console.vue'),
            meta: {
                title: '主控台',
            },
        },]
    }
]
export default routes;