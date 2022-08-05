import {AppRouteRecordRaw} from "@/router/routes/types";
import {DEFAULT_LAYOUT} from "@/router/constants";

const COMMENT: AppRouteRecordRaw = {
    component: DEFAULT_LAYOUT,
    path: "/comment",
    name: 'comment',
    redirect: '/comment/list',
    meta: {
        locale: 'menu.comment',
        requiresAuth: true,
        icon: 'icon-user',
        order: 0,
    },
    children: [
        {
            path: 'list',
            name: 'CommentList',
            component: () => import('@/views/comment/list/index.vue'),
            meta: {
                locale: 'menu.comment.list',
                requiresAuth: true,
                roles: ['*'],
            },
        }
    ]
}
export default COMMENT