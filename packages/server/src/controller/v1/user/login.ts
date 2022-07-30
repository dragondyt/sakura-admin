import BaseRest from '../../rest';
import helper from 'think-helper';
// @ts-ignore
import * as jwt from 'jsonwebtoken';
export default class extends BaseRest {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/mongodb`, 'users');
    }
    async postAction(): Promise<void> {
        const { email, password } = this.post();
        const user = await this.modelInstance.select({ email });
        if (think.isEmpty(user) || /^verify:/i.test(user[0].type)) {
            return this.fail("000");
        }
        return this.success({
            ...user[0],
            password: undefined,
            mailMd5: helper.md5(user[0].email.toLowerCase()),
            token: jwt.sign(user[0].email, this.config('jwtKey')),
        });
    }
}
