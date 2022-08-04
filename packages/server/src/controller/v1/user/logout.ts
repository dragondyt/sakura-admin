import BaseController from "../../rest";
import {log} from "next-axiom";
export default class Info extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
    }
    protected async postAction(): Promise<void> {
        return this.success();
    }
}