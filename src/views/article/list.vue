<script setup lang="ts">
  import { onMounted, reactive, toRefs } from 'vue';
  import { Article, deleteArticle, getArticleList } from '@/api/article';
  import router from '@/router';
  import dayjs from 'dayjs';
  import { Notification } from '@arco-design/web-vue';

  const pageData = reactive({
    count: 0,
    showSearch: true,
    loading: false,
    title: '',
    queryParams: {
      current: 1,
      size: 10,
      isDelete: 0,
    },
    typeList: [
      {
        value: 1,
        label: '原创',
      },
      {
        value: 2,
        label: '转载',
      },
      {
        value: 3,
        label: '翻译',
      },
    ],
    activeStatus: 'all',
    categoryList: [],
    tagList: [],
    articleIdList: [],
    articleList: [] as Article[],
  });
  const {
    count,
    showSearch,
    loading,
    queryParams,
    typeList,
    activeStatus,
    categoryList,
    tagList,
    articleIdList,
    articleList,
  } = toRefs(pageData);

  const getList = () => {
    loading.value = true;
    getArticleList(queryParams.value).then(({ data }) => {
      console.log(data);
      articleList.value = data.recordList;
      count.value = data.count;
      loading.value = false;
    });
  };

  const handleEdit = (id: string) => {
    router.push({ path: `/article/write/${id}` });
  };
  const handleDelete = (id?: string) => {
    let ids: string[] = [];
    if (id === undefined) {
      ids = articleIdList.value;
    } else {
      ids = [id];
    }
    // messageConfirm("确认删除已选中的数据项?").then(() => {
    deleteArticle(ids).then(({ data }) => {
      if (data.flag) {
        Notification.success({
          title: '成功',
          content: data.msg,
        });
        getList();
      }
    });
    // }).catch(() => { });
  };
  onMounted(() => {
    getList();
  });
</script>

<template>
  <div>
    <a-table :data="articleList">
      <template #columns>
        <a-table-column title="ID" data-index="objectId" />
        <a-table-column title="缩略图" align="center">
          <template #cell="{ record }">
            <a-image class="article-cover" :src="record.cover" />
          </template>
        </a-table-column>
        <!-- 文章标题 -->
        <a-table-column
          data-index="title"
          title="标题"
          align="center"
        ></a-table-column>
        <!-- 创建时间 -->
        <a-table-column title="创建事件">
          <template #cell="{ record }">
            {{ dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </a-table-column>
        <!-- 操作 -->
        <a-table-column :width="220" title="操作" align="center">
          <template #cell="{ record }">
            <a-button
              type="primary"
              icon="Edit"
              link
              @click="handleEdit(record.objectId)"
            >
              编辑
            </a-button>
            <a-button
              status="danger"
              icon="Edit"
              link
              @click="handleDelete(record.objectId)"
            >
              删除
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<style scoped lang="less">
  .article-cover {
    :deep(.arco-image-img) {
      position: relative;
      width: 100%;
      height: 90px;
      border-radius: 4px;
    }
  }
</style>
