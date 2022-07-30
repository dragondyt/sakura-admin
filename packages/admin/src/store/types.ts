import { IUserState } from '@/store/modules/user';

export interface IStore {
  user: IUserState;
  count: number;
}
