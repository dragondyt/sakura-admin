<script setup lang="ts">
  import { computed, onMounted, reactive, ref, toRefs } from 'vue';
  import {
    config,
    ExposeParam,
    InsertContentGenerator,
    MdEditor,
  } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import { useAppStore } from '@/store';
  import {useDateFormat, useFullscreen} from '@vueuse/core';
  import {
    FormInstance,
    Message,
    Notification,
    FileItem,
  } from '@arco-design/web-vue';
  import {
    addArticle,
    ArticleForm,
    editArticle,
    updateArticle,
  } from '@/api/article';
  import { useRoute } from 'vue-router';
  import router from '@/router';
  import container from 'markdown-it-container';
  import { Completion, CompletionSource } from '@codemirror/autocomplete';
  import { EditorSelection } from '@codemirror/state';

  config({
    editorConfig: {
      // 输入渲染延迟（ms）
      renderDelay: 0,
    },
    markdownItConfig(mdit) {
      mdit.use(container, 'note', {
        validate: (params: any) => {
          return params
            .trim()
            .match(/^(default|primary|success|info|warning|danger)(.*)$/);
        },
        render: (tokens: any, idx: any) => {
          const m = tokens[idx].info.trim().match(/^(.*)$/);

          if (tokens[idx].nesting === 1) {
            // opening tag
            return `<div class="note ${m[1].trim()}">`;
          }
          return '</div>\n';
        },
      });

      mdit.use(container, 'tab', {
        marker: ';',

        validate: (params: string) => {
          return params.trim().match(/^(\w+)+(.*)$/);
        },

        render: (tokens: any, idx: any) => {
          const m = tokens[idx].info.trim().match(/^(\w+)+(.*)$/);

          if (tokens[idx].nesting === 1) {
            // opening tag
            return `<div class="tab" data-id="${m[1].trim()}" data-title="${m[2].trim()}">`;
          }
          return '</div>\n';
        },
      });

      mdit.use(container, 'collapse', {
        marker: '+',

        validate: (params: string) => {
          return params.match(/^(primary|success|info|warning|danger|\s)(.*)$/);
        },

        render: (tokens: any, idx: any) => {
          const m = tokens[idx].info.match(
            /^(primary|success|info|warning|danger|\s)(.*)$/
          );

          if (tokens[idx].nesting === 1) {
            // opening tag
            const style = m[1].trim();
            return `<details${
              style ? ` class="${style}"` : ''
            }><summary>${m[2].trim()}</summary><div>`;
          }
          return '</div></details>\n';
        },
      });
    },
  });

  const getPairApply = (
    flag: string,
    type: string,
    title: string,
    suffix: string,
    selectType: 'type' | 'title'
  ): Completion['apply'] => {
    return (view: any, _completion: any, from: any, to: any) => {
      const label = `${flag}${type}`.slice(to - from);

      view.dispatch(view.state.replaceSelection(`${label}${title}${suffix}`));

      // 开始+标记和类型+是否选中title
      const newTo =
        from +
        _completion.label.length +
        (selectType === 'title' ? title.length : 0);

      view.dispatch({
        selection: EditorSelection.create(
          [
            EditorSelection.range(
              from +
                _completion.label.length +
                (selectType === 'title' ? 1 : -type.length),
              newTo
            ),
            EditorSelection.cursor(newTo),
          ],
          1
        ),
      });

      view.focus();
    };
  };

  const completions = ref<Array<CompletionSource>>([
    (context: any) => {
      const word = context.matchBefore(/:\w*/);

      if (word === null || (word.from === word.to && context.explicit)) {
        return null;
      }

      return {
        from: word.from,
        options: [
          ...['default', 'primary', 'success', 'warning', 'danger', 'info'].map(
            (key) => {
              const label = `::: ${key}`;
              return {
                label,
                type: 'text',
                apply: getPairApply(
                  ':::',
                  ` ${key}`,
                  ' Title',
                  '\n\n:::',
                  'title'
                ),
              };
            }
          ),
        ],
      };
    },
    (context: any) => {
      const word = context.matchBefore(/;\w*/);

      if (word === null || (word.from === word.to && context.explicit)) {
        return null;
      }

      return {
        from: word.from,
        options: [
          ...['default', 'primary', 'success', 'warning', 'danger', 'info'].map(
            (key) => {
              const label = `;;; ${key}`;
              return {
                label,
                type: 'text',
                apply: getPairApply(
                  ';;;',
                  ` ${key}`,
                  ' Tab',
                  '\n\n;;;',
                  'title'
                ),
              };
            }
          ),
        ],
      };
    },
    (context: any) => {
      const word = context.matchBefore(/\+\w*/);

      if (word === null || (word.from === word.to && context.explicit)) {
        return null;
      }

      return {
        from: word.from,
        options: [
          ...['default', 'primary', 'success', 'warning', 'danger', 'info'].map(
            (key) => {
              const label = `+++ ${key}`;
              return {
                label,
                type: 'text',
                apply: getPairApply(
                  '+++',
                  ` ${key}`,
                  ' Collapse',
                  '\n\n+++',
                  'title'
                ),
              };
            }
          ),
        ],
      };
    },
  ]);

  const appStore = useAppStore();
  const editorRef = ref<ExposeParam>();
  const articleFormRef = ref<FormInstance>();
  const text = ref('');
  const route = useRoute();
  const { articleId } = route.params;
  const isDark = computed(() => appStore.theme === 'dark');
  const { isFullscreen } = useFullscreen();
  const insert = (generator: InsertContentGenerator) => {
    editorRef.value?.insert(generator);
  };
  const articleTitle = ref(useDateFormat(new Date(), 'YYYY-MM-DD'));

  const rules = reactive({
    categoryName: [
      { required: true, message: '文章分类不能为空', trigger: 'blur' },
    ],
    tagNameList: [
      { required: true, message: '文章标签不能为空', trigger: 'blur' },
    ],
  });

  const formData = reactive({
    addOrUpdate: false,
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
    articleForm: {
      id: undefined,
      articleCover: '',
      articleTitle: articleTitle.value,
      articleContent: '',
      categories: [],
      tagNameList: [],
      articleType: 1,
      isTop: 0,
      isRecommend: 0,
      status: 1,
    } as ArticleForm,
    categoryList: [],
    tagList: [],
    categoryName: '',
    tagName: '',
  });
  const {
    addOrUpdate,
    typeList,
    articleForm,
    categoryList,
    tagList,
    categoryName,
    tagName,
  } = toRefs(formData);
  const openModel = (): boolean => {
    if (articleForm.value.articleTitle.trim() === '') {
      Message.error('文章标题不能为空');
      return false;
    }
    if (articleForm.value.articleContent.trim() === '') {
      Message.error('文章内容不能为空');
      return false;
    }
    articleFormRef.value?.clearValidate();
    // getCategoryOption().then(({ data }) => {
    //   categoryList.value = data.data;
    // });
    // getTagOption().then(({ data }) => {
    //   tagList.value = data.data;
    // });
    addOrUpdate.value = true;
    return true;
  };

  const submitForm = () => {
    articleFormRef.value?.validate((errors) => {
      if (!errors) {
        if (articleForm.value.id) {
          updateArticle(articleForm.value).then(({ data }) => {
            if (data.flag) {
              Notification.success({
                title: '成功',
                content: data.msg,
              });
              router.push({ path: '/article/list' });
              articleForm.value = {
                id: undefined,
                articleCover: '',
                articleTitle: articleTitle.value,
                articleContent: '',
                categories: [],
                tagNameList: [],
                articleType: 1,
                isTop: 0,
                isRecommend: 0,
                status: 1,
              };
            }
            addOrUpdate.value = false;
          });
        } else {
          addArticle(articleForm.value).then(({ data }) => {
            if (data.flag) {
              Notification.success({
                title: '成功',
                content: data.msg,
              });
              router.push({ path: '/article/list' });
              articleForm.value = {
                id: undefined,
                articleCover: '',
                articleTitle: articleTitle.value,
                articleContent: '',
                categories: [],
                tagNameList: [],
                articleType: 1,
                isTop: 0,
                isRecommend: 0,
                status: 1,
              };
            }
            addOrUpdate.value = false;
          });
        }
      }
    });
  };

  const handleSuccess = (fileItem: FileItem) => {
    articleForm.value.articleCover = fileItem.response.data;
  };

  onMounted(() => {
    if (articleId) {
      editArticle(articleId as string).then(({ data }) => {
        if (data.flag) {
          articleForm.value = data.data;
        } else {
          router.push({ path: '/article/list' });
        }
      });
    }
  });

  const options = [
    {
      value: '计算机',
      label: '计算机',
      children: [
        {
          value: '计算机网络',
          label: '计算机网络',
          children: [
            {
              value: '习题',
              label: '习题',
            },
          ],
        },
        {
          value: '大数据',
          label: '大数据',
        },
        {
          value: '安卓',
          label: '安卓',
        },
        {
          value: '编程',
          label: '编程',
          children: [
            {
              value: 'Flutter',
              label: 'Flutter',
            },
            {
              value: 'Java',
              label: 'Java',
            },
          ],
        },
      ],
    },
  ];
</script>

<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <div class="operation-container">
      <a-input
        v-model="articleForm.articleTitle"
        placeholder="请输入文章标题"
      />
      <a-button status="danger" style="margin-left: 10px" @click="openModel"
        >发布文章
      </a-button>
    </div>
    <!-- 文章内容 -->
    <md-editor
      ref="editorRef"
      v-model="articleForm.articleContent"
      :theme="isDark ? 'dark' : 'light'"
      :page-fullscreen="isFullscreen"
      class="md-container"
      :completions="completions"
      placeholder="请输入文章内容..."
    >
    </md-editor>
    <!-- 发布或修改对话框 -->
    <a-modal :visible="addOrUpdate">
      <template #title> 发布文章</template>
      <a-form
        ref="articleFormRef"
        label-width="80px"
        :model="articleForm"
        :rules="rules"
      >
        <!-- 文章分类 -->
        <a-form-item label="文章分类" prop="categoryName">
          <a-cascader
            v-model="articleForm.categories"
            multiple
            path-mode
            :options="options"
            :style="{ width: '320px' }"
            placeholder="Please select ..."
          >
          </a-cascader>
        </a-form-item>
        <!-- 文章标签 -->
        <a-form-item label="文章标签" prop="tagNameList">
          <a-tag
            v-for="(item, index) of articleForm.tagNameList"
            :key="index"
            style="margin-right: 1rem"
            >{{ item }}
          </a-tag>
          <a-popover
            v-if="articleForm.tagNameList.length < 3"
            placement="bottom-start"
            width="460"
            trigger="click"
          >
            <template #content>
              <div class="popover-title">标签</div>
              <!-- 搜索框 -->
              <a-auto-complete></a-auto-complete>
            </template>
            <a-button status="success" plain>添加标签</a-button>
          </a-popover>
        </a-form-item>
        <!-- 文章类型 -->
        <a-form-item label="文章类型" prop="articleType">
          <a-select v-model="articleForm.articleType" placeholder="请选择类型">
            <a-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </a-select>
        </a-form-item>
        <!-- 缩略图 -->
        <a-form-item label="缩略图" prop="articleCover">
          <a-upload
            draggable
            accept="image/*"
            action="/api/article/upload"
            @success="handleSuccess"
          >
            <img
              v-if="articleForm.articleCover"
              :src="articleForm.articleCover"
              width="360"
            />
          </a-upload>
        </a-form-item>
        <!-- 置顶 -->
        <a-form-item label="置顶" prop="isTop">
          <a-switch
            v-model="articleForm.isTop"
            :checked-value="1"
            :unchecked-value="0"
          ></a-switch>
        </a-form-item>
        <!-- 推荐 -->
        <a-form-item label="推荐" prop="isRecommend">
          <a-switch
            v-model="articleForm.isRecommend"
            :checked-value="1"
            :unchecked-value="0"
          ></a-switch>
        </a-form-item>
        <!-- 发布形式 -->
        <a-form-item label="发布形式" prop="status">
          <a-radio-group v-model="articleForm.status">
            <a-radio :value="1">公开</a-radio>
            <a-radio :value="2">私密</a-radio>
            <a-radio :value="3">草稿</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
      <template #footer>
        <div class="dialog-footer">
          <a-button
            v-if="articleForm.status != 3"
            status="danger"
            @click="submitForm"
            >发布文章
          </a-button>
          <a-button v-else status="danger" @click="submitForm"
            >保存草稿
          </a-button>
          <a-button @click="addOrUpdate = false">取 消</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<style scoped lang="less">
  .app-container {
    :deep(.md-container) {
      --grey-0: #fff;
      --grey-1: #fdfdfd;
      --grey-2: #f7f7f7;
      --grey-3: #eff2f3;
      --grey-4: #ccc;
      --grey-5: #999;
      --grey-6: #666;
      --grey-7: #333;
      --grey-8: #222;
      --grey-9: #000;
      --grey-1-a0: rgba(253, 253, 253, 0);
      --grey-1-a7: rgba(253, 253, 253, 0.7);
      --grey-1-a5: rgba(253, 253, 253, 0.5);
      --grey-1-a3: rgba(253, 253, 253, 0.3);
      --grey-9-a1: rgba(0, 0, 0, 0.1);
      --grey-9-a5: rgba(0, 0, 0, 0.5);
      --grey-2-a0: rgba(247, 247, 247, 0);
      --color-pink-light: #ffe6fa;
      --color-cyan-light: #e3fdf5;
      --color-red: #e9546b;
      --color-pink: #ed6ea0;
      --color-orange: #ec8c69;
      --color-yellow: #eab700;
      --color-green: #0a7426;
      --color-aqua: #3e999f;
      --color-blue: #38a1db;
      --color-purple: #9d5b8b;
      --color-grey: #869194;
      --color-red-a1: rgba(233, 84, 107, 0.1);
      --color-red-a3: rgba(233, 84, 107, 0.3);
      --color-pink-a3: rgba(237, 110, 160, 0.3);
      --color-pink-light-a3: rgba(255, 230, 250, 0.3);
      --color-pink-light-a5: rgba(255, 230, 250, 0.5);
      --color-pink-light-a7: rgba(255, 230, 250, 0.7);
      --body-bg-shadow: var(--grey-2);
      --box-bg-shadow: var(--grey-9-a1);
      --text-color: var(--grey-7);
      --header-text-color: var(--grey-0);
      --primary-color: var(--color-red);
      --nav-bg: linear-gradient(
        -225deg,
        var(--color-cyan-light) 0,
        var(--color-pink-light) 100%
      );

      .note {
        border-radius: 0.1875rem;
        margin: 1rem 0;
        padding: 1rem;
        position: relative;

        background: var(--note-bg, var(--grey-2));
        color: var(--grey-6);
        border-left: 0.25rem solid var(--note-border, var(--grey-4));
        font-size: 0.875em;

        padding-left: 2.5rem;

        --primary-color: var(--note-text);

        &::before {
          position: absolute;
          left: 0.5rem;
          top: calc(50% - 1.5rem);
          font-size: 1.5rem;
          color: var(--note-text, var(--grey-6));
        }
      }

      .primary {
        --note-border: #cda0c7;
        --note-bg: #fdf8ff;
        --note-text: #8a51c0;
        --note-hover: #935aca;
      }

      .info {
        --note-border: #8fa4dc;
        --note-bg: #f1f9ff;
        --note-text: #1d4974;
        --note-hover: #1d5fa0;
      }

      .success {
        --note-border: #a3c293;
        --note-bg: #fcfff5;
        --note-text: #2c662d;
        --note-hover: #3b883c;
      }

      .warning {
        --note-border: #c9ba9b;
        --note-bg: #fffbeb;
        --note-text: #947600;
        --note-hover: #ccb045;
      }

      .danger {
        --note-border: #f4b3c1;
        --note-bg: #fff2f5;
        --note-text: #cc0f35;
        --note-hover: #f14668;
      }

      .red {
        color: var(--color-red);
      }

      .pink {
        color: var(--color-pink);
      }

      .orange {
        color: var(--color-orange);
      }

      .yellow {
        color: var(--color-yellow);
      }

      .green {
        color: var(--color-green);
      }

      .aqua {
        color: var(--color-aqua);
      }

      .blue {
        color: var(--color-blue);
      }

      .purple {
        color: var(--color-purple);
      }

      .grey {
        color: var(--color-grey);
      }

      ::-webkit-details-marker {
        display: none;
      }

      details {
        list-style-type: none;

        summary {
          outline: 0;
          cursor: pointer;
          padding: 0.625rem;
          background: var(--note-bg, none);
          border-radius: 0.25rem;
          transition: all 0.4s ease;

          ::before {
            font-weight: 400;
            color: var(--grey-4);
            margin-right: 0.5rem;
          }
        }

        > div {
          padding: 0.625rem;
        }
      }

      .danger,
      .info,
      .primary,
      .success,
      .warning {
        margin: 0 0 0.8rem;
      }

      .danger summary,
      .info summary,
      .primary summary,
      .success summary,
      .warning summary {
        color: var(--note-text);
      }

      .danger summary::before,
      .info summary::before,
      .primary summary::before,
      .success summary::before,
      .warning summary::before {
        color: var(--note-text);
      }

      [open] {
        background: var(--note-bg, none);
        border-radius: 0.25rem;
        color: var(--grey-6);
      }

      [open] summary {
        background: var(--note-hover, var(--grey-2));
        border-radius: 0.25rem;
      }

      [open] summary::before {
        color: var(--primary-color);
      }

      [open] > div {
        margin: 0 0 0.8rem;
      }

      [open].danger,
      [open].info,
      [open].primary,
      [open].success,
      [open].warning {
        color: var(--note-text);
      }

      [open].danger > summary,
      [open].info > summary,
      [open].primary > summary,
      [open].success > summary,
      [open].warning > summary {
        color: #fff;
        border-radius: 0.25rem 0.25rem 0 0;
      }

      [open].danger > summary::before,
      [open].info > summary::before,
      [open].primary > summary::before,
      [open].success > summary::before,
      [open].warning > summary::before {
        color: #fff;
      }
    }
  }

  body[arco-theme='dark'] {
    .app-container {
      :deep(.md-container) {
        --grey-0: #222;
        --grey-1: #21252b;
        --grey-2: #363636;
        --grey-3: #444;
        --grey-4: #666;
        --grey-5: #aaa;
        --grey-6: #ccc;
        --grey-7: #ddd;
        --grey-8: #eee;
        --grey-9: #f7f7f7;
        --grey-1-a7: rgba(34, 34, 34, 0.7);
        --grey-1-a5: rgba(34, 34, 34, 0.5);
        --grey-1-a3: rgba(34, 34, 34, 0.3);
        --grey-1-a0: rgba(34, 34, 34, 0);
        --grey-9-a1: rgba(51, 51, 51, 0.1);
        --grey-2-a0: rgba(54, 54, 54, 0);
        --color-pink-light: #322d31;
        --color-cyan-light: #2d3230;
        --color-red: rgba(237, 118, 137, 0.9);
        --color-pink: rgba(241, 139, 179, 0.8);
        --color-orange: rgba(240, 163, 135, 0.8);
        --color-yellow: #ffe175;
        --color-green: #86c59d;
        --color-aqua: #97d3d6;
        --color-blue: #9cd0ed;
        --color-purple: #cfacc5;
        --color-grey: #c3c8ca;
        --body-bg-shadow: #000;
        --box-bg-shadow: #000;
        --text-color: var(--grey-5);
        --header-text-color: var(--grey-9);

        .primary {
          --note-border: rgba(123, 96, 119, 0.8);
          --note-bg: rgba(50, 49, 50, 0.8);
          --note-text: rgba(161, 116, 205, 0.8);
          --note-hover: rgba(117, 72, 161, 0.8);
        }

        .info {
          --note-border: rgba(85, 98, 132, 0.8);
          --note-bg: rgba(48, 49, 50, 0.8);
          --note-text: rgba(109, 164, 219, 0.8);
          --note-hover: rgba(39, 127, 214, 0.8);
        }

        .success {
          --note-border: rgba(97, 116, 88, 0.8);
          --note-bg: rgba(50, 50, 48, 0.8);
          --note-text: rgba(128, 200, 129, 0.8);
          --note-hover: rgba(41, 95, 42, 0.8);
        }

        .warning {
          --note-border: rgba(120, 111, 93, 0.8);
          --note-bg: rgba(50, 50, 46, 0.8);
          --note-text: rgba(220, 176, 0, 0.8);
          --note-hover: rgba(163, 140, 55, 0.8);
        }

        .danger {
          --note-border: rgba(146, 107, 115, 0.8);
          --note-bg: rgba(50, 48, 48, 0.8);
          --note-text: rgba(239, 38, 79, 0.8);
          --note-hover: rgba(168, 49, 72, 0.8);
        }

        .index.wrap .card .message .btn,
        .overview .menu .item,
        .sidebar .tab li,
        [data-background-image],
        img {
          transition: all 0.2s ease-in-out 0s;
          opacity: 0.75;
        }

        .index.wrap .card .message .btn:hover,
        .overview .menu .item:hover,
        .sidebar .tab li:hover,
        [data-background-image]:hover,
        img:hover {
          opacity: 0.9;
        }

        #imgs::before {
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }

  .operation-container {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .md-container {
    min-height: 300px;
    height: calc(100vh - 150px);
  }

  .popover-title {
    margin-bottom: 1rem;
    text-align: center;
  }

  .popover-container {
    margin-top: 1rem;
    height: 260px;
    overflow-y: auto;
  }

  .category-item {
    cursor: pointer;
    padding: 0.6rem 0.5rem;
  }

  .category-item:hover {
    background-color: #f0f9eb;
    color: #67c23a;
  }

  .tag-item {
    margin-right: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .tag-item-select {
    margin-right: 1rem;
    margin-bottom: 1rem;
    cursor: not-allowed;
    color: #ccccd8 !important;
  }
</style>
