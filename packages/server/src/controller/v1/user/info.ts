import BaseController from "../../rest";
import {log} from "next-axiom";
export default class Info extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
    }
    protected async postAction(): Promise<void> {
        // 验证token
        const token = await this.header("Authorization") || "test";
        log.debug(token);
        if (!token) {
            return this.fail(50008, "未登录");
        } else {
            return this.success({
                email: 'wangliqun@email.com'
            });
        }
    }
}