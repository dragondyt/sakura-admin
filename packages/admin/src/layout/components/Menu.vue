<template>
  <n-menu
      :options="menus"
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :expanded-keys="state.openKeys"
      :value="selectedKeys"
      @update:value="clickMenuItem"
      :indent="24">
  </n-menu>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch, reactive, toRefs} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useAsyncRouteStore} from "@/store/modules/asyncRoute";
import {generatorMenu} from "@/utils";
// 当前路由
const currentRoute = useRoute();
const asyncRouteStore = useAsyncRouteStore();
const menus = ref<any[]>([]);
const router = useRouter();
const selectedKeys = ref<string>(currentRoute.name as string);
// 获取当前打开的子菜单
const matched = currentRoute.matched;

const getOpenKeys = matched && matched.length ? matched.map((item) => item.name) : [];

const state = reactive({
  openKeys: getOpenKeys,
});
watch(
    () => currentRoute.fullPath,
    () => {
      updateMenu();
    }
);

function updateSelectedKeys() {
  const matched = currentRoute.matched;
  state.openKeys = matched.map((item) => item.name);
  const activeMenu: string = (currentRoute.meta?.activeMenu as string) || '';
  selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string);
}

function updateMenu(): void {
  menus.value = generatorMenu(asyncRouteStore.getMenus);
  updateSelectedKeys();
}

function clickMenuItem(key: string): void {
  if (/http(s)?:/.test(key)) {
    window.open(key);
  } else {
    router.push({name: key});
  }
}

onMounted(() => updateMenu())
</script>

<style scoped>

</style>