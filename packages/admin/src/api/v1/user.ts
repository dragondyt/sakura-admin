import { http } from '@/utils/http/axios';
export interface BasicResponseModel<T = any> {
    errno: number;
    errmsg: string;
    data: T;
}

export function login(data: any) {
    return http.request<BasicResponseModel>(
        {
            url: 'v1/user/login',
            method: 'POST',
            data,
        },
        {
            isTransformResponse: false,
        }
    );
}


/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
    return http.request({
        url: '/v1/user/me',
        method: 'get',
    });
}
