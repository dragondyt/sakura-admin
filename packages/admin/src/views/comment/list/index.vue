<template>
  <a-space direction="vertical" size="large" fill>
    <a-table row-key="name" :columns="columns" :data="renderData" :row-selection="rowSelection"
             :loading="loading"
             @page-change="onPageChange"
             v-model:selectedKeys="selectedKeys" :pagination="pagination"/>
  </a-space>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import listComment from "@/api/comment";
import {Pagination} from "@/types/global";
import {PolicyParams,} from "@/api/list";
import useLoading from "@/hooks/loading";

const selectedKeys = ref(['1', '2']);
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});
const basePagination: Pagination = {
  current: 1,
  pageSize: 20,
};
const pagination = reactive({
  ...basePagination,
});

const columns = [
  {
    title: 'ID',
    dataIndex: 'objectId',
  },
  {
    title: 'Nick',
    dataIndex: 'nick',
  }, {
    title: 'Comment',
    dataIndex: 'comment',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  }, {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
  }, {
    title: 'UpdatedAt',
    dataIndex: 'updatedAt',
  },
]
const {loading, setLoading} = useLoading(true);
const renderData = ref<any>([]);
const fetchData = async (
    params: PolicyParams = {current: 1, pageSize: 20}
) => {
  setLoading(true);
  try {
    const {data} = await listComment(params);
    renderData.value = data.list;
    pagination.current = params.current;
    pagination.total = data.total;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

const onPageChange = (current: number) => {
  fetchData({...basePagination, current});
};

fetchData();
</script>

<style></style>
