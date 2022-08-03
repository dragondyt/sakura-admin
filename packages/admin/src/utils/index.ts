import {isObject} from "@/utils/is";
import {PageEnum} from "@/enums/pageEnum";
import {RouteRecordRaw} from "vue-router";
import {NIcon} from "naive-ui";
import {DefineComponent, h, VNode} from 'vue';

/**
 * render 图标
 * */
export function renderIcon(icon: any) {
    return () => h(NIcon, null, {default: () => h(icon)});
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string;
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}

/**
 * 判断根路由 Router
 * */
export function isRootRouter(item: RouteRecordRaw) {
    return item.meta?.alwaysShow != true && item.children?.length === 1;
}

/**
 * 排除Router
 * */
export function filterRouter(routerMap: Array<any>) {
    return routerMap.filter((item) => {
        return (
            (item.meta?.hidden || false) != true &&
            !['/:path(.*)*', '/', PageEnum.REDIRECT, PageEnum.BASE_LOGIN].includes(item.path)
        );
    });
}

export function generatorMenu(routerMap: Array<any>) {
    return filterRouter(routerMap).map((item) => {
        const isRoot = isRootRouter(item);
        const info = isRoot ? item.children[0] : item;
        const currentMenu = {
            ...info,
            ...info.meta,
            label: info.meta?.title,
            key: info.name,
            icon: isRoot ? item.meta?.icon : info.meta?.icon,
        };
        // 是否有子菜单，并递归处理
        if (info.children && info.children.length > 0) {
            // Recursion
            currentMenu.children = generatorMenu(info.children);
        }
        return currentMenu;
    });
}