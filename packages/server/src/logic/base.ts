import {VerifyToken} from "../utils/jwt";
import {md5} from "think-helper";
import Base from "../service/storage/base";

export default class BaseLogic extends think.Logic {
    id: string;
    resource: string;
    modelInstance: Base;

    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(
            `storage/${this.config('storage')}`,
            'Users'
        );
        this.resource = this.getResource();
        this.id = this.getId();
    }

    async __before() {
        const referrer = this.ctx.referrer(true);
        this.ctx.state.userInfo = {};
        const {authorization} = this.ctx.req.headers;
        const {state} = this.get();
        if (!authorization && !state) {
            return this.ctx.throw(401);
        }
        const token = state || authorization.replace(/^Bearer /, '');
        const {payload} = await VerifyToken(token);
        const {email: userMail} = payload;
        if (think.isEmpty(userMail) || !think.isString(userMail)) {
            return;
        }
        const user = await this.modelInstance.select(
            {email: userMail}, {
                field: [
                    'id',
                    'email',
                    'url',
                    'display_name',
                    'type',
                    'github',
                    'twitter',
                    'facebook',
                    'google',
                    'weibo',
                    'qq',
                    'avatar',
                    '2fa',
                    'label',
                ]
            });
        const userInfo = user[0];
        let avatarUrl = userInfo.avatar
            ? userInfo.avatar
            : await think.service('avatar').stringify({
                mail: userInfo.email,
                nick: userInfo.display_name,
                link: userInfo.url,
            });
        const avatarProxy = think.config('avatarProxy');

        if (avatarProxy) {
            avatarUrl = avatarProxy + '?url=' + encodeURIComponent(avatarUrl);
        }
        userInfo.avatar = avatarUrl;
        userInfo.mailMd5 = md5(userInfo.email);
        this.ctx.state.userInfo = userInfo;
        this.ctx.state.token = token;
    }

    /**
     * put resource
     * @return {Promise} []
     */
    protected async postAction(): Promise<void> {

    }

    private getResource() {
        return this.ctx.controller.split('/').pop();
    }

    private getId(): string {
        const id = this.get('id');
        if (id && (think.isString(id) || think.isNumber(id))) {
            return id;
        }
        const last = this.ctx.path.split('/').slice(-1)[0];
        if (last !== this.resource) {
            return last;
        }
        return '';
    }
}