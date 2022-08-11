import BaseController from "../../rest";

export default class ListArticle extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(
            `storage/${this.config('storage')}`,
            'Comment'
        );
    }
    protected async getAction(): Promise<void> {
        const { page, pageSize, owner, status, keyword } = this.get();
        const where: Record<string, any> = {};
        const comments = await this.modelInstance.select(where, {
            desc: 'insertedAt',
            limit: pageSize,
            offset: Math.max((page - 1) * pageSize, 0),
        });
        return this.success({
            comments
        });
    }
}