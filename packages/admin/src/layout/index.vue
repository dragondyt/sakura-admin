<template>
  <n-layout :has-sider="true">
    <n-layout-sider :collapsed-width="64">
      <Menu/>
    </n-layout-sider>
    <n-layout>
      <n-layout-header>

      </n-layout-header>
      <n-layout-content>
        <Main/>
      </n-layout-content>
      <n-back-top :right="100"/>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>

import Main from "@/layout/components/Main.vue";
import Menu from "@/layout/components/Menu.vue";</script>

<style scoped>

</style>