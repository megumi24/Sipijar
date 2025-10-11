import { get, PaginatedJSONResponse } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { index } from '@/routes/api/doc-raw';
import moment from 'moment';

export interface ServerDocRaw {
  id: number;
  source_filename: string;
  title: string;
  author?: string;
  doc_type?: string;
  doc_category?: string;
  knowledge_code?: string;
  upload_status?: string;
  full_text?: string;
  full_text_markdown?: string;
  created_date?: string;
  source_url?: string;
  language?: string;
  verified?: boolean;
}

export interface DocRaw {
  id: number;
  source_filename: string;
  title: string;
  author?: string;
  doc_type?: string;
  doc_category?: string;
  knowledge_code?: string;
  upload_status?: string;
  full_text?: string;
  full_text_markdown?: string;
  created_date?: Date;
  source_url?: string;
  language?: string;
  verified: boolean;
}

export type DocRawForm = Partial<DocRaw>;

export interface DocRawQueryParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export const transformDocRaw = ({
  created_date,
  verified,
  ...item
}: ServerDocRaw): DocRaw => ({
  ...item,
  created_date: created_date
    ? moment(created_date, 'YYYY-MM-DD').toDate()
    : undefined,
  verified: !!verified,
});

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
        data: data.map(transformDocRaw) as DocRaw[],
        ...pagination,
      };
    },
  },
});
