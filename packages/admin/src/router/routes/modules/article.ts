import {AppRouteRecordRaw} from "@/router/routes/types";
import {DEFAULT_LAYOUT} from "@/router/constants";

const ARTICLE: AppRouteRecordRaw = {
    component: DEFAULT_LAYOUT,
    path: "/article",
    name: 'article',
    redirect: '/article/list',
    meta: {
        locale: 'menu.article',
        requiresAuth: true,
        icon: 'icon-user',
        order: 0,
    },
    children: [
        {
            path: 'list',
            name: 'ArticleList',
            component: () => import('@/views/article/list/index.vue'),
            meta: {
                locale: 'menu.article.list',
                requiresAuth: true,
                roles: ['*'],
            },
        }
    ]
}
export default ARTICLE