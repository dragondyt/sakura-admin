<script setup lang="ts">
  import { onMounted, reactive, toRefs } from 'vue';
  import { TableRowSelection } from '@arco-design/web-vue';
  import { getCommentList } from "../../api/comment";

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
  ];
  const rowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
  });
  const form = reactive({
    border: true,
    borderCell: false,
    hover: true,
    stripe: false,
    checkbox: true,
    loading: false,
    tableHeader: true,
    noData: false,
  });
  const data = reactive({
    count: 0,
    showSearch: true,
    loading: false,
    queryParams: {
      current: 1,
      size: 10,
    },
    status: [
      {
        value: 0,
        label: '审核中',
      },
      {
        value: 1,
        label: '通过',
      },
    ],
    options: [
      {
        value: 1,
        label: '文章',
      },
      {
        value: 2,
        label: '友链',
      },
      {
        value: 3,
        label: '说说',
      },
    ],
    commentIdList: [] as number[],
    commentList: [] as Comment[],
  });
  const {
    count,
    showSearch,
    loading,
    queryParams,
    status,
    options,
    commentIdList,
    commentList,
  } = toRefs(data);

  function getList() {
    loading.value = true;
    getCommentList(queryParams.value).then(d => {
      console.log(d)
      loading.value = false;
    });
  }

  onMounted(() => {
    getList();
  });
</script>

<template>
  <a-table
    :columns="columns"
    :row-selection="form.checkbox ? rowSelection : undefined"
  ></a-table>
</template>

<style scoped lang="less"></style>
