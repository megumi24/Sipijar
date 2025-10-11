import { dataTableFactory } from '@/lib/factories/data-table';
import { docRawQueries } from '@/services/doc-raw';

const DocRawDataTable = dataTableFactory({
  query: docRawQueries.docRawIndex.useQuery,
  queryOptions: {
    staleTime: 5 * 60 * 1000,
  },
});
export default DocRawDataTable;
