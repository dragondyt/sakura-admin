import Base, { CountOption, SelectOption } from "./base";
import Git from "../../utils/git";
import {log} from "next-axiom";

export default class Github extends Base {
    git: Git;
    basePath: string;
    constructor(tableName: string) {
        super(tableName);
        const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_PATH } = process.env;
        this.git = new Git(GITHUB_REPO, GITHUB_TOKEN);
        this.basePath = GITHUB_PATH;
    }
    public select(where: any, option?: SelectOption): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public add(entity: any, options?: any): Promise<any> {
        log.debug('测试');
        return this.git.set("package.json", entity, entity);
    }
    public update(entity: any, where?: Record<string, any>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public delete(where: Record<string, any>): Promise<number> {
        throw new Error("Method not implemented.");
    }
    public count(where: Record<string, any>, options?: CountOption): Promise<any> {
        throw new Error("Method not implemented.");
    }
}