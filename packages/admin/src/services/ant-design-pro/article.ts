import {request} from "@umijs/max";

export async function saveArticle(params: {
  content: string
}, options?: { [key: string]: any }) {
  return request('/v1/article/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}
