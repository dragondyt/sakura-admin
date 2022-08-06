import Base from "./base";

export default class Mysql extends Base<any, any> {
    add(entity: any, options?: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    select(where: any, {}: any): Promise<any> {
        const instance = this.model(this.tableName);
        return Promise.resolve(undefined);
    }

    update(entity: any, where: Record<string, any> | undefined): Promise<any> {
        return Promise.resolve(undefined);
    }

}