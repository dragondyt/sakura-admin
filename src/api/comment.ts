import axios from "axios";
import {PageResult} from "@/api/article";

export interface Comment {
    s: string
};
export function getCommentList(params: any) {
    return axios.get<PageResult<Comment[]>>('/api/comment/list', { params });
}
