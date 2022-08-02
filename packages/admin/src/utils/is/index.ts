/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`;
}
/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
    return val !== null && is(val, 'Object');
};

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
    return is(val, 'Function') || is(val, 'AsyncFunction');
}
/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
    return is(val, 'String');
}

/**
 * 判断是否 url
 * */
export function isUrl(url: string) {
    return /^(http|https):\/\//g.test(url);
}