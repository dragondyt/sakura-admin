import {CountOption, SelectOption} from "./base";
import Mysql from "./mysql";

export default class PostgreSQL extends Mysql {
    model(tableName: string): any {
        return super.model(tableName.toLowerCase());
    }

    public add(entity: any, options?: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    count(where: Record<string, any>, options: CountOption = {}): Promise<any> {
        return Promise.resolve(undefined);
    }

    delete(where: Record<string, any>): Promise<number> {
        return Promise.resolve(0);
    }

    async select(where: Record<string, any>, options: SelectOption = {}): Promise<any> {
        const lowerWhere = {};

        for (const i of Object.keys(where)) {
            lowerWhere[i.toLowerCase()] = where[i];
        }

        if (options && options.desc) {
            options.desc = options.desc.toLowerCase();
        }

        if (Array.isArray(options.field)) {
            options.field = options.field.map((field) => field.toLowerCase());
        }

        const data = await super.select(where, options);

        // @ts-ignore
        return data.map(({insertedat, createdat, updatedat, ...item}) => {
            const mapFields = {
                insertedAt: insertedat,
                createdAt: createdat,
                updatedAt: updatedat,
            };

            for (const field in mapFields) {
                if (!mapFields[field]) {
                    continue;
                }
                item[field] = mapFields[field];
            }

            return item;
        });
    }

    update(entity: any, where: Record<string, any>): Promise<any> {
        return Promise.resolve(undefined);
    }

}