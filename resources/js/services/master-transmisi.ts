import { get, PaginatedJSONResponse } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { index } from '@/routes/api/master-transmisi';

export interface MasterTransmisi {
  id: number;
  nama: string;
  panjang_transmisi?: number;
  tipe?: string;
  status: string;
  koordinat: [number, number][];
  kode?: string;
}

export interface MasterTransmisiQueryParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export const masterTransmisiQueries = queriesFactory({
  index: {
    queryKey: (params) => [
      'master-transmisi-index',
      ...(params ? [params] : []),
    ],
    queryFn: async ({ params, signal }) => {
      const { data, ...pagination } = (await get(index().url, {
        params,
        signal,
      })) as PaginatedJSONResponse<MasterTransmisi[]>;
      return { data: data as MasterTransmisi[], ...pagination };
    },
  },
});
