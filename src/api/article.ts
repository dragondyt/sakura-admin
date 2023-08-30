import axios from 'axios';

export interface ArticleRes {
  flag: number;
  msg: string;
}

/**
 * 文章表单
 */
export interface ArticleForm {
  /**
   * 文章id
   */
  id?: number;
  /**
   * 文章缩略图
   */
  articleCover: string;
  /**
   * 文章标题
   */
  articleTitle: string;
  /**
   * 文章内容
   */
  articleContent: string;
  /**
   * 文章类型 (1原创 2转载 3翻译)
   */
  articleType: number;
  /**
   * 分类名
   */
  categories: Array<string[]>;
  /**
   * 标签名
   */
  tagNameList: string[];
  /**
   * 是否置顶 (0否 1是)
   */
  isTop: number;
  /**
   * 是否推荐 (0否 1是)
   */
  isRecommend: number;
  /**
   * 状态 (1公开 2私密 3草稿)
   */
  status: number;
}

/**
 * 文章
 */
export interface Article {
  /**
   * 文章id
   */
  id: number;
  /**
   * 文章缩略图
   */
  articleCover: string;
  /**
   * 文章标题
   */
  articleTitle: string;
  /**
   * 文章类型 (1原创 2转载 3翻译)
   */
  articleType: number;
  /**
   * 是否置顶 (0否 1是)
   */
  isTop: number;
  /**
   * 是否推荐 (0否 1是)
   */
  isRecommend: number;
  /**
   * 是否删除 (0否 1是)
   */
  isDelete: number;
  /**
   * 状态 (1公开 2私密 3草稿)
   */
  status: number;
  /**
   * 点赞量
   */
  likeCount: number;
  /**
   * 浏览量
   */
  viewCount: number;
  /**
   * 文章分类名
   */
  categoryName: string;
  /**
   * 文章标签
   */
  tagVOList: any[];
  /**
   * 发表时间
   */
  createTime: string;
}

/**
 * 分页返回接口
 */
export interface PageResult<T> {
  /**
   * 分页结果
   */
  recordList: T;
  /**
   * 总数
   */
  count: number;
}

/**
 * 结果返回接口
 */
export interface Result<T> {
  /**
   * 返回状态
   */
  flag: boolean;
  /**
   * 状态码
   */
  code: number;
  /**
   * 返回信息
   */
  msg: string;
  /**
   * 返回数据
   */
  data: T;
}

export function addArticle(form: ArticleForm) {
  return axios.post<ArticleRes>('/api/article', form);
}

/**
 * 编辑文章
 * @param articleId 文章id
 */
export function editArticle(articleId: string) {
  return axios.get<Result<ArticleForm>>(
    `/api/article/${articleId}`
  );
}

/**
 * 修改文章
 * @param data 文章信息
 */
export function updateArticle(data: ArticleForm) {
  return axios.put<Result<null>>('/api/article/update', { data });
}

/**
 * 物理删除文章
 * @param data 文章id
 */
export function deleteArticle(data: string[]) {
  return axios.delete<Result<null>>('/api/article', {
    data: {
      ids: data,
    },
  });
}

/**
 * 查看文章列表
 * @param params 查询条件
 * @returns 文章列表
 */
export function getArticleList(params: any) {
  return axios.get<PageResult<Article[]>>('/api/article', { params });
}
