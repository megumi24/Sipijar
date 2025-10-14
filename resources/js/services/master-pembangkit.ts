import { get } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { index } from '@/routes/api/master-pembangkit';

export interface MasterPembangkit {
  id: number;
  kode: string;
  nama: string;
  tipe: string;
  optionLabel: string;
}

export const masterPembangkitQueries = queriesFactory({
  index: {
    queryKey: ['master-pembangkit-index'],
    queryFn: async ({ signal }) => {
      const { data } = await get(index().url, { signal });
      return data as MasterPembangkit[];
    },
  },
});
