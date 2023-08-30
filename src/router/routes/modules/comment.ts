import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const COMMENT: AppRouteRecordRaw = {
  path: '/comment',
  name: 'comment',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.comment',
    requiresAuth: true,
    icon: 'icon-archive',
    order: 1,
  },
  children: [
    {
      path: 'list',
      name: 'CommentList',
      component: () => import('@/views/comment/index.vue'),
      meta: {
        locale: 'menu.comment.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default COMMENT;
