import { get, PaginatedJSONResponse } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { index } from '@/routes/api/master-transmisi';

export type ServerMasterTransmisi = MasterTransmisi;

export interface MasterTransmisi {
  id: number;
  nama: string;
  panjang_transmisi?: number;
  tipe: string;
  sistem?: string;
  tender?: string;
  investasi?: string;
  status: string;
  koordinat?: [number, number][];
  kode?: string;
}

export type MasterTransmisiForm = Omit<
  Partial<MasterTransmisi>,
  'koordinat'
> & {
  koordinat?: [number | undefined, number | undefined][];
};

export interface MasterTransmisiQueryParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export const transformMasterTransmisi = ({
  ...item
}: ServerMasterTransmisi): MasterTransmisi => ({ ...item });

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
      })) as PaginatedJSONResponse<ServerMasterTransmisi[]>;
      return { data: data.map(transformMasterTransmisi), ...pagination };
    },
  },
});
