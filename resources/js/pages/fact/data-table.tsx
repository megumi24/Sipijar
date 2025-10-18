import { dataTableFactory } from '@/lib/factories/data-table';
import { Fact, factQueries, FactQueryParams } from '@/services/fact';

const FactDataTable = dataTableFactory<Fact[], FactQueryParams>({
  query: factQueries.factIndex.useQuery,
  queryOptions: {
    staleTime: 5 * 60 * 1000,
  },
});
export default FactDataTable;
