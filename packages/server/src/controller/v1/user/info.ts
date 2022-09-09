import BaseController from "../../rest";

export default class Info extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
    }
    protected async getAction(): Promise<void> {
        return this.success(this.ctx.state.userInfo);
    }
}