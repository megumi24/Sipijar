import { get, PaginatedJSONResponse } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { index } from '@/routes/api/master-pembangkit';

export interface MasterPembangkit {
  id: number;
  kode: string;
  nama: string;
  tipe: string;
  optionLabel: string;
}

export interface MasterPembangkitQueryParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export const masterPembangkitQueries = queriesFactory({
  index: {
    queryKey: (params) => [
      'master-pembangkit-index',
      ...(params ? [params] : []),
    ],
    queryFn: async ({ params, signal }) => {
      const { data, ...pagination } = (await get(index().url, {
        params,
        signal,
      })) as PaginatedJSONResponse<MasterPembangkit[]>;
      return { data: data as MasterPembangkit[], ...pagination };
    },
  },
});
