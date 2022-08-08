import axios from "axios";

export default function listComment(data: any) {
    return axios.post<any>('/v1/comment/list', data);
}