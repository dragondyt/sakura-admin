export interface SelectOption {
    desc?: string;
    limit?: number;
    offset?: number;
    field?: string[];
}
export interface CountOption {
    group?: string[];
}
export default abstract class Base<M = any, T = any> extends think.Service {
    tableName: string;
    mongo: (tableName: string) => M;
    protected constructor(tableName: string) {
        super();
        this.tableName = tableName;
    }
    public abstract select(where: any, {desc, limit, offset, field}?: SelectOption): Promise<T>;
    public abstract add(entity: T, options?: any): Promise<T>;
    public abstract update(entity: T, where?: Record<string, any>): Promise<T>;
    public abstract delete(where: Record<string, any>): Promise<number>;
    public abstract count(where: Record<string, any>, options?: CountOption): Promise<any>;
}