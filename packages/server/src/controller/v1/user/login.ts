import BaseController from "../../rest";
export default class Login extends BaseController {
    protected async getAction(): Promise<void> {
        return this.success("dgs");
    }
}