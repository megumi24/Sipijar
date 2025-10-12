import { dataTableFactory } from '@/lib/factories/data-table';
import { factQueries } from '@/services/fact';

const FactDataTable = dataTableFactory({
  query: factQueries.factIndex.useQuery,
  queryOptions: {
    staleTime: 5 * 60 * 1000,
  },
});
export default FactDataTable;
