import BaseController from "../../rest";
import helper from 'think-helper';
import {generateToken} from "../../../utils/jwt";
export default class Login extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/${this.config('storage')}`, 'Users');
    }
    protected async getAction(): Promise<void> {
        return this.success("dgs");
    }
    protected async postAction(): Promise<void> {
        const { username, password } = this.post();
        const user = await this.modelInstance.select({ email: username });
        if (think.isEmpty(user) || /^verify:/i.test(user[0].type)) {
            return this.fail(50000, "账号或者密码错误");
        }
        return this.success({
            ...user[0],
            password: undefined,
            mailMd5: helper.md5(user[0].email.toLowerCase()),
            token: await generateToken(),
        });
    }
}