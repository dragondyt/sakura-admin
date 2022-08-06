import Base from "./base";

export default class Mysql extends Base<any, any> {
    async add(data: any, options?: any): Promise<any> {
        if (data.objectId) {
            data.id = data.objectId;
            delete data.objectId;
        }
        const instance = this.model(this.tableName);
        const id = await instance.add(data);

        return {...data, objectId: id};
    }

    async select(where: any, {desc, limit, offset, field}: any = {}): Promise<any> {
        const instance = this.model(this.tableName);
        instance.where(this.parseWhere(where));
        if (desc) {
            instance.order(`${desc} DESC`);
        }
        if (limit || offset) {
            instance.limit(offset || 0, limit);
        }
        if (field) {
            field.push('id');
            instance.field(field);
        }

        const data = await instance.select();

        // @ts-ignore
        return data.map(({id, ...cmt}) => ({...cmt, objectId: id}));
    }

    update(entity: any, where: Record<string, any> | undefined): Promise<any> {
        return Promise.resolve(undefined);
    }

    private parseWhere(filter: Record<string, any>) {
        const where: Record<string, any> = {};

        if (think.isEmpty(filter)) {
            return where;
        }

        // tslint:disable-next-line:forin
        for (const k in filter) {
            if (k === 'objectId') {
                where.id = filter[k];
                continue;
            }

            if (k === '_complex') {
                where[k] = this.parseWhere(filter[k]);
                continue;
            }

            if (filter[k] === undefined) {
                where[k] = null;
                continue;
            }

            if (Array.isArray(filter[k])) {
                if (filter[k][0] === 'IN' && !filter[k][1].length) {
                    continue;
                }
                if (think.isDate(filter[k][1])) {
                    filter[k][1] = think.datetime(filter[k][1]);
                }
            }

            where[k] = filter[k];
        }

        return where;
    }
}