import BaseController from "../../rest";
export default class Test extends BaseController {
    constructor(ctx: ThinkContext) {
        super(ctx);
        this.modelInstance = this.service(`storage/github`, 'Users');
    }
    protected async getAction(): Promise<void> {
        await this.modelInstance.add(`{
  "name": "blog",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@dragondyt/sakura-server": "latest"
  },
  "devDependencies": {
    "@vercel/node": "^2.5.2",
    "typescript": "^4.7.4"
  }
}`);
        return this.success();
    }
}