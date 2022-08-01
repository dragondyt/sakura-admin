export default abstract  class Base extends think.Service {
    tableName: string;
    mongo: any;
    protected constructor(tableName: string) {
        super();
        this.tableName = tableName;
    }
    protected abstract select<T>(where: any, {}: any): Promise<T>;
}