import BaseController from "../../rest";
import {generateToken} from "../../../utils/jwt";
import {compareSync} from 'bcryptjs';

export default class Login extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/${this.config('storage')}`, 'Users');
    }
    protected async postAction(): Promise<void> {
        const {username, password} = this.post();
        const user = await this.modelInstance.select({email: username});
        if (think.isEmpty(user) || /^verify:/i.test(user[0].type)) {
            return this.fail(50000, "账号或者密码错误");
        }
        if (!compareSync(password, user[0].password)) {
            return this.fail(50000, "账号或者密码错误");
        }
        return this.success({
            token: await generateToken(user[0].email),
        });
    }
}