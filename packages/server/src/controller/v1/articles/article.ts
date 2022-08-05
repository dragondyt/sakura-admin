import BaseController from "../../rest";
import {log} from "next-axiom";

export default class Article extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/mongodb`, 'articles');
    }

    protected async postAction(): Promise<void> {
        const {content} = this.post();
        return this.success(await this.modelInstance.add({
            content
        }));
    }
}