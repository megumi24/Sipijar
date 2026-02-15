import { get, PaginatedJSONResponse } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { index } from '@/routes/api/master-pembangkit';
import { situation } from '@/routes/api/pembangkit';
import { MasterTransmisi } from './master-transmisi';

export type ServerMasterPembangkit = MasterPembangkit;

export interface MasterPembangkit {
  id: number;
  kode: string;
  nama: string;
  tipe: string;
  kapasitas?: string;
  pengelola?: string;
  latitude: number;
  longitude: number;
  provinsi?: string;
  lokasi?: string;
  deskripsi?: string;
  sistem_kelistrikan?: string;
  status: string;
  alias?: string;
  koordinat?: [number, number][];
  optionLabel: string;
}

export type MasterPembangkitForm = Partial<MasterPembangkit>;

export interface MasterPembangkitQueryParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export const transformMasterPembangkit = ({
  ...item
}: ServerMasterPembangkit): MasterPembangkit => ({
  ...item,
});

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
      })) as PaginatedJSONResponse<ServerMasterPembangkit[]>;
      return {
        data: data.map(transformMasterPembangkit),
        ...pagination,
      };
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
