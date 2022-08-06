export default abstract class Base<M = any, T = any > extends think.Service {
    tableName: string;
    mongo: (tableName: string) => M;
    protected constructor(tableName: string) {
        super();
        this.tableName = tableName;
    }

    public abstract select(where: any, {}?: any): Promise<T>;

    public abstract add(entity: T, options?: any): Promise<T>;

    public abstract update(entity: T, where?: Record<string, any>): Promise<T>;
}