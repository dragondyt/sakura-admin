import {request} from "@umijs/max";

export async function saveArticle(params: {
  content: string
}) {
  return request('/v1/article/save', {
    method: 'POST',
    body: params,
  });
}
