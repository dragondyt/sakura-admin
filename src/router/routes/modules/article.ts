import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const ARTICLE: AppRouteRecordRaw = {
  path: '/article',
  name: 'article',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.article',
    requiresAuth: true,
    icon: 'icon-archive',
    order: 1,
  },
  children: [
    {
      path: 'write',
      name: 'Write',
      component: () => import('@/views/article/write.vue'),
      meta: {
        locale: 'menu.article.write',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'write/:articleId',
      name: 'Edit',
      component: () => import('@/views/article/write.vue'),
      meta: {
        locale: 'menu.article.edit',
        requiresAuth: true,
        hideInMenu: true,
        roles: ['*'],
      },
    },
    {
      path: 'list',
      name: 'List',
      component: () => import('@/views/article/list.vue'),
      meta: {
        locale: 'menu.article.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default ARTICLE;
