export default class extends think.Service {
    tableName: string;
    mongo: any;
    constructor(tableName: string) {
        super();
        this.tableName = tableName;
    }
    async select(where: any, { desc, limit, offset, field }: any = {}): Promise<any> {
    }
}