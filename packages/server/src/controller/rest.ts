import Base from "../service/storage/base";

export default class BaseController extends think.Controller {
    static get _REST() {
        return true;
    }
    static get _method() {
        return 'method';
    }
    post(): any {
        return super.post();
    }

    resource: string | undefined;
    id: string;
    modelInstance: Base | undefined;

    constructor(ctx: ThinkContext) {
        super(ctx);
        this.resource = this.getResource();
        this.id = this.getId();
    }

    __before() {
    }

    getResource() {
        return this.ctx.controller.split('/').pop();
    }

    getId() {
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

    /**
     * put resource
     * @return {Promise} []
     */
    protected async postAction(): Promise<void> {
        return this.fail("000", '接口不存在');
    }

    protected async getAction(): Promise<void> {
        return this.fail("000", '接口不存在');
    }

    __call() {

    }
}
