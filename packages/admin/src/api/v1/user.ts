import { http } from '@/utils/http/axios';
export interface BasicResponseModel<T = any> {
    code: number;
    message: string;
    result: T;
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