import { dataTableFactory } from '@/lib/factories/data-table';
import { DocRaw, docRawQueries, DocRawQueryParams } from '@/services/doc-raw';

const DocRawDataTable = dataTableFactory<DocRaw[], DocRawQueryParams>({
  query: docRawQueries.docRawIndex.useQuery,
  queryOptions: {
    staleTime: 5 * 60 * 1000,
  },
});
export default DocRawDataTable;
