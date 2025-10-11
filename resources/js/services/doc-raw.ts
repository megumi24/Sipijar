import { get, PaginatedJSONResponse } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { index } from '@/routes/api/doc-raw';
import moment from 'moment';

interface ServerDocRaw {
  id: number;
  source_filename: string;
  doc_type: string;
  doc_category: string;
  knowledge_code: string;
  upload_status: string;
  title: string;
  created_date: string;
}

export interface DocRaw {
  id: number;
  source_filename: string;
  doc_type: string;
  doc_category: string;
  knowledge_code: string;
  upload_status: string;
  title: string;
  created_date: Date;
  verified: boolean;
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
      })) as PaginatedJSONResponse<ServerDocRaw[]>;
      return {
        data: data.map(({ created_date, ...item }) => ({
          ...item,
          created_date: moment(created_date, 'YYYY-MM-DD').toDate(),
        })) as DocRaw[],
        ...pagination,
      };
    },
  },
});
