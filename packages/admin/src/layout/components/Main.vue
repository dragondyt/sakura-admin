<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition name="zoom-fade" mode="out-in" appear>
        <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath"/>
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath"/>
      </transition>
    </template>
  </RouterView>
</template>

<script lang="ts" setup>
import {useAsyncRouteStore} from "@/store/modules/asyncRoute";
import {computed} from "vue";

const asyncRouteStore = useAsyncRouteStore();
// 需要缓存的路由组件
const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents);
</script>

<style scoped>

</style>