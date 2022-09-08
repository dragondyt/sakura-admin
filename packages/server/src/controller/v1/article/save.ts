import BaseController from "../../rest";
export default class Save extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/${this.config('storage')}`, 'Article');
    }

    protected async postAction(): Promise<void> {
        const {content, password, type} = this.post();
        await this.modelInstance.add({
            content
        });
        return this.success(null, "保存成功");
    }
}