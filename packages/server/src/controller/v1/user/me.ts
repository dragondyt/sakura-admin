import BaseController from "../../rest";

export default class Me extends BaseController {
    protected async getAction(): Promise<void> {
        return this.success({
            permissions: [{
                label: '主控台',
                value: 'dashboard_console',
            }]
        });
    }
}