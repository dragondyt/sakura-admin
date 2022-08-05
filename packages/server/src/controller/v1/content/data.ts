import BaseController from "../../rest";
import {log} from "next-axiom";
export default class Data extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
    }
    protected async getAction(): Promise<void> {
        return this.success();
    }
}