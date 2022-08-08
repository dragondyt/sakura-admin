import BaseController from "../../rest";

export default class List extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/${this.config('storage')}`, 'Comment');
    }

    async getAction() {
        return this.success([]);
    }
}