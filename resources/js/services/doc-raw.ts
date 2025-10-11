import { get, PaginatedJSONResponse } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { index } from '@/routes/api/doc-raw';

export interface DocRaw {
  id: number;
  source_filename: string;
  doc_type: string;
  doc_category: string;
  knowledge_code: string;
  upload_status: string;
  title: string;
  created_date: string;
}

export interface DocRawQueryParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export const docRawQueries = queriesFactory({
  docRawIndex: {
    queryKey: (params?: DocRawQueryParams) => [
      'doc-raws',
      ...(params ? [params] : []),
    ],
    queryFn: async (params?: DocRawQueryParams, signal?: AbortSignal) => {
      const { data, ...pagination } = (await get(index().url, {
        params,
        signal,
      })) as PaginatedJSONResponse<DocRaw[]>;
      return { data, ...pagination };
    },
  },
});
