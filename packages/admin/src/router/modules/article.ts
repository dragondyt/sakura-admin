import {Layout} from "@/router/base";
import {RouteRecordRaw} from "vue-router";
import { DashboardOutlined,HeartOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/article',
        name: 'Article',
        redirect: '/article/add',
        component: Layout,
        meta: {
            title: 'Article',
            icon: renderIcon(HeartOutlined),
            permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
            sort: 0,
        },
        children: [{
            path: 'add',
            name: 'article_add',
            component: () => import('@/views/article/add.vue'),
            meta: {
                title: '新增文章',
            },
        },]
    }
]
export default routes;