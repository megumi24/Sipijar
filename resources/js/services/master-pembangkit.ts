import { get, PaginatedJSONResponse } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { index } from '@/routes/api/master-pembangkit';
import { situation } from '@/routes/api/pembangkit';
import { MasterTransmisi } from './master-transmisi';

export interface MasterPembangkit {
  id: number;
  kode: string;
  nama: string;
  tipe: string;
  latitude: number;
  longitude: number;
  status: string;
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
  situationData: {
    queryKey: ['pembangkit-situation-data'],
    queryFn: async ({ signal }) => {
      const { data } = (await get(situation().url, {
        signal,
      })) as PaginatedJSONResponse<{
        pembangkit: Array<
          MasterPembangkit & {
            jumlah: number;
            cases: { type: string; jumlah: number }[];
          }
        >;
        transmisi: Array<
          MasterTransmisi & {
            jumlah: number;
            cases: { type: string; jumlah: number }[];
          }
        >;
      }>;
      return data;
    },
  },
});
