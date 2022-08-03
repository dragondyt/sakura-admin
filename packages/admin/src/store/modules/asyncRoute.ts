import {defineStore} from 'pinia';
import {RouteRecordRaw} from 'vue-router';
import {store} from '@/store';
import {asyncRoutes, constantRouter} from "@/router";
import {toRaw} from "vue";

interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

export interface IAsyncRouteState {
  menus: RouteRecordRaw[];
  routers: any[];
  addRouters: any[];
  keepAliveComponents: string[];
  isDynamicAddedRoute: boolean;
}

function filter<T = any>(
    tree: T[],
    func: (n: T) => boolean,
    config: Partial<TreeHelperConfig> = {}
): T[] {
  config = getConfig(config);
  const children = config.children as string;

  function listFilter(list: T[]) {
    return list
        .map((node: any) => ({...node}))
        .filter((node) => {
          node[children] = node[children] && listFilter(node[children]);
          return func(node) || (node[children] && node[children].length);
        });
  }

  return listFilter(tree);
}

export const useAsyncRouteStore = defineStore({
  id: 'app-async-route',
  state: (): IAsyncRouteState => ({
    menus: [],
    routers: constantRouter,
    addRouters: [],
    keepAliveComponents: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setDynamicAddedRoute(flag: boolean) {
      this.isDynamicAddedRoute = flag
    },
    setKeepAliveComponents(compNames: any[]) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
    // 设置动态路由
    setRouters(routers: any[]) {
      this.addRouters = routers;
      this.routers = constantRouter.concat(routers);
    },
    setMenus(menus: any[]) {
      // 设置动态路由
      this.menus = menus;
    },
    async generateRoutes(data: any) {
      let accessedRouters: any[];
      const permissionsList: { value: string }[] = data.permissions || [];
      const routeFilter = (route: any) => {
        const {meta} = route;
        const {permissions} = meta || {};
        if (!permissions) return true;
        return permissionsList.some((item) => permissions.includes(item.value));
      };
      try {
        //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
        accessedRouters = filter(asyncRoutes, routeFilter);
      } catch (error) {
        console.log(error)
        accessedRouters = [];
      }
      accessedRouters = accessedRouters.filter(routeFilter);
      this.setRouters(accessedRouters);
      this.setMenus(accessedRouters);
      return toRaw(accessedRouters);
    }
  },
});

// Need to be used outside the setup
export function useAsyncRouteStoreWidthOut() {
  return useAsyncRouteStore(store);
}
