import BaseController from "../../rest";
import helper from 'think-helper';
import {generateToken} from "../../../utils/jwt";
import {generateKeyPair, generateSecret, SignJWT} from "jose";
export default class Login extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/mongodb`, 'users');
    }
    protected async getAction(): Promise<void> {
        return this.success("dgs");
    }
    protected async postAction(): Promise<void> {
        const { email, password } = this.post();
        const user = await this.modelInstance.select({ email });
        if (think.isEmpty(user) || /^verify:/i.test(user[0].type)) {
            return this.fail("000");
        }
        return this.success({
            ...user[0],
            password: undefined,
            mailMd5: helper.md5(user[0].email.toLowerCase()),
            token: await generateToken(),
        });
    }
}