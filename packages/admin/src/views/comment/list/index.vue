<template>
  <a-space direction="vertical" size="large" fill>
    <a-table row-key="name" :columns="columns" :data="data" :row-selection="rowSelection"
             v-model:selectedKeys="selectedKeys" :pagination="pagination"/>
  </a-space>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import listComment from "@/api/comment";

const selectedKeys = ref(['1', '2']);
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = {pageSize: 5}
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
]
const data = reactive([{}])
onMounted(() => {
  listComment({}).then(d => {
    data.concat(d);
  })
})
</script>

<style></style>
