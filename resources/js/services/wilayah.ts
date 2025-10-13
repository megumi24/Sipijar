import { get } from '@/lib/api';
import { SelectItem } from '@/lib/factories/select';
import { queriesFactory } from '@/lib/factories/services';
import { selectItems } from '@/routes/api/wilayah/provinsi';

export const wilayahOptionsQueries = queriesFactory({
  provinsiOptions: {
    queryKey: ['provinsi-options'],
    queryFn: async ({ signal }) => {
      const { data } = await get(selectItems().url, {
        signal,
      });
      return data as SelectItem[];
    },
  },
});
