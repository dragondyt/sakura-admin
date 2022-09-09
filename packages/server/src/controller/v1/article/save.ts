import BaseController from "../../rest";
export default class Save extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/${this.config('storage')}`, 'Article');
    }

    protected async postAction(): Promise<void> {
        const {content} = this.post();
        think.logger.debug("保存文章");
        think.logger.info(content);
        await this.modelInstance.add({
            content
        });
        return this.success(null, "保存成功");
    }
}