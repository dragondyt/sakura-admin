import BaseController from "../../rest";

export default class List extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(
            `storage/${this.config('storage')}`,
            'Comment'
        );
    }
    protected async getAction(): Promise<void> {
        const { current, pageSize, owner, status, keyword } = this.get();
        const where: Record<string, any> = {};
        const count = await this.modelInstance.count(where);
        const comments = await this.modelInstance.select(where, {
            desc: 'insertedAt',
            limit: pageSize,
            offset: Math.max((current - 1) * pageSize, 0),
        });
        return this.success({
            list: comments,
            total: count,
        });
    }
}