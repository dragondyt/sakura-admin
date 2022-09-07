export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/article',
    name: 'article',
    icon: 'file-markdown',
    routes: [
      {
        path: '/article/list',
        name: 'list',
        component: './Article/List',
      },
      {
        path: '/article/create',
        name: 'create',
        component: './Article/ArticleCreate',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
