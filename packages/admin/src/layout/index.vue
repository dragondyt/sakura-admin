<template>
  <n-layout class="flex flex-row flex-auto" :has-sider="true">
    <n-layout-sider class="min-h-[100vh] relative z-[13]" :collapsed-width="64"
                    style="box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);transition: all 0.2s ease-in-out;">
      <Menu/>
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <div class="flex justify-between items-center p-0">
          <n-dropdown trigger="hover" :options="avatarOptions">
            <div class="avatar">
              <n-avatar round>
                {{ username }}
                <template #icon>
                  <UserOutlined/>
                </template>
              </n-avatar>
            </div>
          </n-dropdown>
        </div>
      </n-layout-header>
      <n-layout-content class="min-h-[100vh] flex">
        <TagsView/>
        <Main/>
      </n-layout-content>
      <n-back-top :right="100"/>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>

import Main from "@/layout/components/Main.vue";
import Menu from "@/layout/components/Menu.vue";
import {UserOutlined} from '@vicons/antd';
import {useUserStore} from "@/store/modules/user";
import TagsView from "@/layout/components/TagsView.vue";

const userStore = useUserStore();
const {username} = userStore?.info || {};
const avatarOptions = [
  {
    label: '个人设置',
    key: 1,
  },
  {
    label: '退出登录',
    key: 2,
  },
];
</script>

<style scoped>

</style>