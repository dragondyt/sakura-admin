import axios from "axios";

export default function listComment(params: any) {
    return axios.get<any>('/v1/comment/list', {params});
}