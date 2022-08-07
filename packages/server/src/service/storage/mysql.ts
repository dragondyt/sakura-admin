import Base, {CountOption, SelectOption} from "./base";

export default class Mysql extends Base<any, any> {
    private parseWhere(filter: Record<string, any>) {
        const where: Record<string, any> = {};

        if (think.isEmpty(filter)) {
            return where;
        }

        for (const k of Object.keys(filter)) {
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

    async select(where: Record<string, any>, {desc, limit, offset, field}: SelectOption = {}) {
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
            // @ts-ignore
            instance.field(field);
        }

        const data = await instance.select();

        // @ts-ignore
        return data.map(({id, ...cmt}) => ({...cmt, objectId: id}));
    }

    async count(where = {}, {group}: CountOption = {}): Promise<any> {
        const instance = this.model(this.tableName);

        instance.where(this.parseWhere(where));
        if (!group) {
            // @ts-ignore
            return instance.count();
        }

        // @ts-ignore
        instance.field([...group, 'COUNT(*) as count']);
        // @ts-ignore
        instance.group(group);

        return instance.select();
    }

    async add(data: any) {
        if (data.objectId) {
            data.id = data.objectId;
            delete data.objectId;
        }

        const instance = this.model(this.tableName);
        const id = await instance.add(data);

        return {...data, objectId: id};
    }

    async update(data: any, where: Record<string, any>) {
        const list: any[] = await this.model(this.tableName)
            .where(this.parseWhere(where))
            .select();

        return Promise.all(
            list.map(async (item) => {
                const updateData = typeof data === 'function' ? data(item) : data;

                await this.model(this.tableName)
                    .where({id: item.id})
                    .update(updateData);

                return {...item, ...updateData};
            })
        );
    }

    async delete(where: Record<string, any>) {
        const instance = this.model(this.tableName);

        return instance.where(this.parseWhere(where)).delete();
    }
}