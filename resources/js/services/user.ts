import { get, PaginatedJSONResponse } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { index } from '@/routes/api/user';
import { User } from '@/types';

export type ServerUser = User;
export type UserForm = Partial<User>;

export interface UserQueryParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export const transformUser = (user: ServerUser): User => ({ ...user });

export const userQueries = queriesFactory({
  userIndex: {
    queryKey: (params) => ['user', ...(params ? [params] : [])],
    queryFn: async ({ params, signal }) => {
      const { data, ...pagination } = (await get(index().url, {
        params,
        signal,
      })) as PaginatedJSONResponse<ServerUser[]>;
      return {
        data: data.map(transformUser) as User[],
        ...pagination,
      };
    },
  },
});
