import { dataTableFactory } from '@/lib/factories/data-table';
import { userQueries, UserQueryParams } from '@/services/user';
import { User } from '@/types';

const UserDataTable = dataTableFactory<User[], UserQueryParams>({
  query: userQueries.userIndex.useQuery,
  queryOptions: {
    staleTime: 5 * 60 * 1000,
  },
});
export default UserDataTable;
