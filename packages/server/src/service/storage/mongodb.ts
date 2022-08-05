import Base from "./base";
import {ObjectId} from "mongodb";
interface MongodbInstance {
    order(order: string): void;
    limit(offset: number, limit: number): void;
    field(field: any): void;
    select(): Promise<any>;
    add(entity: any): Promise<any>;
}
export default class Mongodb extends Base<MongodbInstance> {
    public async add(entity: any): Promise<any> {
        if (entity.objectId) {
            entity._id = entity.objectId;
            delete entity.objectId;
        }
        const instance = this.mongo(this.tableName);
        const id = await instance.add(entity);
        return { ...entity, objectId: id.toString() };
    }
    async select(where: any, {desc, limit, offset, field}: any = {}): Promise<any> {
        const instance = this.mongo(this.tableName);
        this.where(instance, where);
        if (desc) {
            instance.order(`${desc} DESC`);
        }
        if (limit || offset) {
            instance.limit(offset || 0, limit);
        }
        if (field) {
            instance.field(field);
        }
        const data = await instance.select();
        return data.map(({ _id, ...cmt }: any) => ({
            ...cmt,
            objectId: _id.toString(),
        }));
    }

    private where(instance: any, where: any) {
        const filter = this.parseWhere(where);

        if (!where._complex) {
            return instance.where(filter);
        }

        const filters = [];

        for (const k in where._complex) {
            if (k === '_logic') {
                continue;
            }
            filters.push({
                ...this.parseWhere({ [k]: where._complex[k] }),
                ...filter,
            });
        }

        return instance.where({
            // $or, $and, $not, $nor
            [`$${where._complex._logic}`]: filters,
        });
    }

    private parseWhere(where: Record<string, any>) {
        if (think.isEmpty(where)) {
            return {};
        }
        const filter: Record<string, any> = {};
        const parseKey = (k: string) => (k === 'objectId' ? '_id' : k);

        for (const k in where) {
            if (k === '_complex') {
                continue;
            }
            if (think.isString(where[k])) {
                filter[parseKey(k)] = {
                    $eq: k === 'objectId' ? new ObjectId(where[k]) : where[k],
                };
                continue;
            }
            if (where[k] === undefined) {
                filter[parseKey(k)] = { $eq: null };
            }
            if (Array.isArray(where[k])) {
                if (where[k][0]) {
                    const handler = where[k][0].toUpperCase();

                    switch (handler) {
                        case 'IN':
                            if (k === 'objectId') {
                                filter[parseKey(k)] = { $in: where[k][1].map(ObjectId) };
                            } else {
                                filter[parseKey(k)] = {
                                    $regex: new RegExp(`^(${where[k][1].join('|')})$`),
                                };
                            }
                            break;
                        case 'NOT IN':
                            filter[parseKey(k)] = {
                                $nin:
                                    k === 'objectId' ? where[k][1].map(ObjectId) : where[k][1],
                            };
                            break;
                        case 'LIKE': {
                            const first = where[k][1][0];
                            const last = where[k][1].slice(-1);
                            let reg;

                            if (first === '%' && last === '%') {
                                reg = new RegExp(where[k][1].slice(1, -1));
                            } else if (first === '%') {
                                reg = new RegExp(where[k][1].slice(1) + '$');
                            } else if (last === '%') {
                                reg = new RegExp('^' + where[k][1].slice(0, -1));
                            }

                            if (reg) {
                                filter[parseKey(k)] = { $regex: reg };
                            }
                            break;
                        }
                        case '!=':
                            filter[parseKey(k)] = { $ne: where[k][1] };
                            break;
                        case '>':
                            filter[parseKey(k)] = { $gt: where[k][1] };
                            break;
                    }
                }
            }
        }
        return filter;
    }
}