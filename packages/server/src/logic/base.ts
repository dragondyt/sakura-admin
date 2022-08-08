import {log} from "next-axiom";

export default class BaseLogic extends think.Logic {
    id: string;
    resource: string;
    modelInstance: string;
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
        const { authorization } = this.ctx.req.headers;
        const { state } = this.get();
        log.debug("authorization", authorization);
        if (!authorization && !state) {
            return;
        }
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