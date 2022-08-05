import axios from "axios";

export default function saveArticle(data: any) {
    return axios.post<any>('/v1/articles/article', data);
}