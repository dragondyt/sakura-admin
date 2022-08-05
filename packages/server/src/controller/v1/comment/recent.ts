import BaseController from "../../rest";

export default class Comment extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/${this.config('storage')}`, 'Comment');
    }

    async getAction() {
        const {count} = this.get();
        const where: Record<string, any> = {};
        const {userInfo} = this.ctx.state;
        if (think.isEmpty(userInfo) || this.config('storage') === 'deta') {
            where.status = ['NOT IN', ['waiting', 'spam']];
        } else {
            where._complex = {
                _logic: 'or',
                status: ['NOT IN', ['waiting', 'spam']],
                user_id: userInfo.objectId,
            };
        }
        const comments = await this.modelInstance.select(where, {
            desc: 'insertedAt',
            limit: count,
            field: [
                'status',
                'comment',
                'insertedAt',
                'link',
                'mail',
                'nick',
                'url',
                'pid',
                'rid',
                'ua',
                'ip',
                'user_id',
                'sticky',
                'like',
            ],
        });
        return this.success(comments);
    }
}