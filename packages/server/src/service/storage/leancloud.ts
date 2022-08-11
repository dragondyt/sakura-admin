import Base, { CountOption } from "./base";
import {ACL, AuthOptions, Cloud, init, Object as AVObject, Queriable, Query} from "leancloud-storage";
import useMasterKey = Cloud.useMasterKey;

const {LEAN_ID, LEAN_KEY, LEAN_MASTER_KEY, LEAN_SERVER} = process.env;
if (LEAN_ID && LEAN_KEY && LEAN_MASTER_KEY) {
    useMasterKey();
    init({
        appId: LEAN_ID,
        appKey: LEAN_KEY,
        masterKey: LEAN_MASTER_KEY,
        serverURL: LEAN_SERVER,
    });
}

type LeanObjBase = Queriable & {
    status: string;
    user_id: string;
    mail: string;
};
export default class LeanCloud extends Base<any, LeanObjBase> {
    public delete(where: Record<string, any>): Promise<number> {
        throw new Error("Method not implemented.");
    }
    public async count(where: Record<string, any>, options?: CountOption & AuthOptions): Promise<any> {

        const instance = this.where(this.tableName, where);

        if (!options.group) {
            return instance.count(options).catch((e) => {
                if (e.code === 101) {
                    return 0;
                }
                throw e;
            });
        }

        // get group count cache by group field where data
        const cacheData = await this._getCmtGroupByMailUserIdCache(
            options.group.join('_'),
            where
        );
        const cacheDataMap = {};

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < cacheData.length; i++) {
            const key = options.group
                .map((item) => cacheData[i][item] || undefined)
                .join('_');

            cacheDataMap[key] = cacheData[i];
        }

        const counts: any[] = [];
        const countsPromise = [];

        for (let i = 0; i < options.group.length; i++) {
            const groupName = options.group[i];

            if (!where._complex || !Array.isArray(where._complex[groupName])) {
                continue;
            }

            const groupFlatValue = {};

            options.group.slice(0, i).forEach((group) => {
                groupFlatValue[group] = undefined;
            });

            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < where._complex[groupName][1].length; j++) {
                const cacheKey = options.group
                    .map(
                        (item) =>
                            ({
                                ...groupFlatValue,
                                [groupName]: where._complex[groupName][1][j],
                            }[item] || undefined)
                    )
                    .join('_');

                if (cacheDataMap[cacheKey]) {
                    continue;
                }

                const groupWhere: any = {
                    ...where,
                    ...groupFlatValue,
                    _complex: undefined,
                    [groupName]: where._complex[groupName][1][j],
                };
                const countPromise = this.count(groupWhere, {
                    ...options,
                    group: undefined,
                }).then((num) => {
                    counts.push({
                        ...groupFlatValue,
                        [groupName]: where._complex[groupName][1][j],
                        count: num,
                    });
                });

                countsPromise.push(countPromise);
            }
        }

        await think.promiseAllQueue(countsPromise, 1);
        // cache data
        await this._setCmtGroupByMailUserIdCache(options.group.join('_'), counts);

        return [...cacheData, ...counts];

    }
    async add<T>(data: LeanObjBase, {
        access: {read = true, write = true} = {
            read: true,
            write: true
        }
    } = {}): Promise<T> {
        const instance = new AVObject(this.tableName);
        instance.set(data);

        const acl = new ACL();

        acl.setPublicReadAccess(read);
        acl.setPublicWriteAccess(write);
        instance.setACL(acl);

        const resp = await instance.save();

        await this._updateCmtGroupByMailUserIdCache(data, 'add');

        return resp.toJSON();
    }

    async select(where: Record<string, any>, options: { offset?: number } = {offset: 0}): Promise<any> {
        let data: LeanObjBase[] = [];
        let ret = [];
        do {
            options.offset += data.length;
            ret = await this._select(where, options);
            data = data.concat(ret);
        } while (ret.length === 100);

        return data;
    }

    async _select(where: Record<string, any>, {
        desc,
        limit,
        offset,
        field
    }: { desc?: string, limit?: number, offset?: number, field?: string[] } = {}) {
        const instance = this.where(this.tableName, where);
        if (desc) {
            instance.descending(desc);
        }
        if (limit) {
            instance.limit(limit);
        }
        if (offset) {
            instance.skip(offset);
        }
        if (field) {
            instance.select(field);
        }

        const data = await instance.find().catch((e) => {
            if (e.code === 101) {
                return [];
            }
            throw e;
        });

        return data.map((item) => item.toJSON());
    }

    private async _updateCmtGroupByMailUserIdCache(data: LeanObjBase, method: string) {
        if (
            this.tableName !== 'Comment' ||
            !think.isArray(think.config('levels'))
        ) {
            return;
        }

        if (!data.user_id && !data.mail) {
            return;
        }

        const cacheTableName = `cache_group_count_user_id_mail`;
        const cacheData = await this.select({
            _complex: {
                _logic: 'or',
                user_id: think.isObject(data.user_id)
                    ? data.user_id.toString()
                    : data.user_id,
                mail: data.mail,
            },
        });

        if (think.isEmpty(data)) {
            return;
        }

        let count = cacheData[0].count;

        switch (method) {
            case 'add':
                if (data.status === 'approved') {
                    count += 1;
                }
                break;
            case 'udpate_status':
                if (data.status === 'approved') {
                    count += 1;
                } else {
                    count -= 1;
                }
                break;
            case 'delete':
                count -= 1;
                break;
        }

        const currentTableName = this.tableName;

        this.tableName = cacheTableName;
        await this.update({count}, {objectId: cacheData[0].objectId}).catch(
            (e) => {
                if (e.code === 101) {
                    return;
                }
                throw e;
            }
        );
        this.tableName = currentTableName;
    }

    async update(data: any, where: Record<string, any>): Promise<any> {
        const instance = this.where<Queriable>(this.tableName, where);
        const ret = await instance.find();

        return Promise.all(
            ret.map(async (item) => {
                const oldStatus = item.get('status');

                if (think.isFunction(data)) {
                    item.set(data(item.toJSON()));
                } else {
                    item.set(data);
                }
                const newStatus = item.get('status');

                if (newStatus && oldStatus !== newStatus) {
                    await this._updateCmtGroupByMailUserIdCache(data, 'update_status');
                }

                const resp = await item.save();

                return resp.toJSON();
            })
        );
    }

    private where<T extends Queriable>(className: string, where: Record<string, any>): Query<T> {
        if (!where._complex) {
            return this.parseWhere(className, where);
        }

        const filters = [];

        for (const k in where._complex) {
            if (k === '_logic') {
                continue;
            }

            const filter = this.parseWhere(className, {
                ...where,
                [k]: where._complex[k],
            });

            filters.push(filter);
        }

        return new Query[where._complex._logic](...filters);
    }

    private parseWhere<T extends Queriable>(className: string, where: Record<string, any>): Query<T> {
        const instance = new Query<T>(className);

        if (think.isEmpty(where)) {
            return instance;
        }

        for (const k in where) {
            if (k === '_complex') {
                continue;
            }

            if (think.isString(where[k])) {
                instance.equalTo(k, where[k]);
                continue;
            }

            if (where[k] === undefined) {
                instance.doesNotExist(k);
            }

            if (Array.isArray(where[k])) {
                if (where[k][0]) {
                    const handler = where[k][0].toUpperCase();

                    switch (handler) {
                        case 'IN':
                            instance.containedIn(k, where[k][1]);
                            break;
                        case 'NOT IN':
                            instance.notContainedIn(k, where[k][1]);
                            break;
                        case 'LIKE': {
                            const first = where[k][1][0];
                            const last = where[k][1].slice(-1);

                            if (first === '%' && last === '%') {
                                instance.contains(k, where[k][1].slice(1, -1));
                            } else if (first === '%') {
                                instance.endsWith(k, where[k][1].slice(1));
                            } else if (last === '%') {
                                instance.startsWith(k, where[k][1].slice(0, -1));
                            }
                            break;
                        }
                        case '!=':
                            instance.notEqualTo(k, where[k][1]);
                            break;
                        case '>':
                            instance.greaterThan(k, where[k][1]);
                            break;
                    }
                }
            }
        }

        return instance;
    }

    private async _getCmtGroupByMailUserIdCache(s: string, where: Record<string, any>) {

    }
}