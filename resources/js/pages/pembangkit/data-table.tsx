import { dataTableFactory } from '@/lib/factories/data-table';
import {
  MasterPembangkit,
  masterPembangkitQueries,
  MasterPembangkitQueryParams,
} from '@/services/master-pembangkit';

const PembangkitDataTable = dataTableFactory<
  MasterPembangkit[],
  MasterPembangkitQueryParams
>({
  query: masterPembangkitQueries.index.useQuery,
  queryOptions: {
    staleTime: 5 * 60 * 1000,
  },
});
export default PembangkitDataTable;
