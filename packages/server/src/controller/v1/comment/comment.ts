import BaseController from "../../rest";

export default class Comment extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/${this.config('storage')}`, 'Comment');
    }

    async getAction() {

    }
}