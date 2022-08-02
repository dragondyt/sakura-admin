export default abstract  class Base<M = any> extends think.Service {
    tableName: string;
    mongo: (tableName: string) => M;
    protected constructor(tableName: string) {
        super();
        this.tableName = tableName;
    }
    public abstract select<T>(where: any, {}?: any): Promise<T>;
}