<template>
  <n-menu
      :options="menus"
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :indent="24">

  </n-menu>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import {useRoute} from "vue-router";
import {useAsyncRouteStore} from "@/store/modules/asyncRoute";
import {generatorMenu} from "@/utils";
// 当前路由
const currentRoute = useRoute();
const asyncRouteStore = useAsyncRouteStore();
const menus = ref<any[]>([]);
watch(
    () => currentRoute.fullPath,
    () => {
      updateMenu();
    }
);

function updateMenu(): void {
  menus.value = generatorMenu(asyncRouteStore.getMenus);
}

onMounted(() => updateMenu())
</script>

<style scoped>

</style>