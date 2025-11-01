import { dataTableFactory } from '@/lib/factories/data-table';
import {
  MasterTransmisi,
  masterTransmisiQueries,
  MasterTransmisiQueryParams,
} from '@/services/master-transmisi';

const TransmisiDataTable = dataTableFactory<
  MasterTransmisi[],
  MasterTransmisiQueryParams
>({
  query: masterTransmisiQueries.index.useQuery,
  queryOptions: {
    staleTime: 5 * 60 * 1000,
  },
});
export default TransmisiDataTable;
